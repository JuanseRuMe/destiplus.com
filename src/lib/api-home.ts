// src/lib/api.ts
import axios from 'axios';
import { DestinoType, ArticlePreviewResponse, ArticlePreview } from '@/types'; // Asegúrate que este tipo exista en src/types/index.ts

// Lee la URL base de las variables de entorno (recomendado) o usa el valor directo
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://tree-suesca-backend-production.up.railway.app/api/v1/destinos/filtros';
const API_BASE_URL_ARTICLE = 'https://tree-suesca-backend-production.up.railway.app/api/v1/previews'
/**
 * Obtiene la lista inicial de destinos desde tu backend usando Axios.
 * Esta función se ejecuta en el SERVIDOR (llamada desde page.tsx).
 */
export async function getDestinosIniciales(): Promise<DestinoType[]> {
  try {
    console.log(`API Call: Fetching initial destinos from ${API_BASE_URL}`);
    // Usamos axios.get para la petición
    const response = await axios.get<DestinoType[]>(API_BASE_URL, {
        // Puedes añadir headers si son necesarios para tu backend
        // headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
        timeout: 10000, // Timeout de 10 segundos
    });

    // Axios devuelve los datos en la propiedad 'data'
    // Asumiendo que la API devuelve directamente el array DestinoType[]
    console.log(`API Success: Received ${response.data.length} destinos.`);
    return response.data;

  } catch (error) {
    console.error("API Error: Failed fetching initial destinos using axios:", error);
    // Log detallado si es error de Axios
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        // response_data: error.response?.data, // Cuidado con loggear datos sensibles
      });
    }
     // En producción, podrías querer lanzar el error para que Next.js lo maneje
     // throw error;
     // Para desarrollo, devolver un array vacío permite que la página cargue
    return [];
  }
}

export async function getBlogsIniciales(): Promise<ArticlePreview[]> {
  try {
    const response = await axios.get<ArticlePreviewResponse>(API_BASE_URL_ARTICLE, {
      timeout: 10000,
    });
    if (response.data?.articles) {
      console.log(`API Success: Received ${response.data.articles.length} article previews.`);
      return response.data.articles;
    }
    return [];
  } catch (error) {
    console.error("API Error: Failed fetching initial destinos using axios:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
      });
    }
    return [];
  }
}
