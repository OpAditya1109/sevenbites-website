import type { Metadata } from "next";
import RestaurantLoginClient from "./RestaurantLoginClient";

export const metadata: Metadata = {
  title: "Restaurant Login",
  description: "Log in to your SevenBites restaurant partner dashboard.",
};

export default function RestaurantLoginPage() {
  return <RestaurantLoginClient />;
}