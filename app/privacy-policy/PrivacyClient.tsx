"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Scale,
  Database,
  Globe,
  Eye,
  FileText,
  Share2,
  Clock,
  Lock,
  UserCheck,
  Cookie,
  Baby,
  Link2,
  AlertCircle,
  RefreshCw,
  Mail,

} from "lucide-react";
import type { LucideIcon } from "lucide-react";
interface Section {
  icon: LucideIcon;
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
    icon: Shield,
    id: "introduction",
    title: "1. Introduction",
    paragraphs: [
      `This Privacy Policy describes how Adityax Innovations Private Limited ("Sevenbites", "we", "us", "our"), operating the Sevenbites website and mobile application (the "Platform"), collects, uses, stores, discloses, and protects personal data of individuals who access or use the Platform ("you", "your", "Data Principal").`,
      `This Policy is issued in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, the Digital Personal Data Protection Act, 2023, and the Digital Personal Data Protection Rules, 2025 (together, "DPDP Law"), and forms part of, and is incorporated by reference into, our Terms of Service. Capitalised terms not defined in this Policy shall have the meaning given to them in the Terms of Service.`,
      `By accessing or using the Platform, you acknowledge that you have read and understood this Policy. Where consent is the applicable legal basis for processing, your continued use of the Platform following presentation of a consent notice constitutes your consent to the processing described in that notice.`,
    ],
  },
  {
    icon: Scale,
    id: "roles",
    title: "2. Roles Under Applicable Law",
    paragraphs: [
      `For the purposes of DPDP Law, Sevenbites acts as a Data Fiduciary in respect of personal data collected directly from Customers, Restaurant Partners, and Delivery Partners through the Platform. Where Sevenbites engages third parties (such as cloud hosting providers, payment gateways, or analytics providers) to process personal data on its behalf and on its instructions, such third parties act as Data Processors, and Sevenbites remains responsible for ensuring appropriate contractual safeguards are in place with such processors.`,
    ],
  },
  {
    icon: Database,
    id: "information-we-collect",
    title: "3. Personal Data We Collect",
    paragraphs: [`We collect the following categories of personal data, depending on how you use the Platform:`],
    bullets: [
      `Identity and contact data: name, mobile number, email address, delivery address(es), date of birth (where relevant for age verification).`,
      `Account data: login credentials, social-login identifiers (e.g., Google/Facebook), account preferences, order history.`,
      `Payment data: payment method type, transaction identifiers, and billing details. Full card numbers, UPI PINs, CVV, and net-banking credentials are collected and processed directly by our RBI-regulated payment gateway/aggregator partners and are not stored by Sevenbites.`,
      `Location data: precise or approximate geolocation data collected from your device (with your permission) to enable order placement, delivery tracking, and Delivery Partner routing.`,
      `Content data: reviews, ratings, photographs, chat messages, customer support communications, and any Content you submit as described in our Terms of Service.`,
      `Device and technical data: IP address, device identifiers, device type and operating system, app version, browser type, and log data.`,
      `Usage data: pages viewed, search queries, orders placed, features used, clickstream and interaction data, generated through cookies and similar technologies.`,
      `Communications data: records of calls made through in-app telephony (where recorded, as disclosed in the Terms of Service), and support chat transcripts.`,
      `Children's data: Sevenbites does not knowingly collect personal data of individuals under the age of eighteen (18). Where we become aware that a minor's data has been collected without verifiable parental or guardian consent, we will take steps to delete such data in accordance with applicable law.`,
    ],
  },
  {
    icon: Globe,
    id: "how-we-collect",
    title: "4. How We Collect Personal Data",
    paragraphs: [
      `We collect personal data: (a) directly from you when you register, place an order, contact support, or submit Content; (b) automatically through your use of the Platform via cookies, SDKs, and similar tracking technologies; (c) from third parties, including social-login providers (with your authorisation) and Infrastructure Providers; and (d) from Restaurant Partners and Delivery Partners in the ordinary course of order fulfilment (e.g., delivery confirmation, order-related communications).`,
    ],
  },
  {
    icon: Eye,
    id: "purpose-of-processing",
    title: "5. Purpose of Processing",
    paragraphs: [
      `We process your personal data for the following specified purposes, each of which will also be identified in the relevant consent notice presented to you at the point of collection:`,
    ],
    bullets: [
      `creating and administering your account;`,
      `processing, fulfilling, and delivering your orders, including sharing necessary order and location data with the relevant Restaurant Partner and Delivery Partner;`,
      `processing payments and refunds through our payment gateway partners;`,
      `providing customer support and resolving grievances;`,
      `verifying your identity and preventing fraud, abuse, and unauthorized account activity (see Section IX-A of our Terms of Service);`,
      `sending transactional communications (order confirmations, delivery updates, OTPs, payment receipts);`,
      `sending promotional communications, offers, and personalised recommendations, where you have not opted out;`,
      `improving and personalising the Platform, including through analytics, research, and machine-learning based features such as delivery-time estimation and search ranking;`,
      `complying with applicable law, including tax, consumer protection, and law-enforcement requirements; and`,
      `enforcing our Terms of Service and protecting the rights, property, and safety of Sevenbites, our Customers, Restaurant Partners, and Delivery Partners.`,
    ],
    closingParagraphs: [
      `We do not process personal data for purposes beyond those disclosed at the time of collection, except where you provide fresh consent or where processing is otherwise permitted under DPDP Law (for example, for compliance with a legal obligation, or in a medical emergency).`,
    ],
  },
  {
    icon: FileText,
    id: "legal-basis",
    title: "6. Legal Basis for Processing",
    paragraphs: [
      `We process personal data on the basis of: (a) your consent, given in a clear, free, specific, informed, unambiguous, and itemised manner through a standalone consent notice; (b) "certain legitimate uses" recognised under the DPDP Act, such as processing necessary for the performance of a contract with you (i.e., fulfilling your food order), compliance with a legal obligation, or responding to a medical emergency; and (c) other legal bases permitted under DPDP Law from time to time. You have the right to withdraw consent at any time, without affecting the lawfulness of processing carried out before such withdrawal, as described in Section 10 below.`,
    ],
  },
  {
    icon: Share2,
    id: "sharing-disclosure",
    title: "7. Sharing and Disclosure of Personal Data",
    paragraphs: [`We may share your personal data with:`],
    bullets: [
      `Restaurant Partners, to the extent necessary to prepare and fulfil your order (e.g., name, order details, delivery address, contact number);`,
      `Delivery Partners, to the extent necessary to deliver your order (e.g., name, delivery address, contact number, live location during delivery);`,
      `Infrastructure Providers, including payment gateways/aggregators, cloud hosting providers, SMS/OTP providers, mapping/geolocation providers, and push-notification providers, strictly for the purpose of operating the Platform, and bound by contractual confidentiality and data-protection obligations;`,
      `Group companies and affiliates, where necessary for internal administration, provided such entities are bound by equivalent data-protection obligations;`,
      `Professional advisors, including auditors, legal counsel, and insurers, where reasonably necessary;`,
      `Government authorities, regulators, or law-enforcement agencies, where required under applicable law, in response to a valid legal process, or to protect the rights, safety, or property of Sevenbites, its users, or the public; and`,
      `Successors in the event of a corporate transaction (merger, acquisition, restructuring, or sale of assets), subject to equivalent protections being maintained for the transferred personal data.`,
    ],
    closingParagraphs: [`We do not sell your personal data to third parties for their independent marketing purposes.`],
    subsection: {
      title: "Cross-Border Transfers",
      paragraphs: [
        `Personal data may be stored or processed on servers located outside India. In accordance with DPDP Law's transfer framework, Sevenbites may transfer personal data outside India except to any country or territory that the Central Government may, by notification, restrict. Where such a transfer occurs, Sevenbites shall ensure that the recipient is subject to contractual or other safeguards appropriate to protect the transferred personal data.`,
      ],
    },
  },
  {
    icon: Clock,
    id: "data-retention",
    title: "8. Data Retention",
    paragraphs: [
      `We retain personal data only for as long as necessary to fulfil the purposes described in this Policy, or as required under applicable law, whichever is longer. In particular:`,
    ],
    bullets: [
      `Order, payment, and transaction-related personal data and associated logs are retained for a minimum of one (1) year from the date of the relevant transaction, in accordance with the retention obligations applicable to e-commerce entities under DPDP Law, even if you delete your account.`,
      `Where you do not use the Platform, or do not otherwise interact with Sevenbites, for a continuous period specified under applicable law, we will provide you with prior notice before erasing your personal data, save where retention is necessary for compliance with law.`,
      `Security and access logs are retained for a minimum of one (1) year for the purpose of detecting and investigating unauthorized access, in accordance with DPDP Law.`,
    ],
  },
  {
    icon: Lock,
    id: "security-safeguards",
    title: "9. Security Safeguards",
    paragraphs: [
      `We implement reasonable security safeguards appropriate to the nature of the personal data processed, including: access controls and role-based permissions; encryption or tokenisation of sensitive data in transit and at rest; monitoring and logging of access to personal data; contractual security obligations imposed on Data Processors; and business-continuity and disaster-recovery measures. In the event of a personal data breach, Sevenbites shall notify the Data Protection Board of India and affected Data Principals within the timelines prescribed under DPDP Law, and shall additionally comply with applicable reporting obligations to the Indian Computer Emergency Response Team ("CERT-In") under Section 70B of the Information Technology Act, 2000, where a qualifying cybersecurity incident occurs.`,
      `No method of transmission or storage is completely secure, and while we strive to protect your personal data, we cannot guarantee its absolute security.`,
    ],
  },
  {
    icon: UserCheck,
    id: "your-rights",
    title: "10. Your Rights as a Data Principal",
    paragraphs: [`Subject to applicable law, you have the right to:`],
    bullets: [
      `Access — obtain a summary of the personal data we hold about you and the processing activities undertaken;`,
      `Correction and updating — request correction of inaccurate or misleading personal data, and completion of incomplete personal data;`,
      `Erasure — request erasure of personal data that is no longer necessary for the purpose for which it was collected, subject to our right/obligation to retain data as required by law;`,
      `Grievance redressal — lodge a grievance regarding the processing of your personal data;`,
      `Nominate — nominate another individual to exercise your rights in the event of your death or incapacity; and`,
      `Withdraw consent — withdraw previously given consent at any time, with the same ease with which it was given, without affecting the lawfulness of processing prior to withdrawal.`,
    ],
    closingParagraphs: [
      `To exercise any of these rights, please write to us at info@adityaxinnovations.com. We will acknowledge and respond to your request within the timeline prescribed under applicable law (currently up to ninety (90) days under DPDP Law). If you are not satisfied with our response, you have the right to file a complaint with the Data Protection Board of India.`,
    ],
  },
  {
    icon: Cookie,
    id: "cookies",
    title: "11. Cookies and Tracking Technologies",
    paragraphs: [
      `We use cookies, SDKs, pixels, and similar technologies to operate the Platform, remember your preferences, authenticate sessions, measure Platform performance, and deliver personalised content and advertising. You may control cookies through your browser or device settings; disabling certain cookies may affect the functionality of the Platform.`,
    ],
  },
  {
    icon: Baby,
    id: "childrens-privacy",
    title: "12. Children's Privacy",
    paragraphs: [
      `The Platform is not intended for use by, and we do not knowingly collect personal data from, individuals under eighteen (18) years of age, except where verifiable parental or guardian consent has been obtained as required under DPDP Law. We do not undertake tracking, behavioural monitoring, or targeted advertising directed at children. If you believe we have inadvertently collected personal data from a minor without appropriate consent, please contact us at info@adityaxinnovations.com so we can take appropriate action.`,
    ],
  },
  {
    icon: Link2,
    id: "third-party-links",
    title: "13. Third-Party Links and Services",
    paragraphs: [
      `The Platform may contain links to, or integrations with, third-party websites, applications, or services (including payment gateways and social-login providers) that are governed by their own privacy policies. Sevenbites is not responsible for the privacy practices of such third parties, and we encourage you to review their policies independently.`,
    ],
  },
  {
    icon: AlertCircle,
    id: "grievance-officer",
    title: "14. Grievance Officer and Data Protection Contact",
    paragraphs: [
      `In accordance with the Information Technology Act, 2000, the rules made thereunder, and DPDP Law, the following contact is designated for privacy-related grievances and Data Principal rights requests:`,
    ],
    closingParagraphs: [
      `Grievance Officer / Privacy Contact: Aditya Yadav, Adityax Innovations Private Limited`,
      `107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India`,
      `Email: info@adityaxinnovations.com`,
      `We will acknowledge grievances within forty-eight (48) hours and endeavour to resolve them within the timelines prescribed under applicable law.`,
    ],
  },
  {
    icon: RefreshCw,
    id: "changes-to-policy",
    title: "15. Changes to this Policy",
    paragraphs: [
      `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of material changes through the Platform, by email, or by other reasonable means, and will indicate the date of the most recent revision at the top of this Policy. Your continued use of the Platform after such changes take effect constitutes your acceptance of the revised Policy.`,
    ],
  },
  {
    icon: Mail,
    id: "contact",
    title: "16. Contact Us",
    paragraphs: [
      `Legal Entity Name: Adityax Innovations Private Limited`,
      `CIN: U62011PN2026PTC253422`,
      `Registered Address: 107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India`,
      `Contact Email: info@adityaxinnovations.com`,
    ],
    closingParagraphs: [
      `Please note: Sevenbites does not solicit confidential information such as OTP, CVV, PIN, or card numbers through calls, emails, or any other means. Please do not share such details with anyone claiming to represent Sevenbites. Report suspicious activity to info@adityaxinnovations.com.`,
    ],
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
              Your trust matters to us. Here's exactly how we handle your data — plainly and honestly, and in line with India's Digital Personal Data Protection Act, 2023.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              Last updated: {LAST_UPDATED}
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
                    <div className="flex-1">
                      <h2 className="font-poppins font-bold text-xl text-gray-900 mb-3">{section.title}</h2>

                      {section.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-gray-600 leading-relaxed text-sm mb-3 last:mb-0">
                          {p}
                        </p>
                      ))}

                      {section.bullets && (
                        <ul className="list-disc pl-5 space-y-2 mb-3">
                          {section.bullets.map((b, idx) => (
                            <li key={idx} className="text-gray-600 leading-relaxed text-sm">
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.closingParagraphs?.map((p, idx) => (
                        <p key={idx} className="text-gray-600 leading-relaxed text-sm mb-3 last:mb-0">
                          {p}
                        </p>
                      ))}

                      {section.subsection && (
                        <div className="mt-4 pl-4 border-l-2 border-[#E23744]/20">
                          <h3 className="font-poppins font-semibold text-sm text-gray-900 mb-2">
                            {section.subsection.title}
                          </h3>
                          {section.subsection.paragraphs.map((p, idx) => (
                            <p key={idx} className="text-gray-600 leading-relaxed text-sm mb-2 last:mb-0">
                              {p}
                            </p>
                          ))}
                        </div>
                      )}
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