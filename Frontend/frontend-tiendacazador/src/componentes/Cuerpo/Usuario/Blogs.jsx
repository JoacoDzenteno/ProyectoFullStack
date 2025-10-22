import React from 'react';
import './Blogs.css'; 

const sorteosData = [
    {
        titulo: "Live 4 Mayo 2024",
        fecha: "4 de Mayo de 2024",
        descripcion: "En este live de instagram hicimos un sorteo por medio de kahoot y seleccionamos a 3 ganadores.",
        imagenSrc: "/Imagenes/sorteo 1.png",
        instagramLink: "https://www.instagram.com/p/C6kaZfYt5Li/"
    },
    {
        titulo: "Sorteo figuras Kuji",
        fecha: "24-02-2024",
        descripcion: "En este live de instagram hicimos un sorteo de figuras kuji de Gon, Yamato, Kirby y un bonus para seleccionamos a 3 ganadores.",
        imagenSrc: "/Imagenes/sorteo 2.png",
        instagramLink: "https://www.instagram.com/p/C3votrGvPNi/"
    },
    // Añade más sorteos aquí en el futuro...
];

const Blogs = () => {
    return (
        <section className="Sorteos">
            <h1 className="titulosPg">Sorteos y Novedades</h1>

            <div className="contenedorBlog">
                {sorteosData.map((sorteo, index) => (
                    <div className="bloque-sorteo" key={index}>
                        
                        <div className="cajaBlog">
                            <h1>{sorteo.titulo}</h1>
                            <hr />
                            <p>{sorteo.descripcion}</p>
                            <p className="fecha-blog">Fecha: {sorteo.fecha}</p>
                        </div>
                        
                        <div className="imgSorteo">
                            <a href={sorteo.instagramLink} target="_blank" rel="noopener noreferrer">
                                {/* Usamos las rutas de imagen desde 'public' */}
                                <img src={sorteo.imagenSrc} alt={`Imagen del sorteo ${index + 1}`} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;