import React, { useState, useEffect } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './FormularioProducto.css'; 

import { 
  crearProductoServicio, 
  updateProductoServicio, 
  getProductoPorIdServicio, 
  getCategoriasServicio
} from '../../../servicios/productoServicio.js';

export function FormularioProducto() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [imagen, setImagen] = useState('');
  
  const [categoriaId, setCategoriaId] = useState(''); 
  
  const [listaCategorias, setListaCategorias] = useState([]);

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  

  const [cargandoDatos, setCargandoDatos] = useState(false);

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

    try {
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
      
      if (id) {
        await updateProductoServicio(id, datosProducto);
      } else {
        await crearProductoServicio(datosProducto);
      }
      
      navigate('/admin/productos');

    } catch (err) {
      setError(err.message || 'Error al guardar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const tituloPagina = id ? "Editar Producto" : "Crear Nuevo Producto";

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

            <Form.Group className="mb-3" controlId="formImagen">
              <Form.Label>URL de la Imagen Principal</Form.Label>
              <Form.Control
                type="text"
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
            <Button variant="secondary" onClick={() => navigate('/admin/productos')} className="ms-2">
              Cancelar
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </LayoutAdmin>
  );
}