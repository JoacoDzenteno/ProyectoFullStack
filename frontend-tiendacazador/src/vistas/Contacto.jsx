// En: src/vistas/Contacto.jsx

import React from 'react';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import IMGseccionContacto from '../recursos/imagenes/IMGseccionContato.jpg';

export function Contacto() {

  const manejarSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado (simulación)");
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />

      <main className="contenido-principal">
        
        <section className="contacto" id="contacto">

          <h1 className="tituloCont">Contáctanos</h1>
            
          <div className="seccionCont">
            
            <form onSubmit={manejarSubmit}>
              <input type="text" placeholder="Nombre" className="box" />
              <input type="email" placeholder="Correo" className="box" />
              <input type="number" placeholder="Número... ej: +569 1111 2222" className="box" />
              <textarea name="" className="box" placeholder="Escribe tu mensaje" id="" cols="30" rows="10"></textarea>
              <input type="submit" value="Enviar mensaje" className="btn-contacto" /> 
            </form>

            <div className="imagen">
              <img src={IMGseccionContacto} width="100%" alt="Contacto" />
            </div>

          </div>
        </section> 

      </main>

      <PiePagina />
    </div>
  );
}