import { io, Socket } from "socket.io-client";
import { API_BASE_URL, RESTAURANT_TOKEN_KEY } from "./restaurantApi";

export { RESTAURANT_TOKEN_KEY };

// ---------------------------------------------------------------------------
// Types — mirror the Order schema in the backend
// ---------------------------------------------------------------------------

export interface OrderItem {
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariants?: { groupName: string; optionLabel: string; priceDelta: number }[];
  selectedAddOns?: { name: string; price: number }[];
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "rejected";

export interface Order {
  _id: string;
  userId: { _id: string; name?: string; phone?: string } | string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  paymentMethod: "upi" | "card" | "cod" | "wallet";
  paymentStatus: "pending" | "paid" | "failed";
  deliveryAddress: string;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  confirmedAt?: string;
  preparingAt?: string;
  readyAt?: string;
  outForDeliveryAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export interface ApiError {
  status?: number;
  message?: string;
}

export function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object") {
    const e = err as ApiError;
    return e.message || fallback;
  }
  return fallback;
}

async function handle<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data } as ApiError;
  return data as T;
}

// ---------------------------------------------------------------------------
// REST calls
// ---------------------------------------------------------------------------

export async function fetchRestaurantOrders(token: string, status?: string) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await fetch(`${API_BASE_URL}/api/setup/orders${qs}`, { headers: authHeaders(token) });
  return handle<{ success: true; data: Order[] }>(res);
}

export async function fetchRestaurantOrderById(token: string, id: string) {
  const res = await fetch(`${API_BASE_URL}/api/setup/orders/${id}`, { headers: authHeaders(token) });
  return handle<{ success: true; data: Order }>(res);
}

export async function respondToOrder(token: string, id: string, action: "accept" | "reject", reason?: string) {
  const res = await fetch(`${API_BASE_URL}/api/setup/orders/${id}/respond`, {
    method: "PATCH",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ action, reason }),
  });
  return handle<{ success: true; data: Order }>(res);
}

export async function updateRestaurantOrderStatus(token: string, id: string, status: OrderStatus) {
  const res = await fetch(`${API_BASE_URL}/api/setup/orders/${id}/status`, {
    method: "PATCH",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return handle<{ success: true; data: Order }>(res);
}

// ---------------------------------------------------------------------------
// Live updates — one shared Socket.io connection for the dashboard
// ---------------------------------------------------------------------------

let socket: Socket | null = null;

export function getRestaurantSocket(restaurantId: string): Socket {
  if (!socket) {
    socket = io(API_BASE_URL, { transports: ["websocket"], autoConnect: true });
  }
  socket.on("connect", () => socket?.emit("join_restaurant_room", restaurantId));
  if (socket.connected) socket.emit("join_restaurant_room", restaurantId);
  return socket;
}

export function disconnectRestaurantSocket() {
  socket?.disconnect();
  socket = null;
}