// En: src/vistas/Productos.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// (Usa tu ruta correcta a 'estructura')
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { Spinner, Alert } from 'react-bootstrap';
// 1. Importamos el servicio
import { getProductosServicio } from '../servicios/productoServicio.js';

export function Productos() {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // 2. Cargamos los productos al montar la página
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await getProductosServicio();
        setProductos(Array.isArray(datos) ? datos : []);
      } catch (err) {
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  // (Simulación de "Agregar al Carrito")
  const agregarAlCarrito = (e) => {
    e.preventDefault(); // Evita que el link '#' recargue
    alert("¡Producto añadido al carrito! (Simulación)");
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        
        <section className="productos" id="productos">
          <h1 className="titulosPg">Productos</h1>
          
          {/* 3. Manejo de Carga y Errores */}
          {cargando && (
            <div className="text-center p-5"><Spinner animation="border" /></div>
          )}
          {error && (
            <Alert variant="danger" className="m-3">{error}</Alert>
          )}

          {/* 4. Renderizamos los productos usando tu HTML como plantilla */}
          {!cargando && !error && (
            <div className="contenedorPr">
              
              {productos.map((producto) => (
                <div className="caja" key={producto.id}>
                  <div className="imagenPr">
                    
                    {/* El link ahora apunta a la ruta dinámica del producto */}
                    <Link to={`/producto/${producto.id}`}>
                      {/* Usamos la URL de la imagen del servicio */}
                      <img src={producto.imagen} alt={producto.nombre} />
                    </Link>
                    
                    <div className="iconos">
                      <a href="#" className="cart-btn" onClick={agregarAlCarrito}>
                        Agregar al carro 🛒
                      </a>
                    </div> 
                  </div>
                  <div className="contenidoPro" >
                    <Link to={`/producto/${producto.id}`}>
                      <h3>{producto.nombre}</h3>
                    </Link>
                  </div>
                </div>
              ))}

            </div>
          )}
        </section>

      </main>
      <PiePagina />
    </div>
  );
}