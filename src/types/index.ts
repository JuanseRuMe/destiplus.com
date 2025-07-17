// src/types/index.ts

// Estructura de un objeto Destino (ajusta según tu API)
export interface DestinoType {
  id: string | number;
  municipio: string;
  departamento: string;
  frase: string;
  img: string; // URL de la imagen
  calificacion?: number; // Opcional
  items?: Record<string, unknown>; // O una interfaz más específica
  slug: string;
}

// Estructura de un mensaje de Chat
export interface ChatMessage {
  text: string;
  sender: 'user' | 'ai';
}

export interface ArticlePreview {
  slug: string;
  title: string;
  category: string;
  hero_image_url: string; // Coincide con la respuesta de tu API
  excerpt: string;
  prioridad: number;
}

export interface ArticlePreviewResponse { // Para la estructura completa de la respuesta
  articles: ArticlePreview[];
}