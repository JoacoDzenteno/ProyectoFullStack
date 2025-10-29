// En: src/vistas/admin/usuarios/FormularioUsuario.jsx

// --- 1. IMPORTAMOS LOS HOOKS 'useEffect' Y 'useParams' ---
import React, { useState, useEffect } from 'react';
// ¡Respeto tu ruta a 'estructura'!
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
// Importamos el hook para leer parámetros de la URL
import { useNavigate, useParams } from 'react-router-dom';

// --- 2. IMPORTAMOS LOS NUEVOS SERVICIOS ---
import { 
  crearUsuarioServicio, 
  getUsuarioPorIdServicio, 
  updateUsuarioServicio 
} from '../../../servicios/usuarioServicio.js';

import './FormularioUsuario.css'; 

export function FormularioUsuario() {
  
  // --- 3. OBTENEMOS EL 'id' DE LA URL ---
  // Si la URL es '/.../crear', 'id' será 'undefined'.
  // Si la URL es '/.../editar/3', 'id' será "3".
  const { id } = useParams(); 
  
  // Estados para todos los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente'); // Rol por defecto

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // --- 4. 'useEffect' PARA CARGAR DATOS EN MODO "EDITAR" ---
  useEffect(() => {
    // Si hay un 'id' en la URL, cargamos los datos de ese usuario
    if (id) {
      const cargarDatosUsuario = async () => {
        // Mostramos un spinner mientras se cargan los datos
        setCargando(true); 
        try {
          const datos = await getUsuarioPorIdServicio(id);
          // Rellenamos el formulario con los datos del usuario
          setNombre(datos.nombre);
          setEmail(datos.email);
          setRol(datos.rol);
          // (No cargamos la contraseña por seguridad)
        } catch (err) {
          setError(err.message);
        } finally {
          // Ocultamos el spinner general
          setCargando(false); 
        }
      };
      cargarDatosUsuario();
    }
    // Este 'useEffect' se ejecuta solo si el 'id' de la URL cambia
  }, [id]);

  // --- 5. 'handleSubmit' ACTUALIZADO (CREA O EDITA) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    // Validación de contraseña (diferente para 'crear' y 'editar')
    if (!id && password.length < 4) { // Modo CREAR
      setError('La contraseña es obligatoria y debe tener al menos 4 caracteres.');
      setCargando(false);
      return;
    }
    if (id && password && password.length < 4) { // Modo EDITAR (si se escribió algo)
      setError('La nueva contraseña debe tener al menos 4 caracteres.');
      setCargando(false);
      return;
    }

    try {
      const datosUsuario = { nombre, email, rol };
      // Si se escribió una nueva contraseña, la incluimos
      if (password) {
        datosUsuario.password = password;
      }
      
      if (id) {
        // MODO EDITAR: Llamamos a 'update'
        await updateUsuarioServicio(id, datosUsuario);
      } else {
        // MODO CREAR: Llamamos a 'crear'
        await crearUsuarioServicio(datosUsuario);
      }
      
      // Si todo sale bien, volvemos a la lista
      navigate('/admin/usuarios');

    } catch (err) {
      setError(err.message || 'Error al guardar el usuario.');
    } finally {
      setCargando(false);
    }
  };

  // --- 6. TÍTULO DINÁMICO ---
  const tituloPagina = id ? "Editar Usuario" : "Crear Nuevo Usuario";

  return (
    <LayoutAdmin titulo={tituloPagina}>
      <Card className="shadow-sm formulario-usuario-card">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Mensaje de Error */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Campo Nombre */}
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

            {/* Campo Email */}
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

            {/* --- 7. CAMPO CONTRASEÑA ACTUALIZADO --- */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                // Placeholder dinámico
                placeholder={id ? "Dejar en blanco para no cambiar" : "Mínimo 4 caracteres"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // 'required' dinámico (solo obligatorio si NO hay 'id')
                required={!id} 
              />
            </Form.Group>

            {/* Campo Rol */}
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