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
    id: "general-principles",
    title: "1. General Principles",
    paragraphs: [
      `Sevenbites facilitates the sale and purchase of food and beverages between Customers and Restaurant Partners on a principal-to-principal basis, and facilitates delivery through Restaurant Partners or independent Delivery Partners. Refunds of the food/order value are therefore assessed with reference to the responsibility of the Restaurant Partner, the Delivery Partner, the Customer, or Sevenbites, as applicable, for the issue giving rise to the refund request.`,
      `Refunds under this Policy are distinct from, and do not affect, any statutory rights you may have under the Consumer Protection Act, 2019, and the Consumer Protection (E-Commerce) Rules, 2020.`,
      `All refund requests must be raised through the Sevenbites app/website "Help" or "Order Support" section, or by writing to info@adityaxinnovations.com, within a reasonable time of the relevant order (in any event, ordinarily within 24 hours of order delivery, except where the nature of the complaint reasonably prevents earlier detection).`,
    ],
  },
  {
    id: "grounds-for-refunds",
    title: "2. Grounds on Which Refunds May Be Considered",
    paragraphs: [
      `Subject to verification and the evidentiary requirements in Section 3, a refund (in whole or in part) may be considered where:`,
    ],
    bullets: [
      `the order was not delivered at all, for reasons attributable to the Restaurant Partner, Delivery Partner, or Sevenbites;`,
      `the order delivered was materially different from what was ordered (e.g., wrong item, missing item);`,
      `the order arrived in a spilled, damaged, or unhygienic condition due to mishandling in packaging or transit;`,
      `a foreign object or contaminant was found in the food, supported by evidence;`,
      `the order was charged at an incorrect price due to a verified technical or pricing error on the Platform;`,
      `the order was cancelled by Sevenbites, the Restaurant Partner, or the Delivery Partner for reasons not attributable to the Customer (e.g., item unavailability, Restaurant Partner unable to fulfil, technical failure); or`,
      `Sevenbites separately determines, in its sole discretion, that a refund is warranted based on the facts of a specific complaint.`,
    ],
  },
  {
    id: "evidentiary-requirements",
    title: "3. Evidentiary Requirements",
    paragraphs: [
      `To process a refund claim relating to order quality, packaging, spillage, missing items, or foreign objects, you must, where reasonably possible, provide:`,
    ],
    bullets: [
      `clear photographic or video evidence of the item(s) as received, taken promptly upon delivery and before consumption;`,
      `the order ID and a description of the specific issue; and`,
      `any other information reasonably requested by our support team to verify the claim.`,
    ],
    closingParagraphs: [
      `Refund requests unsupported by reasonable evidence, or raised after the item has been substantially or fully consumed (other than in respect of non-delivery or pricing errors), may be declined at Sevenbites' reasonable discretion. Where special cooking instructions or customisation requests were not followed exactly, no refund shall be payable solely on that basis, as such instructions are fulfilled by the Restaurant Partner on a best-efforts basis.`,
    ],
  },
  {
    id: "not-refundable",
    title: "4. What Is Not Refundable",
    paragraphs: [
      `Except where required under applicable law or expressly stated otherwise, the following are not eligible for refund:`,
    ],
    bullets: [
      `Delivery Charges and Delivery Surge amounts, once the Delivery Partner has been assigned and has commenced fulfilment of the delivery, unless the delivery failure is attributable to Sevenbites or the Delivery Partner;`,
      `Platform fees or similar charges for use of the Platform Services, except where the order is cancelled for reasons attributable to Sevenbites;`,
      `taste, personal preference, or subjective dissatisfaction with food that was prepared as ordered and in accordance with the listed menu description;`,
      `orders where the Customer provided an incorrect or incomplete delivery address, or was unreachable/unresponsive at the time of delivery, resulting in non-delivery (see Liquidated Damages under the Terms of Service and Cancellation Policy);`,
      `amounts already disbursed to a Restaurant Partner or Delivery Partner for services validly rendered; and`,
      `claims raised after the applicable claim window (Section 1(c)) has lapsed, save at Sevenbites' discretion.`,
    ],
  },
  {
    id: "method-and-timeline",
    title: "5. Method and Timeline of Refund",
    paragraphs: [
      `Approved refunds will be processed to the original payment method used for the order (card, UPI, net-banking, or wallet), unless the refund is issued as Sevenbites wallet credit at Sevenbites' discretion or with your consent.`,
      `Refunds are typically initiated within 3–7 business days of approval; however, the actual time for the refunded amount to reflect in your account depends on your bank, card network, UPI app, or payment provider's own processing timelines, over which Sevenbites has no control, as described in the Terms of Service ("Third-Party Service Providers").`,
      `Where a refund is issued as Sevenbites wallet credit, such credit will be reflected in your account promptly and may be used towards future orders, subject to any applicable expiry or usage terms disclosed at the time of issuance.`,
    ],
  },
  {
    id: "partner-responsibility",
    title: "6. Restaurant Partner and Delivery Partner Responsibility",
    paragraphs: [
      `Where a refund arises from a verified Restaurant Partner error (e.g., wrong or missing item, poor food-safety handling, incorrect pricing at source), Sevenbites may recover the corresponding amount from the Restaurant Partner in accordance with the applicable Restaurant Partner agreement, and the Restaurant Partner remains solely responsible for compliance with the Food Safety and Standards Act, 2006, and applicable food-safety rules.`,
      `Where a refund arises from a verified Delivery Partner error (e.g., damage in transit, non-delivery, mishandling), Sevenbites may recover the corresponding amount from the Delivery Partner in accordance with the applicable Delivery Partner agreement.`,
      `Nothing in this Policy shall be construed as an admission of liability by Sevenbites for the acts or omissions of any Restaurant Partner or Delivery Partner, both of whom operate independently of Sevenbites as described in the Terms of Service.`,
    ],
  },
  {
    id: "fraud-and-abuse",
    title: "7. Fraud and Abuse",
    paragraphs: [
      `Sevenbites reserves the right to investigate, decline, reverse, or claw back refunds that are suspected to be fraudulent, abusive, or obtained through misrepresentation, including repeated or pattern-based refund claims, in accordance with Section IX-A (Fraud Prevention, Investigation, and Recovery) of the Terms of Service. Sevenbites may place reasonable limits on the frequency or value of refunds available to a Customer where a pattern of abuse is identified, and may require additional verification for future orders.`,
    ],
  },
  {
    id: "payment-gateway-chargebacks",
    title: "8. Payment Gateway and Chargebacks",
    paragraphs: [
      `Refunds processed through third-party payment gateways are subject to the applicable gateway's own settlement and reversal timelines and policies, over which Sevenbites has no control. Where a Customer initiates a chargeback with their bank or card issuer instead of raising the claim through Sevenbites' support channels, Sevenbites reserves the rights described in Section IX-A of the Terms of Service, including recovery of the disputed amount and associated chargeback fees where the underlying order was validly fulfilled.`,
    ],
  },
  {
    id: "grievance-redressal",
    title: "9. Grievance Redressal",
    paragraphs: [
      `If you are dissatisfied with the outcome of a refund request, you may escalate the matter to our Grievance Officer:`,
    ],
    closingParagraphs: [
      `Grievance Officer: Aditya Yadav, Adityax Innovations Private Limited`,
      `107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India`,
      `Email: info@adityaxinnovations.com`,
      `In accordance with the Consumer Protection (E-Commerce) Rules, 2020, we will acknowledge your grievance within forty-eight (48) hours and endeavour to redress it within one (1) month, or such other timeline as may be prescribed under applicable law. This does not affect your right to approach the appropriate Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019, or to pursue arbitration or other remedies as set out in the Terms of Service.`,
    ],
  },
  {
    id: "changes-to-policy",
    title: "10. Changes to this Policy",
    paragraphs: [
      `Sevenbites may amend this Refund Policy from time to time. The updated Policy will be posted on the Platform with a revised "Last updated" date, and continued use of the Platform after such update constitutes acceptance of the revised Policy.`,
    ],
  },
  {
    id: "contact",
    title: "11. Contact Us",
    paragraphs: [
      `Legal Entity Name: Adityax Innovations Private Limited`,
      `CIN: U62011PN2026PTC253422`,
      `Registered Address: 107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India`,
      `Contact Email: info@adityaxinnovations.com`,
    ],
  },
];

export default function RefundClient() {
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
            Refund Policy
          </h1>
          <p className="italic text-gray-500 text-base mb-10">
            Last updated on {LAST_UPDATED}.
          </p>
        </motion.div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-base mb-12">
          This Refund Policy governs refunds in connection with orders placed on the Sevenbites Platform, operated by{" "}
          <strong className="font-semibold text-gray-900">Adityax Innovations Private Limited</strong> ("Sevenbites",
          "we", "us", "our"). This Policy forms part of, and is incorporated by reference into, our Terms of Service.
          Capitalised terms not defined in this Policy shall have the meaning given to them in the Terms of Service.
          This Policy should be read together with our Cancellation Policy, which governs order cancellations
          specifically.
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