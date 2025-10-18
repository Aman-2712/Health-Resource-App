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

  // Effect to initialize map on first render
  useEffect(() => {
    if (mapRef.current && typeof L !== 'undefined' && !mapInstance.current) {
      const map = L.map(mapRef.current).setView([center.lat, center.lng], 13);
      mapInstance.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      markersLayer.current = L.layerGroup().addTo(map);
    }
    
    // Cleanup function to remove the map on component unmount
    return () => {
        if (mapInstance.current) {
            mapInstance.current.remove();
            mapInstance.current = null;
        }
    };
  }, []); // Empty dependency array means this runs only once on mount and unmount

  // Effect to update center and markers when they change
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
            fillOpacity: 1
        }).addTo(markersLayer.current).bindPopup('<b>Your Location</b>');

        // Custom icons
        const hospitalIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
        });

        const pharmacyIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
        });

        // Add service markers
        markers.forEach(service => {
            const icon = service.type === 'hospital' ? hospitalIcon : pharmacyIcon;
            const popupContent = `
                <div style="font-family: sans-serif; line-height: 1.5;">
                    <h4 style="font-weight: bold; margin-bottom: 5px; margin-top: 0;">${service.name}</h4>
                    <p style="margin: 0 0 5px 0;">${service.address}</p>
                    <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${service.phone}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lng}" target="_blank" rel="noopener noreferrer" style="color: #0078A8; text-decoration: none; font-weight: bold;">
                      Get Directions
                    </a>
                </div>
            `;
            L.marker([service.lat, service.lng], { icon: icon })
              .addTo(markersLayer.current)
              .bindPopup(popupContent);
        });
    }
  }, [center, markers]);

  return <div ref={mapRef} className="h-full w-full" id="map" />;
};

export default MapComponent;