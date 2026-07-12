"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SetupSidebar from "@/components/setup/SetupSidebar";
import { SetupShellContext } from "@/components/setup/SetupShellContext";
import { fetchSetupProfile, RESTAURANT_TOKEN_KEY } from "@/lib/setupApi";

export default function RestaurantSetupLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      router.push("/restaurant-login");
      return;
    }
    // The Setup Module is only for approved restaurants — a pending/rejected
    // partner gets sent back to the application-status dashboard instead.
    fetchSetupProfile(token)
      .then((res) => {
        if (res.restaurant.status !== "approved") {
          router.push("/restaurant-dashboard");
          return;
        }
        // One-time auth+approval gate on mount: reads an external source
        // (the API) and syncs it into React state. Runs once, no cascade.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReady(true);
      })
      .catch(() => {
        router.push("/restaurant-login");
      });
  }, [router]);

  if (!ready) {
    return <div className="min-h-screen bg-[#F6FAF8]" />;
  }

  return (
    <SetupShellContext.Provider value={{ openMobileMenu: () => setMobileOpen(true) }}>
      <div className="min-h-screen bg-[#F6FAF8]">
        <SetupSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="lg:pl-64">{children}</div>
      </div>
    </SetupShellContext.Provider>
  );
}