
import React from 'react';
import type { Metadata } from 'next';
import BurgerProfileClient from '@/components/features/eventos/no-fijos/perfil-burguer'; // Ajusta ruta al cliente


export const revalidate = 3600;

// --- Metadata Dinámica (lee de datos hardcodeados) ---
export async function generateMetadata(
  { params }: { params: Promise<{ burgerSlug: string }>}
): Promise<Metadata> {
  const { burgerSlug: slug } = await params
  const burgerIdNum = parseInt(slug, 10);


  const title = ` Batalla de Hamburguesas en Suesca Colombia, la mejor de la región.`;
  const description = `Descubre las mejores burger de Suesca`;
  // Construye URL de Cloudinary para OG image (asegúrate que NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME esté definido)

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.destiplus.com/destino/Suesca/parchar/batalla/${burgerIdNum}`,
    },
    openGraph: {
      title: `Vota por ${burgerIdNum} en la Batalla de Hamburguesas!`,
      url: `https://www.destiplus.com/destino/Suesca/parchar/batalla/${burgerIdNum}`,
      type: 'article',
      images: [
        { // Imagen principal del evento para compartir
          url: 'https://res.cloudinary.com/destinoplus/image/upload/v1746721171/n7wcg2qtag12572xcj1l.jpg', 
          width: 1080, // Ancho real de la imagen
          height: 1080, // Alto real de la imagen
          alt: 'Batalla de Hamburguesas 3.0 Suesca',
        },
      ],
    },
  };
}


// --- Componente de Página ---
export default async function BurgerProfilePage(
  { params }: { params: Promise<{ burgerSlug: string }> }
) {
  const { burgerSlug: slug } = await params
  console.log(`Server: Rendering BurgerProfilePage for burgerId (${slug})`);


  // Renderiza el componente cliente, pasándole solo el ID
  return (
    <BurgerProfileClient burgerId={slug} />
  );
}