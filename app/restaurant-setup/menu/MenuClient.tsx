"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  ImagePlus,
  UploadCloud,
  Flame,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
} from "lucide-react";
import SetupTopbar from "@/components/setup/SetupTopbar";
import { useSetupShell } from "@/components/setup/SetupShellContext";
import {
  fetchMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
  bulkImportMenuItems,
  fetchCategories,
  RESTAURANT_TOKEN_KEY,
  MenuItem,
  Category,
  VariantGroup,
  AddOn,
  getErrorMessage,
} from "@/lib/setupApi";

const SAMPLE_CATEGORIES: Category[] = [
  { _id: "c1", name: "Starters", image: null, order: 0, status: "active" },
  { _id: "c2", name: "Main Course", image: null, order: 1, status: "active" },
  { _id: "c3", name: "Breads & Rice", image: null, order: 2, status: "active" },
  { _id: "c4", name: "Desserts", image: null, order: 3, status: "active" },
];

const SAMPLE_ITEMS: MenuItem[] = [
  {
    _id: "m1",
    category: { _id: "c1", name: "Starters" },
    name: "Paneer Tikka",
    description: "Char-grilled cottage cheese marinated in smoky spices and yogurt.",
    price: 280,
    discountPrice: 249,
    foodType: "veg",
    isBestseller: true,
    isRecommended: true,
    prepTimeMinutes: 20,
    images: [],
    isAvailable: true,
    stockStatus: "in_stock",
    addOns: [],
    variants: [{ name: "Spice Level", required: false, options: [{ label: "Mild", priceDelta: 0 }, { label: "Hot", priceDelta: 0 }] }],
  },
  {
    _id: "m2",
    category: { _id: "c2", name: "Main Course" },
    name: "Butter Chicken",
    description: "Slow-cooked tandoori chicken in a rich tomato-butter gravy.",
    price: 380,
    foodType: "non-veg",
    isBestseller: true,
    isRecommended: false,
    prepTimeMinutes: 25,
    images: [],
    isAvailable: true,
    stockStatus: "in_stock",
    addOns: [{ name: "Extra Gravy", price: 60, inStock: true }],
    variants: [],
  },
  {
    _id: "m3",
    category: { _id: "c2", name: "Main Course" },
    name: "Dal Makhani",
    description: "Black lentils slow-simmered overnight with butter and cream.",
    price: 260,
    foodType: "veg",
    isBestseller: false,
    isRecommended: true,
    prepTimeMinutes: 15,
    images: [],
    isAvailable: true,
    stockStatus: "limited",
    addOns: [],
    variants: [],
  },
  {
    _id: "m4",
    category: { _id: "c3", name: "Breads & Rice" },
    name: "Garlic Naan",
    price: 65,
    foodType: "veg",
    isBestseller: false,
    isRecommended: false,
    prepTimeMinutes: 10,
    images: [],
    isAvailable: true,
    stockStatus: "in_stock",
    addOns: [],
    variants: [{ name: "Size", required: true, options: [{ label: "Regular", priceDelta: 0 }, { label: "Family (2 pc)", priceDelta: 55 }] }],
  },
  {
    _id: "m5",
    category: { _id: "c4", name: "Desserts" },
    name: "Gulab Jamun",
    price: 120,
    foodType: "veg",
    isBestseller: false,
    isRecommended: false,
    prepTimeMinutes: 5,
    images: [],
    isAvailable: false,
    stockStatus: "out_of_stock",
    addOns: [],
    variants: [],
  },
];

const inputCls =
  "w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-150";

function foodTypeDot(type: MenuItem["foodType"]) {
  const color = type === "veg" ? "border-green-600" : type === "egg" ? "border-amber-500" : "border-red-600";
  const fill = type === "veg" ? "bg-green-600" : type === "egg" ? "bg-amber-500" : "bg-red-600";
  return (
    <span className={`inline-flex items-center justify-center w-4 h-4 border-2 ${color} rounded-sm flex-shrink-0`}>
      <span className={`w-1.5 h-1.5 rounded-full ${fill}`} />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Add / Edit item modal
// ---------------------------------------------------------------------------
function ItemModal({
  categories,
  initial,
  onClose,
  onSaved,
}: {
  categories: Category[];
  initial?: MenuItem | null;
  onClose: () => void;
  onSaved: (item: MenuItem) => void;
}) {
  const initialCategoryId = typeof initial?.category === "string" ? initial.category : initial?.category?._id;

  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [categoryId, setCategoryId] = useState(initialCategoryId || categories[0]?._id || "");
  const [price, setPrice] = useState(initial?.price?.toString() || "");
  const [discountPrice, setDiscountPrice] = useState(initial?.discountPrice?.toString() || "");
  const [foodType, setFoodType] = useState<MenuItem["foodType"]>(initial?.foodType || "veg");
  const [isBestseller, setIsBestseller] = useState(initial?.isBestseller || false);
  const [isRecommended, setIsRecommended] = useState(initial?.isRecommended || false);
  const [prepTime, setPrepTime] = useState(initial?.prepTimeMinutes?.toString() || "15");
  const [isAvailable, setIsAvailable] = useState(initial?.isAvailable ?? true);
  const [stockStatus, setStockStatus] = useState<MenuItem["stockStatus"]>(initial?.stockStatus || "in_stock");
  const [previews, setPreviews] = useState<string[]>(initial?.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>(initial?.addOns || []);
  const [variants, setVariants] = useState<VariantGroup[]>(initial?.variants || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function addImages(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 6 - previews.length);
    setNewFiles((f) => [...f, ...arr]);
    setPreviews((p) => [...p, ...arr.map((f) => URL.createObjectURL(f))]);
  }

  function addOnRow() {
    setAddOns((a) => [...a, { name: "", price: 0, inStock: true }]);
  }
  function updateAddOn(i: number, patch: Partial<AddOn>) {
    setAddOns((a) => a.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));
  }
  function removeAddOn(i: number) {
    setAddOns((a) => a.filter((_, idx) => idx !== i));
  }

  function variantGroupRow() {
    setVariants((v) => [...v, { name: "", required: false, options: [{ label: "", priceDelta: 0 }] }]);
  }
  function updateVariantGroup(i: number, patch: Partial<VariantGroup>) {
    setVariants((v) => v.map((g, idx) => (idx === i ? { ...g, ...patch } : g)));
  }
  function removeVariantGroup(i: number) {
    setVariants((v) => v.filter((_, idx) => idx !== i));
  }
  function addVariantOption(gi: number) {
    setVariants((v) =>
      v.map((g, idx) => (idx === gi ? { ...g, options: [...g.options, { label: "", priceDelta: 0 }] } : g))
    );
  }
  function updateVariantOption(gi: number, oi: number, patch: Partial<{ label: string; priceDelta: number }>) {
    setVariants((v) =>
      v.map((g, idx) =>
        idx === gi ? { ...g, options: g.options.map((o, oidx) => (oidx === oi ? { ...o, ...patch } : o)) } : g
      )
    );
  }
  function removeVariantOption(gi: number, oi: number) {
    setVariants((v) =>
      v.map((g, idx) => (idx === gi ? { ...g, options: g.options.filter((_, oidx) => oidx !== oi) } : g))
    );
  }

  async function handleSave() {
    if (!name.trim()) return setError("Item name is required");
    if (!categoryId) return setError("Select a category");
    if (!price || isNaN(Number(price))) return setError("Enter a valid price");

    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("category", categoryId);
      formData.append("price", price);
      if (discountPrice) formData.append("discountPrice", discountPrice);
      formData.append("foodType", foodType);
      formData.append("isBestseller", String(isBestseller));
      formData.append("isRecommended", String(isRecommended));
      formData.append("prepTimeMinutes", prepTime);
      formData.append("isAvailable", String(isAvailable));
      formData.append("stockStatus", stockStatus);
      formData.append("addOns", JSON.stringify(addOns.filter((a) => a.name.trim())));
      formData.append(
        "variants",
        JSON.stringify(variants.filter((v) => v.name.trim()).map((v) => ({ ...v, options: v.options.filter((o) => o.label.trim()) })))
      );
      newFiles.forEach((f) => formData.append("images", f));

      const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
      if (!token) {
        onSaved({
          _id: initial?._id || `local-${Date.now()}`,
          category: categories.find((c) => c._id === categoryId) || { _id: categoryId, name: "" },
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          discountPrice: discountPrice ? Number(discountPrice) : undefined,
          foodType,
          isBestseller,
          isRecommended,
          prepTimeMinutes: Number(prepTime),
          images: previews,
          isAvailable,
          stockStatus,
          addOns,
          variants,
        });
        return;
      }

      const res = initial
        ? await updateMenuItem(token, initial._id, formData)
        : await createMenuItem(token, formData);
      onSaved(res.item);
    } catch (err) {
      setError(getErrorMessage(err, "Could not save item"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-7"
      >
        <div className="flex items-center justify-between mb-5 sticky -top-7 sm:-top-7 bg-white pt-1 pb-2 -mt-1">
          <h3 className="font-semibold text-gray-900 text-lg">{initial ? "Edit Menu Item" : "Add Menu Item"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Images */}
          <div>
            <span className="text-sm font-medium text-gray-700 mb-1.5 block">Item Images</span>
            <div className="flex flex-wrap gap-2.5">
              {previews.map((src, i) => (
                <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
              {previews.length < 6 && (
                <label className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-emerald-300 transition-colors">
                  <ImagePlus className="w-5 h-5 text-gray-300" />
                  <input type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => addImages(e.target.files)} />
                </label>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Food Item Name</span>
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            </div>
            <div className="sm:col-span-2">
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Description</span>
              <textarea className={inputCls + " min-h-[70px] resize-none"} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Category</span>
              <select className={inputCls} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Food Type</span>
              <div className="flex rounded-xl border border-gray-200 p-1">
                {(["veg", "egg", "non-veg"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFoodType(t)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                      foodType === t ? "bg-emerald-600 text-white" : "text-gray-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Price (₹)</span>
              <input className={inputCls} type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Discount Price (₹)</span>
              <input className={inputCls} type="number" min={0} value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="Optional" />
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Preparation Time (mins)</span>
              <input className={inputCls} type="number" min={0} value={prepTime} onChange={(e) => setPrepTime(e.target.value)} />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Stock Status</span>
              <select className={inputCls} value={stockStatus} onChange={(e) => setStockStatus(e.target.value as MenuItem["stockStatus"])}>
                <option value="in_stock">In Stock</option>
                <option value="limited">Limited</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 py-1">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={isBestseller} onChange={(e) => setIsBestseller(e.target.checked)} className="accent-emerald-600 w-4 h-4" />
              Bestseller
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={isRecommended} onChange={(e) => setIsRecommended(e.target.checked)} className="accent-emerald-600 w-4 h-4" />
              Recommended
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer ml-auto">
              <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="accent-emerald-600 w-4 h-4" />
              Available on menu
            </label>
          </div>

          {/* Add-ons */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-800">Add-ons</span>
              <button onClick={addOnRow} className="text-xs font-medium text-emerald-700 flex items-center gap-1 hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {addOns.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    placeholder="e.g. Extra Cheese"
                    value={a.name}
                    onChange={(e) => updateAddOn(i, { name: e.target.value })}
                  />
                  <input
                    className="w-24 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    type="number"
                    placeholder="₹"
                    value={a.price}
                    onChange={(e) => updateAddOn(i, { price: Number(e.target.value) })}
                  />
                  <button onClick={() => removeAddOn(i)} className="text-gray-300 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {addOns.length === 0 && <p className="text-xs text-gray-400 italic">No add-ons configured</p>}
            </div>
          </div>

          {/* Variants */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-800">Variants (Size, Spice Level, etc.)</span>
              <button onClick={variantGroupRow} className="text-xs font-medium text-emerald-700 flex items-center gap-1 hover:underline">
                <Plus className="w-3.5 h-3.5" /> Add Group
              </button>
            </div>
            <div className="space-y-4">
              {variants.map((g, gi) => (
                <div key={gi} className="rounded-xl bg-gray-50/70 p-3.5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <input
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      placeholder="Group name, e.g. Size"
                      value={g.name}
                      onChange={(e) => updateVariantGroup(gi, { name: e.target.value })}
                    />
                    <label className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
                      <input type="checkbox" checked={g.required} onChange={(e) => updateVariantGroup(gi, { required: e.target.checked })} className="accent-emerald-600" />
                      Required
                    </label>
                    <button onClick={() => removeVariantGroup(gi)} className="text-gray-300 hover:text-red-500 flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5 pl-1">
                    {g.options.map((o, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <input
                          className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          placeholder="Option, e.g. Large"
                          value={o.label}
                          onChange={(e) => updateVariantOption(gi, oi, { label: e.target.value })}
                        />
                        <input
                          className="w-20 rounded-lg border border-gray-200 px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                          type="number"
                          placeholder="+₹"
                          value={o.priceDelta}
                          onChange={(e) => updateVariantOption(gi, oi, { priceDelta: Number(e.target.value) })}
                        />
                        <button onClick={() => removeVariantOption(gi, oi)} className="text-gray-300 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addVariantOption(gi)} className="text-xs text-emerald-700 hover:underline mt-1">
                      + Add option
                    </button>
                  </div>
                </div>
              ))}
              {variants.length === 0 && <p className="text-xs text-gray-400 italic">No variant groups configured</p>}
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {initial ? "Save Changes" : "Add Item"}
        </button>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bulk import modal
// ---------------------------------------------------------------------------
function BulkImportModal({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ created: number; failed: { row: number; reason: string }[] } | null>(null);
  const [error, setError] = useState("");

  async function handleImport() {
    if (!file) return;
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      setError("Log in to run a bulk import.");
      return;
    }
    setImporting(true);
    setError("");
    try {
      const res = await bulkImportMenuItems(token, file);
      setResult(res);
      onDone();
    } catch (err) {
      setError(getErrorMessage(err, "Could not import CSV file"));
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 sm:p-7"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900 text-lg">Bulk Import Menu</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          CSV columns: <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">name, description, category, price, discountPrice, foodType, prepTimeMinutes, isBestseller, isRecommended, isAvailable, stockStatus</code>.
          The <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">category</code> value must match an existing category name.
        </p>

        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-8 cursor-pointer hover:border-emerald-300 transition-colors mb-4">
          <UploadCloud className="w-6 h-6 text-gray-300" />
          <span className="text-sm text-gray-500">{file ? file.name : "Click to select a .csv file"}</span>
          <input type="file" accept=".csv" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        {result && (
          <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm">
            <p className="text-emerald-700 font-medium">{result.created} item(s) imported successfully.</p>
            {result.failed.length > 0 && (
              <div className="mt-2 text-red-600">
                <p className="font-medium">{result.failed.length} row(s) failed:</p>
                <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                  {result.failed.slice(0, 5).map((f, i) => (
                    <li key={i}>Row {f.row}: {f.reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={!file || importing}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          {importing && <Loader2 className="w-4 h-4 animate-spin" />}
          Import
        </button>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function MenuClient() {
  const { openMobileMenu } = useSetupShell();
  const [items, setItems] = useState<MenuItem[]>(SAMPLE_ITEMS);
  const [categories, setCategories] = useState<Category[]>(SAMPLE_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      // No token: the layout's auth guard is already redirecting to login,
      // so just bail without touching state here.
      return;
    }
    Promise.all([fetchCategories(token), fetchMenuItems(token)])
      .then(([catRes, itemRes]) => {
        setCategories(catRes.categories);
        setItems(itemRes.items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const catId = typeof item.category === "string" ? item.category : item.category._id;
      if (categoryFilter && catId !== categoryFilter) return false;
      if (foodTypeFilter && item.foodType !== foodTypeFilter) return false;
      if (search.trim() && !item.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
      return true;
    });
  }, [items, categoryFilter, foodTypeFilter, search]);

  function handleItemSaved(item: MenuItem) {
    setItems((prev) => {
      const exists = prev.some((i) => i._id === item._id);
      return exists ? prev.map((i) => (i._id === item._id ? item : i)) : [item, ...prev];
    });
    setItemModalOpen(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      setItems((prev) => prev.filter((i) => i._id !== id));
      return;
    }
    try {
      await deleteMenuItem(token, id);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch {
      /* non-blocking */
    }
  }

  async function handleToggleAvailability(item: MenuItem) {
    const newVal = !item.isAvailable;
    setItems((prev) => prev.map((i) => (i._id === item._id ? { ...i, isAvailable: newVal } : i)));
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    try {
      await toggleMenuItemAvailability(token, item._id, newVal);
    } catch {
      /* non-blocking */
    }
  }

  async function refreshAfterImport() {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    try {
      const res = await fetchMenuItems(token);
      setItems(res.items);
    } catch {}
  }

  return (
    <div className="pb-24">
      <SetupTopbar title="Menu Management" onMenuClick={openMobileMenu} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl border transition-colors flex-shrink-0 ${
              showFilters ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button
            onClick={() => setBulkOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            <UploadCloud className="w-4 h-4" /> Bulk Import
          </button>
          <button
            onClick={() => {
              setEditing(null);
              setItemModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-200 transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mb-5">
                <select
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <select
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
                  value={foodTypeFilter}
                  onChange={(e) => setFoodTypeFilter(e.target.value)}
                >
                  <option value="">Veg / Non-veg / Egg</option>
                  <option value="veg">Veg</option>
                  <option value="egg">Egg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
                {(categoryFilter || foodTypeFilter) && (
                  <button
                    onClick={() => { setCategoryFilter(""); setFoodTypeFilter(""); }}
                    className="text-sm text-gray-400 hover:text-gray-700 px-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-sm text-gray-400">No menu items match your filters.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const catName = typeof item.category === "string" ? "" : item.category.name;
              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 overflow-hidden flex flex-col"
                >
                  <div className="h-32 bg-gradient-to-br from-emerald-50 to-gray-50 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {item.images[0] ? (
                      <img src={item.images[0]} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImagePlus className="w-6 h-6 text-emerald-200" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {item.isBestseller && (
                        <span className="flex items-center gap-1 bg-amber-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          <Flame className="w-2.5 h-2.5" /> Bestseller
                        </span>
                      )}
                      {item.isRecommended && (
                        <span className="flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          <Star className="w-2.5 h-2.5" /> Recommended
                        </span>
                      )}
                    </div>
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200">Unavailable</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      {foodTypeDot(item.foodType)}
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug flex-1">{item.name}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{catName}</p>
                    {item.description && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      {item.discountPrice ? (
                        <>
                          <span className="text-sm font-bold text-gray-900">₹{item.discountPrice}</span>
                          <span className="text-xs text-gray-400 line-through">₹{item.price}</span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                      )}
                      <span className="flex items-center gap-1 text-[11px] text-gray-400 ml-auto">
                        <Clock className="w-3 h-3" /> {item.prepTimeMinutes}m
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.stockStatus === "in_stock"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.stockStatus === "limited"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.stockStatus === "in_stock" ? "In Stock" : item.stockStatus === "limited" ? "Limited" : "Out of Stock"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${item.isAvailable ? "bg-emerald-500" : "bg-gray-200"}`}
                      >
                        <motion.span
                          className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow"
                          animate={{ x: item.isAvailable ? 16 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditing(item); setItemModalOpen(true); }}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {itemModalOpen && (
          <ItemModal
            categories={categories}
            initial={editing}
            onClose={() => { setItemModalOpen(false); setEditing(null); }}
            onSaved={handleItemSaved}
          />
        )}
        {bulkOpen && (
          <BulkImportModal onClose={() => setBulkOpen(false)} onDone={refreshAfterImport} />
        )}
      </AnimatePresence>
    </div>
  );
}