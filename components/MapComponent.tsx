import React, { useEffect, useRef } from 'react';
import type { EmergencyService } from '../types';

// Let TypeScript know about the Leaflet global object `L`
declare var L: any;

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  markers: EmergencyService[];
}

const MapComponent: React.FC<MapProps> = ({ center, markers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersLayer = useRef<any>(null);

  // Initialize map once
  useEffect(() => {
    if (mapRef.current && typeof L !== 'undefined' && !mapInstance.current) {
      const map = L.map(mapRef.current).setView([center.lat, center.lng], 13);
      mapInstance.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      markersLayer.current = L.layerGroup().addTo(map);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView([center.lat, center.lng], 13);
      markersLayer.current.clearLayers();

      // User's location marker
      L.circleMarker([center.lat, center.lng], {
        radius: 8,
        color: 'white',
        weight: 2,
        fillColor: '#4285F4',
        fillOpacity: 1,
      })
        .addTo(markersLayer.current)
        .bindPopup('<b>Your Location</b>');

      // Custom icons
      const hospitalIcon = L.divIcon({
        html: `<div class="hospital-symbol">🅗</div>`,
        className: 'custom-hospital-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      });

      const pharmacyIcon = L.icon({
        iconUrl:
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Add service markers
      markers.forEach((service) => {
        const popupContent = `
          <div style="font-family: sans-serif; line-height: 1.5;">
            <h4 style="font-weight: bold; margin-bottom: 5px; margin-top: 0;">${service.name}</h4>
            <p style="margin: 0 0 5px 0;">${service.address}</p>
            <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${service.phone}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lng}" 
              target="_blank" rel="noopener noreferrer" 
              style="color: #0078A8; text-decoration: none; font-weight: bold;">
              Get Directions
            </a>
          </div>
        `;

        if (service.type === 'hospital') {
          // Add pulsing trace circle
          const pulseCircle = L.circle([service.lat, service.lng], {
            radius: 200, // radius in meters
            color: 'red',
            weight: 2,
            opacity: 0.5,
            fillColor: 'rgba(255, 0, 0, 0.3)',
            fillOpacity: 0.4,
          }).addTo(markersLayer.current);

          // Add animated hospital symbol marker
          const hospitalMarker = L.marker([service.lat, service.lng], {
            icon: hospitalIcon,
          })
            .addTo(markersLayer.current)
            .bindPopup(popupContent);

          // Animation effect (simulate pulsing trace)
          let growing = true;
          setInterval(() => {
            const radius = pulseCircle.getRadius();
            if (growing && radius < 300) {
              pulseCircle.setRadius(radius + 5);
            } else if (!growing && radius > 200) {
              pulseCircle.setRadius(radius - 5);
            }
            if (radius >= 300) growing = false;
            if (radius <= 200) growing = true;
          }, 100);
        } else {
          // Add pharmacy marker
          L.marker([service.lat, service.lng], { icon: pharmacyIcon })
            .addTo(markersLayer.current)
            .bindPopup(popupContent);
        }
      });
    }
  }, [center, markers]);

  return (
    <>
      <style>
        {`
          .hospital-symbol {
            font-size: 22px;
            color: white;
            background-color: #d32f2f;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.6);
            animation: pulseSymbol 1.5s infinite ease-in-out;
          }

          @keyframes pulseSymbol {
            0% { transform: scale(1); box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
            50% { transform: scale(1.2); box-shadow: 0 0 15px rgba(255, 0, 0, 0.8); }
            100% { transform: scale(1); box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
          }
        `}
      </style>

      <div ref={mapRef} className="h-full w-full" id="map" />
    </>
  );
};

export default MapComponent;
