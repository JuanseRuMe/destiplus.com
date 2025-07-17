'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado en error.tsx:", error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>¡Oops! Algo salió mal.</h2>
      <p>Se ha producido un error inesperado en esta sección.</p>

      {process.env.NODE_ENV === 'development' && (
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          background: '#eee',
          padding: '1rem',
          margin: '1rem 0',
          textAlign: 'left',
        }}>
          {error?.message || 'Sin mensaje de error.'}
          {error?.digest && `\nDigest: ${error.digest}`}
          {error?.stack && `\nStack: ${error.stack}`}
        </pre>
      )}

      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
