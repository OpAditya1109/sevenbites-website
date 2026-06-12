"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, ChevronRight, ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-[#FBF5EC]">
      {/* Ambient color */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-[#E23744]/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-[#F2A93B]/[0.10] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 font-mono-label text-[11px] text-[#8a7a68] mb-8"
            >
              <span className="w-1.5 h-1.5 bg-[#3F6B4F] rounded-full animate-pulse" />
              Order No. 07294 — Pune, Maharashtra
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-semibold text-[2.75rem] sm:text-6xl lg:text-[4.25rem] leading-[1.08] text-[#2A2220] mb-6"
            >
              Hungry?
              <br />
              <span className="italic text-[#E23744]">Good timing.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#6b5d4f] mb-10 max-w-md leading-relaxed"
            >
              Thousands of restaurants, one tap away. Order in seconds, track every
              step live, and have it at your door before the craving wins.
            </motion.p>

            {/* Search ticket */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(42,34,32,0.15)] border border-[#EDE3D3] p-2 flex items-center gap-2 max-w-lg"
            >
              <div className="flex items-center gap-2 px-3 py-2 border-r border-[#EDE3D3]">
                <MapPin className="w-4 h-4 text-[#E23744]" />
                <span className="font-mono-label text-[10px] text-[#6b5d4f] whitespace-nowrap">
                  Pune
                </span>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search restaurants, cuisines, dishes..."
                className="flex-1 text-sm text-[#2A2220] placeholder-[#b3a695] outline-none bg-transparent py-2 px-2"
              />
              <button className="bg-[#E23744] text-white rounded-xl px-4 py-2.5 flex items-center gap-1.5 hover:bg-[#c92e3a] transition-colors shrink-0 text-sm font-semibold">
                <Search className="w-4 h-4" />
                Search
              </button>
            </motion.div>

            {/* Trending */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 flex-wrap mt-5 font-mono-label text-[10px] text-[#a4937f]"
            >
              <span className="text-[#2A2220]">Trending</span>
              {["Biryani", "Pizza", "Burger", "Chinese"].map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {i > 0 && <span className="opacity-50">·</span>}
                  <button className="hover:text-[#E23744] transition-colors">{item}</button>
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 mt-10"
            >
              <Link
                href="/#order"
                className="bg-[#E23744] text-white font-semibold px-7 py-3.5 rounded-2xl hover:shadow-xl hover:shadow-[#E23744]/20 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Order Now
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/restaurants"
                className="font-mono-label text-[11px] text-[#2A2220] flex items-center gap-1.5 hover:text-[#E23744] transition-colors"
              >
                View the menu board
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Right: receipt stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative h-[460px]"
          >
            {/* Food image medallion */}
            <div className="absolute top-0 right-4 w-64 h-64 rounded-full overflow-hidden border-[10px] border-white shadow-2xl rotate-3">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80')",
                }}
              />
            </div>

            {/* Rating ticket (behind, peeking) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-44 right-0 bg-white rounded-2xl shadow-xl px-5 py-4 rotate-6 z-10 w-44"
            >
              <div className="flex items-center gap-2 font-display text-sm font-semibold text-[#2A2220]">
                <Star className="w-4 h-4 fill-[#F2A93B] text-[#F2A93B]" />
                4.8 / 5.0
              </div>
              <p className="mt-1 font-mono-label text-[10px] text-[#a4937f]">
                2,340 reviews today
              </p>
            </motion.div>

            {/* Main order ticket */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 right-12 bg-white rounded-t-2xl zigzag-bottom shadow-2xl shadow-black/10 p-6 z-20 -rotate-2"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-base text-[#2A2220]">
                  SevenBites
                </span>
                <span className="font-mono-label text-[11px] text-[#E23744]">#4821</span>
              </div>
              <div className="perforation mb-4" />
              <div className="space-y-2 text-sm text-[#6b5d4f]">
                <div className="flex justify-between">
                  <span>1x Margherita Pizza</span>
                  <span className="font-mono-label text-[11px]">₹399</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Garlic Bread</span>
                  <span className="font-mono-label text-[11px]">₹149</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Cold Coffee</span>
                  <span className="font-mono-label text-[11px]">₹99</span>
                </div>
              </div>
              <div className="perforation my-4" />
              <div className="flex items-center justify-between font-mono-label text-[11px]">
                <span className="flex items-center gap-1.5 text-[#3F6B4F]">
                  <span className="w-2 h-2 bg-[#3F6B4F] rounded-full animate-pulse" />
                  On the way
                </span>
                <span className="text-[#2A2220]">ETA 12 min</span>
              </div>
            </motion.div>

            {/* Floating orders-today chip */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute top-4 left-0 bg-[#2A2220] text-white rounded-2xl shadow-xl px-4 py-3 z-30"
            >
              <p className="font-mono-label text-[10px] text-[#F2A93B]">Orders today</p>
              <p className="font-display text-base font-semibold mt-0.5">12,543 🔥</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}