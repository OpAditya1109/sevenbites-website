import type { Metadata } from "next";
import OrdersClient from "./OrdersClient";

export const metadata: Metadata = {
  title: "Orders — Setup",
};

export default function OrdersPage() {
  return <OrdersClient />;
}