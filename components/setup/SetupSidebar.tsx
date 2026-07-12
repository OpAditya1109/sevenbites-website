"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Store,
  Clock,
  LayoutGrid,
  UtensilsCrossed,
  Leaf,
  X,
} from "lucide-react";

const navItems = [
  { href: "/restaurant-setup/profile", label: "Restaurant Profile", icon: Store },
  { href: "/restaurant-setup/timings", label: "Restaurant Timings", icon: Clock },
  { href: "/restaurant-setup/categories", label: "Categories", icon: LayoutGrid },
  { href: "/restaurant-setup/menu", label: "Menu Management", icon: UtensilsCrossed },
];

export default function SetupSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const content = (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-emerald-900/10 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
          <Leaf className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-[15px] text-white tracking-tight">
          Seven<span className="text-emerald-400">Bites</span>
        </span>
        <button onClick={onClose} className="ml-auto lg:hidden text-emerald-200/70 hover:text-white p-1">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-200/40 mb-2">
          Restaurant Setup
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-emerald-500/15 text-white"
                  : "text-emerald-100/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="setup-sidebar-active"
                  className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-emerald-400"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-emerald-900/10 flex-shrink-0">
        <div className="rounded-xl bg-white/5 px-4 py-3">
          <p className="text-xs text-emerald-100/50 leading-relaxed">
            Everything you configure here goes live in the SevenBites Customer App automatically.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-[#0B3B2E] flex-col z-40">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-64 bg-[#0B3B2E] h-full flex flex-col"
          >
            {content}
          </motion.aside>
        </div>
      )}
    </>
  );
}   