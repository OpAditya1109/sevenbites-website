import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how SevenBites collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | SevenBites",
    description: "Learn how SevenBites collects, uses, and protects your personal information.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
