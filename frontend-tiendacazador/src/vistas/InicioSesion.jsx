import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto.jsx'; 
import { loginServicio } from '../servicios/authServicio.js'; 
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'; 
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import './InicioSesion.css';

export function InicioSesion() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
 
  const [error, setError] = useState(''); 
  const [cargando, setCargando] = useState(false); 

  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const manejarLogin = async (e) => {
    e.preventDefault(); 
    setError('');
    setCargando(true); 

    try {
      const datosUsuario = await loginServicio(email, password);
      
      login(datosUsuario); 
      navigate('/admin/panel'); 

    } catch (errorCapturado) {
      
      console.error("Error en login:", errorCapturado.message);
      setError(errorCapturado.message); 
      setCargando(false); 
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