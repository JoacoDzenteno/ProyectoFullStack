// En: src/vistas/Blogs.jsx

import React from 'react';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import imgSorteo1 from '../recursos/imagenes/sorteo 1.png';
import imgSorteo2 from '../recursos/imagenes/sorteo 2.png';

export function Blogs() {
  return (
    // Usamos el layout de página pública
    <div className="layout-pagina">
      <BarraNavegacion />

      <main className="contenido-principal">
        
        {/* --- Tu código HTML, adaptado a JSX --- */}
        {/* (Corregido de 'secion' a 'section') */}
        <section className="Sorteos">
          <h1 className="titulosPg">Sorteos</h1>

          <div className="contenedorBlog">
            <div className="bloque-sorteo">
              <div className="cajaBlog">
                <h1>Live 4 Mayo 2024</h1>
                <hr />
                <p>En este live de instagram hicimos un sorteo por medio de kahoot y seleccionamos a 3 ganadores</p>
              </div>
              <div className="imgSorteo">
                {/* Los links a Instagram se abren en una pestaña nueva */}
                <a href="https://www.instagram.com/p/C6kaZfYt5Li/" target="_blank" rel="noopener noreferrer">
                  {/* Usamos la imagen importada */}
                  <img src={imgSorteo1} alt="Sorteo 1" />
                </a>
              </div>
            </div>

            <div className="bloque-sorteo">
              <div className="cajaBlog">
                <h1>Sorteo figuras Kuji 24-02-2024</h1>
                <hr />
                <p>En este live de instagram hicimos un sorteo de figuras kuji de Gon, Yamato, Kirby y un bonus para seleccionamos a 3 ganadores</p>
              </div>
              <div className="imgSorteo">
                <a href="https://www.instagram.com/p/C3votrGvPNi/" target="_blank" rel="noopener noreferrer">
                  {/* Usamos la imagen importada */}
                  <img src={imgSorteo2} alt="Sorteo 2" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <PiePagina />
    </div>
  );
}