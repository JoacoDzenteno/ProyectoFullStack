import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { Spinner, Alert } from 'react-bootstrap';
import { getProductosServicio } from '../servicios/productoServicio.js';
import { useCarrito } from '../contexto/CarritoContexto.jsx';

export function Productos() {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const { agregarAlCarrito } = useCarrito();
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

  const handleAgregarAlCarrito = (e, producto) => {
    e.preventDefault(); 
    
    agregarAlCarrito(producto, 1);
    
    alert(`¡${producto.nombre} añadido al carrito!`);
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        
        <section className="productos" id="productos">
          <h1 className="titulosPg">Productos</h1>
          
          {cargando && (
            <div className="text-center p-5"><Spinner animation="border" /></div>
          )}
          {error && (
            <Alert variant="danger" className="m-3">{error}</Alert>
          )}

          {!cargando && !error && (
            <div className="contenedorPr">
              
              {productos.map((producto) => (
                <div className="caja" key={producto.id}>
                  <div className="imagenPr">
                    <Link to={`/producto/${producto.id}`}>
                        <img 
                        src={`http://localhost:8080/images/${producto.imagen}`} 
                        alt={producto.nombre} 
                        />
                    </Link>
                    
                    <div className="iconos">
                      <a href="#" className="cart-btn" onClick={(e) => handleAgregarAlCarrito(e, producto)}
                      >
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