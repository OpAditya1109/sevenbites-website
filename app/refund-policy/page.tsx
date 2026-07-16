import type { Metadata } from "next";
import RefundClient from "./RefundClient";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Learn how SevenBites handles refunds for your food and delivery orders.",
  openGraph: {
    title: "Refund Policy | SevenBites",
    description: "Learn how SevenBites handles refunds for your food and delivery orders.",
    type: "website",
  },
};

export default function RefundPolicyPage() {
  return <RefundClient />;
}