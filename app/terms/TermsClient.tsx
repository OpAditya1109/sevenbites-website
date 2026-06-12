"use client";

import { motion } from "framer-motion";
import { FileText, User, Store, CreditCard, RefreshCw, Copyright, AlertTriangle, Ban, Globe, Mail, Clock } from "lucide-react";

const sections = [
  {
    icon: FileText,
    id: "acceptance",
    title: "Acceptance of Terms",
    content: `By accessing or using SevenBites (the "Platform"), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services. These terms constitute a legally binding agreement between you and SevenBites Technologies Pvt. Ltd. We reserve the right to update these terms at any time, and continued use of the platform following any changes constitutes your acceptance of the revised terms.`,
  },
  {
    icon: User,
    id: "user-responsibilities",
    title: "User Responsibilities",
    content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and current information when creating your account, use the platform only for lawful purposes, not attempt to gain unauthorised access to any part of the platform, not engage in any activity that disrupts or interferes with platform services, and notify us immediately of any unauthorised use of your account. You must be at least 18 years of age to use SevenBites.`,
  },
  {
    icon: Store,
    id: "restaurant-listings",
    title: "Restaurant Listings",
    content: `SevenBites acts as an intermediary platform connecting users with independent restaurant partners. We do not own, operate, or control any restaurant listed on our platform. Menu items, pricing, availability, and quality are determined by the respective restaurants. While we endeavour to keep listings accurate and up to date, SevenBites cannot guarantee the accuracy of all information provided by restaurant partners. Restaurants may update their menus and prices independently.`,
  },
  {
    icon: CreditCard,
    id: "orders-payments",
    title: "Orders & Payments",
    content: `All orders placed through SevenBites are subject to acceptance by the respective restaurant. We reserve the right to cancel any order for reasons including but not limited to restaurant unavailability, payment failure, or inaccurate delivery address. Prices displayed include applicable taxes where stated. Delivery charges, if any, are displayed before checkout. All payments are processed securely through our payment partners. SevenBites is not responsible for any charges applied by your bank or payment provider.`,
  },
  {
    icon: RefreshCw,
    id: "cancellations-refunds",
    title: "Cancellations & Refunds",
    content: `You may cancel your order within 5 minutes of placement for a full refund. Once an order has been accepted by a restaurant and preparation has begun, cancellations may not be possible. Refunds for late deliveries, incorrect orders, or quality issues will be evaluated on a case-by-case basis. Valid refund claims will be processed within 5-7 business days to your original payment method. In cases of food quality issues, we may offer account credits at our discretion. Decisions made by SevenBites regarding refunds are final.`,
  },
  {
    icon: Copyright,
    id: "intellectual-property",
    title: "Intellectual Property",
    content: `All content on the SevenBites platform, including but not limited to logos, graphics, text, software, and design elements, is the exclusive property of SevenBites Technologies Pvt. Ltd. and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, or use any content from our platform without prior written permission. The SevenBites name, logo, and tagline are registered trademarks and may not be used without our express consent.`,
  },
  {
    icon: AlertTriangle,
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, SevenBites shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill. Our total liability for any claim arising from or related to these terms or our services shall not exceed the amount you paid for the specific order giving rise to the claim. SevenBites is not liable for delays or failures caused by circumstances beyond our reasonable control, including natural disasters, network outages, or third-party service failures.`,
  },
  {
    icon: Ban,
    id: "account-restrictions",
    title: "Account Restrictions",
    content: `SevenBites reserves the right to suspend or terminate your account at any time if we reasonably believe you have violated these terms, engaged in fraudulent activity, provided false information, or acted in a manner harmful to other users or restaurant partners. Abuse of promotional offers, including creating multiple accounts to claim first-order discounts or manipulation of referral programs, will result in immediate account suspension and forfeiture of any associated credits or rewards.`,
  },
  {
    icon: Globe,
    id: "governing-law",
    title: "Governing Law",
    content: `These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect. These terms constitute the entire agreement between you and SevenBites regarding your use of our platform.`,
  },
  {
    icon: Mail,
    id: "contact",
    title: "Contact Information",
    content: `For questions about these Terms & Conditions, please contact our legal team at support@sevenbites.com. For partnership inquiries or restaurant onboarding, reach out to business@sevenbites.com. We aim to respond to all legal inquiries within 5 business days. These terms were last updated on January 1, 2025. We recommend reviewing these terms periodically to stay informed of any changes.`,
  },
];

export default function TermsClient() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E23744] mb-3 block">Legal</span>
            <h1 className="font-poppins font-bold text-5xl text-gray-900 mb-4">Terms & Conditions</h1>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              These terms govern your use of SevenBites. Please read them carefully before using our platform.
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
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 card-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-[#E23744] bg-red-50 px-2 py-0.5 rounded-full">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-poppins font-bold text-xl text-gray-900">{section.title}</h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 text-center"
          >
            <p className="text-sm text-gray-500">
              For questions about these terms, email us at{" "}
              <a href="mailto:support@sevenbites.com" className="text-[#E23744] font-medium hover:underline">
                support@sevenbites.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
