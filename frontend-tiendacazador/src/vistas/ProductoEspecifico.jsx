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

        // 1) si viene imagen principal → usarla
        if (datos.imagen) {
          setImagenPrincipal(`http://localhost:8080/images/${datos.imagen}`);
        } 
        // 2) si no hay imagen principal pero sí hay lista de imagenes → usar la primera
        else if (Array.isArray(datos.imagenes) && datos.imagenes.length > 0) {
          setImagenPrincipal(`http://localhost:8080/images/${datos.imagenes[0]}`);
        } else {
          setImagenPrincipal(''); // sin imagen
        }

      } catch (err) {
        setError("Producto no encontrado o no disponible.");
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (!producto) return;
    agregarAlCarrito(producto, cantidad);
    alert(`${cantidad} x ${producto.nombre} añadido(s) al carrito.`);
  };

  const cambiarImagen = (nombreImg) => {
    setImagenPrincipal(`http://localhost:8080/images/${nombreImg}`);
  };

  if (cargando) {
    return (
      <div className="layout-pagina">
        <BarraNavegacion />
        <main className="contenido-principal text-center p-5">
          <Spinner animation="border" />
        </main>
        <PiePagina />
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="layout-pagina">
        <BarraNavegacion />
        <main className="contenido-principal">
          <Alert variant="danger" className="m-3">
            {error || 'Producto no disponible.'}
          </Alert>
          <Link to="/productos">
            <Button variant="primary" className="m-3">
              Volver a Productos
            </Button>
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
          {/* Columna izquierda: imagen principal + cascada */}
          <div className="imagenProducto">
            <div className="imagenPrincipalWrapper">
              {imagenPrincipal ? (
                <img
                  src={imagenPrincipal}
                  width="100%"
                  id="principalImg"
                  alt={producto.nombre}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '2rem',
                    backgroundColor: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#666'
                  }}
                >
                  Sin imagen
                </div>
              )}
            </div>

            {producto.imagenes && producto.imagenes.length > 0 && (
              <div className="miniaturasCascada">
                {producto.imagenes.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8080/images/${img}`}
                    alt="miniatura"
                    onClick={() => cambiarImagen(img)}
                    className="miniaturaCascada"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha: info del producto */}
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