"use client";

import { useEffect, useState, useCallback } from "react";
import {
  IndianRupee,
  ShoppingBag,
  Wallet,
  Percent,
  Truck,
  CreditCard,
  Trophy,
  Receipt,
  RefreshCw,
} from "lucide-react";
import SetupTopbar from "@/components/setup/SetupTopbar";
import { useSetupShell } from "@/components/setup/SetupShellContext";
import {
  fetchSetupProfile,
  fetchRestaurantAnalytics,
  RestaurantAnalytics,
  RESTAURANT_TOKEN_KEY,
  getErrorMessage,
} from "@/lib/setupApi";

type RangeKey = "all" | "this_month" | "last_month";

function rupees(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function getRange(key: RangeKey): { from?: string; to?: string } {
  const now = new Date();
  if (key === "all") return {};
  if (key === "this_month") {
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: from.toISOString(), to: now.toISOString() };
  }
  // last_month
  const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const to = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  return { from: from.toISOString(), to: to.toISOString() };
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
          accent ? "bg-emerald-600" : "bg-emerald-50"
        }`}
      >
        <Icon className={`w-5 h-5 ${accent ? "text-white" : "text-emerald-600"}`} />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="font-poppins font-bold text-xl text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function BreakdownRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-2.5 text-sm text-gray-600">
        <Icon className="w-4 h-4 text-gray-400" />
        {label}
      </div>
      <span className="text-sm font-semibold text-gray-900">− {value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 mb-6">
      <h2 className="font-poppins font-semibold text-base text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function AnalyticsClient() {
  const { openMobileMenu } = useSetupShell();
  const [restaurantName, setRestaurantName] = useState("");
  const [range, setRange] = useState<RangeKey>("all");
  const [data, setData] = useState<RestaurantAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (r: RangeKey) => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetchRestaurantAnalytics(token, getRange(r));
      setData(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Could not load analytics"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    fetchSetupProfile(token).then((res) => setRestaurantName(res.restaurant.restaurantName));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load(range);
  }, [range, load]);

  return (
    <div>
      <SetupTopbar title="Analytics" restaurantName={restaurantName} onMenuClick={openMobileMenu} />

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex rounded-xl border border-gray-200 p-1 bg-white">
            {([
              ["all", "All time"],
              ["this_month", "This month"],
              ["last_month", "Last month"],
            ] as [RangeKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setRange(key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  range === key ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => load(range)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>
        )}

        {data && (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <SummaryCard icon={ShoppingBag} label="Total Orders" value={String(data.totalOrders)} />
              <SummaryCard icon={IndianRupee} label="Total Sales" value={rupees(data.totalSales)} />
              <SummaryCard icon={Wallet} label="Net Settlement" value={rupees(data.netSettlement)} accent />
            </div>

            {/* Transparent breakdown of deductions */}
            <Section title="Deductions Breakdown">
              <BreakdownRow icon={Percent} label="Commission Deducted" value={rupees(data.commissionDeducted)} />
              <BreakdownRow icon={Truck} label="Fulfilment Charges" value={rupees(data.fulfilmentCharges)} />
              <BreakdownRow icon={CreditCard} label="Payment Gateway Charges" value={rupees(data.paymentGatewayCharges)} />
            </Section>

            {/* Best sellers */}
            <Section title="Best Selling Items">
              {data.bestSellingItems.length === 0 ? (
                <p className="text-sm text-gray-400">No delivered orders in this period yet.</p>
              ) : (
                <div className="space-y-1">
                  {data.bestSellingItems.map((item, i) => (
                    <div
                      key={`${item.name}-${i}`}
                      className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-800">{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.totalQuantity} sold</span>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* Payout history */}
            <Section title="Payout History">
              {data.payoutHistory.length === 0 ? (
                <p className="text-sm text-gray-400">No payouts recorded yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-100">
                        <th className="font-medium pb-2 pr-4">Period</th>
                        <th className="font-medium pb-2 pr-4">Orders</th>
                        <th className="font-medium pb-2 pr-4">Net Settlement</th>
                        <th className="font-medium pb-2 pr-4">Status</th>
                        <th className="font-medium pb-2">Ref</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.payoutHistory.map((p) => (
                        <tr key={p._id} className="border-b border-gray-50 last:border-0">
                          <td className="py-2.5 pr-4 text-gray-700">
                            {new Date(p.periodStart).toLocaleDateString("en-IN")} –{" "}
                            {new Date(p.periodEnd).toLocaleDateString("en-IN")}
                          </td>
                          <td className="py-2.5 pr-4 text-gray-700">{p.totalOrders}</td>
                          <td className="py-2.5 pr-4 font-semibold text-gray-900">{rupees(p.totalNetSettlement)}</td>
                          <td className="py-2.5 pr-4">
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                                p.payoutStatus === "processed"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              <Receipt className="w-3 h-3" />
                              {p.payoutStatus === "processed" ? "Processed" : "Pending"}
                            </span>
                          </td>
                          <td className="py-2.5 text-gray-500">{p.transactionRef || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>
          </>
        )}
      </div>
    </div>
  );
}