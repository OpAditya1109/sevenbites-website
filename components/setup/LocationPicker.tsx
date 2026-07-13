"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Loader2, LocateFixed, X } from "lucide-react";

// Leaflet's default marker icons reference image files that don't resolve
// correctly under Next.js/webpack — point them at the CDN copies instead.
const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DEFAULT_CENTER: [number, number] = [18.5204, 73.8567]; // Pune, as a sensible fallback

export interface LocationPickerProps {
  latitude: number | null | undefined;
  longitude: number | null | undefined;
  onChange: (lat: number, lng: number, label?: string) => void;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

// Recenters the map whenever lat/lng change from a search selection —
// MapContainer's `center` prop only applies on first mount.
function RecenterOnChange({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom() < 14 ? 16 : map.getZoom());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);
  return null;
}

// Lets the restaurant just click anywhere on the map to drop the pin there.
function ClickToPlace({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPicker({ latitude, longitude, onChange }: LocationPickerProps) {
  const hasPin = latitude != null && longitude != null;
  const center: [number, number] = hasPin ? [latitude as number, longitude as number] : DEFAULT_CENTER;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [locating, setLocating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearchChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        // Nominatim — OpenStreetMap's free geocoding search, no API key required.
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=5&countrycodes=in&q=${encodeURIComponent(
            value
          )}`,
          { headers: { Accept: "application/json" } }
        );
        const data: SearchResult[] = await res.json();
        setResults(data);
        setShowResults(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 450);
  }

  function selectResult(r: SearchResult) {
    const lat = parseFloat(r.lat);
    const lng = parseFloat(r.lon);
    onChange(lat, lng, r.display_name);
    setQuery(r.display_name);
    setShowResults(false);
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full rounded-xl border border-gray-200 pl-9 pr-9 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-150"
          placeholder="Search your restaurant's address..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 animate-spin" />
        )}
        {!searching && query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {showResults && results.length > 0 && (
          <div className="absolute z-[1000] mt-1 w-full bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
            {results.map((r, i) => (
              <button
                type="button"
                key={i}
                onClick={() => selectResult(r)}
                className="w-full text-left px-3.5 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 flex items-start gap-2 border-b border-gray-50 last:border-0"
              >
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{r.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden border border-gray-200 h-64">
        <MapContainer center={center} zoom={hasPin ? 16 : 12} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToPlace onPick={(lat, lng) => onChange(lat, lng)} />
          {hasPin && (
            <>
              <Marker
                position={[latitude as number, longitude as number]}
                icon={markerIcon}
                draggable
                eventHandlers={{
                  dragend: (e) => {
                    const m = e.target as L.Marker;
                    const pos = m.getLatLng();
                    onChange(pos.lat, pos.lng);
                  },
                }}
              />
              <RecenterOnChange lat={latitude as number} lng={longitude as number} />
            </>
          )}
        </MapContainer>

        <button
          type="button"
          onClick={useCurrentLocation}
          className="absolute bottom-3 right-3 z-[1000] flex items-center gap-1.5 bg-white text-xs font-medium text-gray-700 px-3 py-2 rounded-lg shadow-md hover:bg-gray-50"
        >
          {locating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LocateFixed className="w-3.5 h-3.5 text-emerald-600" />}
          Use my location
        </button>
      </div>

      <p className="text-xs text-gray-400">
        {hasPin
          ? `Pin set at ${(latitude as number).toFixed(5)}, ${(longitude as number).toFixed(5)} — drag the pin to fine-tune.`
          : "Search above, or click/tap directly on the map to drop a pin."}
      </p>
    </div>
  );
}