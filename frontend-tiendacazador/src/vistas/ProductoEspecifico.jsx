// En: src/vistas/ProductoEspecifico.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// (Usa tu ruta correcta a 'estructura')
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { Spinner, Alert } from 'react-bootstrap';

// 1. Importamos el servicio
import { getProductoPorIdServicio } from '../servicios/productoServicio.js';

export function ProductoEspecifico() {
  
  // 2. Obtenemos el 'id' de la URL
  const { id } = useParams(); 
  const navigate = useNavigate();

  // 3. Estados
  const [producto, setProducto] = useState(null); // Para guardar el objeto del producto
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  // Estado para la imagen principal (para la galería)
  const [imagenPrincipal, setImagenPrincipal] = useState(''); 

  // 4. useEffect para cargar el producto
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const datos = await getProductoPorIdServicio(id);
        setProducto(datos);
        // Ponemos la primera imagen de la galería como la principal
        setImagenPrincipal(datos.imagenesGaleria[0]); 
      } catch (err) {
        setError("Producto no encontrado o no disponible.");
      } finally {
        setCargando(false);
      }
    };
    
    cargarProducto();
  }, [id]); // Se ejecuta cada vez que el 'id' de la URL cambie

  // --- Lógica de la página ---

  // Simulación de "Agregar al Carrito"
  const agregarAlCarrito = () => {
    alert(`(Simulación) ${producto.nombre} añadido al carrito.`);
  };

  // Lógica para la galería de imágenes (reemplaza tu 'onclick')
  const cambiarImagen = (nuevaSrc) => {
    setImagenPrincipal(nuevaSrc);
  };

  // --- Renderizado ---

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
          <Button onClick={() => navigate('/productos')} className="m-3">Volver a Productos</Button>
        </main>
        <PiePagina />
      </div>
    );
  }

  // Si todo está OK, mostramos el producto
  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        
        {/* --- Tu HTML de Detalle de Producto --- */}
        <section id="detallesProd" className="prod1">
          
          {/* Columna Izquierda: Imágenes */}
          <div className="imagenProducto">
            {/* Imagen Principal (controlada por estado) */}
            <img src={imagenPrincipal} width="100%" id="principalImg" alt={producto.nombre} />
            
            <div className="grupoImg">
              {/* Galería (mapeada desde el servicio) */}
              {producto.imagenesGaleria.map((imgSrc, index) => (
                <div className="filaImg" key={index}>
                  <img 
                    src={imgSrc} 
                    width="100%" 
                    className="imgPeque" 
                    alt={`Thumbnail ${index + 1}`}
                    // Llama a nuestra función de React
                    onClick={() => cambiarImagen(imgSrc)} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Descripción */}
          <div className="descripcionProducto">
            <h6>{producto.categoria}</h6>
            <h4>{producto.nombre}</h4>
            <h2>${producto.precio.toLocaleString('es-CL')}</h2>
            
            {/* (El input de cantidad lo veremos con el carrito) */}
            <input type="number" defaultValue="1" className="box" /> 
            
            <button className="btn-agregar-carrito" onClick={agregarAlCarrito}>
              Añadir al carro
            </button>
            
            <h4>Descripción</h4>
            <span>
              <ul>
                {/* Mapeamos la descripción detallada del servicio */}
                {producto.descripcionDetallada.map((linea, index) => (
                  <li key={index}>{linea}</li>
                ))}
              </ul>
            </span>
          </div>
        </section>

      </main>
      <PiePagina />
    </div>
  );
}