// src/componentes/Cuerpo/Usuario/HomeUsuario.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './HomeUsuario.css'; // 👈 Importación de estilos locales

const HomeUsuario = () => {
    return (
        // Usamos la clase 'home' para los estilos de la sección
        <section className="home" id="home">
            
            <div className="contenido">
                <h3>La Tienda del Cazador</h3>
                <span>Tienda de figuras de colección</span>
                <p>
                    Bienvenido a la tienda del cazador, tu destino definitivo para encontrar auténticas figuras 
                    de colección de tu anime favorito. Ofrecemos productos 100% originales, garantizando la 
                    máxima calidad y detalle en cada pieza. Descubre el arte del coleccionismo con nosotros.
                </p>
                
                {/* Usamos <Link> para navegar a la ruta /productos */}
                <Link to="/productos" className="btn">Comprar ahora</Link>
            </div>
            
            <div className="contenedorImagen">
                {/* RUTA DE IMAGEN: Se llama desde la carpeta 'public' */}
                <img 
                    id="imagenportada" 
                    src="/Imagenes/LogoTiendaCompleto.png" 
                    alt="Logo Completo de la Tienda" 
                />
            </div>
        </section>
    );
};

export default HomeUsuario;