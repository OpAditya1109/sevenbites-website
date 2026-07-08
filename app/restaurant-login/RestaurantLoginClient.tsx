"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Store } from "lucide-react";
import Link from "next/link";
import { loginRestaurant, RESTAURANT_TOKEN_KEY } from "@/lib/restaurantApi";

export default function RestaurantLoginClient() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Please enter your email/phone and password");
      return;
    }

    setLoading(true);
    try {
      const res = await loginRestaurant(identifier.trim(), password);
      localStorage.setItem(RESTAURANT_TOKEN_KEY, res.token);
      router.push("/restaurant-dashboard");
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20 pb-20 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl border border-gray-100 card-shadow p-8"
      >
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
          <Store className="w-6 h-6 text-white" />
        </div>
        <h1 className="font-poppins font-bold text-2xl text-gray-900 mb-1">Restaurant Login</h1>
        <p className="text-sm text-gray-500 mb-6">Access your restaurant partner dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email or Phone Number</label>
            <input
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#E23744] focus:ring-2 focus:ring-red-100 transition-all"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="owner@restaurant.com or 9876543210"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#E23744] focus:ring-2 focus:ring-red-100 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-sm text-[#E23744] bg-red-50 rounded-xl px-4 py-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-white text-sm font-semibold py-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          New restaurant partner?{" "}
          <Link href="/restaurant-signup" className="font-semibold text-[#E23744] hover:underline">
            List your restaurant
          </Link>
        </p>
      </motion.div>
    </div>
  );
}