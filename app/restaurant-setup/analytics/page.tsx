import type { Metadata } from "next";
import AnalyticsClient from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics — Setup",
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}