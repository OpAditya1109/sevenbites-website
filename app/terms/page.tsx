import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Terms & Conditions for using SevenBites food delivery platform.",
  openGraph: {
    title: "Terms & Conditions | SevenBites",
    description: "Read the Terms & Conditions for using SevenBites.",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
