import React, { useState, useEffect } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { crearUsuarioServicio} from '../../../servicios/usuarioServicio.js'; 
import { getUsuarioPorIdServicio } from '../../../servicios/usuarioServicio.js'; 
import { updateUsuarioServicio } from '../../../servicios/usuarioServicio.js';

import './FormularioUsuario.css'; 

export function FormularioUsuario() {

  const { id } = useParams(); 

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente'); 

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const cargarDatosUsuario = async () => {
        setCargando(true); 
        try {
          const datos = await getUsuarioPorIdServicio(id);
          setNombre(datos.nombre);
          setEmail(datos.email);
          setRol(datos.rol);
        } catch (err) {
          setError(err.message);
        } finally {
          setCargando(false); 
        }
      };
      cargarDatosUsuario();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    if (!id && password.length < 4) { 
      setError('La contraseña es obligatoria y debe tener al menos 4 caracteres.');
      setCargando(false);
      return;
    }
    if (id && password && password.length < 4) { 
      setError('La nueva contraseña debe tener al menos 4 caracteres.');
      setCargando(false);
      return;
    }

    try {
      const datosUsuario = { nombre, email, rol };
      if (password) {
        datosUsuario.password = password;
      }
      
      if (id) {
        await updateUsuarioServicio(id, datosUsuario);
      } else {
        await crearUsuarioServicio(datosUsuario);
      }

      navigate('/admin/usuarios');

    } catch (err) {
      setError(err.message || 'Error al guardar el usuario.');
    } finally {
      setCargando(false);
    }
  };

  const tituloPagina = id ? "Editar Usuario" : "Crear Nuevo Usuario";

  return (
    <LayoutAdmin titulo={tituloPagina}>
      <Card className="shadow-sm formulario-usuario-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Ignacio Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder={id ? "Dejar en blanco para no cambiar" : "Mínimo 4 caracteres"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!id} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRol">
              <Form.Label>Rol del Usuario</Form.Label>
              <Form.Select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="cliente">Cliente</option>
                <option value="vendedor">Vendedor</option>
                <option value="super-admin">Super Administrador</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" disabled={cargando}>
              {cargando ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  {' '}Guardando...
                </>
              ) : (
                'Guardar Usuario'
              )}
            </Button>
            
            <Button variant="secondary" onClick={() => navigate('/admin/usuarios')} className="ms-2">
              Cancelar
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </LayoutAdmin>
  );
}