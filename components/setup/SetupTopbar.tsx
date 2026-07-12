"use client";

import { Menu, LogOut, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { RESTAURANT_TOKEN_KEY } from "@/lib/setupApi";

function StatusPill({ status }: { status?: "pending" | "approved" | "rejected" }) {
  if (!status) return null;
  const map = {
    approved: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Live" },
    pending: { icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending Review" },
    rejected: { icon: XCircle, cls: "bg-red-50 text-red-700 border-red-200", label: "Rejected" },
  } as const;
  const { icon: Icon, cls, label } = map[status];
  return (
    <span className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

export default function SetupTopbar({
  title,
  restaurantName,
  status,
  onMenuClick,
}: {
  title: string;
  restaurantName?: string;
  status?: "pending" | "approved" | "rejected";
  onMenuClick?: () => void;
}) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem(RESTAURANT_TOKEN_KEY);
    router.push("/restaurant-login");
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center gap-3 px-4 sm:px-6 lg:pl-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="min-w-0">
        <h1 className="font-semibold text-gray-900 text-[15px] sm:text-lg leading-tight truncate">{title}</h1>
        {restaurantName && (
          <p className="text-xs text-gray-400 truncate">{restaurantName}</p>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <StatusPill status={status} />
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
}