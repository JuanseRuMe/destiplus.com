'use client';

import React, { useEffect } from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  message: string;
  duration?: number; // Duración en ms antes de cerrar (opcional)
  onClose: () => void; // Función para cerrar
  type?: 'success' | 'error' | 'warning' | 'info'; // Tipos opcionales para estilos
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  message,
  duration = 5000, // Default a 5 segundos si no se especifica
  onClose,
  type = 'info', // Default a 'info'
}) => {

  // Efecto para manejar el cierre automático
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null; // Tipo para el timer de Node/JS
    if (isOpen) {
      timerId = setTimeout(() => {
        onClose();
      }, duration);
    }

    // Limpieza
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOpen, duration, onClose]); // Dependencias del efecto

  // No renderizar si no está abierto
  if (!isOpen) {
    return null;
  }

  // Clases CSS dinámicas basadas en el tipo (mantenemos la lógica)
  // Asegúrate de que estas clases CSS existan globalmente o en tu archivo de estilos importado
  const modalTypeClass = `notification-modal-${type}`; // Ej: notification-modal-error

  return (
    // Mantenemos las clases originales para reutilizar estilos
    <div className={`voting-modal-overlay notification-modal-overlay ${isOpen ? 'open' : ''}`}> {/* Añade clase 'open' para animaciones */}
      <div className={`voting-modal-content notification-modal-content ${modalTypeClass}`}>
        {/* Aquí podrías añadir un icono basado en 'type' */}
        {/* Ejemplo: {type === 'error' && <ErrorIcon />} */}
        <p className="notification-modal-message">{message}</p>
      </div>
    </div>
  );
};

export default NotificationModal;