// En: src/vistas/Registro.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
// (Usa tu ruta correcta a 'estructura')
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';

// 1. Importamos la lógica y datos que movimos
import {
  regiones,
  comunasPorRegion,
  validarRut,
  validarNombre,
  validarApellidos,
  validarCorreo,
  validarDireccion,
  validarContrasena
} from '../recursos/datos/registroFormDatos.js';

// 2. Importamos el servicio de registro
import { registroServicio } from '../servicios/usuarioServicio.js';

// Usamos el mismo CSS de Login para centrar
import './InicioSesion.css'; 

export function Registro() {
  
  // 3. Estados para CADA campo del formulario
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  // (Omitimos 'fechaNac' por ahora, ya que tu JS decía '|| null')

  // Estado para la lista dinámica de comunas
  const [comunas, setComunas] = useState([]);
  
  // Estados de control
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // 4. Lógica de React para manejar el cambio de Región
  const handleRegionChange = (e) => {
    const regionSeleccionada = e.target.value;
    setRegion(regionSeleccionada);
    // Actualizamos la lista de comunas
    setComunas(comunasPorRegion[regionSeleccionada] || []);
    // Reseteamos la comuna seleccionada
    setComuna(''); 
  };

  // 5. 'handleSubmit' (reemplaza tu 'eventListener')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    // --- 6. Validaciones (Usando tus funciones) ---
    if (!validarRut(rut)) {
      setError("El RUT ingresado no es válido. (Sin puntos ni guion)");
      setCargando(false);
      return;
    }
    if (!validarNombre(nombre)) {
      setError("El nombre debe contener solo letras (2-50 caracteres).");
      setCargando(false);
      return;
    }
    if (!validarApellidos(apellidos)) {
      setError("Los apellidos deben contener solo letras (2-100 caracteres).");
      setCargando(false);
      return;
    }
    if (!validarCorreo(correo)) {
      setError("El correo no es válido o no es un dominio permitido.");
      setCargando(false);
      return;
    }
     if (!validarDireccion(direccion)) {
      setError("La dirección debe tener entre 5 y 300 caracteres.");
      setCargando(false);
      return;
    }
    if (region === '' || comuna === '') {
      setError("Debes seleccionar una Región y Comuna.");
      setCargando(false);
      return;
    }
    if (!validarContrasena(password)) {
      setError("La contraseña debe tener entre 4 y 10 caracteres.");
      setCargando(false);
      return;
    }

    // --- 7. Llamada al Servicio ---
    try {
      const datosUsuario = { rut, nombre, apellidos, correo, direccion, password, region, comuna };
      
      await registroServicio(datosUsuario);
      
      // ¡Éxito!
      alert("¡Registro exitoso! Serás redirigido al Login.");
      navigate('/login');

    } catch (err) {
      // Si el servicio 'reject' (ej. correo duplicado)
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        {/* Usamos el mismo layout de tarjeta que InicioSesion.jsx */}
        <div className="contenedor-login"> 
          <Container>
            <Card className="shadow-lg login-card mx-auto" style={{maxWidth: '800px'}}>
              <Card.Body className="p-5">
                <Card.Title className="text-center h2 mb-4">
                  Registro de Usuario
                </Card.Title>
                
                <Form onSubmit={handleSubmit}>
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="rut">
                        <Form.Label>RUT (sin puntos ni guion)</Form.Label>
                        <Form.Control type="text" placeholder="12345678K" value={rut} onChange={(e) => setRut(e.target.value)} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Juan" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="apellidos">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" placeholder="Pérez González" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="correo">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" placeholder="ejemplo@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="direccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Av. Siempre Viva 123" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="region">
                        <Form.Label>Región</Form.Label>
                        <Form.Select value={region} onChange={handleRegionChange} required>
                          <option value="">Seleccione una región</option>
                          {regiones.map((r, index) => (
                            <option key={index} value={r}>{r}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="comuna">
                        <Form.Label>Comuna</Form.Label>
                        <Form.Select value={comuna} onChange={(e) => setComuna(e.target.value)} disabled={comunas.length === 0} required>
                          <option value="">Seleccione una comuna</option>
                          {comunas.map((c, index) => (
                            <option key={index} value={c}>{c}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Contraseña (4-10 caracteres)</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg" disabled={cargando}>
                      {cargando ? 'Registrando...' : 'Registrarse'}
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