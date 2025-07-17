// src/lib/api-actividad.ts
import axios from 'axios';
import type { ActividadDetailData } from '@/types/actividad'; // O tus archivos de tipos
import { generateSlug } from '@/lib/utils';

const API_BASE_URL = 'https://tree-suesca-backend-production.up.railway.app/api/v1';

interface ActividadListItem {
  id: number;
  name: string;
  img: string;
  logo: string;
  calificacion?: number | null;
}

// --- Función para obtener DATOS DETALLADOS por SLUG ---
// Asume que la API acepta el slug directamente ahora
export async function getActividadDataBySlug(slug: string): Promise<ActividadDetailData | null> {
  // ¡VERIFICA Y AJUSTA ESTE ENDPOINT! Usa el slug directamente.
  const url = `${API_BASE_URL}/actividad/${slug}/content`;
  console.log(`Server Fetching Actividad Detail by Slug: ${url}`);
  try {
    const response = await axios.get<ActividadDetailData>(url, { timeout: 10000 });
    if (!response.data || !response.data.actividad || response.data.actividad.length === 0) {
      console.warn(`No content found for actividad slug: ${slug}`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for actividad slug: ${slug}`, error);
    return null;
  }
}

// --- Función para obtener LISTA de Actividades por ID de Destino (Existente) ---
export async function fetchActividadListById(destinoId: string | number): Promise<ActividadListItem[]> {
  const url = `${API_BASE_URL}/listados/demas/${destinoId}/actividades`;
  console.log(`Server Fetching Actividad List for Destino ID: ${url}`);
  try {
    const response = await axios.get<ActividadListItem[]>(url);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching actividad list for destino ID: ${destinoId}`, error);
    return [];
  }
}

// --- Función para obtener todos los SLUGS de Actividades (para generateStaticParams) ---
export async function fetchAllActividadSlugs(): Promise<string[]> {
    // Necesitas un endpoint que devuelva TODAS las actividades (al menos nombre o slug)
    // const url = `${API_BASE_URL}/actividades/all/basic`; // <-- EJEMPLO, ¡NECESITAS CREAR ESTO EN TU API!
    console.log("Fetching all activities for slugs... (Using Placeholder)");
    try {
        // --- Placeholder --- Reemplaza con llamada a API real ---
        const response = { data: [
            { name: 'Escalada en Roca para Principiantes' },
            { name: 'Senderismo a la Laguna' },
            // ...más actividades
        ]};
        // const response = await axios.get<BasicActividadInfo[]>(url);
        // ---------------------------------------------------------

       const actividades = response.data || [];
       const slugs = actividades
         .map(act => act.name ? generateSlug(act.name) : null) // Genera slug
         .filter((slug): slug is string => slug !== null && slug !== ''); // Filtra
       return [...new Set(slugs)]; // Únicos
    } catch (error) {
       console.error("Error fetching all actividad slugs:", error);
       return [];
    }
}