"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import { LatLngExpression, LatLngTuple } from "leaflet";

// Component to update map view bounds based on route
function MapUpdater({ bounds }: { bounds: LatLngTuple[] }) {
  const map = useMap();

  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);

  return null;
}

interface RouteMapProps {
  routeData: any;
}

export function RouteMap({ routeData }: RouteMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-muted animate-pulse" />;

  if (!routeData || !routeData.routes || routeData.routes.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted rounded-lg border">
        <p className="text-muted-foreground">Data rute tidak tersedia</p>
      </div>
    );
  }

  // Extract coordinates from the route data
  // OSRM returns [lon, lat], Leaflet needs [lat, lon]
  const routeCoordinates = routeData.routes[0].geometry.coordinates.map(
    (coord: number[]) => [coord[1], coord[0]] as LatLngExpression
  );

  const startPoint = routeCoordinates[0];
  const endPoint = routeCoordinates[routeCoordinates.length - 1];

  return (
    <MapContainer
      key={`${startPoint[0]}-${startPoint[1]}`}
      center={startPoint}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full z-0 rounded-lg shadow-sm border"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* The Blue Route Line */}
      <Polyline
        positions={routeCoordinates}
        pathOptions={{ color: "#4285F4", weight: 6, opacity: 0.8 }}
      />

      {/* Start Marker */}
      <Marker position={startPoint}>
        <Popup>Start Location</Popup>
      </Marker>

      {/* End Marker */}
      <Marker position={endPoint}>
        <Popup>Destination</Popup>
      </Marker>

      <MapUpdater bounds={routeCoordinates} />
    </MapContainer>
  );
}
