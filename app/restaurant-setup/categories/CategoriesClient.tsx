"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  ImagePlus,
  X,
  Loader2,
  GripVertical,
} from "lucide-react";
import SetupTopbar from "@/components/setup/SetupTopbar";
import { useSetupShell } from "@/components/setup/SetupShellContext";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  RESTAURANT_TOKEN_KEY,
  Category,
  getErrorMessage,
} from "@/lib/setupApi";

const SAMPLE: Category[] = [
  { _id: "c1", name: "Starters", image: null, order: 0, status: "active" },
  { _id: "c2", name: "Main Course", image: null, order: 1, status: "active" },
  { _id: "c3", name: "Breads & Rice", image: null, order: 2, status: "active" },
  { _id: "c4", name: "Desserts", image: null, order: 3, status: "active" },
  { _id: "c5", name: "Beverages", image: null, order: 4, status: "inactive" },
];

function CategoryModal({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Category | null;
  onClose: () => void;
  onSaved: (c: Category) => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [status, setStatus] = useState<"active" | "inactive">(initial?.status || "active");
  const [preview, setPreview] = useState<string | null>(initial?.image || null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("status", status);
      if (file) formData.append("image", file);

      if (!token) {
        // Preview-only mode (no backend session) — reflect change locally
        onSaved({
          _id: initial?._id || `local-${Date.now()}`,
          name: name.trim(),
          image: preview,
          status,
          order: initial?.order ?? 999,
        });
        return;
      }

      const res = initial
        ? await updateCategory(token, initial._id, formData)
        : await createCategory(token, formData);
      onSaved(res.category);
    } catch (err) {
      setError(getErrorMessage(err, "Could not save category"));
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
        className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 sm:p-7"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-gray-900 text-lg">{initial ? "Edit Category" : "Add Category"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <label className="relative w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex-shrink-0 overflow-hidden cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImagePlus className="w-5 h-5 text-emerald-300" />
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }
              }}
            />
          </label>
          <div className="flex-1">
            <input
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              placeholder="e.g. Starters"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-gray-600">Status</span>
          <div className="flex rounded-lg border border-gray-200 p-0.5">
            {(["active", "inactive"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  status === s ? "bg-emerald-600 text-white" : "text-gray-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {initial ? "Save Changes" : "Add Category"}
        </button>
      </motion.div>
    </div>
  );
}

export default function CategoriesClient() {
  const { openMobileMenu } = useSetupShell();
  const [categories, setCategories] = useState<Category[]>(SAMPLE);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      // No token: the layout's auth guard is already redirecting to login,
      // so just bail without touching state here.
      return;
    }
    fetchCategories(token)
      .then((res) => setCategories(res.categories))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleSaved(cat: Category) {
    setCategories((prev) => {
      const exists = prev.some((c) => c._id === cat._id);
      return exists ? prev.map((c) => (c._id === cat._id ? cat : c)) : [...prev, cat];
    });
    setModalOpen(false);
    setEditing(null);
  }

  async function handleDelete(id: string) {
    setDeleteError("");
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      setCategories((prev) => prev.filter((c) => c._id !== id));
      return;
    }
    try {
      await deleteCategory(token, id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setDeleteError(getErrorMessage(err, "Could not delete category"));
      setTimeout(() => setDeleteError(""), 3500);
    }
  }

  function move(index: number, direction: -1 | 1) {
    setCategories((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      const reordered = next.map((c, i) => ({ ...c, order: i }));

      const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
      if (token) {
        reorderCategories(
          token,
          reordered.map((c) => ({ id: c._id, order: c.order }))
        ).catch(() => {});
      }
      return reordered;
    });
  }

  async function toggleStatus(cat: Category) {
    const newStatus = cat.status === "active" ? "inactive" : "active";
    setCategories((prev) => prev.map((c) => (c._id === cat._id ? { ...c, status: newStatus } : c)));
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    try {
      const formData = new FormData();
      formData.append("status", newStatus);
      await updateCategory(token, cat._id, formData);
    } catch {
      /* non-blocking */
    }
  }

  return (
    <div className="pb-24">
      <SetupTopbar title="Categories" onMenuClick={openMobileMenu} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            {categories.length} categor{categories.length === 1 ? "y" : "ies"} · use the arrows to reorder how they appear in the Customer App
          </p>
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-200 transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        {deleteError && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{deleteError}</div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 divide-y divide-gray-50 overflow-hidden">
            <AnimatePresence initial={false}>
              {categories.map((cat, i) => (
                <motion.div
                  key={cat._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-4 px-4 sm:px-6 py-3.5"
                >
                  <GripVertical className="w-4 h-4 text-gray-200 flex-shrink-0 hidden sm:block" />
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {cat.image ? (
                      <img src={cat.image} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-emerald-300 text-xs font-semibold">
                        {cat.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{cat.name}</p>
                  </div>
                  <button
                    onClick={() => toggleStatus(cat)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                      cat.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {cat.status === "active" ? "Active" : "Inactive"}
                  </button>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="p-1.5 text-gray-300 hover:text-gray-600 disabled:opacity-30 disabled:hover:text-gray-300"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === categories.length - 1}
                      className="p-1.5 text-gray-300 hover:text-gray-600 disabled:opacity-30 disabled:hover:text-gray-300"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setEditing(cat);
                      setModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <CategoryModal
            initial={editing}
            onClose={() => {
              setModalOpen(false);
              setEditing(null);
            }}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>
    </div>
  );
}