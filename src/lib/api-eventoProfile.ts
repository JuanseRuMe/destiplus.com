import axios from 'axios';
import type { EventoDetailData } from '@/types/evento'; // Ajusta ruta

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Función para obtener DATOS DETALLADOS del Evento por SLUG/NOMBRE ---
export async function getEventoDataBySlug(
  eventSlugOrName: string
): Promise<EventoDetailData | null> {
  // El endpoint original era /evento/${description}/content
  // Asumimos que 'description' era el nombre del evento o un slug
  const encodedIdentifier = eventSlugOrName;
  const url = `${API_BASE_URL}/evento/${encodedIdentifier}/content`;
  console.log(`Server Fetching Evento Detail: ${url}`);

  try {
    const response = await axios.get<EventoDetailData>(url, { timeout: 10000 });
    if (!response.data || !response.data.evento || response.data.evento.length === 0) {
      console.warn(`No content found for evento slug/name: ${eventSlugOrName}`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for evento slug/name: ${eventSlugOrName}`, error);
    return null;
  }
}

