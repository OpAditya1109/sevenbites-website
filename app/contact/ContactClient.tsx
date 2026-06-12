"use client";

import { motion } from "framer-motion";
import { Mail, Clock, MessageCircle, Zap, Building2 } from "lucide-react";
import FAQSection from "@/components/FAQSection";

const contactFaqs = [
  {
    question: "How quickly does support respond?",
    answer: "Our average first response time is under 2 hours for most inquiries. Urgent order issues are typically resolved within 30 minutes.",
  },
  {
    question: "What if my order arrives late or wrong?",
    answer: "Email us at support@sevenbites.com with your order ID and we'll resolve it immediately with a refund or replacement, no questions asked.",
  },
  {
    question: "How do I partner with SevenBites as a restaurant?",
    answer: "Reach out to us at business@sevenbites.com with your restaurant details and our partnership team will get back to you within 24 hours.",
  },
  {
    question: "Can I cancel or modify my order after placing it?",
    answer: "Orders can be cancelled or modified within 5 minutes of placing them. After that, please contact our support team and we'll do our best to help.",
  },
];

const contactCards = [
  {
    icon: Mail,
    label: "Customer Support",
    value: "support@sevenbites.com",
    href: "mailto:support@sevenbites.com",
    desc: "For order issues, refunds, and general queries",
    color: "#FFF0EC",
    iconColor: "#FF6B35",
  },
  {
    icon: Building2,
    label: "Business & Partnerships",
    value: "business@sevenbites.com",
    href: "mailto:business@sevenbites.com",
    desc: "Restaurant onboarding, brand partnerships, investor relations",
    color: "#F0F4FF",
    iconColor: "#4361EE",
  },
];

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] to-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E23744]/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#E23744] mb-4">
              Reach Out
            </span>
            <h1 className="font-poppins font-bold text-5xl sm:text-6xl text-gray-900 mb-5">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
              We'd love to hear from you. Whether it's a question, feedback, or a partnership opportunity — we're here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.label}
                  href={card.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="block bg-white rounded-2xl p-6 border border-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{card.label}</p>
                  <p className="font-semibold text-[#E23744] text-base mb-2 group-hover:underline">{card.value}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </motion.a>
              );
            })}
          </div>

          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
          >
            {[
              { icon: Clock, label: "Support Hours", value: "24 / 7", sub: "Always available" },
              { icon: Zap, label: "Avg Response", value: "< 2 hrs", sub: "First reply time" },
              { icon: MessageCircle, label: "Resolution Rate", value: "98.5%", sub: "Issues resolved" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-[#F8FAFC] rounded-2xl p-5 text-center">
                  <Icon className="w-5 h-5 text-[#E23744] mx-auto mb-2" />
                  <p className="font-poppins font-bold text-2xl text-gray-900">{stat.value}</p>
                  <p className="text-xs font-semibold text-gray-600 mt-0.5">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                </div>
              );
            })}
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-6">Common Questions</h2>
            <FAQSection items={contactFaqs} compact />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
