// src/lib/api-evento.ts
import axios from 'axios';
import type { EventoListItem } from '@/types/listadoEventos'; // O @/types/evento

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';
const TIPO_ENDPOINT = 'eventos'; // Tipo para la API

// --- Función para obtener LISTA de Eventos por ID de Destino ---
export async function fetchEventoListById(destinoId: string | number): Promise<EventoListItem[]> {
  const url = `${API_BASE_URL}/listados/demas/${destinoId}/${TIPO_ENDPOINT}`;
  console.log(`Server Fetching Evento List for Destino ID: ${url}`);
  try {
    const response = await axios.get<EventoListItem[]>(url, { timeout: 8000 });
    return response.data || []; // Devuelve datos o array vacío
  } catch (error) {
    console.error(`Error fetching evento list for destino ID: ${destinoId}`, error);
    return []; // Devuelve array vacío en caso de error
  }
}

// --- (Opcional) Función para obtener detalle de evento por nombre/slug ---
// Si la página de detalle de evento es /evento/[nombreEvento]
// import type { EventoDetailData } from '@/types/index'; // O @/types/evento
// export async function getEventoDataByNameOrSlug(identifier: string): Promise<EventoDetailData | null> {
//   const url = `${API_BASE_URL}/evento/${encodeURIComponent(identifier)}/content`; // ¡VERIFICA ENDPOINT!
//   // ... Lógica similar a getAlojamientoDataByName o getActividadDataBySlug ...
// }

// --- (Opcional) Función para generateStaticParams ---
// Necesitaría una forma de obtener todos los municipios con eventos
// export async function fetchAllMunicipiosConEventos(): Promise<string[]> { /* ... */ }