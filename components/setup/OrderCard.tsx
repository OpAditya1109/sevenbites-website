"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Phone, MapPin, IndianRupee, ChevronRight, X } from "lucide-react";
import { Order, OrderStatus } from "@/lib/ordersApi";

const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "New Order",
  confirmed: "Accepted",
  preparing: "Preparing",
  ready: "Ready for Pickup",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  rejected: "Rejected",
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  placed: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  preparing: "bg-orange-50 text-orange-700 border-orange-200",
  ready: "bg-purple-50 text-purple-700 border-purple-200",
  out_for_delivery: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-gray-100 text-gray-500 border-gray-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs} hr ${mins % 60}m ago`;
}

export default function OrderCard({
  order,
  onAccept,
  onReject,
  onAdvance,
  busy,
}: {
  order: Order;
  onAccept: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onAdvance: (id: string, next: OrderStatus) => void;
  busy?: boolean;
}) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  const customerName = typeof order.userId === "object" ? order.userId.name || "Customer" : "Customer";
  const customerPhone = typeof order.userId === "object" ? order.userId.phone : undefined;

  const nextAction: Partial<Record<OrderStatus, { label: string; next: OrderStatus }>> = {
    confirmed: { label: "Start Preparing", next: "preparing" },
    preparing: { label: "Mark Ready", next: "ready" },
    ready: { label: "Out for Delivery", next: "out_for_delivery" },
    out_for_delivery: { label: "Mark Delivered", next: "delivered" },
  };
  const action = nextAction[order.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-semibold text-gray-900 text-sm">#{order._id.slice(-6).toUpperCase()}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            {timeAgo(order.createdAt)}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${STATUS_STYLE[order.status]}`}>
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      <div className="border-t border-gray-50 pt-3 space-y-1.5 mb-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-gray-700">
              <span className="font-medium text-gray-900">{item.quantity}x</span> {item.name}
            </span>
            <span className="text-gray-500">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-50 pt-3 flex items-center justify-between text-sm mb-3">
        <span className="text-gray-500">Total</span>
        <span className="font-semibold text-gray-900 flex items-center">
          <IndianRupee className="w-3.5 h-3.5" />
          {order.totalAmount}
        </span>
      </div>

      <div className="border-t border-gray-50 pt-3 space-y-1.5 mb-4">
        <p className="text-sm font-medium text-gray-800">{customerName}</p>
        {customerPhone && (
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> {customerPhone}
          </p>
        )}
        <p className="text-xs text-gray-500 flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {order.deliveryAddress}
        </p>
      </div>

      {order.status === "placed" && !rejecting && (
        <div className="flex gap-2">
          <button
            disabled={busy}
            onClick={() => onAccept(order._id)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Accept
          </button>
          <button
            disabled={busy}
            onClick={() => setRejecting(true)}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Reject
          </button>
        </div>
      )}

      {rejecting && (
        <div className="space-y-2">
          <input
            autoFocus
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (e.g. Item out of stock)"
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
          />
          <div className="flex gap-2">
            <button
              disabled={busy}
              onClick={() => onReject(order._id, reason || "Rejected by restaurant")}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Confirm Reject
            </button>
            <button onClick={() => setRejecting(false)} className="px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {action && (
        <button
          disabled={busy}
          onClick={() => onAdvance(order._id, action.next)}
          className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          {action.label}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {order.status === "rejected" && order.rejectionReason && (
        <p className="text-xs text-red-500 mt-1">Reason: {order.rejectionReason}</p>
      )}
    </motion.div>
  );
}