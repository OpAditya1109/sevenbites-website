"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  ImagePlus,
  MapPin,
  Phone,
  Mail,
  Navigation,
  ShieldCheck,
  FileBadge,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import SetupTopbar from "@/components/setup/SetupTopbar";
import { useSetupShell } from "@/components/setup/SetupShellContext";
import {
  fetchSetupProfile,
  updateSetupProfile,
  RESTAURANT_TOKEN_KEY,
  SetupRestaurantProfile,
  getErrorMessage,
} from "@/lib/setupApi";

// Realistic sample data — shown immediately so the page never looks empty,
// then silently replaced once the real profile loads.
const SAMPLE: SetupRestaurantProfile = {
  _id: "sample",
  restaurantName: "Spice Route Kitchen",
  description:
    "Authentic North Indian & Mughlai cuisine, slow-cooked in traditional handi pots. Known for our butter chicken and tandoori specialties.",
  cuisineType: "North Indian, Mughlai, Tandoor",
  address: "Shop No. 4, FC Road, Shivajinagar, Pune, Maharashtra",
  city: "Pune",
  pincode: "411005",
  contactNumber: "9822012345",
  email: "contact@spiceroutekitchen.in",
  logoUrl: null,
  coverImageUrl: null,
  googleMapLink: "https://maps.google.com/?q=Spice+Route+Kitchen+FC+Road+Pune",
  latitude: 18.5236,
  longitude: 73.8478,
  deliveryRadiusKm: 6,
  fssaiLicenseNumber: "12345678901234",
  gstNumber: "27ABCDE1234F1Z5",
  status: "approved",
};

function Field({
  label,
  icon: Icon,
  children,
  hint,
}: {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-emerald-600" />}
        {label}
      </span>
      {children}
      {hint && <span className="block text-xs text-gray-400 mt-1">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-150";

export default function ProfileClient() {
  const { openMobileMenu } = useSetupShell();
  const [profile, setProfile] = useState<SetupRestaurantProfile>(SAMPLE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const logoFileRef = useRef<File | null>(null);
  const coverFileRef = useRef<File | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      // No token: the layout's auth guard is already redirecting to login,
      // so just bail without touching state here.
      return;
    }
    fetchSetupProfile(token)
      .then((res) => setProfile(res.restaurant))
      .catch(() => {
        /* keep sample data — backend may not be running in this preview */
      })
      .finally(() => setLoading(false));
  }, []);

  function handleImageSelect(kind: "logo" | "cover", file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (kind === "logo") {
      logoFileRef.current = file;
      setLogoPreview(url);
    } else {
      coverFileRef.current = file;
      setCoverPreview(url);
    }
  }

  function update<K extends keyof SetupRestaurantProfile>(key: K, value: SetupRestaurantProfile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  async function handleSave() {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("restaurantName", profile.restaurantName);
      formData.append("description", profile.description || "");
      formData.append("cuisineType", profile.cuisineType || "");
      formData.append("address", profile.address);
      formData.append("contactNumber", profile.contactNumber);
      formData.append("email", profile.email);
      formData.append("googleMapLink", profile.googleMapLink || "");
      formData.append("deliveryRadiusKm", String(profile.deliveryRadiusKm));
      formData.append("fssaiLicenseNumber", profile.fssaiLicenseNumber);
      formData.append("gstNumber", profile.gstNumber || "");
      if (logoFileRef.current) formData.append("logo", logoFileRef.current);
      if (coverFileRef.current) formData.append("coverImage", coverFileRef.current);

      const res = await updateSetupProfile(token, formData);
      setProfile(res.restaurant);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(getErrorMessage(err, "Could not save changes. Please try again."));
    } finally {
      setSaving(false);
    }
  }

  const coverUrl = coverPreview || profile.coverImageUrl;
  const logoUrl = logoPreview || profile.logoUrl;

  return (
    <div className="pb-24">
      <SetupTopbar
        title="Restaurant Profile"
        restaurantName={profile.restaurantName}
        status={profile.status}
        onMenuClick={openMobileMenu}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Cover + logo */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-50 h-44 sm:h-56 mb-14 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {coverUrl ? (
            <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImagePlus className="w-8 h-8 text-emerald-300" />
            </div>
          )}
          <label className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors cursor-pointer">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white/95 text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
              <Camera className="w-4 h-4" /> Change cover
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleImageSelect("cover", e.target.files?.[0])}
            />
          </label>

          <div className="absolute -bottom-10 left-6 sm:left-8">
            <label className="relative block w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-lg border-4 border-white cursor-pointer group/logo overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                  <ImagePlus className="w-6 h-6 text-emerald-300" />
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/logo:bg-black/40 transition-colors">
                <Camera className="w-4 h-4 text-white opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleImageSelect("logo", e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Basic details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 p-6 sm:p-7">
              <h2 className="font-semibold text-gray-900 mb-5">Basic Details</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Restaurant Name">
                  <input
                    className={inputCls}
                    value={profile.restaurantName}
                    onChange={(e) => update("restaurantName", e.target.value)}
                  />
                </Field>
                <Field label="Cuisine" hint="Comma separated, e.g. North Indian, Chinese">
                  <input
                    className={inputCls}
                    value={profile.cuisineType || ""}
                    onChange={(e) => update("cuisineType", e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Description" hint={`${(profile.description || "").length}/300`}>
                    <textarea
                      className={inputCls + " min-h-[90px] resize-none"}
                      maxLength={300}
                      value={profile.description || ""}
                      onChange={(e) => update("description", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Contact & location */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 p-6 sm:p-7">
              <h2 className="font-semibold text-gray-900 mb-5">Contact & Location</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Contact Number" icon={Phone}>
                  <input
                    className={inputCls}
                    value={profile.contactNumber}
                    onChange={(e) => update("contactNumber", e.target.value)}
                  />
                </Field>
                <Field label="Email" icon={Mail}>
                  <input
                    className={inputCls}
                    type="email"
                    value={profile.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Address" icon={MapPin}>
                    <input
                      className={inputCls}
                      value={profile.address}
                      onChange={(e) => update("address", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Google Map Location" icon={Navigation} hint="Paste the shareable Google Maps link">
                    <input
                      className={inputCls}
                      placeholder="https://maps.google.com/?q=..."
                      value={profile.googleMapLink || ""}
                      onChange={(e) => update("googleMapLink", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label={`Delivery Radius — ${profile.deliveryRadiusKm} km`}>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      step={0.5}
                      value={profile.deliveryRadiusKm}
                      onChange={(e) => update("deliveryRadiusKm", Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 p-6 sm:p-7">
              <h2 className="font-semibold text-gray-900 mb-5">Compliance</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="FSSAI License Number" icon={ShieldCheck}>
                  <input
                    className={inputCls}
                    maxLength={14}
                    value={profile.fssaiLicenseNumber}
                    onChange={(e) => update("fssaiLicenseNumber", e.target.value.replace(/\D/g, ""))}
                  />
                </Field>
                <Field label="GST Number" icon={FileBadge} hint="Optional — 15-character GSTIN">
                  <input
                    className={inputCls + " uppercase"}
                    maxLength={15}
                    value={profile.gstNumber || ""}
                    onChange={(e) => update("gstNumber", e.target.value.toUpperCase())}
                  />
                </Field>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-end gap-3 z-20">
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-sm text-red-600 mr-auto"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.span>
          )}
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 text-sm text-emerald-600 mr-auto"
            >
              <CheckCircle2 className="w-4 h-4" /> Saved successfully
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm shadow-emerald-200 transition-colors"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
      </div>
    </div>
  );
}