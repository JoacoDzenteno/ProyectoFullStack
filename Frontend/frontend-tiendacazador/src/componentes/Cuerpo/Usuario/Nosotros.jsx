import React from 'react';
import './Nosotros.css'; // 👈 Importación de estilos locales

const Nosotros = () => {
    return (
        // El componente general de la vista "Nosotros"
        <section className="nosotros">
            <h2 className="nosotrosTt">
                Sobre <span>Nosotros</span>
            </h2>

            <div className="seccionNs"> 
                {/* 1. SECCIÓN DE VIDEO */}
                <div className="videoNs">
                    {/* 💡 RUTA DE VIDEO: Se llama desde la carpeta 'public' */}
                    {/* En React, 'autoplay' es 'autoPlay' y 'muted' es obligatorio para que funcione 'autoplay' en navegadores. */}
                    <video 
                        src="/Imagenes/fullstack.mp4" 
                        loop 
                        autoPlay 
                        muted 
                        playsInline
                        className="video-player"
                    />
                    <h3>Productos <span>100%</span> originales</h3>
                </div>

                {/* 2. CONTENIDO (Descripción) */}
                <div className="contenidoNs">
                    <h3>¿Quiénes somos?</h3>
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
    );
};

export default Nosotros;