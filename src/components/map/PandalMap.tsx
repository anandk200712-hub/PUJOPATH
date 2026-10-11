import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { usePujo } from '../../context/PujoContext';
import { Pandal } from '@kisansetu/shared';
import { LocationPermissionModal } from './LocationPermissionModal';
import { 
  Navigation, 
  MapPin, 
  Train, 
  Clock, 
  Eye, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

// Controller component to smoothly fly/pan map when focus changes
const MapController: React.FC<{ center: [number, number]; zoom?: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom || 14, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

// Create custom Leaflet HTML DivIcon with color-coded crowd level
const createPandalIcon = (crowdLevel?: string, isVisited?: boolean) => {
  let bgColor = '#d97706'; // medium: amber
  let ringColor = 'rgba(217, 119, 6, 0.4)';

  if (crowdLevel === 'Low') {
    bgColor = '#16a34a'; // low: green
    ringColor = 'rgba(22, 163, 74, 0.4)';
  } else if (crowdLevel === 'High' || crowdLevel === 'Peak') {
    bgColor = '#dc2626'; // high: red
    ringColor = 'rgba(220, 38, 38, 0.5)';
  }

  const visitedCheck = isVisited ? '✓' : '🪔';

  const html = `
    <div style="
      position: relative;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: ${bgColor};
      color: #ffffff;
      font-size: 16px;
      box-shadow: 0 4px 12px ${ringColor};
      border: 3px solid #ffffff;
      cursor: pointer;
      transition: transform 0.2s ease;
    ">
      <span>${visitedCheck}</span>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-pandal-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

export const PandalMap: React.FC = () => {
  const { 
    pandals, 
    visitedPandalIds, 
    selectedPandal, 
    openPandalModal, 
    markPandalVisited,
    userLocation,
    requestLocation,
    locationDenied
  } = usePujo();

  const [showPermModal, setShowPermModal] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5726, 88.3639]); // Central Kolkata
  const [mapZoom, setMapZoom] = useState(13);

  // If a pandal is selected, pan map to it
  useEffect(() => {
    if (selectedPandal) {
      setMapCenter([selectedPandal.latitude, selectedPandal.longitude]);
      setMapZoom(15);
    }
  }, [selectedPandal]);

  // Coordinates of visited pandals for Polyline route
  const visitedPandalsList = pandals.filter((p) => visitedPandalIds.includes(p.id));
  const visitedCoordinates: [number, number][] = visitedPandalsList.map((p) => [p.latitude, p.longitude]);

  return (
    <div className="relative w-full h-[650px] sm:h-[720px] rounded-3xl overflow-hidden border border-stone-200/90 shadow-xl bg-stone-100">
      
      {/* Map Control Overlay Banner */}
      <div className="absolute top-4 left-4 right-4 z-[500] flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Legend */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-stone-200/80 flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Low Crowd</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-700">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>High/Peak</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-stone-600 border-l pl-3">
            <span className="text-amber-600">✓</span>
            <span>Visited</span>
          </div>
        </div>

        {/* Action Button: Locate Me */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setShowPermModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md text-stone-800 font-bold text-xs shadow-md border border-stone-200/80 hover:bg-stone-50 hover:text-red-700 transition-all active:scale-95"
          >
            <Navigation className="w-4 h-4 text-red-600" />
            <span>Locate Me</span>
          </button>
        </div>
      </div>

      {/* Location Denied Gentle Toast Notification */}
      {locationDenied && (
        <div className="absolute bottom-4 left-4 right-4 z-[500] max-w-md mx-auto bg-stone-900/95 text-stone-200 text-xs px-4 py-3 rounded-2xl shadow-lg border border-stone-700 flex items-center gap-3 animate-fade-in pointer-events-auto">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Location access was denied. Retaining default central Kolkata heritage festival map view.</span>
        </div>
      )}

      {/* Leaflet MapContainer */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        {/* Clean OpenStreetMap Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker (if granted) */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              html: `
                <div style="
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background: #2563eb;
                  border: 3px solid #ffffff;
                  box-shadow: 0 0 15px rgba(37,99,235,0.7);
                "></div>
              `,
              className: 'user-pulse-marker',
              iconSize: [22, 22],
            })}
          >
            <Popup>
              <div className="p-2 text-xs font-bold text-blue-900">
                📍 You are here
              </div>
            </Popup>
          </Marker>
        )}

        {/* Visited Pandals Trail Polyline */}
        {visitedCoordinates.length >= 2 && (
          <Polyline
            positions={visitedCoordinates}
            pathOptions={{
              color: '#dc2626',
              weight: 4,
              opacity: 0.8,
              dashArray: '8, 8',
            }}
          />
        )}

        {/* Pandal Markers */}
        {pandals.map((pandal) => {
          const isVisited = visitedPandalIds.includes(pandal.id);
          const icon = createPandalIcon(pandal.current_crowd_level, isVisited);

          return (
            <Marker
              key={pandal.id}
              position={[pandal.latitude, pandal.longitude]}
              icon={icon}
            >
              <Popup>
                <div className="w-72 bg-white text-stone-900 overflow-hidden font-sans">
                  {/* Photo Banner */}
                  <div className="relative h-28 w-full bg-stone-100">
                    <img
                      src={pandal.image_url || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80'}
                      alt={pandal.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                      {pandal.area}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 space-y-2">
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900 leading-snug">
                        {pandal.name}
                      </h4>
                      <p className="text-[11px] text-amber-800 font-medium truncate">
                        {pandal.theme}
                      </p>
                    </div>

                    {/* Crowd & Metro */}
                    <div className="space-y-1 text-xs text-stone-600 pt-1 border-t border-stone-100">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">Current Crowd:</span>
                        <span className={`font-bold text-[11px] px-2 py-0.5 rounded ${
                          pandal.current_crowd_level === 'Low' ? 'text-emerald-700 bg-emerald-50' :
                          pandal.current_crowd_level === 'Peak' || pandal.current_crowd_level === 'High' ? 'text-rose-700 bg-rose-50' :
                          'text-amber-700 bg-amber-50'
                        }`}>
                          {pandal.current_crowd_level || 'Medium'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-stone-600">
                        <Train className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate">{pandal.nearest_metro_station} ({pandal.metro_distance_km} km)</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-between gap-1.5">
                      <button
                        onClick={() => openPandalModal(pandal)}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold text-center transition-colors"
                      >
                        Details
                      </button>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${pandal.latitude},${pandal.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold transition-colors"
                      >
                        Directions <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => markPandalVisited(pandal.id)}
                        disabled={isVisited}
                        className={`py-1.5 px-2.5 rounded-lg text-[11px] font-bold transition-colors ${
                          isVisited
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                      >
                        {isVisited ? 'Visited' : 'Visit'}
                      </button>
                    </div>

                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Permission Modal */}
      <LocationPermissionModal
        isOpen={showPermModal}
        onClose={() => setShowPermModal(false)}
        onConfirm={() => {
          requestLocation(() => {
            if (userLocation) {
              setMapCenter([userLocation.lat, userLocation.lng]);
              setMapZoom(14);
            }
          });
        }}
      />
    </div>
  );
};
