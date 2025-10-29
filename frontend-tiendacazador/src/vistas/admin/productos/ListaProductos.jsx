// En: src/vistas/admin/productos/ListaProductos.jsx

import React, { useState, useEffect } from 'react';
// (Usa tu ruta correcta a 'estructura' o 'layout')
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx'; 
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';

// 1. Importamos el servicio de PRODUCTOS
import { getProductosServicio } from '../../../servicios/productoServicio.js';
import { deleteProductoServicio } from '../../../servicios/productoServicio.js';




// 2. Importamos su CSS
import './ListaProductos.css'; 

export function ListaProductos() {
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  // 2. Función de carga (la blindamos por si acaso)
  const cargarProductos = async () => {
    try {
      setCargando(true);
      const datos = await getProductosServicio();
      setProductos(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setMensaje('Error al cargar productos.');
      setProductos([]); // Blindaje
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // --- 3. ¡NUEVA FUNCIÓN PARA BORRAR (con blindaje)! ---
  const manejarDelete = async (id) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el producto con ID ${id}?`);
    
    if (confirmar) {
      try {
        setMensaje(''); 
        await deleteProductoServicio(id); // Llamamos al servicio

        // BLINDAJE: Chequeo ANTES de filtrar
        if (!Array.isArray(productos)) {
          console.error("Estado 'productos' corrompido. Forzando recarga.");
          cargarProductos(); 
          return;
        }

        // Si es un array, filtramos (actualiza la UI sin recargar)
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
      
      <LinkContainer to="/admin/productos/crear">
        <Button variant="success" className="mb-3">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Crear Nuevo Producto
        </Button>
      </LinkContainer>

      {mensaje && <Alert variant={mensaje.includes('Error') ? 'danger' : 'success'}>{mensaje}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          {/* ... (encabezados de la tabla) ... */}
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
                <td>{producto.categoria}</td>
                <td>
                  <LinkContainer to={`/admin/productos/editar/${producto.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </LinkContainer>
                  
                  {/* --- 4. CONECTAMOS EL BOTÓN ONCLICK --- */}
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