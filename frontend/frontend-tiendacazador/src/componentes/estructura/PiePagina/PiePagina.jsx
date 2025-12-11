import React from 'react';
import logoMercadoPago from '../../../recursos/imagenes/MERCADO-PAGO.png';
import logoInstagram from '../../../recursos/imagenes/Instagram_icon.png';
import logoMensaje from '../../../recursos/imagenes/MENSAJE.webp';

export function PiePagina() {
  return (
    <footer className="piePagina">
      <div className="izq">
        <p>Tienda<span>X</span>del<span>X</span>cazador</p>
        <img 
          src={logoMercadoPago} 
          alt="Logo de Mercado Pago" 
        />
      </div>
      <div className="imgCont">
        <a href="https://www.instagram.com/tiendaxdelxcazador/" target="_blank" rel="noopener noreferrer">
          <img 
            src={logoInstagram} 
            alt="Ícono de Instagram" 
          />
        </a>
        <a href="/contacto">
          <img 
            src={logoMensaje} 
            alt="Ícono de Mensaje" 
          />
        </a>
      </div>
    </footer>
  );
}