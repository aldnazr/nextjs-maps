"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { RouteInfo } from "@/components/route-info";
import { CoordinateInput } from "@/components/coordinate-input";
import { Map } from "lucide-react";

// Dynamically import the map component to avoid SSR issues with Leaflet
const RouteMap = dynamic(
  () => import("@/components/route-map").then((mod) => mod.RouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-muted animate-pulse rounded-lg" />
    ),
  }
);

export default function Page() {
  const [routeData, setRouteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number
  ) => {
    setIsLoading(true);
    try {
      // OSRM API expects {lon},{lat}
      const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?steps=true&overview=full&geometries=geojson`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `OSRM API request failed with status: ${response.status} ${response.statusText}. Response body: ${errorBody}`
        );
        throw new Error(
          `Failed to fetch route: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (data.code === "Ok") {
        setRouteData(data);
      } else {
        console.error(
          "Error from OSRM API with code:",
          data.code,
          "message:",
          data.message
        );
        throw new Error(
          `OSRM API returned an error: ${data.message} (Code: ${data.code})`
        );
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Map className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Navigasi Rute
              </h1>
              <p className="text-sm text-muted-foreground">
                Peta Interaktif dengan OSRM
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[600px]">
            <RouteMap routeData={routeData} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <CoordinateInput
              onSearch={handleSearch}
              isLoading={isLoading}
              defaultValues={{
                startLat: -6.180378,
                startLng: 106.827066,
                endLat: -6.3061777,
                endLng: 106.884007,
              }}
            />
            <RouteInfo routeData={routeData} />
          </div>
        </div>
      </main>
    </div>
  );
}
