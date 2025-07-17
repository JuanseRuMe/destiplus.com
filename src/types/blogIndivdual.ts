// Asumo que este es tu archivo src/types/blogIndivdual.ts o src/lib/types.ts

export interface ArticleData {
  slug: string;
  title: string;
  category: string;
  author: string;
  publication_date: string;   // Cambiado de publicationDate
  display_date?: string;     // Cambiado de displayDate
  reading_time: string;     // Cambiado de readingTime
  hero_image_url: string;   // Ya coincidía
  hero_image_alt: string;   // Ya coincidía
  excerpt: string;
  meta_description?: string; // Cambiado de metaDescription
  keywords?: string[];       // Ya coincidía (asumiendo que la API devuelve 'keywords')
  content: Array<{
    type: 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | 'codeblock';
    text?: string;
    level?: 2 | 3 | 4 | 5 | 6;
    language?: string;
    url?: string;
    alt?: string;
    caption?: string;
    items?: string[];
    cite?: string;
  }>; // La estructura interna de content ya debería coincidir
  related_articles?: Array<{ // Cambiado de relatedArticles
    slug: string;
    title: string;
    imageUrl: string;     // El campo 'imageUrl' dentro de cada objeto relacionado ya coincidía con tu API
    category?: string;
  }>;

  // Campos adicionales de la API que podrías querer incluir:
  id?: number;
  prioridad?: number;
  created_at?: string;     // Formato ISO 8601 de la API
  updated_at?: string;     // Formato ISO 8601 de la API
}