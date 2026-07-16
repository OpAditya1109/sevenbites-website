"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Content model                                                      */
/* ------------------------------------------------------------------ */

type Block =
  | { type: "p"; text: string }
  | { type: "callout"; text: string } // ALL-CAPS legal disclaimer, boxed
  | { type: "ul"; items: string[] }
  | { type: "ol"; marker: "letter" | "roman"; items: string[] }
  | { type: "sub"; heading: string }
  | { type: "term"; term: string; text: string }; // bold inline term + text

interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

const LAST_UPDATED = "July 16, 2026"; // update this each time the policy changes

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const sections: Section[] = [
  {
    id: "acceptance-of-terms",
    title: "I. Acceptance of Terms",
    blocks: [
      {
        type: "p",
        text: `Thank you for using Sevenbites. These Terms of Service (the "Terms") are intended to make you aware of your legal rights and responsibilities with respect to your access to and use of the Sevenbites website and any related mobile or software applications (collectively, the "Sevenbites Platform" or "Services"), including but not limited to delivery of information via the website and app, whether existing now or in the future, that link to these Terms.`,
      },
      { type: "p", text: `These Terms are effective for all existing and future Sevenbites customers.` },
      {
        type: "p",
        text: `Please read these Terms carefully. By accessing or using the Sevenbites Platform, you are agreeing to these Terms and concluding a legally binding contract with **Adityax Innovations Private Limited** (hereinafter referred to as "Sevenbites", "we", "us", or "our"). You may not use the Services if you do not accept the Terms or are unable to be bound by the Terms. Your use of the Sevenbites Platform is at your own risk, including the risk that you might be exposed to content that is objectionable or otherwise inappropriate.`,
      },
      { type: "p", text: `In order to use the Services, you must first agree to the Terms. You can accept the Terms by:` },
      {
        type: "ul",
        items: [
          `Clicking to accept or agree to the Terms, where made available to you by Sevenbites in the user interface for any particular Service; or`,
          `Actually using the Services. In this case, you understand and agree that Sevenbites will treat your use of the Services as acceptance of the Terms from that point onwards.`,
        ],
      },
    ],
  },
  {
    id: "definitions",
    title: "II. Definitions",
    blocks: [
      {
        type: "term",
        term: "Customer",
        text: `"Customer" or "You" or "Your" refers to you, as a customer of the Services. A customer is someone who accesses or uses the Services for the purpose of sharing, displaying, hosting, publishing, transacting, or uploading information, views, or pictures, and includes other persons jointly participating in using the Services.`,
      },
      {
        type: "term",
        term: "Content",
        text: `"Content" includes (but is not limited to) reviews, images, photos, audio, video, location data, nearby places, and all other forms of information or data. "Your Content" or "Customer Content" means content that you upload, share, or transmit to, through, or in connection with the Services, such as likes, ratings, reviews, images, photos, messages, chat communication, profile information, or any other materials you publicly display or displayed in your account profile. "Sevenbites Content" means content that Sevenbites creates and makes available in connection with the Services, including but not limited to visual interfaces, interactive features, graphics, design, compilation, computer code, products, software, aggregate ratings, reports, and other usage-related data, excluding Your Content and Third Party Content. "Third Party Content" means content that comes from parties other than Sevenbites or its Customers, such as Restaurant Partners, and is available on the Services.`,
      },
      {
        type: "term",
        term: "Restaurant(s) / Restaurant Partner(s)",
        text: `means the restaurants listed on the Sevenbites Platform.`,
      },
      {
        type: "term",
        term: "Delivery Partner(s)",
        text: `means the independent third-party individuals or logistics entities who undertake delivery of orders facilitated through the Sevenbites Platform.`,
      },
      {
        type: "term",
        term: "Infrastructure Providers",
        text: `means third-party service providers relied upon by Sevenbites to operate the Services, including payment gateways and payment aggregators, SMS/OTP providers, cloud infrastructure and hosting providers, mapping and geolocation providers, and push-notification services.`,
      },
    ],
  },
  {
    id: "eligibility",
    title: "III. Eligibility to Use the Services",
    blocks: [
      {
        type: "p",
        text: `You represent and warrant that you are at least eighteen (18) years of age or above and are fully able and competent to understand and agree to the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms.`,
      },
      {
        type: "term",
        term: "Compliance with Laws.",
        text: `You are in compliance with all applicable laws and regulations in the country in which you live when you access and use the Services. You agree to use the Services only in compliance with these Terms and applicable law, and in a manner that does not violate our legal rights or those of any third party.`,
      },
      {
        type: "term",
        term: "Use by Minors.",
        text: `The Services are not intended for use by individuals under eighteen (18) years of age. If Sevenbites becomes aware, or has reason to believe, that an account is being used by a minor, Sevenbites reserves the right to immediately suspend or terminate that account without notice. Parents or guardians who become aware of unauthorized use of the Services by a minor under their care should contact us at info@adityaxinnovations.com.`,
      },
    ],
  },
  {
    id: "changes-to-terms",
    title: "IV. Changes to the Terms",
    blocks: [
      {
        type: "p",
        text: `Sevenbites may vary, amend, change, or update these Terms from time to time, entirely at its own discretion. You are responsible for checking these Terms periodically to ensure continued compliance. Your continued use of the Sevenbites Platform after any such amendment shall be deemed as your express acceptance of the amended Terms.`,
      },
    ],
  },
  {
    id: "provision-of-services",
    title: "V. Provision of Services",
    blocks: [
      {
        type: "p",
        text: `Sevenbites is constantly evolving to provide the best possible experience to its Customers. You acknowledge and agree that Sevenbites reserves the right to suspend, cancel, or discontinue any or all products or services at any time without notice, and to make modifications or alterations to any content, products, and services on the Platform without prior notice.`,
      },
      {
        type: "p",
        text: `Sevenbites does not warrant uninterrupted, error-free, or continuously available access to the Services, and shall not be liable for downtime, scheduled or emergency maintenance, capacity constraints, or Platform unavailability, whether or not caused by Sevenbites, its Infrastructure Providers, Restaurant Partners, or Delivery Partners.`,
      },
      {
        type: "p",
        text: `Certain features of the Services, including but not limited to delivery-time estimates, dynamic Delivery Surge pricing, personalised recommendations, and search or ranking results, are generated using automated, rule-based, or machine-learning based systems. Such outputs are approximations and predictions only, based on available data at the relevant time, and do not constitute a guarantee, warranty, or binding representation of any specific outcome, time, or price. Sevenbites uses disclosed parameters (including price, past order history, ratings, and delivery feasibility) to determine search and ranking order on the Platform in accordance with the Consumer Protection (E-Commerce) Rules, 2020, and does not manipulate ranking in a manner inconsistent with such disclosed parameters for undisclosed consideration from Restaurant Partners.`,
      },
      {
        type: "p",
        text: `Sevenbites may check for and push updates or upgrades to the software from time to time. You may be required to install certain updates to continue accessing the Services. Any such updates shall be considered part of the Services.`,
      },
      {
        type: "p",
        text: `You acknowledge and agree that if Sevenbites disables access to your account, you may be prevented from accessing the Services, your account details, or any files or content contained in your account.`,
      },
      {
        type: "p",
        text: `Sevenbites may from time to time undertake research and experiments on various aspects of the Services, including apps, websites, user interface, and promotional campaigns. As a result, some Customers may experience features differently than others at any given time, for the purpose of improving the Platform and Customer experience.`,
      },
      { type: "sub", heading: "By using Sevenbites' Services, you agree to the following disclaimers:" },
      {
        type: "ul",
        items: [
          `The Content on the Services is for informational purposes only. Sevenbites disclaims any liability for information that may have become outdated. Sevenbites reserves the right to make changes and corrections to any part of the Content at any time without prior notice. Sevenbites does not guarantee the quality of food products, the prices listed in menus, or the availability of all menu items at any Restaurant Partner. Unless stated otherwise, all pictures and information on the Services are believed to be owned by or licensed to Sevenbites. If you are the copyright owner of any Content on the Services and believe its use violates your copyright, please email a takedown request via the "Contact Us" details in Section XVI, indicating the exact URL of the webpage in question.`,
          `Sevenbites reserves the right to charge a subscription and/or membership fee, platform fee, or any other charge on a per-order basis from Customers for use of the Platform, at any time in the future. "Platform Services" includes access to restaurant menus, facilitating order placement, facilitating delivery of ordered food, live order tracking, and customer support.`,
          `Sevenbites may from time to time offer credits, promo codes, vouchers, or cashback at its discretion, and reserves the right to modify, convert, cancel, or discontinue these at any time, subject to Section IX-A (Fraud Prevention, Investigation, and Recovery) below.`,
        ],
      },
    ],
  },
  {
    id: "use-of-services",
    title: "VI. Use of Services by You",
    blocks: [
      { type: "sub", heading: "1. Sevenbites Customer Account" },
      {
        type: "ol",
        marker: "letter",
        items: [
          `You must create an account to use certain features of the Services. Use of your personal information during account creation is governed by our Privacy Policy. You are solely responsible for maintaining the confidentiality and security of your account and password, and for all activities occurring under your account.`,
          `You may register using credentials from third-party social networking sites (e.g., Facebook, Google). You confirm you are the owner of any such account and are entitled to share its login information with us.`,
          `In creating an account, you represent that all information provided is true, accurate, and correct, and that you will update it as necessary. You may not impersonate someone else, create multiple accounts except as authorized, or provide false information to gain unauthorized access.`,
          `You agree to notify us immediately of any unauthorized use of your account. You agree not to allow any third party to use your Sevenbites account, and you will be liable for such unauthorized use.`,
          `By creating an account, you agree to receive certain communications related to the Sevenbites Platform. You may manage or opt out of non-essential communications through account settings.`,
        ],
      },
      { type: "sub", heading: "2. Other Terms" },
      {
        type: "ol",
        marker: "letter",
        items: [
          `To connect you with certain restaurants, we may provide telephony services through phone lines displayed on restaurant listing pages, which connect directly to the restaurant. We may record such calls for internal billing, tracking, and customer service improvement purposes. By using such telephony services, you consent to this recording.`,
          `You agree to use the Services only for purposes permitted by these Terms and applicable law.`,
          `You agree to use data owned by Sevenbites only for personal, non-commercial purposes, unless otherwise agreed in writing.`,
          `You agree not to access (or attempt to access) the Services by any means other than the interface provided by Sevenbites, including through automated means such as scripts or web crawlers, and to comply with any robots.txt instructions.`,
          `You agree not to engage in any activity that interferes with or disrupts the Services, including spamming or unsolicited messaging.`,
          `You acknowledge that the Services rely on Infrastructure Providers, and your use of certain features (such as payment) is additionally subject to Section XV ("Third-Party Service Providers") below.`,
        ],
      },
    ],
  },
  {
    id: "content",
    title: "VII. Content",
    blocks: [
      { type: "sub", heading: "1. Ownership of Sevenbites Content and Proprietary Rights" },
      {
        type: "p",
        text: `We are the sole and exclusive owner of the Services and our Content, including all copyrights, trademarks, service marks, logos, trade names, trade dress, and other intellectual property rights ("IP Rights") associated with the Services. You acknowledge that the Services may contain confidential information which you shall not disclose without our prior written consent. Nothing in these Terms grants you a right to use any of Sevenbites' trade names, trademarks, service marks, logos, domain names, or other brand features, unless agreed in writing.`,
      },
      {
        type: "p",
        text: `You agree not to use framing techniques to enclose any trademark or proprietary information of Sevenbites, or remove, conceal, or obliterate any copyright or proprietary notice. Any infringement may lead to legal proceedings for available remedies under applicable law.`,
      },
      {
        type: "p",
        text: `You acknowledge that any actual or threatened breach of Sevenbites' intellectual property rights, or any unauthorized scraping, reverse engineering, decompilation, or extraction of data from the Services (including menu, pricing, or ratings data), may cause irreparable harm to Sevenbites for which monetary damages would be an inadequate remedy. Accordingly, Sevenbites shall be entitled to seek injunctive or other equitable relief in addition to, and not in lieu of, any other remedies available at law or in equity, without the requirement to post any bond or furnish security, to the extent permitted under applicable law.`,
      },
      { type: "sub", heading: "2. Your License to Sevenbites Content" },
      {
        type: "p",
        text: `We grant you a personal, limited, non-exclusive, non-transferable license to access and use the Services as expressly permitted in these Terms, solely for personal, non-commercial use. You agree not to copy, distribute, modify, sell, or create derivative works of Sevenbites Content except as expressly authorized.`,
      },
      { type: "sub", heading: "3. Sevenbites License to Your Content" },
      {
        type: "p",
        text: `By submitting Your Content, you irrevocably grant Sevenbites a perpetual, irrevocable, worldwide, non-exclusive, fully paid, royalty-free, assignable, sub-licensable, and transferable license to use Your Content and all IP Rights therein for any purpose, in any media existing now or in the future, including copying, displaying, distributing, modifying, translating, reformatting, incorporating into advertisements, analyzing, promoting, commercializing, and creating derivative works. You waive any moral rights or attribution claims with respect to Your Content.`,
      },
      { type: "sub", heading: "4. Representations Regarding Your Content" },
      {
        type: "ol",
        marker: "letter",
        items: [
          `You represent that you are the sole author of, own, or otherwise control all rights in Your Content; that it was not copied from another source without permission; that it does not infringe any third-party rights; and that it is truthful, accurate, and complies with these Terms and applicable law.`,
          `If Your Content is a review, you represent that it reflects an actual dining/ordering experience, that you were not paid or remunerated for it, and that you had no incentive to post a review that is not a fair expression of your honest opinion.`,
          `You assume all risks associated with Your Content. Content posted by Customers, and any liability arising from it, is the sole responsibility of the Customer who posted it, not Sevenbites.`,
          `For any audio Content you upload, you agree to accurately declare whether it is "Synthetically Generated Information" (i.e., artificially or algorithmically created or altered audio that could be perceived as a natural human voice or real-world sound) when prompted. Providing a false declaration is a material breach of these Terms.`,
        ],
      },
      { type: "sub", heading: "5. Content Removal" },
      {
        type: "p",
        text: `We reserve the right, at any time and without prior notice, to remove, block, or disable access to any Content we consider objectionable, in violation of these Terms, or otherwise harmful to the Services or our Customers, in our sole discretion.`,
      },
      { type: "sub", heading: "6. Third Party Content and Links" },
      {
        type: "p",
        text: `The Services may include or link to materials belonging to third parties. Your use of such third-party services is governed by their own terms. We have no control over, and make no representation regarding, the accuracy, legality, or quality of any third-party product, service, or content appearing on or linked from the Services, and we are not liable for any loss or damage arising from your reliance on such content.`,
      },
      { type: "sub", heading: "7. Customer Reviews" },
      {
        type: "p",
        text: `Customer reviews and ratings reflect the personal opinions of the reviewer only and do not reflect Sevenbites' views. Sevenbites is a neutral platform that provides a means of communication between Customers and Restaurant Partners. If a Restaurant Partner believes a review violates our policies, it may contact us at info@adityaxinnovations.com, and Sevenbites may remove the review in its sole discretion.`,
      },
      { type: "sub", heading: "8. Intermediary Status and Safe Harbour" },
      {
        type: "p",
        text: `Sevenbites is an "intermediary" as defined under Section 2(1)(w) of the Information Technology Act, 2000, and functions as a "social media intermediary" and/or "e-commerce entity" to the extent applicable under the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 ("IT Rules"). Sevenbites observes due diligence in accordance with Rule 3 of the IT Rules, including by publishing these Terms, a Privacy Policy, and Content Guidelines, and shall not be treated as having knowledge of, or having initiated the transmission of, any unlawful Content merely by reason of hosting it. Sevenbites' safe harbour under Section 79 of the IT Act shall not be construed as waived, diminished, or affected by anything in these Terms. Nothing herein shall be construed as Sevenbites exercising editorial control over Customer or Third Party Content except as expressly permitted under Section IX (Restrictions on Use) and applicable law. Upon receiving actual knowledge, by way of a court order or notification by the appropriate government agency in accordance with applicable law, that any information, data, or communication link on the Platform is being used to commit an unlawful act, Sevenbites shall act within the timelines prescribed under the IT Rules to remove or disable access to such information, without thereby assuming any obligation to proactively monitor Content.`,
      },
    ],
  },
  {
    id: "content-guidelines-privacy",
    title: "VIII. Content Guidelines and Privacy Policy",
    blocks: [
      {
        type: "p",
        text: `You represent that you have read, understood, and agreed to our Content Guidelines and our Privacy Policy. We may disclose your information to third parties or authorities where reasonably necessary to comply with legal process, take action against suspected illegal activity, or protect our rights or those of our Customers.`,
      },
      {
        type: "term",
        term: "Data Protection.",
        text: `Sevenbites processes your personal data as a "Data Fiduciary" under the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 (together, "DPDP Law"), and in accordance with the Information Technology Act, 2000 and applicable rules, as further detailed in our Privacy Policy and any standalone consent notice presented to you. By using the Services, you consent to the collection, storage, use, sharing, and processing of your personal data for the specific purposes disclosed at the time of collection. Sevenbites shall: (a) retain your personal data only for so long as necessary for the specified purpose or as required by applicable law, subject to the minimum retention periods prescribed under DPDP Law for e-commerce entities; (b) implement reasonable security safeguards against unauthorized access, use, or disclosure of personal data; (c) notify the Data Protection Board of India and affected Data Principals of any personal data breach within the timelines prescribed under applicable law; and (d) not knowingly process the personal data of any individual under eighteen (18) years of age without verifiable parental or guardian consent. You may exercise your rights as a Data Principal — including the right to access, correct, update, or erase your personal data, and to withdraw consent — by writing to our designated privacy contact at info@adityaxinnovations.com. Where required under DPDP Law, Sevenbites shall appoint a Data Protection Officer or privacy grievance contact distinct from the IT Act Grievance Officer identified in Section XVII, and shall publish such contact details in the Privacy Policy.`,
      },
      {
        type: "term",
        term: "Cybersecurity.",
        text: `Sevenbites maintains reasonable security practices and procedures in accordance with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and the Indian Computer Emergency Response Team ("CERT-In") Directions issued under Section 70B of the IT Act, 2000, including maintenance of relevant logs and reporting of qualifying cybersecurity incidents to CERT-In within the timelines prescribed under applicable directions.`,
      },
    ],
  },
  {
    id: "restrictions-on-use",
    title: "IX. Restrictions on Use",
    blocks: [
      { type: "p", text: `In using the Services, you agree not to post, transmit, or engage in any content or activity that, in our sole discretion:` },
      {
        type: "ol",
        marker: "letter",
        items: [
          `Violates our Content Guidelines and Policies;`,
          `Is harmful, threatening, abusive, harassing, defamatory, discriminatory, vulgar, profane, obscene, or otherwise objectionable;`,
          `Constitutes an inauthentic or knowingly erroneous review;`,
          `Violates standards of good taste;`,
          `Violates any third-party right, including intellectual property, privacy, or publicity rights;`,
          `Accuses others of illegal activity or describes physical confrontations;`,
          `Is illegal or violates any applicable law or regulation;`,
          `Attempts to impersonate another person or entity;`,
          `Disguises the origin of Your Content, including via false identity or IP masking;`,
          `Is commercial in nature, including spam, contests, or reviews submitted or removed in exchange for payment;`,
          `Implies sponsorship or endorsement by Sevenbites not actually granted;`,
          `Falsely represents or conceals your affiliation with another person or entity;`,
          `Accesses or uses another Customer's account without permission;`,
          `Distributes viruses, malware, or other harmful code;`,
          `Interferes with or disrupts the Services or associated servers/networks;`,
          `Attempts to hack or access our confidential records without authorization;`,
          `Violates any contract or fiduciary relationship;`,
          `Attempts to decompile, reverse engineer, or derive source code from the Services;`,
          `Circumvents security or usage-limiting features of the Services;`,
          `Violates robots.txt or other access-limiting measures;`,
          `Collects or stores personal information about other Customers;`,
          `Is posted by a bot;`,
          `Harms minors in any way;`,
          `Threatens public order, national security, or incites offences;`,
          `Is patently false and published with intent to mislead or harass for financial gain or to cause injury.`,
        ],
      },
      {
        type: "p",
        text: `You are strictly prohibited from using our Services to create, host, or share any **Synthetically Generated Information** that:`,
      },
      {
        type: "ol",
        marker: "letter",
        items: [
          `Violates applicable Indian laws, including the Bharatiya Nyaya Sanhita, 2023, and the Protection of Children from Sexual Offences Act, 2012;`,
          `Contains child sexual abuse material, non-consensual intimate imagery, or is obscene or invasive of privacy;`,
          `Results in the creation of a false document or electronic record; or`,
          `Falsely depicts a real person or event in a manner likely to deceive others about their identity, actions, or statements.`,
        ],
      },
      {
        type: "p",
        text: `Sevenbites has no obligation to monitor use of the Services for violations but reserves the right to do so for fraud prevention, risk assessment, compliance, and customer support purposes.`,
      },
      {
        type: "p",
        text: `While communicating on the Sevenbites Platform (including with Restaurant Partners, support agents, or Delivery Partners), you agree not to use abusive or derogatory language or post unlawful, threatening, defamatory, or obscene content. Sevenbites reserves the right to suspend chat support or block your access, with or without notice, in the event of such misuse.`,
      },
      { type: "p", text: `We reserve the right to:` },
      {
        type: "ol",
        marker: "letter",
        items: [
          `Deploy technical measures to verify the accuracy of your declarations and apply a label or disclosure to Content verified as Synthetically Generated Information;`,
          `Immediately remove Content or suspend/terminate your account without prior notice for any violation; and`,
          `Disclose your identity and user details to a complainant who is a victim (or acting on behalf of a victim) of unlawful Synthetically Generated Information created or shared by you, as required by applicable law.`,
        ],
      },
    ],
  },
  {
    id: "fraud-prevention",
    title: "IX-A. Fraud Prevention, Investigation, and Recovery",
    blocks: [
      {
        type: "p",
        text: `1. Sevenbites employs automated and manual systems to detect fraud, abuse, and policy violations, including but not limited to: fake or bot-generated orders; GPS/location spoofing; coupon, promo-code, cashback, or referral-program abuse; chargeback fraud or payment reversal abuse; multiple or duplicate account creation to exploit first-order or referral offers; API abuse, scraping, or unauthorized data extraction; and collusive activity between Customers, Restaurant Partners, or Delivery Partners.`,
      },
      { type: "p", text: `2. Where Sevenbites reasonably suspects fraudulent, abusive, or unauthorized activity on an account, Sevenbites may, without prior notice:` },
      {
        type: "ul",
        items: [
          `place a temporary hold on the account, any pending refund, cashback, or payout;`,
          `reverse or claw back credits, cashback, discounts, or refunds obtained through fraudulent or abusive means, including by debiting the amount from any future order, wallet balance, or linked payment instrument;`,
          `suspend or permanently terminate the account and any linked accounts reasonably believed to be under common control;`,
          `report the matter to law enforcement, banks, payment aggregators/gateways, or card networks; and`,
          `share relevant transaction and device data with such authorities, or with other e-commerce/food-delivery platforms, for fraud-prevention purposes, subject to applicable data protection law.`,
        ],
      },
      {
        type: "p",
        text: `3. In the event of a payment chargeback initiated by you or your bank/card issuer in respect of an order that was validly placed and fulfilled, Sevenbites may pursue recovery of the full order value (including amounts payable to the Restaurant Partner and Delivery Partner) from you, and you shall indemnify Sevenbites for any resulting loss, including chargeback fees levied by the payment gateway or acquiring bank.`,
      },
      {
        type: "p",
        text: `4. Sevenbites reserves the right to set reasonable limits on the redemption of coupons, cashback, and referral bonuses per Customer, household, device, or payment instrument, and to disqualify Customers from such programs where abuse is suspected, in its sole reasonable discretion.`,
      },
    ],
  },
  {
    id: "customer-feedback",
    title: "X. Customer Feedback",
    blocks: [
      {
        type: "p",
        text: `If you share ideas, suggestions, or feedback regarding Sevenbites' existing business ("Feedback"), you agree that: (i) it does not contain confidential third-party information; (ii) Sevenbites is under no obligation of confidentiality regarding it; (iii) similar Feedback may already be under consideration; and (iv) you grant Sevenbites a binding, non-exclusive, royalty-free, perpetual, global license to use, modify, and distribute the Feedback, waiving any claims related to it.`,
      },
      {
        type: "p",
        text: `Sevenbites does not accept or consider unsolicited ideas for new products, campaigns, or business strategies ("Submissions"). If you submit such Submissions despite this request, they automatically become Sevenbites' property without compensation, and Sevenbites may use or redistribute them for any purpose with no obligation of confidentiality or review.`,
      },
    ],
  },
  {
    id: "advertising",
    title: "XI. Advertising",
    blocks: [
      {
        type: "p",
        text: `Some Services may be supported by advertising and may display promotions targeted based on your usage or queries. The manner and extent of advertising is subject to change without notice. Your dealings with advertisers found on the Platform are solely between you and the advertiser; Sevenbites is not responsible for any loss arising from such dealings.`,
      },
    ],
  },
  {
    id: "food-ordering-delivery",
    title: "XII. Food Ordering and Delivery",
    blocks: [
      {
        type: "ol",
        marker: "letter",
        items: [
          `Sevenbites provides food ordering and delivery services by entering into contractual arrangements with restaurant partners ("Restaurant Partners") on a principal-to-principal basis, for listing their menu items for ordering and delivery by Customers on the Sevenbites Platform.`,
          `Customers can access menu items listed on the Platform and place orders against Restaurant Partners through Sevenbites.`,
          `Your request to order food, beverages, or products from a Restaurant Partner via the Platform constitutes an unconditional and irrevocable authorization to Sevenbites to place that order on your behalf.`,
          `Delivery of an order may be undertaken directly by the Restaurant Partner, or facilitated by Sevenbites through a third party ("Delivery Partner"). In both cases, Sevenbites acts merely as an intermediary between you and the Delivery Partner, or you and the Restaurant Partner.`,
          `The acceptance by a Delivery Partner of an order constitutes a contract of service between you and the Delivery Partner, to which Sevenbites is not a party. Sevenbites does not provide delivery or logistics services itself and shall not be liable for any acts or omissions of the Delivery Partner, including deficiency in service, wrong delivery, delay, or order tampering.`,
          `Where Sevenbites facilitates delivery, your order may be grouped or batched with another order.`,
        ],
      },
      {
        type: "term",
        term: "Nature of Relationship with Delivery Partners.",
        text: `Delivery Partners are independent third-party service providers, or personnel of independent logistics/fleet entities, and are not employees, workers, or agents of Sevenbites. Nothing in these Terms, including Sevenbites' facilitation of order assignment, routing, or payment collection, shall be construed to create an employer-employee, principal-agent, partnership, or joint-venture relationship between Sevenbites and any Delivery Partner. Sevenbites' engagement with Delivery Partners is governed separately under applicable Delivery Partner agreements and is not a matter these Terms purport to regulate as between Sevenbites and Customers. Sevenbites is not an insurer, and any insurance coverage extended to Delivery Partners is governed by separate arrangements to which Sevenbites is not a guarantor.`,
      },
      {
        type: "p",
        text: `You may be charged a delivery fee (plus applicable taxes) ("Delivery Charges"), which may vary based on factors such as Restaurant Partner, order value, distance, and time of day. You agree that Sevenbites is authorized to collect Delivery Charges on behalf of the Restaurant Partner or Delivery Partner, and you remain responsible for these charges regardless of your awareness of them.`,
      },
      {
        type: "p",
        text: `In addition to Delivery Charges, you may be charged a delivery surge fee ("Delivery Surge") based on factors including distance, demand, weather, and traffic conditions. Sevenbites is authorized to collect this on behalf of the Restaurant Partner or Delivery Partner.`,
      },
      {
        type: "p",
        text: `Sevenbites shall issue relevant documents such as order summaries and tax invoices as per applicable legal regulations. Sevenbites acts as an "Electronic Commerce Operator" for the purposes of Section 9(5) of the Central Goods and Services Tax Act, 2017, and shall collect and remit applicable Goods and Services Tax on notified supplies made through the Platform, where such an obligation applies to Sevenbites under applicable GST law.`,
      },
      {
        type: "p",
        text: `You agree to treat Delivery Partners with dignity and not discriminate against them on the basis of race, community, religion, disability, gender, sexual orientation, gender identity, age (as permitted by law), genetic information, or other legally protected status.`,
      },
      { type: "sub", heading: "A. Pricing and Order Terms" },
      {
        type: "p",
        text: `All prices listed on the Platform are provided by the Restaurant Partner, including packaging or handling charges, and are displayed as received. While we strive to keep prices up to date, the final price charged by the Restaurant Partner at delivery may differ; in case of conflict, the Restaurant Partner's price shall prevail, except for Sevenbites' own Delivery Charge.`,
      },
      {
        type: "p",
        text: `Delivery/preparation time estimates shown at the time of ordering are approximate only, generated using automated systems described in Section V, and may vary.`,
      },
      { type: "sub", heading: "B. General Terms" },
      {
        type: "ol",
        marker: "letter",
        items: [
          `Sevenbites is not a manufacturer, seller, or distributor of food or beverages, and merely places orders on behalf of Customers pursuant to the authorization granted above, facilitating the sale and purchase of food between Customers and Restaurant Partners.`,
          `Sevenbites shall not be liable for any acts or omissions of the Restaurant Partner, including deficiency in service, order mismatch, quality, incorrect pricing, deficient quantity, or delay in preparation/delivery.`,
          `The Restaurant Partner is solely responsible for any warranty or guarantee regarding the food or products sold, and this shall in no event be Sevenbites' responsibility.`,
          `Liability for compliance with applicable food safety rules and regulations, including obtaining and maintaining a valid FSSAI licence or registration, rests solely with the sellers, vendors, Restaurant Partners, or manufacturers of the food products, including any Pre-Packed Goods as defined under the Food Safety and Standards Act, 2006.`,
          `Certain food and beverages may be suitable only for certain ages; you should review dish descriptions prior to ordering. Sevenbites is not liable if the food ordered does not meet your dietary requirements, allergy considerations, or restrictions.`,
          `When placing an order, you must provide accurate contact and delivery details and take particular care to ensure their accuracy and completeness.`,
          `You (or anyone instructed by you) shall not resell food or products purchased via the Sevenbites Platform.`,
          `The total price for food ordered, including Delivery Charges and other applicable charges, will be displayed on the Platform at the time of order, and may be rounded to the nearest amount. You shall make full payment for items ordered.`,
          `Any amount charged to you over and above the order value shall be subject to applicable taxes.`,
        ],
      },
      { type: "sub", heading: "C. Cancellation and Refund Policy" },
      {
        type: "p",
        text: `The detailed terms governing order cancellation and refunds are set out in Sevenbites' standalone Cancellation Policy and Refund Policy, each of which forms part of, and is incorporated by reference into, these Terms. In summary and without limitation to those policies:`,
      },
      {
        type: "ol",
        marker: "roman",
        items: [
          `No replacement, refund, or other resolution will be provided without the Restaurant Partner's permission, except where the Cancellation Policy or Refund Policy expressly provides otherwise.`,
          `No refund of charges for using the Platform Services will be provided unless the order is cancelled due to reasons attributable to Sevenbites (see Liquidated Damages clause below).`,
          `Any complaint regarding the order (e.g., food spillage, foreign objects, wrong order, poor quality) will require reasonable supporting evidence before a resolution can be provided.`,
          `You shall not be entitled to a refund if special instructions provided with the order are not followed exactly, as these are fulfilled by the Restaurant Partner on a best-efforts basis.`,
          `All refunds shall be processed in the same manner as they were received, unless provided as credits, subject to your bank's policies and the timelines set out in the Refund Policy.`,
        ],
      },
      { type: "sub", heading: "D. Liquidated Damages" },
      {
        type: "p",
        text: `You acknowledge that (1) your cancellation or attempted cancellation of an order, or (2) cancellation due to reasons attributable to you (e.g., incorrect contact details or delivery address, being unresponsive or unreachable), shall amount to a breach of your authorization to Sevenbites to place that order ("Authorization Breach"). In the event of an Authorization Breach, you shall be liable to pay liquidated damages equal to each component of the order value actually and demonstrably attributable to the Restaurant Partner, Delivery Partner, or any other concerned party (apart from Sevenbites), representing a genuine pre-estimate of the loss suffered by such party and not a penalty. Sevenbites shall only recover, on behalf of such parties, the actual amount payable to the Restaurant Partner and/or Delivery Partner in connection with the cancelled order, and shall not levy any additional punitive charge in the name of liquidated damages. You authorize Sevenbites to deduct or collect this amount, including from any payment made towards your next order.`,
      },
      {
        type: "p",
        text: `Where Sevenbites is unable to accept or must cancel your order for reasons including technical errors, unavailability of items, or reasons attributable to Sevenbites, the Restaurant Partner, or the Delivery Partner, no liquidated damages shall be charged, and any eligible refund of the order value shall be reversed to you in accordance with the Refund Policy.`,
      },
    ],
  },
  {
    id: "disclaimer-liability-indemnification",
    title: "XIII. Disclaimer of Warranties, Limitation of Liability, and Indemnification",
    blocks: [
      { type: "sub", heading: "1. Disclaimer of Warranties" },
      {
        type: "callout",
        text: `YOU ACKNOWLEDGE AND AGREE THAT THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" AND THAT YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, SEVENBITES, ITS AFFILIATES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS ("SEVENBITES PARTIES") DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES. SEVENBITES PARTIES MAKE NO WARRANTY REGARDING THE ACCURACY OR COMPLETENESS OF SERVICE CONTENT, AND ASSUME NO RESPONSIBILITY FOR ERRORS, INACCURACIES, PERSONAL INJURY, PROPERTY DAMAGE, UNAUTHORIZED ACCESS TO SERVERS, INTERRUPTIONS, VIRUSES, LOSS OF DATA, OR OMISSIONS IN CONTENT ARISING FROM USE OF THE SERVICES.`,
      },
      { type: "sub", heading: "2. Limitation of Liability" },
      { type: "p", text: `TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW:` },
      {
        type: "callout",
        text: `(a) IN NO EVENT SHALL THE SEVENBITES PARTIES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, EXEMPLARY, OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING LOSS OF PROFIT, GOODWILL, BUSINESS REPUTATION, OR DATA, ARISING FROM OR RELATING TO YOUR USE OF THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT SEVENBITES WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
      },
      {
        type: "callout",
        text: `(b) SUBJECT TO CLAUSE (c) BELOW, THE AGGREGATE LIABILITY OF THE SEVENBITES PARTIES ARISING OUT OF OR RELATING TO ANY CLAIM UNDER THESE TERMS, WHETHER IN CONTRACT, TORT, OR OTHERWISE, SHALL NOT EXCEED THE GREATER OF (I) THE TOTAL PLATFORM FEES PAID BY YOU TO SEVENBITES (EXCLUDING AMOUNTS PASSED THROUGH TO RESTAURANT PARTNERS OR DELIVERY PARTNERS) IN THE SIX (6) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (II) INR 5,000 (RUPEES FIVE THOUSAND ONLY).`,
      },
      {
        type: "callout",
        text: `(c) NOTHING IN THIS CLAUSE SHALL BE CONSTRUED TO LIMIT OR EXCLUDE SEVENBITES' LIABILITY FOR (I) DEATH OR PERSONAL INJURY CAUSED BY SEVENBITES' OWN PROVEN GROSS NEGLIGENCE OR WILFUL MISCONDUCT, (II) FRAUD OR FRAUDULENT MISREPRESENTATION BY SEVENBITES, OR (III) ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE INDIAN LAW, INCLUDING THE CONSUMER PROTECTION ACT, 2019.`,
      },
      {
        type: "p",
        text: `(d) You acknowledge that Sevenbites acts solely as a technology platform and intermediary connecting Customers, Restaurant Partners, and Delivery Partners, and that primary liability for food quality, food safety, and delivery performance rests with the Restaurant Partner and/or Delivery Partner respectively, as set out in this Section XII.`,
      },
      { type: "sub", heading: "3. Indemnification" },
      {
        type: "p",
        text: `You agree to indemnify, defend, and hold harmless the Sevenbites Parties from and against any third-party claims, damages, actions, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from or in connection with: (i) Your Content; (ii) your unauthorized use of the Services; (iii) your access to and use of the Services; (iv) your violation of another party's rights; (v) your breach of these Terms, including any infringement of intellectual property rights of a third party; or (vi) any fraudulent, abusive, or unauthorized activity conducted through your account, including chargebacks, coupon abuse, or referral abuse described in Section IX-A.`,
      },
    ],
  },
  {
    id: "termination",
    title: "XIV. Termination of Your Access to the Services",
    blocks: [
      {
        type: "p",
        text: `You can delete your account at any time by contacting us at info@adityaxinnovations.com or by following the in-app account deletion process.`,
      },
      {
        type: "p",
        text: `We may terminate your use of the Services and deny you access in our sole discretion, for any reason or no reason, including violation of these Terms or lack of use. Such termination may occur without prior notice. Sevenbites shall not be liable to you or any third party for the discontinuation or termination of your access.`,
      },
    ],
  },
  {
    id: "general-terms",
    title: "XV. General Terms",
    blocks: [
      {
        type: "term",
        term: "Interpretation",
        text: `Section headings are for reference only and do not affect interpretation of these Terms.`,
      },
      {
        type: "term",
        term: "Entire Agreement and Waiver",
        text: `These Terms, together with our Privacy Policy, Cancellation Policy, Refund Policy, and Content Guidelines, constitute the entire agreement between you and Sevenbites concerning the Services. No failure or delay by us in exercising any right shall operate as a waiver of that right.`,
      },
      {
        type: "term",
        term: "Severability",
        text: `If any provision of these Terms is deemed unlawful, invalid, or unenforceable, that provision shall be severed, and the remainder shall continue in full force and effect.`,
      },
      {
        type: "term",
        term: "Partnership or Agency",
        text: `Nothing in these Terms constitutes a partnership or agency between you and Sevenbites, and you have no authority to bind Sevenbites in any manner.`,
      },
      {
        type: "term",
        term: "Third-Party Service Providers",
        text: `The Services rely on Infrastructure Providers, including payment gateways and payment aggregators, SMS/OTP providers, cloud infrastructure and hosting providers, mapping and geolocation providers, and push-notification services. Sevenbites does not control, and is not responsible for, the availability, security, accuracy, or performance of services provided by Infrastructure Providers. Any failure, delay, error, or security incident originating from an Infrastructure Provider — including payment failures, delayed or non-delivery of OTPs, inaccurate map or location data, or service outages — shall not constitute a breach of these Terms by Sevenbites, and Sevenbites' sole obligation shall be to make commercially reasonable efforts to work with the relevant Infrastructure Provider to resolve the issue. Your use of payment gateway services is additionally subject to the terms and privacy policy of the relevant payment gateway/aggregator, and Sevenbites does not store your full card number, UPI PIN, or net-banking credentials, which are processed directly by RBI-regulated payment intermediaries.`,
      },
      {
        type: "term",
        term: "Governing Law",
        text: `These Terms shall be governed by the laws of India. Subject to the Arbitration clause below, the courts of Pune, Maharashtra shall have exclusive jurisdiction over any dispute arising under these Terms. For the recovery of any amount due from a Customer, including under Section IX-A (Fraud Prevention) or Section XII.D (Liquidated Damages), Sevenbites additionally reserves the right to institute proceedings before the courts having jurisdiction over the Customer's registered address or place of residence.`,
      },
      {
        type: "term",
        term: "Limitation Period",
        text: `You must commence any legal action against us within one (1) year after the alleged harm initially occurs. Failure to do so shall forever bar any claims regarding the same facts, notwithstanding any statute of limitations to the contrary, save to the extent such limitation is held unenforceable under applicable Indian law.`,
      },
      {
        type: "term",
        term: "Carrier Rates",
        text: `By accessing the Services through a mobile or other device, you may be subject to charges by your internet or mobile service provider; you are solely responsible for such costs.`,
      },
      {
        type: "term",
        term: "Linking and Framing",
        text: `You may not frame the Services. You may link to the Services provided you do not link them to any website containing inappropriate, defamatory, infringing, obscene, or unlawful content.`,
      },
      {
        type: "term",
        term: "Force Majeure",
        text: `Sevenbites shall not be liable for any delay or failure in performance of its obligations under these Terms to the extent such delay or failure is caused by circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, fire, flood, pandemic or epidemic, strikes, labour disputes, riots, war, governmental action or regulatory change, internet or telecommunications failures, cyberattacks or security incidents affecting Infrastructure Providers, or failure of third-party service providers (including Restaurant Partners, Delivery Partners, and Infrastructure Providers).`,
      },
      {
        type: "term",
        term: "Assignment",
        text: `Sevenbites may assign, transfer, or delegate any of its rights or obligations under these Terms, in whole or in part, to any affiliate or third party at any time, without your consent and without prior notice. You may not assign or transfer your rights or obligations under these Terms without Sevenbites' prior written consent.`,
      },
      {
        type: "term",
        term: "Notices",
        text: `Any notice required to be given by Sevenbites to you under these Terms may be given by email to the address associated with your account, by SMS, by in-app or push notification, or by posting on the Sevenbites Platform. Any notice you wish to give to Sevenbites should be sent in writing to info@adityaxinnovations.com or to our registered address set out in Section XVII.`,
      },
      {
        type: "term",
        term: "Dispute Resolution",
        text: `In the event of any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Services, you agree to first contact Sevenbites at info@adityaxinnovations.com and attempt to resolve the dispute informally within thirty (30) days. If the dispute is not resolved informally, either party may pursue the matter (a) before the appropriate Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019, at the Customer's option, or (b) before the courts of competent jurisdiction as set out under "Governing Law" above, or (c) through arbitration as set out below, at the Customer's option in the case of a Customer dispute.`,
      },
      {
        type: "term",
        term: "Arbitration",
        text: `This clause applies to disputes between Sevenbites and Restaurant Partners, Delivery Partners, vendors, and other business counterparties, and to any Customer dispute where the Customer elects arbitration in preference to approaching a Consumer Disputes Redressal Commission or a court. Any dispute, controversy, or claim arising out of or relating to these Terms, including its formation, breach, termination, or validity, which is not resolved through the informal resolution process above within thirty (30) days, shall be referred to and finally resolved by arbitration administered under the Arbitration and Conciliation Act, 1996 (as amended). The arbitration shall be conducted by a sole arbitrator appointed by Sevenbites, the seat and venue of arbitration shall be Pune, Maharashtra, the language of arbitration shall be English, and the arbitral award shall be final and binding on the parties. Nothing in this clause shall be construed to affect a Customer's right under Section 100 of the Consumer Protection Act, 2019, to approach the appropriate Consumer Disputes Redressal Commission, at the Customer's sole option.`,
      },
      {
        type: "term",
        term: "Language",
        text: `These Terms are drawn up in the English language. In the event of any conflict between the English version and any translation, the English version shall prevail.`,
      },
      {
        type: "term",
        term: "Survival",
        text: `The provisions relating to Content licenses, Disclaimer of Warranties, Limitation of Liability, Indemnification, Fraud Prevention and Recovery, Governing Law, Arbitration, and Dispute Resolution shall survive the termination of your account or these Terms.`,
      },
    ],
  },
  {
    id: "copyright-infringement",
    title: "XVI. Notice of Copyright Infringement",
    blocks: [
      {
        type: "p",
        text: `Sevenbites respects the intellectual property rights of others and requires those using the Services to do the same. We may remove or disable access to material that infringes upon the copyright rights of others. If you believe your copyright has been infringed by material found on the Services, please send a written notification to info@adityaxinnovations.com including:`,
      },
      {
        type: "ol",
        marker: "roman",
        items: [
          `Identification of the copyrighted material you claim has been infringed;`,
          `Identification of the material on the Services you allege is infringing, with sufficient information to locate it;`,
          `A statement: "I have a good faith belief that the use of the content on the Services as described above is not authorized by the copyright owner, its agent, or law";`,
          `A statement: "I swear under penalty of perjury that the information in my notice is accurate and I am the copyright owner or authorized to act on the copyright owner's behalf";`,
          `Your contact information (address, phone number, email);`,
          `Your physical or electronic signature.`,
        ],
      },
      {
        type: "p",
        text: `You may be subject to liability if you knowingly make misrepresentations in a take-down notice.`,
      },
    ],
  },
  {
    id: "contact",
    title: "XVII. Contact Us",
    blocks: [
      { type: "p", text: `**Legal Entity Name:** Adityax Innovations Private Limited` },
      { type: "p", text: `**CIN:** U62011PN2026PTC253422` },
      {
        type: "p",
        text: `**Registered Address:** 107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India`,
      },
      { type: "p", text: `**Platform:** Sevenbites (website and mobile application)` },
      { type: "p", text: `**Contact Email:** info@adityaxinnovations.com` },
      { type: "sub", heading: "Grievance Redressal" },
      {
        type: "p",
        text: `For any order-related issue, please reach out to us via in-app chat support or write to us at info@adityaxinnovations.com. In accordance with the Consumer Protection (E-Commerce) Rules, 2020, we will acknowledge your grievance within forty-eight (48) hours of receipt and will endeavour to redress it within one (1) month from the date of receipt, or within such timeline as may be prescribed under applicable law from time to time.`,
      },
      { type: "sub", heading: "Grievance Officer" },
      { type: "p", text: `Aditya Yadav` },
      { type: "p", text: `Adityax Innovations Private Limited` },
      { type: "p", text: `107 Swayambhu Srushti, Tupe Vasti Road, Urulikanchan, Haveli, Pune – 412202, Maharashtra, India` },
      { type: "p", text: `Email: info@adityaxinnovations.com` },
      {
        type: "p",
        text: `In compliance with the Information Technology Act, 2000 and the rules made thereunder, as well as the Consumer Protection Act, 2019, the above Grievance Officer contact is provided for redressal of Customer grievances.`,
      },
      {
        type: "term",
        term: "Data Protection / Privacy Contact:",
        text: `Until a separate Data Protection Officer is designated and published in the Privacy Policy, all Data Principal requests and privacy-related grievances under the Digital Personal Data Protection Act, 2023 may also be directed to info@adityaxinnovations.com.`,
      },
      {
        type: "term",
        term: "Please note:",
        text: `Sevenbites does not solicit confidential information such as OTP, CVV, PIN, or card numbers through calls, emails, or any other means. Please do not share such details with anyone claiming to represent Sevenbites. Report suspicious activity to info@adityaxinnovations.com.`,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

// Renders **bold** markdown-style spans within a plain string.
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function letterAt(i: number): string {
  return String.fromCharCode(97 + i); // a, b, c, ...
}

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
function romanAt(i: number): string {
  return ROMAN[i] ?? String(i + 1);
}

function renderBlock(block: Block, idx: number): ReactNode {
  switch (block.type) {
    case "p":
      return (
        <p key={idx} className="text-gray-700 leading-relaxed text-base mb-4 last:mb-0">
          {renderInline(block.text)}
        </p>
      );
    case "callout":
      return (
        <div
          key={idx}
          className="text-gray-800 leading-relaxed text-sm mb-4 last:mb-0 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-medium tracking-tight"
        >
          {block.text}
        </div>
      );
    case "ul":
      return (
        <ul key={idx} className="list-disc pl-6 space-y-2.5 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="text-gray-700 leading-relaxed text-base">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="pl-6 space-y-2.5 my-4 list-outside">
          {block.items.map((item, i) => (
            <li key={i} className="text-gray-700 leading-relaxed text-base pl-1">
              <span className="font-medium text-gray-500 mr-2">
                {block.marker === "letter" ? `${letterAt(i)}.` : `${romanAt(i)}.`}
              </span>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
    case "sub":
      return (
        <h3 key={idx} className="font-poppins font-semibold text-lg text-gray-900 mt-6 mb-3 first:mt-0">
          {block.heading}
        </h3>
      );
    case "term":
      return (
        <p key={idx} className="text-gray-700 leading-relaxed text-base mb-4 last:mb-0">
          <strong className="font-semibold text-gray-900">{block.term}</strong>{" "}
          {renderInline(block.text)}
        </p>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function TermsClient() {
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
            Terms of Service
          </h1>
          <p className="italic text-gray-500 text-base mb-10">
            Last updated on {LAST_UPDATED}.
          </p>
        </motion.div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-base mb-12">
          Thank you for using Sevenbites. These Terms of Service (the &quot;Terms&quot;) govern your access to and use
          of the Sevenbites website and any related mobile or software applications (collectively, the{" "}
          <strong className="font-semibold text-gray-900">&quot;Sevenbites Platform&quot;</strong>), operated by{" "}
          <strong className="font-semibold text-gray-900">Adityax Innovations Private Limited</strong> (&quot;Sevenbites&quot;,
          &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing or using the Sevenbites Platform, you agree to
          these Terms. This document should be read together with our Privacy Policy, Cancellation Policy, Refund
          Policy, and Content Guidelines, each of which is incorporated by reference into these Terms.
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
              {section.blocks.map((block, idx) => renderBlock(block, idx))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}