import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { Spinner, Alert, Button } from 'react-bootstrap'; 
import { getProductoPorIdServicio } from '../servicios/productoServicio.js';
import { useCarrito } from '../contexto/CarritoContexto.jsx';

export function ProductoEspecifico() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null); 
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  const [imagenPrincipal, setImagenPrincipal] = useState(''); 
  const [cantidad, setCantidad] = useState(1); 

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const datos = await getProductoPorIdServicio(id);
        setProducto(datos);
        
        setImagenPrincipal(datos.imagen); 
        
      } catch (err) {
        setError("Producto no encontrado o no disponible.");
      } finally {
        setCargando(false);
      }
    };
    
    cargarProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito(producto, cantidad);
    alert(`${cantidad} x ${producto.nombre} añadido(s) al carrito.`);
  };

  const cambiarImagen = (nuevaSrc) => {
    setImagenPrincipal(nuevaSrc);
  };

  if (cargando) {
    return (
      <div className="layout-pagina">
        <BarraNavegacion />
        <main className="contenido-principal text-center p-5"><Spinner animation="border" /></main>
        <PiePagina />
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout-pagina">
        <BarraNavegacion />
        <main className="contenido-principal">
          <Alert variant="danger" className="m-3">{error}</Alert>
          <Link to="/productos">
            <Button variant="primary" className="m-3">Volver a Productos</Button>
          </Link>
        </main>
        <PiePagina />
      </div>
    );
  }

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        
        <section id="detallesProd" className="prod1">
          <div className="imagenProducto">
            <img src={imagenPrincipal} width="100%" id="principalImg" alt={producto.nombre} />
          </div>

          <div className="descripcionProducto">

            <h6>{producto.categoria && producto.categoria.nombre}</h6>
            
            <h4>{producto.nombre}</h4>
            <h2>${producto.precio.toLocaleString('es-CL')}</h2>
            
            <input 
              type="number" 
              value={cantidad} 
              className="box"
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
              min="1" 
              max={producto.stock} 
            /> 
            
            <button className="btn-agregar-carrito" onClick={handleAgregarAlCarrito}>
              Añadir al carro
            </button>
            
            <h4>Descripción</h4>
 
            <span>
              <p>{producto.descripcion}</p>
            </span>
            
          </div>
        </section>

      </main>
      <PiePagina />
    </div>
  );
}