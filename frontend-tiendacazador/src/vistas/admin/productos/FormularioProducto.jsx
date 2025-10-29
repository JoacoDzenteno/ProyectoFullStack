import React, { useState, useEffect } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './FormularioProducto.css'; 

// Archivos referentes al CRUD
import { crearProductoServicio } from '../../../servicios/productoServicio.js';
import { updateProductoServicio } from '../../../servicios/productoServicio.js';
import { getProductoPorIdServicio } from '../../../servicios/productoServicio.js';

export function FormularioProducto() {

  // --- 3. OBTENEMOS EL 'id' DE LA URL ---
  const { id } = useParams();
 
  // Estados para los 6 campos del formulario 
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState(''); // ¡NUEVO!

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false); // Spinner del botón "Guardar"
  const [cargandoDatos, setCargandoDatos] = useState(false); // Spinner de la página (al editar)
  const navigate = useNavigate();

  // --- 4. 'useEffect' PARA CARGAR DATOS EN MODO "EDITAR" ---
  useEffect(() => {
    // Si hay un 'id' en la URL, cargamos los datos
    if (id) {
      const cargarDatosProducto = async () => {
        setCargandoDatos(true); // Mostramos spinner de página
        try {
          const datos = await getProductoPorIdServicio(id);
          // Rellenamos el formulario con los datos
          setNombre(datos.nombre);
          setDescripcion(datos.descripcion);
          setPrecio(datos.precio);
          setStock(datos.stock);
          setCategoria(datos.categoria);
          setImagen(datos.imagen || '');
        } catch (err) {
          setError(err.message);
        } finally {
          setCargandoDatos(false); // Ocultamos spinner de página
        }
      };
      cargarDatosProducto();
    }
    // Este 'useEffect' se ejecuta solo si el 'id' de la URL cambia
  }, [id]);

  // --- 5. 'handleSubmit' ACTUALIZADO (CREA O EDITA) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true); // Activamos spinner del botón

    // Validación simple
    if (precio <= 0 || stock < 0) {
      setError('El precio y el stock deben ser números positivos.');
      setCargando(false);
      return;
    }

    try {
      const datosProducto = { nombre, descripcion, precio, stock, categoria, imagen };
      
      if (id) {
        // MODO EDITAR: Llamamos a 'update'
        await updateProductoServicio(id, datosProducto);
      } else {
        // MODO CREAR: Llamamos a 'crear'
        await crearProductoServicio(datosProducto);
      }
      
      // Si todo sale bien, volvemos a la lista
      navigate('/admin/productos');

    } catch (err) {
      setError(err.message || 'Error al guardar el producto.');
    } finally {
      setCargando(false); // Ocultamos spinner del botón
    }
  };

  // --- 6. TÍTULO DINÁMICO ---
  const tituloPagina = id ? "Editar Producto" : "Crear Nuevo Producto";

  // --- 7. SPINNER DE CARGA MIENTRAS BUSCA EL PRODUCTO ---
  // (Esto solo se muestra en modo Editar)
  if (cargandoDatos) {
    return (
      <LayoutAdmin titulo="Cargando...">
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
        </div>
      </LayoutAdmin>
    );
  }

  // Si no está cargando datos, muestra el formulario
  return (
    <LayoutAdmin titulo={tituloPagina}>
      <Card className="shadow-sm formulario-producto-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Todos los campos del formulario (son los mismos) */}
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Figura Gon Freecss"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            {/* --- 3. NUEVO CAMPO DE IMAGEN --- */}
            <Form.Group className="mb-3" controlId="formImagen">
              <Form.Label>URL de la Imagen Principal</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: /imagenes/productos/hunter/nueva.png"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ej: Figura de acción de 15cm..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPrecio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="19990"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.valueAsNumber || 0)}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="25"
                    value={stock}
                    onChange={(e) => setStock(e.target.valueAsNumber || 0)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Figuras"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" disabled={cargando}>
              {cargando ? 'Guardando...' : 'Guardar Producto'}
            </Button>
            <Button variant="secondary" onClick={() => navigate('/admin/productos')} className="ms-2">
              Cancelar
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </LayoutAdmin>
  );
}