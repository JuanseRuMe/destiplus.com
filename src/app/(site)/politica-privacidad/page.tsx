import React from 'react';
import PrivacyPolicyClient from '@/components/common/politicaPrivacidad'; // Ajusta la ruta si es necesario
import type { Metadata } from 'next';

// Metadatos para SEO
export const metadata: Metadata = {
  title: 'Política de Privacidad y Tratamiento de Datos | TravelTech Suesca',
  description: 'Conoce cómo TravelTech Suesca recopila, utiliza y protege tus datos personales al usar nuestra plataforma turística en Suesca, Cundinamarca.',
  keywords: ['política de privacidad', 'tratamiento de datos', 'privacidad', 'datos personales', 'TravelTech Suesca', 'Suesca'],
  openGraph: { // Puedes añadir más metadatos para redes sociales
    title: 'Política de Privacidad y Tratamiento de Datos | TravelTech Suesca',
    description: 'Conoce cómo TravelTech Suesca recopila, utiliza y protege tus datos personales.',
    url: 'https://www.destiplus.com/politica-privacidad', // Cambia esto a tu URL real
  },
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <PrivacyPolicyClient />
    </>
  );
};

export default PrivacyPolicyPage;