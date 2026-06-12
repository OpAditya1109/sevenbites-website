"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Clock, Tag } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  offer: string;
  image: string;
  priceForTwo: string;
  promoted?: boolean;
  index?: number;
}

export default function RestaurantCard({
  name,
  cuisine,
  rating,
  deliveryTime,
  offer,
  image,
  priceForTwo,
  promoted = false,
  index = 0,
}: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {promoted && (
            <span className="bg-white text-[#E23744] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              PROMOTED
            </span>
          )}
        </div>

        {/* Offer Badge */}
        {offer && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <Tag className="w-3 h-3 text-[#E23744]" />
              <span className="text-xs font-semibold text-gray-800 truncate">{offer}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-poppins font-semibold text-gray-900 text-base leading-tight line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-lg px-2 py-0.5 ml-2 shrink-0">
            <Star className="w-3 h-3 fill-green-600 text-green-600" />
            <span className="text-xs font-bold text-green-700">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3 line-clamp-1">{cuisine}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{deliveryTime}</span>
          </div>
          <span className="text-xs text-gray-400">{priceForTwo}</span>
        </div>
      </div>
    </motion.div>
  );
}
