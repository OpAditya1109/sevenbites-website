"use client";

import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  emoji: string;
  count: string;
  color?: string;
  accent?: string;
  index?: number;
}

export default function CategoryCard({ name, emoji, count, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ x: 6 }}
      className="group flex items-center gap-4 py-5 border-b border-white/10 cursor-pointer"
    >
      <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
        {emoji}
      </span>
      <span className="font-display text-xl sm:text-2xl text-[#FBF5EC] group-hover:text-[#F2A93B] transition-colors">
        {name}
      </span>
      <span className="dotted-leader" />
      <span className="font-mono-label text-[11px] text-[#a4937f] shrink-0">
        {count}
      </span>
    </motion.div>
  );
}