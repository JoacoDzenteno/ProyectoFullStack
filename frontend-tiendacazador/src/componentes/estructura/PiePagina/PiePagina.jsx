import React from 'react';

// 1. Importamos las imágenes (asegúrate que los nombres
//    coincidan con tus archivos en src/recursos/imagenes/)
import logoMercadoPago from '../../../recursos/imagenes/MERCADO-PAGO.png';
import logoInstagram from '../../../recursos/imagenes/Instagram_icon.png';
import logoMensaje from '../../../recursos/imagenes/MENSAJE.webp';

export function PiePagina() {
  
  // Usamos las mismas clases CSS de tu archivo 'global.css'
  return (
    <footer className="piePagina">
      
      {/* Sección Izquierda: Título y Métodos de Pago */}
      <div className="izq">
        <p>Tienda<span>X</span>del<span>X</span>cazador</p>
        
        {/* Usamos la variable 'logoMercadoPago' importada */}
        <img 
          src={logoMercadoPago} 
          alt="Logo de Mercado Pago" 
        />
      </div>

      {/* Sección Derecha: Iconos de Redes/Contacto */}
      <div className="imgCont">
        <a href="https://www.instagram.com/tiendaxdelxcazador/" target="_blank" rel="noopener noreferrer">
          <img 
            src={logoInstagram} 
            alt="Ícono de Instagram" 
          />
        </a>
        <a href="/contacto"> {/* Cambiado de .html a /contacto para el Router */}
          <img 
            src={logoMensaje} 
            alt="Ícono de Mensaje" 
          />
        </a>
      </div>
      
    </footer>
  );
}