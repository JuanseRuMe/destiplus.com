// src/lib/api-actividad.ts
import axios from 'axios';
import type { ActividadListItem } from '@/types/listadoActividades'; 

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Función para obtener LISTA de Actividades por ID de Destino ---
export async function fetchActividadListById(destinoId: string | number): Promise<ActividadListItem[]> {
  // Endpoint original que usabas
  const url = `${API_BASE_URL}/listados/demas/${destinoId}/actividades`;
  console.log(`Server Fetching Actividad List for Destino ID: ${url}`);
  try {
    const response = await axios.get<ActividadListItem[]>(url, { timeout: 8000 });
    return response.data || []; // Devuelve datos o array vacío
  } catch (error) {
    console.error(`Error fetching actividad list for destino ID: ${destinoId}`, error);
    return []; // Devuelve array vacío en caso de error
  }
}