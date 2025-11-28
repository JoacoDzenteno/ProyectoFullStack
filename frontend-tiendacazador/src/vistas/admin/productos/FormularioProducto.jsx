import React, { useState, useEffect } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './FormularioProducto.css';

import {
  crearProductoServicio,
  updateProductoServicio,
  getProductoPorIdServicio,
  getCategoriasServicio,
  subirImagenProductoServicio,
  eliminarImagenProductoServicio
} from '../../../servicios/productoServicio.js';

export function FormularioProducto() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  const [imagen, setImagen] = useState('');

  const [imagenesSecundarias, setImagenesSecundarias] = useState([]);

  const [categoriaId, setCategoriaId] = useState('');
  const [listaCategorias, setListaCategorias] = useState([]);

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(false);


  const [archivoPrincipal, setArchivoPrincipal] = useState(null);

  const [archivosSecundarios, setArchivosSecundarios] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargandoDatos(true);
      try {
        const categoriasData = await getCategoriasServicio();
        setListaCategorias(categoriasData || []);

        if (id) {
          const datos = await getProductoPorIdServicio(id);

          setNombre(datos.nombre);
          setDescripcion(datos.descripcion);
          setPrecio(datos.precio);
          setStock(datos.stock);
          setImagen(datos.imagen || '');

          if (Array.isArray(datos.imagenes)) {
            setImagenesSecundarias(
              datos.imagenes.filter(img => img !== datos.imagen)
            );
          } else {
            setImagenesSecundarias([]);
          }

          if (datos.categoria) {
            setCategoriaId(datos.categoria.id);
          }
        }

      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (precio <= 0 || stock < 0) {
      setError('El precio y el stock deben ser números positivos.');
      return;
    }

    if (!categoriaId) {
      setError('Debe seleccionar una categoría.');
      return;
    }

    setCargando(true);

    const datosProducto = {
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      categoria: {
        id: parseInt(categoriaId, 10)
      }
    };

    try {
      let productoGuardado;

      if (id) {
        productoGuardado = await updateProductoServicio(id, datosProducto);

        if (archivoPrincipal) {
          await subirImagenProductoServicio(id, archivoPrincipal, true);
        }

        if (archivosSecundarios.length > 0) {
          for (const file of archivosSecundarios) {
            await subirImagenProductoServicio(id, file, false);
          }
        }

      } else {
        productoGuardado = await crearProductoServicio(datosProducto);

        if (productoGuardado?.id) {
          if (archivoPrincipal) {
            await subirImagenProductoServicio(productoGuardado.id, archivoPrincipal, true);
          }
          if (archivosSecundarios.length > 0) {
            for (const file of archivosSecundarios) {
              await subirImagenProductoServicio(productoGuardado.id, file, false);
            }
          }
        }
      }

      navigate('/admin/productos');

    } catch (err) {
      setError(err.message || 'Error al guardar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const handleEliminarImagen = async (nombreImg) => {
    if (!id) return;

    const confirmar = window.confirm("¿Seguro que deseas eliminar esta imagen?");
    if (!confirmar) return;

    try {
      await eliminarImagenProductoServicio(id, nombreImg);

      if (nombreImg === imagen) {
        setImagen('');
      }

      setImagenesSecundarias(prev => prev.filter(img => img !== nombreImg));

    } catch (err) {
      console.error(err);
      alert("Error al eliminar imagen");
    }
  };

  const tituloPagina = id ? 'Editar Producto' : 'Crear Nuevo Producto';

  if (cargandoDatos) {
    return (
      <LayoutAdmin titulo="Cargando...">
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin titulo={tituloPagina}>
      <Card className="shadow-sm formulario-producto-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            {/* IMAGEN PRINCIPAL */}
            <Form.Group className="mb-3" controlId="formImagenPrincipal">
              <Form.Label>Imagen principal</Form.Label>

              {imagen && (
                <div className="mb-2">
                  <img
                    src={`http://localhost:8080/images/${imagen}`}
                    alt="Imagen principal"
                    style={{ maxWidth: '200px', display: 'block', marginBottom: '8px' }}
                  />
                  <div className="d-flex align-items-center gap-2">
                    <small className="text-muted">Actual: {imagen}</small>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEliminarImagen(imagen)}
                    >
                      Eliminar principal
                    </Button>
                  </div>
                </div>
              )}

              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setArchivoPrincipal(file);
                }}
              />
              <Form.Text className="text-muted">
                Selecciona una imagen para establecerla como principal.
              </Form.Text>
            </Form.Group>

            {/* IMÁGENES SECUNDARIAS */}
            <Form.Group className="mb-3" controlId="formImagenesSecundarias">
              <Form.Label>Imágenes secundarias</Form.Label>

              {imagenesSecundarias.length > 0 && (
                <div className="mb-2 d-flex flex-wrap">
                  {imagenesSecundarias.map((img, idx) => (
                    <div
                      key={idx}
                      style={{ marginRight: '10px', textAlign: 'center' }}
                    >
                      <img
                        src={`http://localhost:8080/images/${img}`} 
                        alt="miniatura"
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          display: 'block'
                        }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="mt-1"
                        onClick={() => handleEliminarImagen(img)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  setArchivosSecundarios(Array.from(e.target.files || []));
                }}
              />
              <Form.Text className="text-muted">
                Puedes agregar una o varias imágenes adicionales.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
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
                    value={stock}
                    onChange={(e) => setStock(e.target.valueAsNumber || 0)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
              >
                <option value="">Seleccione una categoría</option>
                {listaCategorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" disabled={cargando}>
              {cargando ? 'Guardando...' : 'Guardar Producto'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/admin/productos')}
              className="ms-2"
            >
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </LayoutAdmin>
  );
}