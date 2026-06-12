"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  compact?: boolean;
}

export default function FAQSection({ items, compact = false }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className={`border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#E23744]/30 transition-colors ${
            openIndex === i ? "border-[#E23744]/30 shadow-sm" : ""
          }`}
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className={`font-semibold text-gray-800 pr-4 ${compact ? "text-sm" : "text-base"}`}>
              {faq.question}
            </span>
            <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              openIndex === i ? "bg-[#E23744] text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {openIndex === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="px-6 pb-5">
                  <p className={`text-gray-500 leading-relaxed ${compact ? "text-sm" : "text-sm"}`}>
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
