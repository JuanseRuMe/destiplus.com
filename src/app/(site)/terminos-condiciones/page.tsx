import React from 'react';
import TermsAndConditionsClient from '@/components/common/terminos'; // Ajusta la ruta si es necesario
import type { Metadata } from 'next';

// Metadatos para SEO
export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso | TravelTech Suesca',
  description: 'Consulta los Términos y Condiciones de uso de la plataforma TravelTech Suesca. Infórmate sobre nuestras políticas antes de utilizar nuestros servicios turísticos en Suesca.',
  keywords: ['términos y condiciones', 'condiciones de uso', 'legal', 'TravelTech Suesca', 'Suesca'],
  openGraph: { // Puedes añadir más metadatos para redes sociales
    title: 'Términos y Condiciones de Uso | TravelTech Suesca',
    description: 'Consulta los Términos y Condiciones de uso de la plataforma TravelTech Suesca.',
    url: 'https://www.desitplus.com/', // Cambia esto a tu URL real
  },
};

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <TermsAndConditionsClient />
    </>
  );
};

export default TermsAndConditionsPage;