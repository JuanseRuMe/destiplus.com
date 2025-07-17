// src/lib/api-alojamiento.ts
import axios from 'axios';
import type { AlojamientoDetailData } from '@/types/alojamiento';
import type { AlojamientoListItem } from '@/types/listadoAlojamiento';

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- NUEVA: Función para obtener LISTA de Alojamientos por ID de Destino ---
export async function fetchAlojamientoListById(destinoId: number): Promise<AlojamientoListItem[]> {
  // Endpoint original que usabas
  const url = `${API_BASE_URL}/listados/demas/${destinoId}/alojamientos`;
  console.log(`Server Fetching Alojamiento List for Destino ID: ${url}`);
  try {
    const response = await axios.get<AlojamientoListItem[]>(url, { timeout: 8000 });
    return response.data || []; // Devuelve datos o array vacío
  } catch (error) {
    console.error(`Error fetching alojamiento list for destino ID: ${destinoId}`, error);
    return []; // Devuelve array vacío en caso de error
  }
}

// --- Función existente para detalle (ajusta si es necesario) ---
export async function getAlojamientoDataByName(alojamientoName: string): Promise<AlojamientoDetailData | null> {
  const encodedName = encodeURIComponent(alojamientoName);
  const url = `${API_BASE_URL}/alojamiento/${encodedName}/content`; // VERIFICA ESTA URL
  console.log(`Server Fetching Alojamiento Detail by Name: ${url}`);
  try {
    const response = await axios.get<AlojamientoDetailData>(url, { timeout: 10000 });
    return response.data ?? null;
  } catch (error) {
    console.error(`Error fetching data for alojamiento name: ${alojamientoName}`, error);
    return null;
  }
}

// --- Funciones para mapeo y generateStaticParams (si son necesarias) ---
// export async function fetchAllMunicipios(): Promise<string[]> { /* ... */ }
// export async function fetchAllAlojamientoPaths(): Promise<{ municipio: string; alojamientoName: string; }[]> { /* ... */ }