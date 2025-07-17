// src/lib/utils.ts

export const formatMarkdownText = (text: string | null | undefined): string => {
    if (!text) return '';
  
    // Escapar HTML básico para seguridad
    let formattedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  
    // Negrita: **texto** -> <strong>texto</strong>
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Cursiva: *texto* -> <em>texto</em> (cuidado con no confundir con listas)
    // Esta regex intenta evitar * dentro de palabras o **
     formattedText = formattedText.replace(/(?<!\*)\*(?!\s|\*)([^*]+?)(?<!\s|\*)\*(?!\*)/g, '<em>$1</em>');
  
  
    // Enlaces: [texto](url) -> <a href="url" target="_blank" rel="noopener noreferrer">texto</a>
    formattedText = formattedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
       '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>'); // Añade una clase para estilizar
  
    // Listas simples (líneas que empiezan con * o - seguido de espacio):
     formattedText = formattedText.replace(/^([*]|-) (.*)$/gm, '<li>$2</li>');
     // Envuelve bloques de <li> en <ul> (esto es simplificado, puede fallar con listas complejas)
     if (formattedText.includes('<li>')) {
         formattedText = formattedText.replace(/^([\s\S]*?<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>'); // Inicio del bloque
         formattedText = formattedText.replace(/(<li>[\s\S]*?<\/li>)\n(?!<li>)/g, '$1</ul>'); // Fin del bloque
         formattedText = formattedText.replace(/<\/ul>\n<ul>/g, '\n'); // Fusionar listas adyacentes
     }
  
  
    // Saltos de línea: \n -> <br>
    formattedText = formattedText.replace(/\n/g, '<br>');
  
    return formattedText;
  };
  

// src/lib/utils.ts
export function generateSlug(text: string): string {
  // ... (código de la función generateSlug de la respuesta anterior) ...
  if (!text) return '';
  return text
    .toString().toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '').replace(/--+/g, '-')
    .replace(/^-+/, '').replace(/-+$/, '');
}