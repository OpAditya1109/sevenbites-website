"use client";

import { motion } from "framer-motion";

interface Section {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsection?: {
    title: string;
    paragraphs: string[];
  };
  closingParagraphs?: string[];
}

const LAST_UPDATED = "July 16, 2026"; // update this each time the policy changes

const sections: Section[] = [
  {
    id: "order-authorization",
    title: "1. Order Authorization",
    paragraphs: [
      `Placing an order through the Platform constitutes an unconditional and irrevocable authorization to Sevenbites to place that order with the relevant Restaurant Partner on your behalf, as set out in Section XII(c) of the Terms of Service. Because Restaurant Partners typically begin preparation shortly after an order is confirmed, the window during which an order can be freely cancelled without consequence is limited, as described below.`,
    ],
  },
  {
    id: "cancellation-by-customer",
    title: "2. Cancellation by the Customer",
    paragraphs: [
      `Free cancellation window. You may cancel an order free of charge only if the cancellation request is made within the short grace period displayed on the order-confirmation screen at the time of placing the order (where offered), and provided the Restaurant Partner has not yet begun preparing the order.`,
      `Cancellation after preparation has begun. Once a Restaurant Partner has begun preparing your order, or once a Delivery Partner has been assigned to the order, cancellation by you will constitute an "Authorization Breach" under Section XII.D of the Terms of Service, and you will be liable to pay liquidated damages representing the actual, demonstrable amount payable to the Restaurant Partner and/or Delivery Partner in respect of that order, as more particularly described in the Terms of Service. Sevenbites does not levy any additional punitive charge beyond such actual pass-through amounts.`,
      `Cancellation due to Customer error. If an order cannot be delivered because you provided an incorrect or incomplete delivery address, are unreachable or unresponsive at the time of delivery, or refuse to accept a correctly fulfilled order, this shall be treated as a cancellation attributable to you, and the Liquidated Damages provisions of Section XII.D of the Terms of Service shall apply. No refund of the order value shall be payable in such circumstances, save at Sevenbites' discretion.`,
      `To cancel an order, use the "Cancel Order" option within the Sevenbites app, or contact in-app support immediately. Cancellation requests made through any other channel (e.g., directly to the Restaurant Partner or Delivery Partner) may not be processed in time and are made at your own risk.`,
    ],
  },
  {
    id: "cancellation-by-sevenbites",
    title: "3. Cancellation by Sevenbites, the Restaurant Partner, or the Delivery Partner",
    paragraphs: [
      `Sevenbites, the Restaurant Partner, or the Delivery Partner may cancel an order, in whole or in part, for reasons including but not limited to: unavailability of one or more ordered items; the Restaurant Partner being closed, overloaded, or unable to fulfil the order within a reasonable time; technical or pricing errors on the Platform; inability to locate a Delivery Partner within a reasonable time; safety concerns affecting delivery (e.g., unsafe location, severe weather, law-and-order situation); or suspected fraud or policy violation associated with the order or account.`,
      `Where an order is cancelled under this Section 3 for reasons not attributable to the Customer, no liquidated damages shall be charged to the Customer, and the Customer shall be entitled to a full refund of the order value (including Delivery Charges and Delivery Surge, if collected) in accordance with the Refund Policy. Sevenbites will make reasonable efforts to notify you promptly of any such cancellation.`,
      `Where Sevenbites cancels or is unable to accept an order due to suspected fraud, abuse, or a violation of the Terms of Service (including under Section IX-A, Fraud Prevention, Investigation, and Recovery), no refund shall be guaranteed, and Sevenbites reserves all rights described in Section IX-A of the Terms of Service, including withholding of funds pending investigation.`,
    ],
  },
  {
    id: "partial-cancellations",
    title: "4. Partial Cancellations and Item Substitutions",
    paragraphs: [
      `Where a Restaurant Partner is unable to fulfil one or more items in a multi-item order, Sevenbites or the Restaurant Partner may, at their discretion and where technically supported: (a) cancel only the unavailable item(s) and proceed with the remainder of the order, refunding the value of the unavailable item(s); or (b) offer a substitute item, which you may accept or decline. No liquidated damages apply to Sevenbites-initiated partial cancellations of this nature.`,
    ],
  },
  {
    id: "delivery-delays",
    title: "5. Delivery Delays Are Not Automatically Treated as Cancellations",
    paragraphs: [
      `Delivery and preparation time estimates shown at the time of ordering are approximate only, as described in Section V and Section XII.A(b) of the Terms of Service, and are generated using automated systems that account for factors such as distance, traffic, weather, and Restaurant Partner load. A delay in delivery, on its own, does not automatically entitle you to cancel the order without liability, or to a refund, unless the delay is exceptional, attributable to Sevenbites or the Delivery Partner, and reported promptly through Sevenbites' support channels for review under the Refund Policy.`,
    ],
  },
  {
    id: "force-majeure",
    title: "6. Force Majeure",
    paragraphs: [
      `Neither Sevenbites, the Restaurant Partner, nor the Delivery Partner shall be liable for a cancellation, delay, or non-fulfilment of an order caused by circumstances beyond their reasonable control, including natural disasters, extreme weather, strikes, riots, curfews, road closures, accidents, pandemics or epidemics, governmental action, or failure of Infrastructure Providers, as further described in the "Force Majeure" clause of the Terms of Service. Refund treatment in such circumstances shall be governed by Section 3(b) above and the Refund Policy.`,
    ],
  },
  {
    id: "cancellation-charges",
    title: "7. How Cancellation Charges Are Calculated and Collected",
    paragraphs: [
      `Any liquidated damages or cancellation-related charge payable by you shall be limited to the actual amount attributable to the Restaurant Partner and/or Delivery Partner for the cancelled order, and shall not include any additional punitive component retained by Sevenbites, in accordance with Section XII.D of the Terms of Service. You authorise Sevenbites to collect such amounts by adjusting them against any refund otherwise due to you, or by deducting them from any payment made towards a future order.`,
    ],
  },
  {
    id: "grievance-redressal",
    title: "8. Grievance Redressal",
    paragraphs: [
      `If you disagree with a cancellation charge or the treatment of a cancelled order, you may raise the matter with our Grievance Officer:`,
    ],
    closingParagraphs: [
      `Grievance Officer: Aditya Yadav, Adityax Innovations Private Limited`,
      `107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India`,
      `Email: info@adityaxinnovations.com`,
      `We will acknowledge your grievance within forty-eight (48) hours and endeavour to redress it within one (1) month, in accordance with the Consumer Protection (E-Commerce) Rules, 2020, without prejudice to your right to approach the appropriate Consumer Disputes Redressal Commission, pursue arbitration, or seek other remedies as set out in the Terms of Service.`,
    ],
  },
  {
    id: "changes-to-policy",
    title: "9. Changes to this Policy",
    paragraphs: [
      `Sevenbites may amend this Cancellation Policy from time to time. The updated Policy will be posted on the Platform with a revised "Last updated" date, and continued use of the Platform after such update constitutes acceptance of the revised Policy.`,
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    paragraphs: [
      `Legal Entity Name: Adityax Innovations Private Limited`,
      `CIN: U62011PN2026PTC253422`,
      `Registered Address: 107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India`,
      `Contact Email: info@adityaxinnovations.com`,
    ],
  },
];

export default function CancellationClient() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-0 pt-20 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-gray-900 mb-4 tracking-tight">
            Cancellation Policy
          </h1>
          <p className="italic text-gray-500 text-base mb-10">
            Last updated on {LAST_UPDATED}.
          </p>
        </motion.div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-base mb-12">
          This Cancellation Policy governs the cancellation of orders placed on the Sevenbites Platform, operated
          by <strong className="font-semibold text-gray-900">Adityax Innovations Private Limited</strong>
          ("Sevenbites", "we", "us", "our"). This Policy forms part of, and is incorporated by reference into, our
          Terms of Service, and should be read together with our Refund Policy. Capitalised terms not defined in
          this Policy shall have the meaning given to them in the Terms of Service.
        </p>

        {/* Table of contents */}
        <nav className="mb-12 pb-10 border-b border-gray-200">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            On this page
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-gray-600 hover:text-[#E23744] hover:underline underline-offset-2 transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Body */}
        <div>
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-8 mb-10 last:mb-0">
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4">
                {section.title}
              </h2>

              {section.paragraphs.map((p, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed text-base mb-4 last:mb-0">
                  {p}
                </p>
              ))}

              {section.bullets && (
                <ul className="list-disc pl-6 space-y-2.5 my-4">
                  {section.bullets.map((b, idx) => (
                    <li key={idx} className="text-gray-700 leading-relaxed text-base">
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {section.closingParagraphs?.map((p, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed text-base mb-4 last:mb-0">
                  {p}
                </p>
              ))}

              {section.subsection && (
                <div className="mt-6 pl-5 border-l-2 border-gray-200">
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                    {section.subsection.title}
                  </h3>
                  {section.subsection.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed text-base mb-2 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}