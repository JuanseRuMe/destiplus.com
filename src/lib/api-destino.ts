// src/lib/api-destino.ts
import axios from 'axios';
import type { DestinoData } from '@/types/destino';

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

// --- Función para buscar por NOMBRE DE MUNICIPIO EXACTO ---
export async function getDestinoDataByMunicipio(municipio: string): Promise<DestinoData | null> {
  // Codificamos el nombre del municipio para usarlo en la URL de la API
  const encodedMunicipio = encodeURIComponent(municipio);
  // ¡ASEGÚRATE DE QUE ESTA SEA LA URL CORRECTA QUE ESPERA TU API!
  const url = `${API_BASE_URL}/destinos/${encodedMunicipio}/content`;
  console.log(`Server Fetching by Exact Municipio Name: ${url}`);

  try {
    const response = await axios.get<DestinoData>(url, { timeout: 10000 });
    if (!response.data || Object.keys(response.data).length === 0) {
        console.warn(`No content found for municipio: ${municipio}`);
        return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for municipio: ${municipio}`, error);
    return null; // Devuelve null en caso de error
  }
}