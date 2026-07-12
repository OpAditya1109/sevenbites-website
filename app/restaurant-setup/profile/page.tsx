import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Restaurant Profile — Setup",
};

export default function ProfilePage() {
  return <ProfileClient />;
}