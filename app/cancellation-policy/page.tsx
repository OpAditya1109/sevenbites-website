import type { Metadata } from "next";
import CancellationClient from "./CancellationClient";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "Learn how order cancellations work on SevenBites, including free cancellation windows and charges.",
  openGraph: {
    title: "Cancellation Policy | SevenBites",
    description: "Learn how order cancellations work on SevenBites, including free cancellation windows and charges.",
    type: "website",
  },
};

export default function CancellationPolicyPage() {
  return <CancellationClient />;
}