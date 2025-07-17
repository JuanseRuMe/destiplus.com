'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import { IoIosArrowForward } from "react-icons/io"; // Asegura importar Down si se usa en accordion
import mapboxgl from 'mapbox-gl';
import type { Map, LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Chart from 'chart.js/auto';
// Importa los iconos necesarios
// Ajusta la ruta a tus tipos definidos
import type { RutaMapData, LocationState, MetricsState } from '@/types/mapa';

// --- Configuración Mapbox (Usa Variables de Entorno) ---
mapboxgl.accessToken =  'pk.eyJ1IjoiZGVzdGluby1wbHVzIiwiYSI6ImNtM3QzY3VkcTA0MnMybHBqaG42cnlwMGQifQ.yCsdkgJaxSy22A9sjgyikQ'; 
const CACHE_NAME = 'mapbox-tiles-cache-v1';

// --- HELPER FUNCTIONS (Definidas localmente) ---
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
};

const calculateDistanceTotal = (coordinatesList: Array<{ lat: number; lng: number }> | null | undefined): number => {
    let totalDistance = 0;
    const coords = coordinatesList || []; // Asegura que sea un array

    // Necesitas al menos 2 puntos para calcular una distancia
    if (coords.length < 2) {
        return 0;
    }

    // Itera desde el segundo punto
    for (let i = 1; i < coords.length; i++) {
        const p1 = coords[i - 1];
        const p2 = coords[i];

        // Verifica que ambos puntos tengan lat y lng antes de calcular
        if (p1?.lat != null && p1?.lng != null && p2?.lat != null && p2?.lng != null) {
             // Llama a la función existente calculateDistance
            totalDistance += calculateDistance(p1.lat, p1.lng, p2.lat, p2.lng);
        } else {
            console.warn(`Coordenadas inválidas en el índice ${i} o ${i-1} para calcular distancia total.`);
        }
    }

    return totalDistance; // Devuelve la distancia total en km
};

const latLngToTile = (lat: number, lon: number, zoom: number): { x: number; y: number } => {
    const n = Math.pow(2, zoom);
    const x = Math.floor((lon + 180) / 360 * n);
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
    return { x, y };
};

const getTileUrls = (bounds: mapboxgl.LngLatBounds, zoom: number): string[] => {
    const tiles = [];
    const min = latLngToTile(bounds.getSouthWest().lat, bounds.getSouthWest().lng, zoom);
    const max = latLngToTile(bounds.getNorthEast().lat, bounds.getNorthEast().lng, zoom);
    for (let x = min.x; x <= max.x; x++) {
        for (let y = min.y; y <= max.y; y++) {
            const url = `https://api.mapbox.com/v4/mapbox.satellite/${zoom}/${x}/${y}@2x.png?access_token=${mapboxgl.accessToken}`;
            tiles.push(url);
        }
    }
    return tiles;
};

const cacheTiles = async (bounds: mapboxgl.LngLatBounds, minZoom: number, maxZoom: number) => {
    if (!('caches' in window)) { console.warn("Cache API not supported."); return; }
    const urls = [];
    for (let z = minZoom; z <= maxZoom; z++) {
        urls.push(...getTileUrls(bounds, z));
    }
    console.log(`Attempting to cache ${urls.length} tiles...`);
    try {
        const cache = await caches.open(CACHE_NAME);
        const fetchOptions = { mode: 'cors', credentials: 'omit' } as RequestInit; // 'omit' suele ser mejor para recursos públicos
        let successCount = 0;
        // Cachear en lotes pequeños para no sobrecargar
        for (let i = 0; i < urls.length; i += 10) {
             const batch = urls.slice(i, i + 10);
             await Promise.allSettled(batch.map(async url => {
                try {
                    // No cachear si ya está en caché
                    const cachedResponse = await cache.match(url);
                    if (cachedResponse) return true;

                    const response = await fetch(url, fetchOptions);
                    if (response.ok) {
                        await cache.put(url, response.clone());
                        successCount++;
                        return true;
                    }
                    return false;
                } catch (err) { console.warn(`Failed to cache: ${url}`, err); return false; }
            }));
             // Pequeña pausa para no saturar la red
             await new Promise(res => setTimeout(res, 50));
        }
        console.log(`Successfully cached ${successCount} new tiles.`);
    } catch (error) { console.error('Error caching tiles:', error); }
};

// --- Props Interface ---
interface RutaMapaClientProps {
  initialRutaData: RutaMapData | null;
}

// --- Componente Principal del Mapa ---
const RutaMapaClient: React.FC<RutaMapaClientProps> = ({ initialRutaData }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const containerChart = useRef<HTMLCanvasElement | null>(null);
    const [mapInstance, setMapInstance] = useState<Map | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(true); // Se actualizará en useEffect
    const [currentLocation, setCurrentLocation] = useState<LocationState | null>(null);
    const [metrics, setMetrics] = useState<MetricsState>({ kmRecorridos: '0.00', velocidadPromedio: '0.0', tiempoRecorrido: '00:00', porcentajeCompletado: 0 });
    const [isExpanded, setIsExpanded] = useState(false); // Estado para acordeón emergencia
    const locationTrackerRef = useRef<{ clearWatch: () => void } | null>(null);
    const distanceAccumulatorRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);
    const lastPositionRef = useRef<LocationState | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const ruta = initialRutaData; // Usamos la data inicial directamente

    // --- useMemo para distanciaTotal (FUERA de useEffect) ---
    const distanciaTotal = useMemo(() => {
        // Accede a las coordenadas de forma segura desde la prop
        const coordinates = ruta?.coordenadas_principales?.[0]?.cordenadas;
        console.log("RutaMapaClient: Recalculando distanciaTotal..."); // Log para depurar si se recalcula mucho
        return calculateDistanceTotal(coordinates);
        // Depende de las coordenadas de la ruta. Se recalcula si cambian.
    }, [ruta?.coordenadas_principales]);

    // Adaptación de getElevation (llamada desde useEffect)
    const getElevationInternal = useCallback(async (
        coordinates: number[][], // Array de [lng, lat]
        canvasElement: HTMLCanvasElement | null
    ) => {
        if (!canvasElement || !coordinates || coordinates.length === 0) {
            console.warn("getElevationInternal: Canvas o coordenadas no válidas.");
            return; // Salir si no hay canvas o coordenadas
        }
        // Accede al token de mapbox (asegúrate que esté definido globalmente o pásalo)
        const accessToken = mapboxgl.accessToken;
        if (!accessToken) {
             console.error("Mapbox Access Token no está configurado!");
             return;
        }
    
        console.log("getElevationInternal: Fetching elevation data...");
        try {
            // 1. Fetch de Datos de Elevación (como antes)
            
            const batchSize = 30;
            const elevationData: number[] = [];
            for (let i = 0; i < coordinates.length; i += batchSize) {
                const batch = coordinates.slice(i, i + batchSize);
                // Mapbox Tilequery espera Lng,Lat
                const coordinatesString = batch.map(coord => `${coord[0]},${coord[1]}`).join(';');
                const elevationUrl = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coordinatesString}.json?layers=contour&access_token=${accessToken}`;
                const response = await fetch(elevationUrl);
                if (!response.ok) throw new Error(`Mapbox Tilequery failed: ${response.statusText}`);
                const data = await response.json();
                interface FeatureWithEle {
                    properties?: {
                      ele?: unknown;
                    };
                }
                const elevations = (data.features as unknown[]).map(feat => {
                    // Primero verifica que sea un objeto y tenga "properties"
                    if (
                      typeof feat === 'object' &&
                      feat !== null &&
                      'properties' in feat
                    ) {
                      // Ahora TS sabe que feat es FeatureWithEle
                      const f = feat as FeatureWithEle;
                      const ele = f.properties?.ele;
                      return typeof ele === 'number' ? ele : 0;
                    }
                    return 0;
                });
                elevationData.push(...elevations);
            }
            // Asegurar longitud correcta (como antes)
            if (elevationData.length !== coordinates.length) {
                console.warn("Ajustando longitud de elevationData...");
                while(elevationData.length < coordinates.length) elevationData.push(elevationData[elevationData.length - 1] ?? 0);
                elevationData.length = coordinates.length;
            }
    
            // 2. Procesar Datos para X (Distancia) e Y (Elevación)
            let distance = 0;
            const xData: number[] = []; // Distancia acumulada (eje X)
            const yData: number[] = []; // Elevación (eje Y)
            coordinates.forEach((coord, index) => {
                if (index > 0) {
                    const prevCoord = coordinates[index - 1];
                    // calculateDistance espera (lat1, lon1, lat2, lon2)
                    distance += calculateDistance(prevCoord[1], prevCoord[0], coord[1], coord[0]);
                }
                xData.push(Number(distance.toFixed(2)));
                yData.push(Math.floor(elevationData[index])); // Usamos la elevación obtenida
            });
    
            // 3. --- CÁLCULO DE DATOS DECORATIVOS (Reintroducido) ---
            const numPoints = coordinates.length;
            const xIndex = Array.from({ length: numPoints }, (_, i) => i);
            const decorativeData = xIndex.map(i => {
                // Esta fórmula parece específica de tu diseño original, la mantenemos
                const xNorm = (i / (numPoints > 1 ? numPoints - 1 : 1)) * 1.5 - 0.4; // Normaliza X para la fórmula
                return 2100 + (1000 * Math.exp(-10 * xNorm * xNorm)); // Fórmula original
            });
    
            // Calcular índices para resaltar puntos (Reintroducido)
            const numParts = 10; // Número de segmentos para resaltar puntos medios
            const partSize = Math.max(1, Math.floor(yData.length / numParts)); // Asegura que partSize sea al menos 1
            const middleIndexes: number[] = [];
            for (let i = 0; i < numParts; i++) {
                const start = i * partSize;
                // Asegura que 'end' no exceda la longitud del array
                const end = (i === numParts - 1) ? yData.length : Math.min((i + 1) * partSize, yData.length);
                 if (start >= end) continue; // Saltar si el segmento está vacío o inválido
                const middleIndex = Math.floor((end - start) / 2) + start;
                middleIndexes.push(middleIndex);
            }
            // --- FIN CÁLCULO DE DATOS DECORATIVOS ---
    
            // 4. Crear el Gráfico
            // Destruye gráfico anterior si existe (ya tenías esto)
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
             }
            const ctx = canvasElement.getContext('2d');
            if (!ctx) {
                 console.error("No se pudo obtener el contexto 2D del canvas.");
                 return;
            }
    
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    // --- CORRECCIÓN NOMBRES ---
                    labels: xData, // Usa xData para el eje X (distancia)
                    datasets: [
                        { // Dataset principal (elevación real)
                            label: 'MSNM',
                            data: yData, // Usa yData para la elevación
                            fill: true,
                            backgroundColor: (context) => {
                                const chart = context.chart;
                                const {ctx, chartArea} = chart;
                                if (!chartArea) {
                                    return undefined;
                                }
                                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                gradient.addColorStop(0, 'rgba(0, 156, 255, 0.6)');
                                gradient.addColorStop(0.2, 'rgba(180, 0, 180, 0.6)');
                                gradient.addColorStop(0.4, 'rgba(255, 0, 100, 0.6)');
                                gradient.addColorStop(0.6, 'rgba(255, 122, 0, 0.6)');
                                return gradient;
                            },
                            borderWidth: 2,
                            borderColor: 'rgba(255, 255, 255, 1)',
                            pointRadius: (context) => middleIndexes.includes(context.dataIndex) ? 5 : 0, // Usa middleIndexes
                            pointBackgroundColor: 'rgba(10, 30, 50, 1)',
                            tension: 0.4
                        },
                        { // Dataset decorativo (fondo)
                            label: 'Decorative Background',
                            data: decorativeData, // Usa decorativeData
                            borderWidth: 0,
                            pointRadius: 0,
                            fill: true,
                            tension: 0.4,
                            backgroundColor: (context) => {
                                const chart = context.chart;
                                const {ctx, chartArea} = chart;
                                if (!chartArea) {
                                    return undefined;
                                }
                                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                gradient.addColorStop(1, 'rgba(30,100,211,0.7)');
                                gradient.addColorStop(0, 'rgba(6,209,249,0.7)');
                                return gradient;
                            }
                        }
                    ]
                    // --- FIN CORRECCIÓN NOMBRES ---
                },
                options: {
                     responsive: true, // Cambiado a true para que se ajuste al contenedor
                     maintainAspectRatio: false, // Necesario si el contenedor no tiene aspect ratio fijo
                     scales: {
                         x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Distancia (km)' }, grid: { display: false } },
                         y: { grid: { display: false }, title: { display: true, text: 'Altura (m)' }, ticks: { display: false }, border: { display: false } }
                     },
                     plugins: { tooltip: { enabled: true, /* ... callbacks ... */ }, legend: { display: false } }
                 }
            });
            console.log("Elevation chart created/updated.");
        } catch (error) {
            console.error("Error completo en getElevationInternal:", error);
             // Opcional: Mostrar un mensaje de error en la UI
        }
    }, [chartInstanceRef])

    // Adaptación de initLocationTracking (llamada desde useEffect)
    const initLocationTrackingInternal = useCallback((mapInstance: Map, firstStationCoords: [number, number], setCurrentLoc: (loc: LocationState) => void) => {
        let userMarker: mapboxgl.Marker | null = null;
        let watchId: number | null = null;
        const locationHistory: LocationState[] = [];
        let lastKnownLocation: LocationState | null = null;
        let hasReachedFirstStation = false;
        const ARRIVAL_THRESHOLD = 0.03; // 30m

        const loadStoredLocations = () => { /* ... */ };
        const saveLocations = () => { /* ... */ };
        const checkArrivalToFirstStation = (userLoc: LocationState): boolean => {
             if (hasReachedFirstStation) return true;
             const distance = calculateDistance(userLoc.lat, userLoc.lng, firstStationCoords[1], firstStationCoords[0]);
             if (distance <= ARRIVAL_THRESHOLD) {
                hasReachedFirstStation = true;
                if (mapInstance.getSource('guidance-route')) {
                    if (mapInstance.getLayer('guidance-route')) mapInstance.removeLayer('guidance-route');
                    mapInstance.removeSource('guidance-route');
                }
                console.log("Usuario ha llegado a la primera estación");
                return true;
             }
             return false;
        };
        const createUserMarker = (lngLat: LngLatLike) => {
             if (!mapInstance) return;
             const el = document.createElement('div');
             el.className = 'user-location-marker'; // Necesitas CSS
             el.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4285F4" stroke="#FFFFFF" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#FFFFFF"/></svg>`; // SVG simple azul
              if (userMarker) userMarker.remove();
              userMarker = new mapboxgl.Marker(el).setLngLat(lngLat).addTo(mapInstance);
        };
        const updateGuidanceRoute = async (userLoc: LocationState) => {
             if (hasReachedFirstStation || !mapInstance) return;
              try {
                 const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${userLoc.lng},${userLoc.lat};${firstStationCoords[0]},${firstStationCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`).catch(() => null);
                 let routeGeometry;
                 if (response && response.ok) {
                     const data = await response.json();
                     routeGeometry = data.routes?.[0]?.geometry;
                     if (routeGeometry) localStorage.setItem('last-guidance-route', JSON.stringify(routeGeometry));
                 } else {
                     const cachedRoute = localStorage.getItem('last-guidance-route');
                     routeGeometry = cachedRoute ? JSON.parse(cachedRoute) : null;
                 }
                 if (!routeGeometry || !mapInstance?.getSource('guidance-route')) { // Verifica si mapInstance existe
                     if (mapInstance?.getSource('guidance-route')) {
                         if (mapInstance.getLayer('guidance-route')) mapInstance.removeLayer('guidance-route');
                         mapInstance.removeSource('guidance-route');
                     }
                      if(routeGeometry && mapInstance){ // Verifica mapInstance de nuevo
                         mapInstance.addSource('guidance-route', { 
                             type: 'geojson', 
                             data: { 
                                 type: 'Feature', 
                                 geometry: routeGeometry,
                                 properties: {} 
                             } 
                         });
                         mapInstance.addLayer({ id: 'guidance-route', type: 'line', source: 'guidance-route', layout: {'line-join': 'round','line-cap': 'round'}, paint: {'line-color': '#0066ff', 'line-width': 4, 'line-dasharray': [2, 1]} });
                     }
                 } else if (mapInstance?.getSource('guidance-route')) {
                    (mapInstance.getSource('guidance-route') as mapboxgl.GeoJSONSource).setData({ type: 'Feature', properties: {}, geometry: routeGeometry });
                 }
             } catch (error) { console.error('Error actualizando la ruta de guía:', error); }
        };

        if ('geolocation' in navigator) {
            loadStoredLocations();
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const userLocation: LocationState = { lng: position.coords.longitude, lat: position.coords.latitude, accuracy: position.coords.accuracy, timestamp: position.timestamp, altitude: position.coords.altitude, speed: position.coords.speed };
                    if (checkArrivalToFirstStation(userLocation)) { }
                    locationHistory.push(userLocation); saveLocations();
                    lastKnownLocation = userLocation; // Actualiza última conocida
                    createUserMarker([userLocation.lng, userLocation.lat]);
                    if (!hasReachedFirstStation) updateGuidanceRoute(userLocation);
                    setCurrentLoc(userLocation);
                },
                (error) => { console.error('Error getting location:', error); if (lastKnownLocation) setCurrentLoc(lastKnownLocation); },
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
            );
        } else { console.error("Geolocation no soportado."); }

        // Retorna función de limpieza específica para este tracking
        return {
            clearWatch: () => {
                if (watchId !== null) navigator.geolocation.clearWatch(watchId);
                if (userMarker) userMarker.remove();
                 if (mapInstance?.getSource('guidance-route')) { // Verifica si mapInstance existe
                    if (mapInstance.getLayer('guidance-route')) mapInstance.removeLayer('guidance-route');
                    mapInstance.removeSource('guidance-route');
                }
                console.log("Location tracking stopped.");
            }
        };
    }, []); // useCallback para que no se recree innecesariamente


    // --- EFECTOS ---

    // Efecto Online/Offline
    useEffect(() => {
        setIsOnline(navigator.onLine); // Setea estado inicial
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Efecto Inicialización Mapa
    useEffect(() => {
        if (!ruta || !mapContainerRef.current) { setIsLoading(false); return; }
        if (!ruta.coordenadas_principales?.[0]?.cordenadas || ruta.coordenadas_principales[0].cordenadas.length === 0 || !ruta.estaciones || ruta.estaciones.length === 0) {
            console.error("Mapa: Datos insuficientes para inicializar."); setIsLoading(false); return;
        }

        console.log("Mapa UseEffect: Inicializando...");
        setIsLoading(true);
        let mapObj: Map | null = null;
        let isMounted = true;

        const initMap = async () => {
            try {
                 mapObj = new mapboxgl.Map({ container: mapContainerRef.current!, style: 'mapbox://styles/mapbox/satellite-streets-v12', center: [ruta.estaciones![0].lng, ruta.estaciones![0].lat], zoom: 13, preserveDrawingBuffer: true });
                 setMapInstance(mapObj);

                 mapObj.on('load', async () => {
                    if (!isMounted || !mapObj) return;
                    console.log("Mapa: Load event.");

                    mapObj.addSource('mapbox-dem', { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512, maxzoom: 14 });
                    mapObj.setTerrain({ 'source': 'mapbox-dem', exaggeration: 1.5 });
                    mapObj.addControl(new mapboxgl.NavigationControl());

                    const coordinates = ruta.coordenadas_principales![0].cordenadas.map(c => [c.lng, c.lat]);
                    mapObj.addSource('route', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } } });
                    mapObj.addLayer({ id: 'route', type: 'line', source: 'route', layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': '#0066FF', 'line-width': 4 } });

                    (ruta.estaciones || []).forEach((estacion) => {
                         if (!estacion.lat || !estacion.lng) return;
                         const el = document.createElement('div');
                         el.className = 'station-marker';
                         el.innerHTML = `<svg width="30" height="42" viewBox="0 0 24 34"><path d="M12 0C7 0 3 4 3 9c0 7 9 17 9 17s9-10 9-17C21 4 17 0 12 0z" fill="#00CD70"/><text x="12" y="15" font-size="10" fill="#fff" text-anchor="middle">${estacion.numero_estacion || '?'}</text></svg>`;
                         const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${estacion.nombre}</h3><p>${estacion.description || ''}</p>${estacion.img ? `<img src="${estacion.img}" alt="${estacion.nombre}" style="width:100px; height:auto;">` : ''}`);
                         new mapboxgl.Marker(el).setLngLat([estacion.lng, estacion.lat]).setPopup(popup).addTo(mapObj as mapboxgl.Map);
                    });

                    const bounds = coordinates.reduce((b, coord) => b.extend(coord as LngLatLike), new mapboxgl.LngLatBounds(coordinates[0] as LngLatLike, coordinates[0] as LngLatLike));
                    mapObj.fitBounds(bounds, { padding: { top: 50, bottom: 150, left: 50, right: 50 } });

                    const tracker = initLocationTrackingInternal(mapObj, [ruta.estaciones![0].lng, ruta.estaciones![0].lat], setCurrentLocation);
                    locationTrackerRef.current = tracker;

                    if (containerChart.current) await getElevationInternal(coordinates, containerChart.current);
                    if (process.env.NODE_ENV === 'production') cacheTiles(bounds, 12, 15);
                    if (isMounted) setIsLoading(false);
                    console.log("Mapa: Init complete.");
                });
                mapObj.on('error', (e) => { console.error("Mapbox Error:", e); if (isMounted) setIsLoading(false); });
            } catch(e) { console.error("InitMap Error:", e); if (isMounted) setIsLoading(false); }
        };
        initMap();
        return () => {
            isMounted = false;
            locationTrackerRef.current?.clearWatch();
            chartInstanceRef.current?.destroy();
            chartInstanceRef.current = null;
            // if (mapObj) mapObj.remove(); // Si usas la variable local del efecto
            if (mapInstance) mapInstance.remove(); // Puedes usar el estado aquí
            setMapInstance(null);
        };
    }, [ruta, getElevationInternal, initLocationTrackingInternal]); // Incluye funciones useCallback


    // Efecto para Métricas
    useEffect(() => {
        if (!ruta || !currentLocation) return;

        if (startTimeRef.current === null) { startTimeRef.current = Date.now(); localStorage.setItem('route_start_time', Date.now().toString()); }
        if (lastPositionRef.current) {
             const newDistance = calculateDistance(lastPositionRef.current.lat, lastPositionRef.current.lng, currentLocation.lat, currentLocation.lng);
             if (newDistance > 0.002) distanceAccumulatorRef.current += newDistance;
        }
        lastPositionRef.current = currentLocation;
        const startTimeToUse = parseInt(localStorage.getItem('route_start_time') || String(startTimeRef.current || Date.now()));
        const tiempoTranscurridoMs = Date.now() - startTimeToUse;
        const tiempoTranscurridoHoras = tiempoTranscurridoMs / 3600000;
        const velocidadPromedio = tiempoTranscurridoHoras > 0 ? (distanceAccumulatorRef.current / tiempoTranscurridoHoras) : 0;
        const porcentaje = distanciaTotal > 0 ? Math.min(Math.round((distanceAccumulatorRef.current / distanciaTotal) * 100), 100) : 0;
        const minutos = Math.floor(tiempoTranscurridoMs / 60000); const segundos = Math.floor((tiempoTranscurridoMs % 60000) / 1000);
        const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        setMetrics({ kmRecorridos: distanceAccumulatorRef.current.toFixed(2), velocidadPromedio: velocidadPromedio.toFixed(1), tiempoRecorrido: tiempoFormateado, porcentajeCompletado: porcentaje });
    }, [currentLocation, ruta]);

    // Handler para acordeón de emergencia
     const toggleEmergencyAccordion = () => setIsExpanded(!isExpanded);

    // --- Renderizado ---
    if (!ruta) return <div className="loading-container">Cargando datos de ruta...</div>; // Loader si no hay datos iniciales

    return (
        <>
            <div className='container-seccion-mapa-completo'>
                <div className='container-mapa'>
                    <div className='container-img-map'>
                        <div id='map-container' ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
                        {isLoading && (
                            <div className="loading-overlay">
                                <ClipLoader color={"#00CD70"} size={50} /> {/* Usa tu color primario */}
                                <span>Cargando mapa interactivo...</span>
                            </div>
                        )}
                    </div>
                    {!isOnline && ( <div className="offline-indicator">Modo sin conexión</div> )}
                </div>

                <div className='container-info-mapa'>
                    <div className='container-recuadro-info-title-mapa'><h4>{ruta.nombre}</h4></div>
                    {/* Métricas */}
                    <div className='container-cuadro-funcionalidades'>
                        <div className='container-interno'><h5>Km recorridos</h5><p className="container-funcionalidad">{metrics.kmRecorridos}</p></div>
                        <div className='container-interno'><h5>Tiempo</h5><span className='container-funcionalidad'>{metrics.tiempoRecorrido}</span></div>
                    </div>
                    <div className='container-cuadro-funcionalidades'>
                        <div className='container-interno'><h5>Progreso</h5><p className="container-funcionalidad">{metrics.porcentajeCompletado}%</p></div>
                        <div className='container-interno'><h5>Velocidad (km/h)</h5><span className='container-funcionalidad'>{metrics.velocidadPromedio}</span></div>
                    </div>
                    {/* Gráfico */}
                    <div className='container-canvas-chart'>
                         <canvas className='canva-graph-elevation' id="elevationChart" ref={containerChart}></canvas>
                    </div>
                    <div className='separador'></div>

                    {/* Acordeón de Emergencias */}
                     {Array.isArray(ruta.emergencias) && ruta.emergencias.length > 0 && (
                        <div className='accordion-emergencia'> {/* Usa esta clase o la genérica 'accordion' */}
                             <div className='accordion-item1'> {/* O la clase que uses */}
                                 <button
                                     className={`accordion-header ${isExpanded ? 'active' : ''}`}
                                     onClick={toggleEmergencyAccordion}
                                     aria-expanded={isExpanded}
                                 >
                                      Emergencias
                                     <IoIosArrowForward className={`icon ${isExpanded ? 'rotated' : ''}`} />
                                 </button>
                                 {isExpanded && (
                                      <div className='accordion-content-aloja'> {/* Usa clase consistente */}
                                          {ruta.emergencias.map(emergencia => (
                                              <div key={emergencia.id} className="emergency-contact">
                                                   <p><strong>{emergencia.tipo}:</strong> {emergencia.numero}</p>
                                               </div>
                                           ))}
                                       </div>
                                  )}
                             </div>
                         </div>
                      )}
                </div>
            </div>
        </>
    );
};

export default RutaMapaClient; // Exporta el componente cliente principal