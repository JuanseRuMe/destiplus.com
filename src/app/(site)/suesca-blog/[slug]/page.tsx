// src/app/(site)/blog/[slug]/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ArticlePageClient from '@/components/features/blog/blog-individual';
import { getArticleDataBySlug } from '@/lib/api-blogIndividual'; // Importa desde tu "API" de prueba

export const revalidate = 3600;
 
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }>}
): Promise<Metadata> {
  const { slug: slugRaw } = await params
  const article = await getArticleDataBySlug(slugRaw);

  if (!article) {
    return {
      title: 'Artículo no encontrado | Destiplus',
      description: 'El artículo que buscas no existe o ha sido movido.',
    };
  }

  const ogImages = article.hero_image_url ? [{ url: article.hero_image_url, width: 1200, height: 630, alt: article.hero_image_alt }] : [];

  return {
    title: `${article.title} | Destiplus Blog`,
    description: article.meta_description || article.excerpt,
    keywords: article.keywords || [article.category.toLowerCase(), ...article.title.toLowerCase().split(' ').slice(0,5)], // Primeras 5 palabras del título
    openGraph: {
      title: `${article.title} | Destiplus Blog`,
      description: article.meta_description || article.excerpt,
      url: `https://www.destiplus.com/suesca-blog/${slugRaw}`, // Ajusta si tu ruta base es diferente (ej. /suesca-blog/)
      type: 'article',
      publishedTime: article.display_date, // Debe ser formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
      modifiedTime: article.display_date, // O una fecha de última modificación
      authors: [article.author], // Puedes poner la URL de un perfil de autor si lo tienes
      section: article.category, // La categoría del artículo
      tags: article.keywords,    // Puedes usar las keywords como tags también
      images: ogImages,
    },
    alternates: { // URL Canónica
        canonical: `https://www.destiplus.com/suesca-blog/${slugRaw}`, // Ajusta si tu ruta base es diferente
    }
  };
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }>}
) {
  const { slug: slugRaw } = await params
  const articleData = await getArticleDataBySlug(slugRaw);

  if (!articleData) {
    notFound();
  }

  return <ArticlePageClient article={articleData} />;
}