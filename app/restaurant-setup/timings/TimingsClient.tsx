"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  AlertTriangle,
  Coffee,
} from "lucide-react";
import SetupTopbar from "@/components/setup/SetupTopbar";
import { useSetupShell } from "@/components/setup/SetupShellContext";
import {
  fetchTimings,
  saveTimings,
  setTemporaryClose,
  RESTAURANT_TOKEN_KEY,
  RestaurantTiming,
  DaySchedule,
  getErrorMessage,
} from "@/lib/setupApi";

const DAY_LABELS: Record<DaySchedule["day"], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const SAMPLE: RestaurantTiming = {
  weeklySchedule: (Object.keys(DAY_LABELS) as DaySchedule["day"][]).map((day) => ({
    day,
    isOpen: day !== "monday",
    openTime: "11:00",
    closeTime: "23:00",
    breakStart: day === "sunday" ? null : "15:30",
    breakEnd: day === "sunday" ? null : "18:00",
  })),
  deliveryHours: { sameAsOpeningHours: true, openTime: "11:00", closeTime: "22:30" },
  holidays: [{ date: "2026-08-15", reason: "Independence Day" }],
  isTemporarilyClosed: false,
  temporaryCloseReason: "",
  temporaryCloseUntil: null,
};

const timeInputCls =
  "rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
        checked ? "bg-emerald-500" : "bg-gray-200"
      }`}
    >
      <motion.span
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
        animate={{ x: checked ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

export default function TimingsClient() {
  const { openMobileMenu } = useSetupShell();
  const [timing, setTiming] = useState<RestaurantTiming>(SAMPLE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [newHolidayReason, setNewHolidayReason] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      // No token: the layout's auth guard is already redirecting to login,
      // so just bail without touching state here.
      return;
    }
    fetchTimings(token)
      .then((res) => setTiming(res.timing))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function updateDay(day: DaySchedule["day"], patch: Partial<DaySchedule>) {
    setTiming((t) => ({
      ...t,
      weeklySchedule: t.weeklySchedule.map((d) => (d.day === day ? { ...d, ...patch } : d)),
    }));
  }

  function addHoliday() {
    if (!newHolidayDate) return;
    setTiming((t) => ({
      ...t,
      holidays: [...t.holidays, { date: newHolidayDate, reason: newHolidayReason }],
    }));
    setNewHolidayDate("");
    setNewHolidayReason("");
  }

  function removeHoliday(date: string) {
    setTiming((t) => ({ ...t, holidays: t.holidays.filter((h) => h.date !== date) }));
  }

  async function handleSave() {
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await saveTimings(token, timing);
      setTiming(res.timing);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(getErrorMessage(err, "Could not save timings. Please try again."));
    } finally {
      setSaving(false);
    }
  }

  async function handleTemporaryCloseToggle(value: boolean) {
    setTiming((t) => ({ ...t, isTemporarilyClosed: value }));
    const token = localStorage.getItem(RESTAURANT_TOKEN_KEY);
    if (!token) return;
    try {
      await setTemporaryClose(token, {
        isTemporarilyClosed: value,
        temporaryCloseReason: timing.temporaryCloseReason,
        temporaryCloseUntil: timing.temporaryCloseUntil,
      });
    } catch {
      /* non-blocking */
    }
  }

  return (
    <div className="pb-24">
      <SetupTopbar title="Restaurant Timings" onMenuClick={openMobileMenu} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Temporary close banner */}
        <div
          className={`rounded-2xl border p-5 sm:p-6 flex items-start gap-4 transition-colors ${
            timing.isTemporarilyClosed ? "bg-red-50 border-red-200" : "bg-white border-gray-100 shadow-sm shadow-gray-100/50"
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            timing.isTemporarilyClosed ? "bg-red-100" : "bg-emerald-50"
          }`}>
            <AlertTriangle className={`w-5 h-5 ${timing.isTemporarilyClosed ? "text-red-500" : "text-emerald-500"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Temporarily Close Restaurant</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Instantly hides your restaurant from the Customer App until you switch this back off.
                </p>
              </div>
              <Toggle checked={timing.isTemporarilyClosed} onChange={handleTemporaryCloseToggle} />
            </div>
            {timing.isTemporarilyClosed && (
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <input
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="Reason (e.g. Kitchen maintenance)"
                  value={timing.temporaryCloseReason || ""}
                  onChange={(e) => setTiming((t) => ({ ...t, temporaryCloseReason: e.target.value }))}
                />
                <input
                  type="date"
                  className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  value={timing.temporaryCloseUntil || ""}
                  onChange={(e) => setTiming((t) => ({ ...t, temporaryCloseUntil: e.target.value }))}
                />
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Weekly schedule */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 p-6 sm:p-7">
              <h2 className="font-semibold text-gray-900 mb-5">Weekly Schedule</h2>
              <div className="space-y-3">
                {timing.weeklySchedule.map((d) => (
                  <div
                    key={d.day}
                    className={`rounded-xl border px-4 py-3.5 transition-colors ${
                      d.isOpen ? "border-gray-100 bg-gray-50/50" : "border-gray-100 bg-gray-50/20 opacity-60"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                      <div className="flex items-center gap-3 w-32 flex-shrink-0">
                        <Toggle checked={d.isOpen} onChange={(v) => updateDay(d.day, { isOpen: v })} />
                        <span className="text-sm font-medium text-gray-800">{DAY_LABELS[d.day]}</span>
                      </div>
                      {d.isOpen && (
                        <>
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              className={timeInputCls}
                              value={d.openTime}
                              onChange={(e) => updateDay(d.day, { openTime: e.target.value })}
                            />
                            <span className="text-gray-300 text-sm">to</span>
                            <input
                              type="time"
                              className={timeInputCls}
                              value={d.closeTime}
                              onChange={(e) => updateDay(d.day, { closeTime: e.target.value })}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Coffee className="w-3.5 h-3.5" />
                            <input
                              type="time"
                              className={timeInputCls + " w-[104px]"}
                              value={d.breakStart || ""}
                              placeholder="Break"
                              onChange={(e) => updateDay(d.day, { breakStart: e.target.value || null })}
                            />
                            <span className="text-gray-300 text-sm">–</span>
                            <input
                              type="time"
                              className={timeInputCls + " w-[104px]"}
                              value={d.breakEnd || ""}
                              onChange={(e) => updateDay(d.day, { breakEnd: e.target.value || null })}
                            />
                          </div>
                        </>
                      )}
                      {!d.isOpen && <span className="text-sm text-gray-400 italic">Closed</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery hours */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 p-6 sm:p-7">
              <h2 className="font-semibold text-gray-900 mb-5">Delivery Hours</h2>
              <div className="flex items-center gap-3 mb-4">
                <Toggle
                  checked={timing.deliveryHours.sameAsOpeningHours}
                  onChange={(v) =>
                    setTiming((t) => ({ ...t, deliveryHours: { ...t.deliveryHours, sameAsOpeningHours: v } }))
                  }
                />
                <span className="text-sm text-gray-700">Same as opening hours</span>
              </div>
              {!timing.deliveryHours.sameAsOpeningHours && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    className={timeInputCls}
                    value={timing.deliveryHours.openTime}
                    onChange={(e) =>
                      setTiming((t) => ({ ...t, deliveryHours: { ...t.deliveryHours, openTime: e.target.value } }))
                    }
                  />
                  <span className="text-gray-300 text-sm">to</span>
                  <input
                    type="time"
                    className={timeInputCls}
                    value={timing.deliveryHours.closeTime}
                    onChange={(e) =>
                      setTiming((t) => ({ ...t, deliveryHours: { ...t.deliveryHours, closeTime: e.target.value } }))
                    }
                  />
                </div>
              )}
            </div>

            {/* Holidays */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 p-6 sm:p-7">
              <h2 className="font-semibold text-gray-900 mb-5">Holiday Settings</h2>
              <div className="space-y-2 mb-4">
                {timing.holidays.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No holidays added yet</p>
                )}
                {timing.holidays.map((h) => (
                  <div key={h.date} className="flex items-center justify-between gap-3 bg-gray-50/70 rounded-xl px-4 py-2.5">
                    <div>
                      <span className="text-sm font-medium text-gray-800">{h.date}</span>
                      {h.reason && <span className="text-sm text-gray-400 ml-2">— {h.reason}</span>}
                    </div>
                    <button onClick={() => removeHoliday(h.date)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  className={timeInputCls}
                  value={newHolidayDate}
                  onChange={(e) => setNewHolidayDate(e.target.value)}
                />
                <input
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm flex-1 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  placeholder="Reason (optional)"
                  value={newHolidayReason}
                  onChange={(e) => setNewHolidayReason(e.target.value)}
                />
                <button
                  onClick={addHoliday}
                  className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-end gap-3 z-20">
        <AnimatePresence>
          {error && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-sm text-red-600 mr-auto">
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.span>
          )}
          {saved && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-sm text-emerald-600 mr-auto">
              <CheckCircle2 className="w-4 h-4" /> Saved successfully
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm shadow-emerald-200 transition-colors"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
      </div>
    </div>
  );
}