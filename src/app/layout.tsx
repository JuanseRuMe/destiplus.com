import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script'; // *** Importa el componente Script ***
import { Nunito } from 'next/font/google'; // 1. Importa la fuente desde next/font/google
import '@/style/goblaes.css';


// 2. Configura la fuente (con los pesos y estilos que necesites)
const nunito = Nunito({
  subsets: ['latin'], // Subconjunto de caracteres
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'], // Pesos que usarás
  style: ['normal', 'italic'], // Estilos que usarás
  display: 'swap', // Estrategia de carga
});

// Metadata base + Icono
export const metadata: Metadata = {
  metadataBase: new URL('https://www.destiplus.com'),
  title: {
    default: 'Tu Asistente Inteligente para Viajar a Suesca Colombia | Destiplus', // Título por defecto
    template: '%s', // Plantilla para títulos de páginas hijas
  },
  description: 'Planifica tu viaje a Suesca Colombia con Destiplus, tu asistente inteligente: descubre hoteles, gastronomía, miradores y rutas imperdibles.',
  keywords: ['suesca cundinamarca', 'suesca', 'que hacer en suesca', 'suesca colombia', 'suesca escalada', 'cabañas en suesca', 'suesca restaurantes', 'suesca restaurantes', 'suesca pueblo', 'suesca que hacer'],
  icons: {
    icon: [ // Puedes definir varios tipos/tamaños
      { url: 'https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png', type: 'image/png'}
    ],
    shortcut: ['https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png']
  },
  robots: { // Robots por defecto
    index: true,
    follow: true,
    googleBot: { // Puedes ser más específico
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Tu Asistente Inteligente para Viajar a Suesca Colombia | Destiplus', 
    description: 'Planifica tu viaje a Suesca Colombia con Destiplus, tu asistente inteligente: descubre hoteles, gastronomía, miradores y rutas imperdibles.',
    url: '/', // URL relativa a metadataBase para la página principal
    siteName: 'Destiplus',
    images: [ // Imagen OG por defecto
      {
        url: 'https://res.cloudinary.com/destinoplus/image/upload/v1735254381/k4csbetbhqotgqohq6ub.jpg',
        width: 1200, // Especifica dimensiones si las sabes
        height: 630,
        alt: 'Descubre Suesca con Destiplus',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  alternates: {
    languages: {
      'es-CO':'/',
      'en-US':'/en',
    }
  },
  verification: {
    google: 'yIPkQrNZpAuX4Q4LtIMOSxLL5yHX6gZcartjrJa5Iq0'
  },
};

export default function RootLayout({
  children,
  }: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="es" className={nunito.className}>
      <head>
        {/* Mapbox CSS (esto estaba bien) */}
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css' rel='stylesheet' />

        {/* ----- SCRIPTS DE SEGUIMIENTO (Usando next/script) ----- */}

        {/* Google Tag Manager (Head) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W4X8QVGT');
          `}
        </Script>

        {/* Google Analytics gtag.js */}
        {/* NOTA: Si GTM ya carga GA4, quizás no necesites este bloque completo, solo la parte de configuración si GTM no la hace. */}
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-ET8RE54YDV"
            strategy="afterInteractive"
            async // async es manejado por la estrategia
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ET8RE54YDV');
          `}
        </Script>

        {/* Meta Pixel Code (Head) */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
             !function(f,b,e,v,n,t,s)
             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
             n.queue=[];t=b.createElement(e);t.async=!0;
             t.src=v;s=b.getElementsByTagName(e)[0];
             s.parentNode.insertBefore(t,s)}(window, document,'script',
             'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '1506209636679627');
             fbq('track', 'PageView');
          `}
        </Script>

        {/* TikTok Pixel Code (Head) */}
        <Script id="tiktok-pixel-init" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src=r+"?sdkid="+e+"&lib="+t;var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(i,s)};
              ttq.load('CTVIMABC77U8ITIDUOH0');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        {/* ----- FIN SCRIPTS DE SEGUIMIENTO ----- */}

      </head>
      <body>
        {/* --- NOSCRIPT TAGS (JUSTO DESPUÉS DE ABRIR BODY) --- */}
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4X8QVGT"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager" // Añadir title por accesibilidad
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Meta Pixel (noscript) */}
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
               src="https://www.facebook.com/tr?id=1506209636679627&ev=PageView&noscript=1"
               alt="" // Alt vacío es mejor para imágenes decorativas/tracking
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Mensaje genérico noscript */}
        <noscript>Necesitas habilitar JavaScript para ejecutar esta aplicación.</noscript>
        {/* --- FIN NOSCRIPT TAGS --- */}

        <main>{children}</main> {/* Contenido principal de la página */}

      </body>
    </html>
  );
}