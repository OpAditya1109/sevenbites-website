import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu Management — Setup",
};

export default function MenuPage() {
  return <MenuClient />;
}