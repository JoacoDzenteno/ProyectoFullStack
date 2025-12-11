import React from 'react';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion';
import {PiePagina} from '../componentes/estructura/PiePagina/PiePagina.jsx';    
import LogoTiendaCompleto from '../recursos/imagenes/LogoTiendaCompleto.png';
export function Inicio() {
  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">

        <section className="home" id="home">
          
          <div className="contenido">
            <h3>La Tienda del Cazador</h3>
            <span>Tienda de figuras de colección</span>
            <p>Bienvenido a la tienda del cazador, tu destino definitivo para encontrar auténticas figuras 
            de colección de tu anime favorito. Ofrecemos productos 100% originales, garantizando la 
            máxima calidad y detalle en cada pieza. Descubre el arte del coleccionismo con nosotros.. 
            </p>
            
            <a href="/productos" className="btn">Comprar ahora</a>
          </div>

          <div className="contenedorImagen">
            <img 
              id="imagenportada" 
              src={LogoTiendaCompleto} 
              alt="logoCompleto" 
            />
          </div>

        </section>

      </main>

      <PiePagina />
    </div>
  );
}