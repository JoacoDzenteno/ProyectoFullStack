import React, { useState, useEffect } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx'; 
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { getProductosServicio } from '../../../servicios/productoServicio.js';
import { deleteProductoServicio } from '../../../servicios/productoServicio.js';
import './ListaProductos.css'; 

export function ListaProductos() {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  // (El 'cargarProductos' y 'useEffect' están perfectos)
  const cargarProductos = async () => {
    try {
      setCargando(true);
      const datos = await getProductosServicio();
      setProductos(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setMensaje('Error al cargar productos.');
      setProductos([]); 
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // (El 'manejarDelete' está perfecto)
  const manejarDelete = async (id) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el producto con ID ${id}?`);
    
    if (confirmar) {
      try {
        setMensaje(''); 
        await deleteProductoServicio(id);
        
        // (La lógica de filtrado optimista está perfecta)
        const nuevaLista = productos.filter(p => p.id !== id);
        setProductos(nuevaLista);
        setMensaje('Producto eliminado exitosamente.');

      } catch (error) {
        console.error("Error al borrar producto:", error);
        setMensaje('Error al eliminar el producto.');
      }
    }
  };

  return (
    <LayoutAdmin titulo="Gestión de Productos">
      
      {/* (Botón 'Crear' - Perfecto) */}
      <LinkContainer to="/admin/productos/crear">
        <Button variant="success" className="mb-3">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Crear Nuevo Producto
        </Button>
      </LinkContainer>

      {mensaje && <Alert variant={mensaje.includes('Error') ? 'danger' : 'success'}>{mensaje}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th># ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr>
              <td colSpan="6" className="text-center">
                <Spinner animation="border" role="status" />
              </td>
            </tr>
          ) : (
            (productos || []).map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precio.toLocaleString('es-CL')}</td> 
                <td className={producto.stock <= 5 ? 'stock-critico' : ''}>
                  {producto.stock}
                </td>
                
                {/* --- ¡AQUÍ ESTÁ LA CORRECCIÓN! --- */}
                <td>
                  {/* Verificamos que 'categoria' exista antes de mostrar 'nombre' */}
                  {producto.categoria ? producto.categoria.nombre : 'Sin Categoría'}
                </td>

                <td>
                  {/* (Botones de acción - Perfectos) */}
                  <LinkContainer to={`/admin/productos/editar/${producto.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </LinkContainer>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => manejarDelete(producto.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </LayoutAdmin>
  );
}
