// src/lib/api-ruta-mapa.ts
import axios from 'axios';
import type { RutaMapData } from '@/types/mapa'; // Ajusta ruta

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Obtener Datos para el Mapa por Slug/Nombre ---
export async function getRutaMapDataBySlug(slugOrName: string): Promise<RutaMapData | null> {
  const encodedIdentifier = (slugOrName);
  // Endpoint específico para los datos del mapa
  const url = `${API_BASE_URL}/ruta/mapa/${encodedIdentifier}/content`;
  console.log(`Server Fetching Ruta Map Data: ${url}`);
  try {
    const response = await axios.get<RutaMapData>(url, { timeout: 10000 });
    // Añade validaciones si es necesario (ej: verificar que coordenadas_principales exista)
    if (!response.data?.coordenadas_principales?.[0]?.cordenadas) {
        console.warn("Datos de coordenadas principales faltantes en la respuesta de la API");
        // Decide si retornar null o datos parciales
    }
    return response.data ?? null;
  } catch (error) {
    console.error(`Error fetching map data for slug/name: ${slugOrName}`, error);
    return null;
  }
}
