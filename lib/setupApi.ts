import { API_BASE_URL, RESTAURANT_TOKEN_KEY } from "./restaurantApi";

export { RESTAURANT_TOKEN_KEY };

// ---------------------------------------------------------------------------
// Types — mirror the Mongoose schemas in the backend 1:1 so the same shape
// flows straight through to the Customer App with no re-mapping.
// ---------------------------------------------------------------------------

export interface SetupRestaurantProfile {
  _id: string;
  restaurantName: string;
  description?: string;
  cuisineType?: string;
  address: string;
  city: string;
  pincode: string;
  contactNumber: string;
  email: string;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  googleMapLink?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  deliveryRadiusKm: number;
  fssaiLicenseNumber: string;
  gstNumber?: string | null;
  status: "pending" | "approved" | "rejected";
}

export interface DaySchedule {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breakStart?: string | null;
  breakEnd?: string | null;
}

export interface Holiday {
  date: string;
  reason?: string;
}

export interface RestaurantTiming {
  _id?: string;
  weeklySchedule: DaySchedule[];
  deliveryHours: {
    sameAsOpeningHours: boolean;
    openTime: string;
    closeTime: string;
  };
  holidays: Holiday[];
  isTemporarilyClosed: boolean;
  temporaryCloseReason?: string;
  temporaryCloseUntil?: string | null;
}

export interface Category {
  _id: string;
  name: string;
  image?: string | null;
  order: number;
  status: "active" | "inactive";
}

export interface VariantOption {
  label: string;
  priceDelta: number;
}
export interface VariantGroup {
  name: string;
  required: boolean;
  options: VariantOption[];
}
export interface AddOn {
  name: string;
  price: number;
  inStock: boolean;
}

export interface MenuItem {
  _id: string;
  category: { _id: string; name: string } | string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  effectivePrice?: number;
  foodType: "veg" | "non-veg" | "egg";
  isBestseller: boolean;
  isRecommended: boolean;
  prepTimeMinutes: number;
  images: string[];
  isAvailable: boolean;
  stockStatus: "in_stock" | "out_of_stock" | "limited";
  addOns: AddOn[];
  variants: VariantGroup[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

// Shape of errors thrown by handle() below — lets every catch block avoid `any`
export interface ApiError {
  status?: number;
  message?: string;
  errors?: Record<string, string>;
}

export function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object") {
    const e = err as ApiError;
    const firstFieldError = e.errors ? Object.values(e.errors)[0] : undefined;
    return firstFieldError || e.message || fallback;
  }
  return fallback;
}

async function handle<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data } as ApiError;
  return data as T;
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export async function fetchSetupProfile(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/setup/profile`, { headers: authHeaders(token) });
  return handle<{ success: true; restaurant: SetupRestaurantProfile }>(res);
}

export async function updateSetupProfile(token: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/setup/profile`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: formData,
  });
  return handle<{ success: true; restaurant: SetupRestaurantProfile }>(res);
}

// ---------------------------------------------------------------------------
// Timings
// ---------------------------------------------------------------------------

export async function fetchTimings(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/setup/timings`, { headers: authHeaders(token) });
  return handle<{ success: true; timing: RestaurantTiming }>(res);
}

export async function saveTimings(token: string, timing: Partial<RestaurantTiming>) {
  const res = await fetch(`${API_BASE_URL}/api/setup/timings`, {
    method: "PUT",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify(timing),
  });
  return handle<{ success: true; timing: RestaurantTiming }>(res);
}

export async function setTemporaryClose(
  token: string,
  payload: { isTemporarilyClosed: boolean; temporaryCloseReason?: string; temporaryCloseUntil?: string | null }
) {
  const res = await fetch(`${API_BASE_URL}/api/setup/timings/temporary-close`, {
    method: "PATCH",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle<{ success: true; timing: RestaurantTiming }>(res);
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function fetchCategories(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/setup/categories`, { headers: authHeaders(token) });
  return handle<{ success: true; categories: Category[] }>(res);
}

export async function createCategory(token: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/setup/categories`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return handle<{ success: true; category: Category }>(res);
}

export async function updateCategory(token: string, id: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/setup/categories/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: formData,
  });
  return handle<{ success: true; category: Category }>(res);
}

export async function deleteCategory(token: string, id: string) {
  const res = await fetch(`${API_BASE_URL}/api/setup/categories/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handle<{ success: true }>(res);
}

export async function reorderCategories(token: string, order: { id: string; order: number }[]) {
  const res = await fetch(`${API_BASE_URL}/api/setup/categories/reorder`, {
    method: "PATCH",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ order }),
  });
  return handle<{ success: true; categories: Category[] }>(res);
}

// ---------------------------------------------------------------------------
// Menu items
// ---------------------------------------------------------------------------

export async function fetchMenuItems(
  token: string,
  filters: { search?: string; category?: string; foodType?: string; availability?: string; bestseller?: string } = {}
) {
  const params = new URLSearchParams(Object.entries(filters).filter(([, v]) => v) as [string, string][]);
  const res = await fetch(`${API_BASE_URL}/api/setup/menu-items?${params.toString()}`, {
    headers: authHeaders(token),
  });
  return handle<{ success: true; items: MenuItem[] }>(res);
}

export async function createMenuItem(token: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/setup/menu-items`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return handle<{ success: true; item: MenuItem }>(res);
}

export async function updateMenuItem(token: string, id: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/setup/menu-items/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: formData,
  });
  return handle<{ success: true; item: MenuItem }>(res);
}

export async function toggleMenuItemAvailability(token: string, id: string, isAvailable: boolean) {
  const res = await fetch(`${API_BASE_URL}/api/setup/menu-items/${id}/availability`, {
    method: "PATCH",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ isAvailable }),
  });
  return handle<{ success: true; item: MenuItem }>(res);
}

export async function deleteMenuItem(token: string, id: string) {
  const res = await fetch(`${API_BASE_URL}/api/setup/menu-items/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return handle<{ success: true }>(res);
}

export async function bulkImportMenuItems(token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE_URL}/api/setup/menu-items/bulk-import`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });
  return handle<{ success: true; created: number; failed: { row: number; reason: string }[] }>(res);
}


// ---------------------------------------------------------------------------
// Analytics / Settlement
// ---------------------------------------------------------------------------

export interface BestSellingItem {
  name: string;
  totalQuantity: number;
}

export interface RestaurantPayout {
  _id: string;
  restaurantId: string;
  periodStart: string;
  periodEnd: string;
  totalOrders: number;
  totalNetSettlement: number;
  payoutStatus: "pending" | "processed";
  payoutDate?: string | null;
  transactionRef?: string;
  notes?: string;
  createdAt: string;
}

export interface RestaurantAnalytics {
  totalOrders: number;
  totalSales: number;
  commissionDeducted: number;
  fulfilmentCharges: number;
  paymentGatewayCharges: number;
  netSettlement: number;
  bestSellingItems: BestSellingItem[];
  payoutHistory: RestaurantPayout[];
}

export async function fetchRestaurantAnalytics(
  token: string,
  range: { from?: string; to?: string } = {}
) {
  const params = new URLSearchParams(Object.entries(range).filter(([, v]) => v) as [string, string][]);
  const qs = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`${API_BASE_URL}/api/setup/orders/analytics${qs}`, { headers: authHeaders(token) });
  return handle<{ success: true; data: RestaurantAnalytics }>(res);
}