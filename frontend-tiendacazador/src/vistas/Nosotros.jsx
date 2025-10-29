// En: src/vistas/Nosotros.jsx

import React from 'react';
// (Asegúrate de que esta ruta a 'estructura' sea la tuya)
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import fullstack from '../recursos/imagenes/fullstack.mp4';

export function Nosotros() {
  return (
    // Usamos el layout de página pública
    <div className="layout-pagina">
      <BarraNavegacion />

      <main className="contenido-principal">

        <section className="nosotros" id="nosotros">

          <h1 className="nosotrosTt">Sobre <span>Nosotros</span></h1>
          
          <div className="seccionNs"> 

            <div className="videoNs">
              {/* Atributos de video actualizados para React: 'autoPlay', 'muted' */}
              <video src={fullstack} loop autoPlay muted controls={false}></video>
              <h3>Productos <span>100%</span> originales</h3>
            </div>

            <div className="contenidoNs">
              <h3>Por qué elegirnos?</h3>
              <p>
                Aquí en la tienda del cazador, somos apasionados por el mundo del anime y el coleccionismo.
            Nuestra misión es ofrecer a los fanáticos figuras de colección auténticas y de alta calidad que
            capturen la esencia de sus personajes favoritos. Nos enorgullece brindar un servicio excepcional
            y una experiencia de compra única para cada cliente. ¡Únete a nuestra comunidad de cazadores
            y descubre el arte del coleccionismo con nosotros!
              </p>
            </div>

          </div>
        </section>

      </main>

      <PiePagina />
    </div>
  );
}