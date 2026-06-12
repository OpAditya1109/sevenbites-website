import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SevenBites. Our support team is available 24/7 to help with orders, partnerships, and more.",
  openGraph: {
    title: "Contact | SevenBites",
    description: "Get in touch with SevenBites. Support available 24/7.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
