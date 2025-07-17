import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { X } from 'lucide-react';

const MapComponent = ({ isOpen, onClose, coordinates }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const userMarker = useRef(null);
    const watchId = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Primero hacemos visible el contenedor
            setIsVisible(true);
        } else {
            // Al cerrar, primero ejecutamos la animación
            setIsVisible(false);
            // Luego esperamos a que termine la animación antes de limpiar
            const timeout = setTimeout(() => {
                if (watchId.current) {
                    navigator.geolocation.clearWatch(watchId.current);
                }
                if (map.current) {
                    map.current.remove();
                }
                userMarker.current = null;
            }, 300); // Este tiempo debe coincidir con la duración de la transición en CSS
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isVisible || !mapContainer.current) return;

        mapboxgl.accessToken = 'pk.eyJ1IjoiZGVzdGluby1wbHVzIiwiYSI6ImNtM3QzY3VkcTA0MnMybHBqaG42cnlwMGQifQ.yCsdkgJaxSy22A9sjgyikQ';

        // Inicializar mapa
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [coordinates.lng, coordinates.lat],
            zoom: 13
        });

        // Función para dibujar la ruta
        const drawRoute = async (start, end) => {
            try {
                const response = await fetch(
                    `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
                ).catch(() => null);
    
                let routeGeometry;
    
                if (response && response.ok) {
                    const data = await response.json();
                    routeGeometry = data.routes[0].geometry;
                    localStorage.setItem('last-guidance-route', JSON.stringify(routeGeometry));
                } else {
                    const cachedRoute = localStorage.getItem('last-guidance-route');
                    routeGeometry = cachedRoute ? JSON.parse(cachedRoute) : null;
                }
    
                if (!routeGeometry) return;
    
                if (map.current.getSource('guidance-route')) {
                    map.current.removeLayer('guidance-route');
                    map.current.removeSource('guidance-route');
                }
    
                map.current.addSource('guidance-route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: routeGeometry
                    }
                });
    
                map.current.addLayer({
                    id: 'guidance-route',
                    type: 'line',
                    source: 'guidance-route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#0066ff',
                        'line-width': 4,
                        'line-dasharray': [2, 1]
                    }
                });
    
                guidanceRoute = routeGeometry;
            } catch (error) {
                console.error('Error al actualizar la ruta de guía:', error);
            }
        };

        const createCustomMarkerElement = () => {
            const element = document.createElement('div');
            element.className = 'custom-user-marker';
            element.innerHTML = `
                <div class="user-marker-container">
                    <div class="user-marker-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="11" fill="#FFFFFF"/>
                            <path d="M12 13c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6 6c0-2.2-1.8-4-4-4h-4c-2.2 0-4 1.8-4 4" fill="#2196F3"/>
                        </svg>
                    </div>
                    <div class="user-marker-pulse"></div>
                </div>
            `;
            return element;
        };

        // Función para actualizar la posición del usuario
        const updateUserLocation = (position) => {
            const userCoords = [position.coords.longitude, position.coords.latitude];
            
            // Si el marcador no existe, créalo
            if (!userMarker.current) {
                const markerElement = createCustomMarkerElement();
                userMarker.current = new mapboxgl.Marker({
                    element: markerElement,
                    anchor: 'center'
                })
                .setLngLat(userCoords)
                .addTo(map.current);
            } else {
                // Si existe, actualiza su posición
                userMarker.current.setLngLat(userCoords);
            }

            // Actualizar la ruta cada vez que la posición cambie
            drawRoute(userCoords, [coordinates.lng, coordinates.lat]);
        };

        // Esperar a que el mapa se cargue completamente
        map.current.on('load', () => {
            // Marcador del establecimiento
            new mapboxgl.Marker({
                color: "#00cd70",
                scale: 1.2
            })
            .setLngLat([coordinates.lng, coordinates.lat])
            .addTo(map.current);

            // Iniciar seguimiento de ubicación
            watchId.current = navigator.geolocation.watchPosition(
                updateUserLocation,
                (error) => {
                    console.error('Error al seguir la ubicación:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        });

        // Cleanup function
        return () => {
            if (watchId.current) {
                navigator.geolocation.clearWatch(watchId.current);
            }
            if (map.current) {
                map.current.remove();
            }
            userMarker.current = null;
        };
    }, [isVisible, coordinates]);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsVisible(false);
        // Esperamos a que termine la animación antes de llamar a onClose
        setTimeout(onClose, 300);
    };

    return (
        <div className={`map-overlay ${isVisible ? 'visible' : ''}`}>
            <div className="map-container">
                <button className="close-map-btn" onClick={handleClose}>
                    <X size={24} />
                </button>
                <div ref={mapContainer} className="map-box" />
            </div>
        </div>
    );
};

export default MapComponent;