import type { Metadata } from "next";
import RestaurantsClient from "./RestaurantsClient";

export const metadata: Metadata = {
  title: "Restaurants",
  description: "Browse thousands of restaurants and cuisines near you. Filter by rating, delivery time, and more.",
  openGraph: {
    title: "Restaurants | SevenBites",
    description: "Browse thousands of restaurants and cuisines near you.",
    type: "website",
  },
};

export default function RestaurantsPage() {
  return <RestaurantsClient />;
}
