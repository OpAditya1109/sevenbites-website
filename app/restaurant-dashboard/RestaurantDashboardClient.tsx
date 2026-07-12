"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  LogOut,
  Loader2,
  ArrowRight,
} from "lucide-react";
import {
  fetchRestaurantProfile,
  RestaurantProfile,
  RESTAURANT_TOKEN_KEY,
} from "@/lib/restaurantApi";

function StatusBanner({
  status,
  onOpenSetup,
}: {
  status: RestaurantProfile["status"];
  onOpenSetup: () => void;
}) {
  if (status === "pending") {
    return (
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-8">
        <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900 text-sm">Application under review</p>
          <p className="text-amber-700 text-sm mt-0.5">
            Verification takes 2–3 business days. You'll be notified via WhatsApp/Email once approved.
          </p>
        </div>
      </div>
    );
  }
  if (status === "approved") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 mb-8">
        <div className="flex items-start gap-3 flex-1">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900 text-sm">You're approved!</p>
            <p className="text-green-700 text-sm mt-0.5">
              Your restaurant is live on SevenBites. Set up your profile, timings, and menu to start taking orders.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSetup}
          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors flex-shrink-0 whitespace-nowrap"
        >
          Go to Restaurant Setup <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 mb-8">
      <XCircle className="w-5 h-5 text-[#E23744] flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-red-900 text-sm">Application not approved</p>
        <p className="text-red-700 text-sm mt-0.5">
          Contact business@sevenbites.com for details on what needs correcting.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 sm:p-8 mb-6">
      <h2 className="font-poppins font-semibold text-lg text-gray-900 mb-5">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400 sm:w-52 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value || "—"}</span>
    </div>
  );
}

export default function RestaurantDashboardClient() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      router.push("/restaurant-login");
      return;
    }
    fetchRestaurantProfile(token)
      .then((res) => setRestaurant(res.restaurant))
      .catch((err) => {
        if (err?.status === 401) {
          localStorage.removeItem(RESTAURANT_TOKEN_KEY);
          router.push("/restaurant-login");
        } else {
          setError(err?.message || "Could not load your dashboard right now.");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem(RESTAURANT_TOKEN_KEY);
    router.push("/restaurant-login");
  }

  function handleOpenSetup() {
    router.push("/restaurant-setup/profile");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-20 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#E23744] animate-spin" />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-20 flex items-center justify-center px-4">
        <p className="text-gray-500 text-sm">{error || "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E23744] mb-2 block">
              Partner Dashboard
            </span>
            <h1 className="font-poppins font-bold text-3xl text-gray-900">{restaurant.restaurantName}</h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {restaurant.status === "approved" && (
              <button
                onClick={handleOpenSetup}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-full transition-colors"
              >
                Restaurant Setup
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-800 px-4 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <StatusBanner status={restaurant.status} onOpenSetup={handleOpenSetup} />
        </motion.div>

        <Section title="Restaurant Details">
          <Row label="Owner Name" value={restaurant.ownerName} />
          <Row label="Contact Number" value={restaurant.contactNumber} />
          <Row label="Email" value={restaurant.email} />
          <Row label="Address" value={restaurant.address} />
          <Row label="City" value={restaurant.city} />
          <Row label="Pincode" value={restaurant.pincode} />
          <Row label="Cuisine Type" value={restaurant.cuisineType} />
          <Row label="Description" value={restaurant.description} />
        </Section>

        <Section title="Restaurant Images">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {restaurant.restaurantImages.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square rounded-xl overflow-hidden border border-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Restaurant photo ${i + 1}`} className="w-full h-full object-cover" />
              </a>
            ))}
          </div>
        </Section>

        <Section title="Menu Images">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {restaurant.menuImages.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square rounded-xl overflow-hidden border border-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Menu photo ${i + 1}`} className="w-full h-full object-cover" />
              </a>
            ))}
          </div>
        </Section>

        <Section title="Documents & Bank Details">
          <Row label="FSSAI License Number" value={restaurant.fssaiLicenseNumber} />
          <div className="flex flex-col sm:flex-row sm:items-center py-2.5 border-b border-gray-50">
            <span className="text-sm text-gray-400 sm:w-52 flex-shrink-0">FSSAI Certificate</span>
            <a
              href={restaurant.fssaiCertificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#E23744] hover:underline flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> View document
            </a>
          </div>
          {restaurant.gstCertificateUrl && (
            <div className="flex flex-col sm:flex-row sm:items-center py-2.5 border-b border-gray-50">
              <span className="text-sm text-gray-400 sm:w-52 flex-shrink-0">GST Certificate</span>
              <a
                href={restaurant.gstCertificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#E23744] hover:underline flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> View document
              </a>
            </div>
          )}
          <Row label="Account Holder Name" value={restaurant.bankAccountHolderName} />
          <Row
            label="Account Number"
            value={
              restaurant.bankAccountNumber
                ? `••••••${restaurant.bankAccountNumber.slice(-4)}`
                : undefined
            }
          />
          <Row label="IFSC Code" value={restaurant.ifscCode} />
          <div className="flex flex-col sm:flex-row sm:items-center py-2.5">
            <span className="text-sm text-gray-400 sm:w-52 flex-shrink-0">Cancelled Cheque / Passbook</span>
            <a
              href={restaurant.chequeOrPassbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#E23744] hover:underline flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> View document
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}