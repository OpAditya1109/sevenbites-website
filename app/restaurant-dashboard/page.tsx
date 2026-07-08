import type { Metadata } from "next";
import RestaurantDashboardClient from "./RestaurantDashboardClient";

export const metadata: Metadata = {
  title: "Restaurant Dashboard",
  description: "Manage your SevenBites restaurant partner account.",
};

export default function RestaurantDashboardPage() {
  return <RestaurantDashboardClient />;
}