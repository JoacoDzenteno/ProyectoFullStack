import React, { useState, useEffect } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Form, Button, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import './FormularioProducto.css'; 

// --- MODIFICADO ---
// Importamos los 4 servicios que necesitamos
import { 
  crearProductoServicio, 
  updateProductoServicio, 
  getProductoPorIdServicio, 
  getCategoriasServicio // <-- ¡NUEVO!
} from '../../../servicios/productoServicio.js';

export function FormularioProducto() {

  const { id } = useParams();
  const navigate = useNavigate();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [imagen, setImagen] = useState('');
  
  // --- MODIFICADO ---
  // El estado 'categoria' ahora guarda solo el ID
  const [categoriaId, setCategoriaId] = useState(''); 
  
  // --- NUEVO ---
  // Nuevo estado para guardar la lista del dropdown
  const [listaCategorias, setListaCategorias] = useState([]);

  // Estados de UI
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  
  // (CargandoDatos ahora también manejará la carga de categorías)
  const [cargandoDatos, setCargandoDatos] = useState(false);

  // --- MODIFICADO ---
  // Efecto para cargar datos (para "Editar" o "Crear")
  useEffect(() => {
    
    const cargarDatos = async () => {
      setCargandoDatos(true);
      try {
        // 1. Siempre cargamos la lista de categorías
        const categoriasData = await getCategoriasServicio();
        setListaCategorias(categoriasData || []);

        // 2. Si hay un 'id', cargamos los datos de ESE producto
        if (id) {
          const datos = await getProductoPorIdServicio(id);
          setNombre(datos.nombre);
          setDescripcion(datos.descripcion);
          setPrecio(datos.precio);
          setStock(datos.stock);
          setImagen(datos.imagen || '');
          
          // Guardamos solo el ID de la categoría del producto
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
  }, [id]); // Depende de 'id'

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (precio <= 0 || stock < 0) {
      setError('El precio y el stock deben ser números positivos.');
      return;
    }
    
    // --- MODIFICADO ---
    // El 'id' de la categoría no puede estar vacío
    if (!categoriaId) {
      setError('Debe seleccionar una categoría.');
      return;
    }

    setCargando(true);

    try {
      // --- MODIFICADO ---
      // Construimos el objeto que el backend (Java) espera
      const datosProducto = { 
        nombre, 
        descripcion, 
        precio, 
        stock, 
        imagen, 
        // Enviamos la categoría como un objeto anidado
        categoria: { 
          id: parseInt(categoriaId, 10) // Aseguramos que sea un número
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

  // Spinner de carga principal
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

            {/* --- (Campos Nombre, Imagen, Descripción - Sin cambios) --- */}
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

            {/* --- (Campos Precio y Stock - Sin cambios) --- */}
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

            {/* --- ¡CAMBIO GRANDE AQUÍ! --- */}
            {/* Reemplazamos el <input> de categoría por un <select> */}
            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={categoriaId} // El valor es el ID
                onChange={(e) => setCategoriaId(e.target.value)} // Guardamos el ID
                required
              >
                {/* Opción por defecto */}
                <option value="">Seleccione una categoría</option>
                
                {/* Mapeamos la lista de categorías cargada */}
                {listaCategorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* --- (Botones - Sin cambios) --- */}
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