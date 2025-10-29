import React, { useState, useEffect } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx'; 
import { Table, Button, Spinner, Alert } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import './ListaUsuarios.css';
import { getUsuariosServicio, deleteUsuarioServicio } from '../../../servicios/usuarioServicio.js';

export function ListaUsuarios() {
  
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const datos = await getUsuariosServicio();
      
      setUsuarios(Array.isArray(datos) ? datos : []);

    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setMensaje('Error al cargar usuarios.');
      
      setUsuarios([]); 

    } finally {
      setCargando(false);
    }
  };
  
  useEffect(() => {
    cargarUsuarios();
  }, []); 

  const manejarDelete = async (id) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${id}?`);
    
    if (confirmar) {
      try {
        setMensaje(''); 
        await deleteUsuarioServicio(id); 

        if (!Array.isArray(usuarios)) {
          console.error("Estado 'usuarios' corrompido. Forzando recarga.");
          return;
        }

        const nuevaLista = usuarios.filter(u => u.id !== id);
        setUsuarios(nuevaLista);
        setMensaje('Usuario eliminado exitosamente.');

      } catch (error) {
        console.error("Error al borrar usuario:", error);
        setMensaje('Error al eliminar el usuario.');
      }
    }
  };


  return (
    <LayoutAdmin titulo="Gestión de Usuarios">
      
      <LinkContainer to="/admin/usuarios/crear">
        <Button variant="success" className="mb-3">
          <FontAwesomeIcon icon={faUserPlus} className="me-2" />
          Crear Nuevo Usuario
        </Button>
      </LinkContainer>

      {mensaje && <Alert variant={mensaje.includes('Error') ? 'danger' : 'success'}>{mensaje}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th># ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr>
              <td colSpan="5" className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </td>
            </tr>
          ) : (
            (usuarios || []).map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>

                <LinkContainer to={`/admin/usuarios/editar/${usuario.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </LinkContainer>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => manejarDelete(usuario.id)}
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