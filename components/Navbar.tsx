"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The Restaurant Setup Module dashboard has its own sidebar + top nav,
  // so the public marketing navbar shouldn't render there.
  if (pathname?.startsWith("/restaurant-setup")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-poppins font-bold text-xl text-gray-900">
            Seven<span className="text-[#E23744]">Bites</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive ? "text-[#E23744]" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#E23744] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/restaurant-login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Restaurant Login
          </Link>
          <Link
            href="/restaurant-signup"
            className="text-sm font-semibold text-[#E23744] border border-[#E23744]/30 px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
          >
            Partner With Us
          </Link>
          <Link
            href="/#order"
            className="gradient-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-red-200 transition-all duration-300 hover:scale-105"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-effect border-t border-gray-100 px-4 py-4 space-y-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:text-[#E23744] hover:bg-red-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Link
                href="/restaurant-login"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center text-sm font-medium text-gray-700 hover:text-[#E23744] px-5 py-3 rounded-xl border border-gray-200"
              >
                Restaurant Login
              </Link>
              <Link
                href="/restaurant-signup"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center text-sm font-semibold text-[#E23744] px-5 py-3 rounded-xl border border-[#E23744]/30"
              >
                Partner With Us
              </Link>
              <Link
                href="/#order"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center gradient-primary text-white text-sm font-semibold px-5 py-3 rounded-xl"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}