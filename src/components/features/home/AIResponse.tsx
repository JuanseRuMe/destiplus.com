// src/components/features/home/AIResponse.tsx
'use client'; // Necesario por useEffect y useRef

import React, { useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

// Define las props
interface AIResponseProps {
  response: string | null; // Puede ser null si no hay respuesta aún
  isLoading: boolean;
  onClose: () => void;
}

const AIResponse: React.FC<AIResponseProps> = ({ response, isLoading, onClose }) => {
  const responseRef = useRef<HTMLDivElement>(null); // Tipa el ref

  useEffect(() => {
    // Scroll al inicio (o al final si prefieres un chat)
    if (responseRef.current && !isLoading) {
      responseRef.current.scrollTop = 0; // Scroll hacia arriba
      // Para scroll hacia abajo (chat):
      // responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response, isLoading]);

  // No renderizar nada si no hay respuesta Y no está cargando
  if (!response && !isLoading) return null;

  return (
    <div className="ai-response-container"> {/* Asegúrate que los estilos existan */}
      <div className="ai-response-header">
        <div className="ai-title">
          <FaRobot className="robot-icon" />
          <h4>Asistente Destiplus</h4>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar respuesta IA">
          <IoCloseOutline className="close-icon" />
        </button>
      </div>
      <div className="ai-response-content" ref={responseRef}>
        {isLoading ? (
          <div className="ai-loading">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
            <p>Buscando las mejores experiencias para ti...</p>
          </div>
        ) : (
          // Renderiza la respuesta (asumiendo que NO es markdown complejo aquí)
          // Si la respuesta es markdown, necesitarías una librería o función para parsearlo
          <div className="ai-message">
            {response?.split('\n').map((paragraph, index) => (
              paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResponse;