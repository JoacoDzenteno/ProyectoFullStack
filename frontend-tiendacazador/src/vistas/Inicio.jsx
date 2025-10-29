// En: src/vistas/Inicio.jsx

import React from 'react';

// 1. Importamos los componentes de Layout (Cabecera y Pie)
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion';
import {PiePagina} from '../componentes/estructura/PiePagina/PiePagina.jsx';    

// 2. Importamos tu imagen de portada desde la carpeta de recursos
//    (Asegúrate que el nombre "LogoTiendaCompleto.png" sea exacto)
import LogoTiendaCompleto from '../recursos/imagenes/LogoTiendaCompleto.png';
export function Inicio() {
  return (
    // Fragmento (<>) que envuelve toda la página
    <div className="layout-pagina">
      <BarraNavegacion />

      {/* El contenido principal de tu página */}
      <main className="contenido-principal">
        
        {/* --- Aquí empieza tu HTML convertido --- */}

        <section className="home" id="home">
          
          <div className="contenido">
            <h3>La Tienda del Cazador</h3>
            <span>Tienda de figuras de colección</span>
            <p>Bienvenido a la tienda del cazador, tu destino definitivo para encontrar auténticas figuras 
            de colección de tu anime favorito. Ofrecemos productos 100% originales, garantizando la 
            máxima calidad y detalle en cada pieza. Descubre el arte del coleccionismo con nosotros.. 
            </p>
            
            {/* Link actualizado para el Router de React */}
            <a href="/productos" className="btn">Comprar ahora</a>
          </div>

          <div className="contenedorImagen">
            {/* Imagen actualizada con la variable importada y autocierre */}
            <img 
              id="imagenportada" 
              src={LogoTiendaCompleto} 
              alt="logoCompleto" 
            />
          </div>

        </section>
        
        {/* --- Aquí termina tu HTML convertido --- */}
        
        {/* Aquí podrías agregar el resto de tus secciones 
            (Nosotros, Contacto, etc.) si también estaban en la página de inicio. */}

      </main>

      <PiePagina />
    </div>
  );
}