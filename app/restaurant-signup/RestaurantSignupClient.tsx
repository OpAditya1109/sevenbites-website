"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Upload,
  X,
  FileText,
  Loader2,
  Store,
  ImageIcon,
  ShieldCheck,
} from "lucide-react";
import { registerRestaurant, RESTAURANT_TOKEN_KEY } from "@/lib/restaurantApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PINCODE_REGEX = /^\d{6}$/;
const FSSAI_REGEX = /^\d{14}$/;
const BANK_ACC_REGEX = /^\d{9,18}$/;
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const MAX_FILE_MB = 5;
const IMAGE_TYPES = ["image/jpeg", "image/png"];
const PDF_TYPE = "application/pdf";

type TextFields = {
  restaurantName: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  cuisineType: string;
  description: string;
  password: string;
  confirmPassword: string;
  fssaiLicenseNumber: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
};

const initialFields: TextFields = {
  restaurantName: "",
  ownerName: "",
  contactNumber: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
  cuisineType: "",
  description: "",
  password: "",
  confirmPassword: "",
  fssaiLicenseNumber: "",
  bankAccountHolderName: "",
  bankAccountNumber: "",
  confirmAccountNumber: "",
  ifscCode: "",
};

type Errors = Partial<Record<keyof TextFields | "restaurantImages" | "menuImages" | "fssaiCertificate" | "chequeOrPassbook" | "submit", string>>;

const STEPS = [
  { label: "Restaurant Details", icon: Store },
  { label: "Menu & Images", icon: ImageIcon },
  { label: "Documents & Bank", icon: ShieldCheck },
];

function validateFileList(
  files: File[],
  { min, max, allowedTypes }: { min: number; max: number; allowedTypes: string[] }
): string | null {
  if (files.length < min) return `Upload at least ${min} file${min > 1 ? "s" : ""}`;
  if (files.length > max) return `Upload no more than ${max} files`;
  for (const f of files) {
    if (!allowedTypes.includes(f.type)) return `${f.name}: unsupported file type`;
    if (f.size > MAX_FILE_MB * 1024 * 1024) return `${f.name}: must be under ${MAX_FILE_MB}MB`;
  }
  return null;
}

function validateSingleFile(
  file: File | null,
  { required, allowedTypes }: { required: boolean; allowedTypes: string[] }
): string | null {
  if (!file) return required ? "This document is required" : null;
  if (!allowedTypes.includes(file.type)) return "Unsupported file type";
  if (file.size > MAX_FILE_MB * 1024 * 1024) return `File must be under ${MAX_FILE_MB}MB`;
  return null;
}

function Field({
  label,
  error,
  children,
  optional,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {optional && <span className="text-xs font-normal text-gray-400">(optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#E23744] mt-1.5">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#E23744] focus:ring-2 focus:ring-red-100 transition-all";
const inputErrorClass = "border-red-300 focus:border-red-400 focus:ring-red-100";

export default function RestaurantSignupClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<TextFields>(initialFields);
  const [restaurantImages, setRestaurantImages] = useState<File[]>([]);
  const [menuImages, setMenuImages] = useState<File[]>([]);
  const [fssaiCertificate, setFssaiCertificate] = useState<File | null>(null);
  const [gstCertificate, setGstCertificate] = useState<File | null>(null);
  const [chequeOrPassbook, setChequeOrPassbook] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const restaurantImagesRef = useRef<HTMLInputElement>(null);
  const menuImagesRef = useRef<HTMLInputElement>(null);
  const fssaiRef = useRef<HTMLInputElement>(null);
  const gstRef = useRef<HTMLInputElement>(null);
  const chequeRef = useRef<HTMLInputElement>(null);

  const update = (key: keyof TextFields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validateStep1(): Errors {
    const e: Errors = {};
    if (!fields.restaurantName.trim()) e.restaurantName = "Restaurant name is required";
    if (!fields.ownerName.trim()) e.ownerName = "Owner name is required";
    if (!PHONE_REGEX.test(fields.contactNumber)) e.contactNumber = "Enter a valid 10-digit number starting 6-9";
    if (!EMAIL_REGEX.test(fields.email)) e.email = "Enter a valid email address";
    if (!fields.address.trim()) e.address = "Address is required";
    if (!fields.city.trim()) e.city = "City is required";
    if (!PINCODE_REGEX.test(fields.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    if (fields.description.length > 300) e.description = "Max 300 characters";
    if (fields.password.length < 8) e.password = "Password must be at least 8 characters";
    if (fields.confirmPassword !== fields.password) e.confirmPassword = "Passwords do not match";
    return e;
  }

  function validateStep2(): Errors {
    const e: Errors = {};
    const restErr = validateFileList(restaurantImages, { min: 1, max: 5, allowedTypes: IMAGE_TYPES });
    if (restErr) e.restaurantImages = restErr;
    const menuErr = validateFileList(menuImages, { min: 1, max: 10, allowedTypes: IMAGE_TYPES });
    if (menuErr) e.menuImages = menuErr;
    return e;
  }

  function validateStep3(): Errors {
    const e: Errors = {};
    const fssaiFileErr = validateSingleFile(fssaiCertificate, { required: true, allowedTypes: [PDF_TYPE] });
    if (fssaiFileErr) e.fssaiCertificate = fssaiFileErr;
    if (!FSSAI_REGEX.test(fields.fssaiLicenseNumber)) e.fssaiLicenseNumber = "FSSAI number must be exactly 14 digits";
    if (!fields.bankAccountHolderName.trim()) e.bankAccountHolderName = "Account holder name is required";
    if (!BANK_ACC_REGEX.test(fields.bankAccountNumber)) e.bankAccountNumber = "Enter a valid account number (9-18 digits)";
    if (fields.confirmAccountNumber !== fields.bankAccountNumber) e.confirmAccountNumber = "Account numbers do not match";
    if (!IFSC_REGEX.test(fields.ifscCode.toUpperCase())) e.ifscCode = "Enter a valid IFSC code (e.g. HDFC0001234)";
    const chequeErr = validateSingleFile(chequeOrPassbook, { required: true, allowedTypes: [...IMAGE_TYPES, PDF_TYPE] });
    if (chequeErr) e.chequeOrPassbook = chequeErr;
    return e;
  }

  function goNext() {
    const stepErrors = step === 1 ? validateStep1() : validateStep2();
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pickFiles(fileList: FileList | null, setter: (f: File[]) => void, current: File[], max: number) {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    setter([...current, ...incoming].slice(0, max));
  }

  async function handleSubmit() {
    const allErrors = { ...validateStep1(), ...validateStep2(), ...validateStep3() };
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) {
      // Jump back to the first step that has a problem
      if (validateStep1 && Object.keys(validateStep1()).length > 0) setStep(1);
      else if (Object.keys(validateStep2()).length > 0) setStep(2);
      else setStep(3);
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("restaurantName", fields.restaurantName.trim());
      fd.append("ownerName", fields.ownerName.trim());
      fd.append("contactNumber", fields.contactNumber);
      fd.append("email", fields.email.trim());
      fd.append("address", fields.address.trim());
      fd.append("city", fields.city.trim());
      fd.append("pincode", fields.pincode);
      fd.append("cuisineType", fields.cuisineType.trim());
      fd.append("description", fields.description.trim());
      fd.append("password", fields.password);
      fd.append("fssaiLicenseNumber", fields.fssaiLicenseNumber);
      fd.append("bankAccountHolderName", fields.bankAccountHolderName.trim());
      fd.append("bankAccountNumber", fields.bankAccountNumber);
      fd.append("confirmAccountNumber", fields.confirmAccountNumber);
      fd.append("ifscCode", fields.ifscCode.toUpperCase());

      restaurantImages.forEach((f) => fd.append("restaurantImages", f));
      menuImages.forEach((f) => fd.append("menuImages", f));
      if (fssaiCertificate) fd.append("fssaiCertificate", fssaiCertificate);
      if (gstCertificate) fd.append("gstCertificate", gstCertificate);
      if (chequeOrPassbook) fd.append("chequeOrPassbook", chequeOrPassbook);

      const res = await registerRestaurant(fd);
      localStorage.setItem(RESTAURANT_TOKEN_KEY, res.token);
      router.push("/restaurant-dashboard");
    } catch (err: any) {
      if (err?.errors) {
        setErrors(err.errors);
        setStep(1);
      } else {
        setErrors({ submit: err?.message || "Something went wrong. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E23744] mb-2 block">
          Partner With Us
        </span>
        <h1 className="font-poppins font-bold text-4xl text-gray-900 mb-2">List Your Restaurant</h1>
        <p className="text-gray-500 text-sm mb-8">
          Join SevenBites and reach thousands of hungry customers. Takes about 10 minutes.
        </p>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => {
            const idx = i + 1;
            const Icon = s.icon;
            const active = step === idx;
            const done = step > idx;
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      done
                        ? "bg-[#E23744] border-[#E23744] text-white"
                        : active
                        ? "border-[#E23744] text-[#E23744] bg-white"
                        : "border-gray-200 text-gray-300 bg-white"
                    }`}
                  >
                    {done ? <Check className="w-5 h-5" /> : <Icon className="w-4.5 h-4.5" />}
                  </div>
                  <span
                    className={`text-xs font-medium mt-2 text-center whitespace-nowrap ${
                      active || done ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length && (
                  <div className={`h-0.5 flex-1 mx-2 rounded ${done ? "bg-[#E23744]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Restaurant Name" error={errors.restaurantName}>
                    <input
                      className={`${inputClass} ${errors.restaurantName ? inputErrorClass : ""}`}
                      value={fields.restaurantName}
                      onChange={(e) => update("restaurantName", e.target.value)}
                      placeholder="e.g. Spice Route Kitchen"
                    />
                  </Field>
                  <Field label="Owner Name" error={errors.ownerName}>
                    <input
                      className={`${inputClass} ${errors.ownerName ? inputErrorClass : ""}`}
                      value={fields.ownerName}
                      onChange={(e) => update("ownerName", e.target.value)}
                      placeholder="Full name"
                    />
                  </Field>
                  <Field label="Contact Number" error={errors.contactNumber}>
                    <input
                      className={`${inputClass} ${errors.contactNumber ? inputErrorClass : ""}`}
                      value={fields.contactNumber}
                      onChange={(e) => update("contactNumber", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="9876543210"
                      inputMode="numeric"
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
                      value={fields.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="owner@restaurant.com"
                      type="email"
                    />
                  </Field>
                </div>

                <Field label="Address" error={errors.address}>
                  <input
                    className={`${inputClass} ${errors.address ? inputErrorClass : ""}`}
                    value={fields.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Shop / street / area"
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="City" error={errors.city}>
                    <input
                      className={`${inputClass} ${errors.city ? inputErrorClass : ""}`}
                      value={fields.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="e.g. Pune"
                    />
                  </Field>
                  <Field label="Pincode" error={errors.pincode}>
                    <input
                      className={`${inputClass} ${errors.pincode ? inputErrorClass : ""}`}
                      value={fields.pincode}
                      onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="411001"
                      inputMode="numeric"
                    />
                  </Field>
                  <Field label="Cuisine Type" optional>
                    <input
                      className={inputClass}
                      value={fields.cuisineType}
                      onChange={(e) => update("cuisineType", e.target.value)}
                      placeholder="e.g. North Indian, Chinese"
                    />
                  </Field>
                </div>

                <Field label="Description" optional error={errors.description}>
                  <textarea
                    className={`${inputClass} resize-none ${errors.description ? inputErrorClass : ""}`}
                    rows={3}
                    maxLength={300}
                    value={fields.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Tell customers what makes your restaurant special"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{fields.description.length}/300</p>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-gray-100">
                  <Field label="Create Password" error={errors.password}>
                    <input
                      className={`${inputClass} mt-3 ${errors.password ? inputErrorClass : ""}`}
                      value={fields.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="At least 8 characters"
                      type="password"
                    />
                  </Field>
                  <Field label="Confirm Password" error={errors.confirmPassword}>
                    <input
                      className={`${inputClass} mt-3 ${errors.confirmPassword ? inputErrorClass : ""}`}
                      value={fields.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      placeholder="Re-enter password"
                      type="password"
                    />
                  </Field>
                </div>
                <p className="text-xs text-gray-400 -mt-3">You'll use this to log in to your restaurant dashboard.</p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <FileUploadBlock
                  title="Restaurant Images"
                  hint="1–5 photos · JPG or PNG · max 5MB each"
                  error={errors.restaurantImages}
                  files={restaurantImages}
                  onPick={() => restaurantImagesRef.current?.click()}
                  onRemove={(i) => setRestaurantImages((f) => f.filter((_, idx) => idx !== i))}
                  inputRef={restaurantImagesRef}
                  onFiles={(fl) => pickFiles(fl, setRestaurantImages, restaurantImages, 5)}
                />
                <FileUploadBlock
                  title="Menu Images"
                  hint="1–10 photos · JPG or PNG · max 5MB each"
                  error={errors.menuImages}
                  files={menuImages}
                  onPick={() => menuImagesRef.current?.click()}
                  onRemove={(i) => setMenuImages((f) => f.filter((_, idx) => idx !== i))}
                  inputRef={menuImagesRef}
                  onFiles={(fl) => pickFiles(fl, setMenuImages, menuImages, 10)}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <h3 className="font-poppins font-semibold text-lg text-gray-900">Documents</h3>
                <SingleFileBlock
                  title="FSSAI Certificate (PDF)"
                  required
                  error={errors.fssaiCertificate}
                  file={fssaiCertificate}
                  onPick={() => fssaiRef.current?.click()}
                  onRemove={() => setFssaiCertificate(null)}
                  inputRef={fssaiRef}
                  accept=".pdf"
                  onFile={(f) => setFssaiCertificate(f)}
                />
                <Field label="FSSAI License Number" error={errors.fssaiLicenseNumber}>
                  <input
                    className={`${inputClass} ${errors.fssaiLicenseNumber ? inputErrorClass : ""}`}
                    value={fields.fssaiLicenseNumber}
                    onChange={(e) => update("fssaiLicenseNumber", e.target.value.replace(/\D/g, "").slice(0, 14))}
                    placeholder="14-digit number"
                    inputMode="numeric"
                  />
                </Field>
                <SingleFileBlock
                  title="GST Certificate (PDF)"
                  optional
                  file={gstCertificate}
                  onPick={() => gstRef.current?.click()}
                  onRemove={() => setGstCertificate(null)}
                  inputRef={gstRef}
                  accept=".pdf"
                  onFile={(f) => setGstCertificate(f)}
                />

                <h3 className="font-poppins font-semibold text-lg text-gray-900 pt-2 border-t border-gray-100">
                  Bank Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Account Holder Name" error={errors.bankAccountHolderName}>
                    <input
                      className={`${inputClass} ${errors.bankAccountHolderName ? inputErrorClass : ""}`}
                      value={fields.bankAccountHolderName}
                      onChange={(e) => update("bankAccountHolderName", e.target.value)}
                      placeholder="As per bank records"
                    />
                  </Field>
                  <Field label="IFSC Code" error={errors.ifscCode}>
                    <input
                      className={`${inputClass} ${errors.ifscCode ? inputErrorClass : ""}`}
                      value={fields.ifscCode}
                      onChange={(e) => update("ifscCode", e.target.value.toUpperCase().slice(0, 11))}
                      placeholder="HDFC0001234"
                    />
                  </Field>
                  <Field label="Account Number" error={errors.bankAccountNumber}>
                    <input
                      className={`${inputClass} ${errors.bankAccountNumber ? inputErrorClass : ""}`}
                      value={fields.bankAccountNumber}
                      onChange={(e) => update("bankAccountNumber", e.target.value.replace(/\D/g, "").slice(0, 18))}
                      placeholder="Account number"
                      inputMode="numeric"
                    />
                  </Field>
                  <Field label="Confirm Account Number" error={errors.confirmAccountNumber}>
                    <input
                      className={`${inputClass} ${errors.confirmAccountNumber ? inputErrorClass : ""}`}
                      value={fields.confirmAccountNumber}
                      onChange={(e) => update("confirmAccountNumber", e.target.value.replace(/\D/g, "").slice(0, 18))}
                      placeholder="Re-enter account number"
                      inputMode="numeric"
                    />
                  </Field>
                </div>
                <SingleFileBlock
                  title="Cancelled Cheque / Passbook"
                  required
                  error={errors.chequeOrPassbook}
                  file={chequeOrPassbook}
                  onPick={() => chequeRef.current?.click()}
                  onRemove={() => setChequeOrPassbook(null)}
                  inputRef={chequeRef}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onFile={(f) => setChequeOrPassbook(f)}
                />

                {errors.submit && (
                  <p className="text-sm text-[#E23744] bg-red-50 rounded-xl px-4 py-3">{errors.submit}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button
                onClick={goBack}
                disabled={submitting}
                className="text-sm font-semibold text-gray-500 hover:text-gray-800 px-5 py-3 transition-colors"
              >
                Back
              </button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              <button
                onClick={goNext}
                className="gradient-primary text-white text-sm font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="gradient-primary text-white text-sm font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FileUploadBlock({
  title,
  hint,
  error,
  files,
  onPick,
  onRemove,
  inputRef,
  onFiles,
}: {
  title: string;
  hint: string;
  error?: string;
  files: File[];
  onPick: () => void;
  onRemove: (i: number) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFiles: (fl: FileList | null) => void;
}) {
  return (
    <div>
      <h3 className="font-poppins font-semibold text-base text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-400 mb-3">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="hidden"
        onChange={(e) => {
          onFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div className="flex flex-wrap gap-3">
        {files.map((f, i) => (
          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group">
            <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(i)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={onPick}
          className={`w-20 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-gray-400 hover:border-[#E23744] hover:text-[#E23744] transition-colors ${
            error ? "border-red-300" : "border-gray-200"
          }`}
        >
          <Upload className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Add</span>
        </button>
      </div>
      {error && <p className="text-xs text-[#E23744] mt-2">{error}</p>}
    </div>
  );
}

function SingleFileBlock({
  title,
  required,
  optional,
  error,
  file,
  onPick,
  onRemove,
  inputRef,
  accept,
  onFile,
}: {
  title: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  file: File | null;
  onPick: () => void;
  onRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  accept: string;
  onFile: (f: File | null) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
        {title}
        {optional && <span className="text-xs font-normal text-gray-400">(optional)</span>}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          onFile(e.target.files?.[0] || null);
          e.target.value = "";
        }}
      />
      {file ? (
        <div className="flex items-center gap-3 bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3">
          <FileText className="w-4 h-4 text-[#E23744] flex-shrink-0" />
          <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
          <button onClick={onRemove} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={onPick}
          className={`w-full flex items-center gap-2 justify-center border-2 border-dashed rounded-xl px-4 py-3 text-sm text-gray-400 hover:border-[#E23744] hover:text-[#E23744] transition-colors ${
            error ? "border-red-300" : "border-gray-200"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload file{required ? "" : " (optional)"}
        </button>
      )}
      {error && <p className="text-xs text-[#E23744] mt-1.5">{error}</p>}
    </div>
  );
}