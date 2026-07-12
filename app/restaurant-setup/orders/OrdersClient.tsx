"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Inbox, RefreshCw } from "lucide-react";
import SetupTopbar from "@/components/setup/SetupTopbar";
import { useSetupShell } from "@/components/setup/SetupShellContext";
import OrderCard from "@/components/setup/OrderCard";
import { fetchSetupProfile, RESTAURANT_TOKEN_KEY } from "@/lib/setupApi";
import {
  fetchRestaurantOrders,
  respondToOrder,
  updateRestaurantOrderStatus,
  getRestaurantSocket,
  Order,
  OrderStatus,
  getErrorMessage,
} from "@/lib/ordersApi";

type Tab = "new" | "active" | "history";

const TAB_STATUS: Record<Tab, string> = {
  new: "placed",
  active: "confirmed,preparing,ready,out_for_delivery",
  history: "delivered,cancelled,rejected",
};

export default function OrdersClient() {
  const { openMobileMenu } = useSetupShell();
  const [tab, setTab] = useState<Tab>("new");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");

  const load = useCallback(async (t: Tab) => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetchRestaurantOrders(token, TAB_STATUS[t]);
      setOrders(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Could not load orders"));
    } finally {
      setLoading(false);
    }
  }, []);

  // Simple two-tone beep via Web Audio API — no external sound file needed
  function playAlert() {
    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      [880, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.18);
        osc.stop(ctx.currentTime + i * 0.18 + 0.35);
      });
    } catch {
      // Audio isn't critical — a browser blocking autoplay shouldn't break the dashboard
    }
  }

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    fetchSetupProfile(token).then((res) => {
      setRestaurantName(res.restaurant.restaurantName);
      setRestaurantId(res.restaurant._id);
    });
  }, []);

useEffect(() => {
  // Fetch-on-mount/tab-change pattern — load() sets loading state synchronously
  // before its first await, same as the auth check in restaurant-setup/layout.tsx
  // eslint-disable-next-line react-hooks/set-state-in-effect
  load(tab);
}, [tab, load]);

  // Socket.io — live push the instant a new order lands or a status changes elsewhere
  useEffect(() => {
    if (!restaurantId) return;
    const socket = getRestaurantSocket(restaurantId);

    function handleNewOrder(order: Order) {
      playAlert();
      setTab((current) => {
        if (current === "new") setOrders((prev) => [order, ...prev]);
        return current;
      });
    }

    function handleStatusUpdate(updated: Order) {
      setOrders((prev) => prev.map((o) => (o._id === updated._id ? updated : o)));
    }

    socket.on("new_order", handleNewOrder);
    socket.on("order_status_updated", handleStatusUpdate);

    return () => {
      socket.off("new_order", handleNewOrder);
      socket.off("order_status_updated", handleStatusUpdate);
    };
  }, [restaurantId]);

  async function handleAccept(id: string) {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    setBusyId(id);
    try {
      await respondToOrder(token, id, "accept");
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setError(getErrorMessage(err, "Could not accept order"));
    } finally {
      setBusyId(null);
    }
  }

  async function handleReject(id: string, reason: string) {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    setBusyId(id);
    try {
      await respondToOrder(token, id, "reject", reason);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setError(getErrorMessage(err, "Could not reject order"));
    } finally {
      setBusyId(null);
    }
  }

  async function handleAdvance(id: string, next: OrderStatus) {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    setBusyId(id);
    try {
      const res = await updateRestaurantOrderStatus(token, id, next);
      if (tab === "active" && next === "delivered") {
        setOrders((prev) => prev.filter((o) => o._id !== id));
      } else {
        setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
      }
    } catch (err) {
      setError(getErrorMessage(err, "Could not update order"));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <SetupTopbar title="Orders" restaurantName={restaurantName} onMenuClick={openMobileMenu} />

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex rounded-xl border border-gray-200 p-1 bg-white">
            {([
              ["new", "New"],
              ["active", "Active"],
              ["history", "History"],
            ] as [Tab, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  tab === key ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {label}
                {key === "new" && tab === "new" && orders.length > 0 && (
                  <span className="ml-1.5 text-xs">({orders.length})</span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => load(tab)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>
        )}

        {!loading && orders.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No orders here right now.</p>
            {tab === "new" && <p className="text-xs mt-1">New orders will appear instantly with a sound alert.</p>}
          </div>
        )}

        <div className="space-y-3">
          <AnimatePresence>
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onAccept={handleAccept}
                onReject={handleReject}
                onAdvance={handleAdvance}
                busy={busyId === order._id}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}