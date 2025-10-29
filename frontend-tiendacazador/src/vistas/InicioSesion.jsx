// En: src/vistas/InicioSesion.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto.jsx'; 
// 1. Importamos el servicio y el 'Alert' para errores
import { loginServicio } from '../servicios/authServicio.js'; 
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'; 

// (Asegúrate que esta ruta a 'layout' sea la tuya, a veces usas 'estructura')
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import './InicioSesion.css';

export function InicioSesion() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para manejar errores y carga
  const [error, setError] = useState(''); // Para guardar el mensaje de error
  const [cargando, setCargando] = useState(false); // Para deshabilitar el botón

  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const manejarLogin = async (e) => {
    e.preventDefault(); 
    setError(''); // Limpiamos errores antiguos
    setCargando(true); // Deshabilitamos el botón

    try {
      // Llamamos al servicio (que tarda 1 seg)
      const datosUsuario = await loginServicio(email, password);
      
      // Si el servicio tuvo ÉXITO
      login(datosUsuario); // Guardamos la sesión
      navigate('/admin/panel'); // Redirigimos

    } catch (errorCapturado) {
      
      // --- ESTE ES EL FLUJO DE ERROR ---
      // Si el servicio falló (ej. contraseña '1235')
      console.error("Error en login:", errorCapturado.message);
      // 1. Mostramos el error
      setError(errorCapturado.message); 
      // 2. Volvemos a activar el botón
      setCargando(false); 
      // --- ¡Y NO HAY REDIRECCIÓN! ---
    }
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        <div className="contenedor-login">
          <Container>
            <Card className="shadow-lg login-card mx-auto">
              <Card.Body className="p-5">
                <Card.Title className="text-center h2 mb-4">
                  Iniciar Sesión
                </Card.Title>
                
                <Form onSubmit={manejarLogin}>
                  
                  {/* --- AQUÍ SE MUESTRA EL ERROR --- */}
                  {/* Mostramos el 'Alert' solo si la variable 'error' tiene texto */}
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Correo electrónico" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Contraseña" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    {/* Deshabilitamos el botón si está "cargando" */}
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg" 
                      disabled={cargando}
                    >
                      {cargando ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </main>
      <PiePagina />
    </div>
  );
}