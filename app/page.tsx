import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SevenBites — Discover Great Food Around You",
  description:
    "Order food online from the best restaurants near you. Fast delivery, live tracking, and amazing deals on SevenBites.",
  keywords: ["food delivery", "order food online", "restaurants near me", "SevenBites"],
  openGraph: {
    title: "SevenBites — Discover Great Food Around You",
    description: "Order food online from the best restaurants near you.",
    type: "website",
    siteName: "SevenBites",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
