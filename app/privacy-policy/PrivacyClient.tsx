"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Cookie, Database, Users, Clock, Mail } from "lucide-react";

const sections = [
  {
    icon: Shield,
    id: "introduction",
    title: "Introduction",
    content: `SevenBites ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our food discovery and delivery platform. By accessing or using SevenBites, you agree to the terms described in this policy. We encourage you to read this document carefully and contact us if you have any questions.`,
  },
  {
    icon: Database,
    id: "information-we-collect",
    title: "Information We Collect",
    content: `We collect information that you provide directly to us, including your name, email address, phone number, and delivery address when you create an account or place an order. We also collect device information (IP address, browser type, operating system), usage data (pages viewed, features used, time spent), and location data (with your permission) to improve delivery accuracy. Payment information is processed securely by our payment partners and we do not store full card details on our servers.`,
  },
  {
    icon: Eye,
    id: "how-we-use",
    title: "How We Use Information",
    content: `We use collected information to process and fulfil your orders, communicate order status and updates, personalise your food recommendations, improve our platform and services, send promotional offers and newsletters (with your consent), conduct analytics to understand usage patterns, comply with legal obligations, and detect and prevent fraud. We will never sell your personal data to third parties for their own marketing purposes.`,
  },
  {
    icon: Cookie,
    id: "cookies",
    title: "Cookies Policy",
    content: `We use cookies and similar tracking technologies to enhance your browsing experience. Essential cookies are required for the platform to function correctly. Analytics cookies help us understand how users interact with our service. Preference cookies remember your settings and choices. Marketing cookies allow us to show relevant promotions. You can control cookie preferences through your browser settings, though disabling certain cookies may affect platform functionality.`,
  },
  {
    icon: Lock,
    id: "data-security",
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your information, including SSL/TLS encryption for all data transmission, AES-256 encryption for stored sensitive data, regular security audits and penetration testing, role-based access controls for our team members, and secure cloud infrastructure with automated threat detection. While we strive to protect your information, no security system is impenetrable. In the event of a data breach affecting your rights, we will notify you within 72 hours as required by applicable law.`,
  },
  {
    icon: Users,
    id: "third-party",
    title: "Third Party Services",
    content: `We work with trusted third-party service providers to operate our platform, including payment processors (Razorpay, Stripe), mapping services (Google Maps), cloud infrastructure providers (AWS), and analytics platforms. These partners are contractually obligated to handle your data according to our privacy standards and applicable law. We do not share your personal information with restaurant partners beyond what is necessary to fulfil your order (name and delivery address only).`,
  },
  {
    icon: Shield,
    id: "user-rights",
    title: "Your Rights",
    content: `You have the right to access the personal information we hold about you, request corrections to inaccurate data, request deletion of your personal data ("right to be forgotten"), opt out of marketing communications at any time, withdraw consent for data processing where consent is the legal basis, and request a copy of your data in a portable format. To exercise any of these rights, please contact us at support@sevenbites.com.`,
  },
  {
    icon: Clock,
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide our services. Order history is retained for 7 years for legal and tax compliance purposes. If you request account deletion, we will remove your personal data within 30 days, except where we are legally required to retain certain records. Anonymised and aggregated data may be retained indefinitely for analytical purposes.`,
  },
  {
    icon: Mail,
    id: "contact",
    title: "Contact Us",
    content: `If you have questions about this Privacy Policy, wish to exercise your rights, or want to report a privacy concern, please reach out to our dedicated privacy team at support@sevenbites.com. We are committed to resolving any concerns promptly and transparently. This policy was last updated on January 1, 2025, and we will notify registered users of material changes via email.`,
  },
];

export default function PrivacyClient() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4FF] to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-[#E23744]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#E23744]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E23744] mb-3 block">Legal</span>
            <h1 className="font-poppins font-bold text-5xl text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Your trust matters to us. Here's exactly how we handle your data — plainly and honestly.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              Last updated: January 1, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-y border-gray-100 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs font-medium text-gray-600 hover:text-[#E23744] bg-white border border-gray-200 hover:border-[#E23744] rounded-full px-3 py-1.5 transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 card-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#E23744]/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#E23744]" />
                    </div>
                    <div>
                      <h2 className="font-poppins font-bold text-xl text-gray-900 mb-3">{section.title}</h2>
                      <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
