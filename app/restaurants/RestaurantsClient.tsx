"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants, categories } from "@/lib/data";

const filters = ["All", "Rating 4.5+", "Fast Delivery", "Offers", "Pure Veg"];
const sortOptions = ["Relevance", "Rating", "Delivery Time", "Cost: Low to High"];

export default function RestaurantsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("Relevance");

  const filtered = restaurants.filter((r) => {
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeFilter === "Rating 4.5+" && r.rating < 4.5) return false;
    if (activeFilter === "Offers" && !r.offer) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#E23744] mb-2 block">
              Discover
            </span>
            <h1 className="font-poppins font-bold text-4xl text-gray-900 mb-6">
              All Restaurants
            </h1>

            {/* Search */}
            <div className="relative max-w-xl mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants or cuisines..."
                className="w-full pl-11 pr-10 py-3.5 bg-[#F8FAFC] border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#E23744] focus:ring-2 focus:ring-red-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 mr-1" />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                    activeFilter === f
                      ? "bg-[#E23744] text-white border-[#E23744] shadow-md shadow-red-200"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#E23744] hover:text-[#E23744]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Sort & Count row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filtered.length}</span> restaurants
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="text-sm text-gray-700 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#E23744] bg-white"
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <RestaurantCard key={r.id} {...r} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
              className="mt-4 gradient-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Browse by Category */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">Browse by Cuisine</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c.name}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-[#E23744] hover:text-[#E23744] transition-all"
              >
                <span>{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
