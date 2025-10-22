import React from 'react';
import './PiePagina.css'; // Importación de estilos locales
import { Link } from 'react-router-dom';

const PiePagina = () => {
    // 💡 NOTA sobre RUTAS de imágenes en Vite: 
    // Las imágenes que se usan con rutas directas (ej: /img/logo.png) deben estar en la carpeta 'public'.

    return (
        <footer className="piePagina">
            
            <div className="izq">
                <p>Tienda<span>X</span>del<span>X</span>cazador</p>
                {/* Asumiendo que M-PAGO.png está en public/Imagenes/ */}
                <img src="/Imagenes/MERCADO-PAGO.png" alt="Método de pago Mercado Pago" />
            </div>
            
            <div className="imgCont">
                {/* Enlace de Instagram */}
                <a href="https://www.instagram.com/tiendaxdelxcazador/" target="_blank" rel="noopener noreferrer">
                    {/* Asumiendo que Instagram_icon.png está en public/Imagenes/ */}
                    <img src="/Imagenes/Instagram_icon.png" alt="Instagram" />
                </a>
                
                {/* Enlace de Contacto (usamos <Link> si la ruta '/contacto' está definida) */}
                <Link to="/contacto"> 
                    {/* Asumiendo que MENSAJE.webp está en public/Imagenes/ */}
                    <img src="/Imagenes/MENSAJE.webp" alt="Contacto" />
                </Link>
            </div>
        </footer>
    );
};

export default PiePagina;