"use client"; // Obligatorio: Indica que es un Componente de Cliente

import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";

// 1. Definimos la interfaz para las props del componente
interface SearchBoxProps {
  placeholder?: string; // El placeholder estático original (aunque no se use mucho por la animación)
  onSearch?: (value: string) => void; // Función opcional para búsqueda "normal" mientras se escribe
  onAISearch: (value: string) => void; // Función requerida para enviar la pregunta a la IA
}

// Opcional: Declarar gtag en el scope global para evitar errores de TS si usas window.gtag
// Puedes poner esto en un archivo de declaraciones global (ej: global.d.ts) o aquí mismo
declare global {
    interface Window {
        gtag?: (command: string, action: string, params?: object) => void;
    }
}


// 2. Usamos React.FC y la interfaz de Props
const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  onAISearch,
}) => {
  // Tipamos los estados (aunque TS a menudo puede inferirlos)
  const [inputValue, setInputValue] = useState<string>('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState<string>('');
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Tipamos los refs
  const suggestionIndexRef = useRef<number>(0);
  const charIndexRef = useRef<number>(0);
  const isDeletingRef = useRef<boolean>(false);

  // Lista de sugerencias (sin cambios)
  const suggestions = [
    "¿Qué paisajes tienen menos gente en Suesca este fin de semana?",
    "¿Hay alojamientos con jacuzzi por menos de 300.000 en Suesca?",
    "¿Qué restaurantes en Sesquilé tienen los mejores precios?",
    "¿Dónde puedo acampar por menos de 50.000?",
    "¿Dónde puedo hacer escalada en Suesca por menos de 80.000 pesos?",
    "¿Cuál es el mejor mirador en Sesquilé?",
    "¿Puedo reservar directo por WhatsApp un hospedaje en Suesca?",
    "¿Qué actividades puedo reservar ahora para este sábado en Sesquilé?",
    "No sé qué hacer en Suesca, tengo 200.000 pesos y quiero algo al aire libre",
    "¿Hay algún evento especial este fin de semana en Suesca?",
    "¿Dónde comen los locales en Suesca que no sea turístico?",
    "¿Cuáles son esos paisajes escondidos que solo conocen los de Sesquilé?"
  ];

  // useEffect para actualizar refs (sin cambios en lógica)
  useEffect(() => {
    suggestionIndexRef.current = currentSuggestionIndex;
    charIndexRef.current = currentCharIndex;
    isDeletingRef.current = isDeleting;
  }, [currentSuggestionIndex, currentCharIndex, isDeleting]);

  // useEffect para la animación del placeholder (sin cambios en lógica)
  useEffect(() => {
    const animatePlaceholder = () => {
        const currentSuggestion = suggestions[suggestionIndexRef.current];

        if (!isDeletingRef.current) {
            // Escribiendo
            const nextCharIndex = charIndexRef.current + 1;
            // Verificación para evitar exceder la longitud
            if (nextCharIndex <= currentSuggestion.length) {
                setCurrentPlaceholder(currentSuggestion.substring(0, nextCharIndex));
                setCurrentCharIndex(nextCharIndex);
            }

            // Si terminamos de escribir
            if (nextCharIndex >= currentSuggestion.length) {
                // Pausa antes de empezar a borrar
                setTimeout(() => {
                    setIsDeleting(true);
                }, 1000); // Pausa de 1 segundo
            }
        } else {
            // Borrando
            const nextCharIndex = charIndexRef.current - 1; // Borrar de 1 en 1 es más suave
            setCurrentPlaceholder(currentSuggestion.substring(0, nextCharIndex));
            setCurrentCharIndex(nextCharIndex);

            // Si terminamos de borrar
            if (nextCharIndex <= 0) {
                setIsDeleting(false);
                // Pasar a la siguiente sugerencia
                const nextSuggestionIndex = (suggestionIndexRef.current + 1) % suggestions.length;
                setCurrentSuggestionIndex(nextSuggestionIndex);
            }
        }
    };

    // Establecer el intervalo (Tipar el ID devuelto por setInterval)
    // El tipo puede ser 'number' en navegadores o 'NodeJS.Timeout' en Node. TS suele inferirlo.
    const typingIntervalId = setInterval(animatePlaceholder, isDeletingRef.current ? 50 : 100); // Ajustar velocidad si es necesario

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(typingIntervalId);
  }, []); // El array vacío asegura que se ejecute solo al montar

  // 3. Tipamos el evento del handler onChange
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // Solo llamamos a onSearch si la prop fue pasada
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handler para el click del botón (sin cambios necesarios en la firma)
  const handleAISearch = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      // Verificación de seguridad para window.gtag en entorno de cliente
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'question_submit', {
          event_category: 'Search',
          event_label: trimmedValue,
          app_name: 'Home busqueda',
          screen_name: 'SearchBox',
          timestamp: new Date().toISOString(),
          interaction_type: 'click',
          question_content: trimmedValue
        });
      }
      onAISearch(trimmedValue);
      setInputValue(''); // Limpiar input
    }
  };

  // 4. Tipamos el evento del handler onKeyPress
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const trimmedValue = inputValue.trim();
    // Permitir Shift+Enter para nueva línea, solo enviar con Enter solo
    if (e.key === 'Enter' && !e.shiftKey && trimmedValue) {
      e.preventDefault(); // Prevenir el comportamiento por defecto de Enter (nueva línea)

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'question_submit', {
          event_category: 'Search',
          event_label: trimmedValue,
          app_name: 'Home busqueda',
          screen_name: 'SearchBox',
          timestamp: new Date().toISOString(),
          interaction_type: 'key_press', // Diferenciamos la interacción
          question_content: trimmedValue
        });
      }
      onAISearch(trimmedValue);
      setInputValue(''); // Limpiar input
    }
  };

  // El JSX permanece igual
  return (
    <div className="search-box"> {/* Asegúrate que esta clase exista en tu CSS */}
      <textarea
        className="search-input" // Asegúrate que esta clase exista y tenga estilos
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress} // Cambiado de onKeyPress a onKeyDown para mejor manejo de Shift+Enter
        placeholder={currentPlaceholder}
      />
      <div className="container-btn-arrow"> {/* Asegúrate que esta clase exista */}
        <button
          className="search-btn" // Asegúrate que esta clase exista
          onClick={handleAISearch}
          aria-label="Enviar pregunta"
          disabled={!inputValue.trim()} // Deshabilitar si no hay texto
        >
          <IoIosSend className="icon" size={30}/>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;