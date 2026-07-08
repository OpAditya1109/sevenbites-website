export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001";
export interface RestaurantProfile {
  _id: string;
  restaurantName: string;
  ownerName: string;
  contactNumber: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  cuisineType?: string;
  description?: string;
  restaurantImages: string[];
  menuImages: string[];
  fssaiCertificateUrl: string;
  fssaiLicenseNumber: string;
  gstCertificateUrl?: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  ifscCode: string;
  chequeOrPassbookUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export async function registerRestaurant(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/register`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data };
  return data as { success: true; token: string; restaurant: RestaurantProfile };
}

export async function loginRestaurant(identifier: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data };
  return data as { success: true; token: string; restaurant: RestaurantProfile };
}

export async function fetchRestaurantProfile(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/restaurants/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data };
  return data as { success: true; restaurant: RestaurantProfile };
}

export const RESTAURANT_TOKEN_KEY = "sevenbites_restaurant_token";