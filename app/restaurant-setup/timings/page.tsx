import type { Metadata } from "next";
import TimingsClient from "./TimingsClient";

export const metadata: Metadata = {
  title: "Restaurant Timings — Setup",
};

export default function TimingsPage() {
  return <TimingsClient />;
}