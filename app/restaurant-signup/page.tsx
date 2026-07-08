import type { Metadata } from "next";
import RestaurantSignupClient from "./RestaurantSignupClient";

export const metadata: Metadata = {
  title: "Restaurant Signup",
  description: "Partner with SevenBites. List your restaurant and reach thousands of customers.",
};

export default function RestaurantSignupPage() {
  return <RestaurantSignupClient />;
}