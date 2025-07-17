'use client'; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { Menu, X } from 'lucide-react'; // Iconos para el menú hamburguesa

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // El header cambia si se hace scroll más de 20px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clases dinámicas para el header basadas en scroll y estado del menú
  const headerClasses = `
    site-header
    ${isScrolled ? 'scrolled' : ''}
    ${isMenuOpen ? 'menu-open-bg' : ''}
  `;

  return (
    <header className={headerClasses}>
      <div className="header-content-wrapper">
        <Link href="/" className="logo-link" aria-label="Ir a la página de inicio de Destiplus">
          <div className="logo-container">
            <CldImage
              src="https://res.cloudinary.com/destinoplus/image/upload/v1732547115/tree_suesca_bdaba9.png"
              alt="Destiplus árbol logo" // Alt más descriptivo
              width={32} // Ligeramente más pequeño para caber mejor con texto y menú
              height={32}
              className="logo-image" // Clase para posible estilo adicional
            />
            <div className="logo-text">
              Desti<span className="logo-plus"> plus</span>
            </div>
          </div>
        </Link>

        {/* Navegación para Desktop */}
        <nav className="nav-desktop">
          <Link href="/">Destinos</Link> {/* Ejemplo de enlace a una sección del home */}
          <Link href="/suesca-blog">Blog</Link>
          <Link href="/destino/Suesca">Servicios</Link> {/* Ejemplo */}
          <Link href="/destino/Suesca">Contacto</Link> {/* Ejemplo */}
          {/* Podrías añadir un botón CTA aquí si es necesario */}
          {/* <Link href="/reserva" className="cta-button-header">Reservar</Link> */}
        </nav>

        {/* Botón del Menú Hamburguesa para Móvil */}
        <button
          className="menu-toggle-button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navegación para Móvil (Dropdown) */}
      {isMenuOpen && (
        <nav className="nav-mobile">
          <Link href="/" onClick={toggleMenu}>Destinos</Link>
          <Link href="/suesca-blog" onClick={toggleMenu}>Blog</Link>
          <Link href="/destino/Suesca" onClick={toggleMenu}>Servicios</Link>
          <Link href="/destino/Suesca" onClick={toggleMenu}>Contacto</Link>
           {/* <Link href="/reserva" className="cta-button-header mobile-cta" onClick={toggleMenu}>Reservar</Link> */}
        </nav>
      )}
    </header>
  );
};

export default Header;