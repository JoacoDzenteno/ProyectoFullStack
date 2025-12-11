import React, { useEffect, useState } from 'react';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { useAuth } from '../contexto/AuthContexto.jsx';
import { verificarPerfilServicio, actualizarPerfilServicio } from '../servicios/authServicio.js';
import { Container, Form, Button, Alert, Spinner, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export function PerfilCliente() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    rut: '',
    direccion: '',
    region: '',
    comuna: '',
    passwordActual: '',
    passwordNueva: '',
  });

  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }

    const cargarPerfil = async () => {
      try {
        setCargando(true);
        setError('');
        const data = await verificarPerfilServicio();

        setForm((prev) => ({
          ...prev,
          nombre: data.nombre || '',
          apellidos: data.apellidos || '',
          email: data.email || '',
          rut: data.rut || '',
          direccion: data.direccion || '',
          region: data.region || '',
          comuna: data.comuna || '',
        }));
      } catch (err) {
        console.error(err);
        setError('Error al cargar perfil');
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, [usuario, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError('');
    setMensaje('');

    try {
      const payload = {
        nombre: form.nombre,
        apellidos: form.apellidos,
        direccion: form.direccion,
        region: form.region,
        comuna: form.comuna,
      };

      if (form.passwordNueva) {
        payload.passwordActual = form.passwordActual || null;
        payload.passwordNueva = form.passwordNueva;
      }

      const usuarioActualizado = await actualizarPerfilServicio(payload);

      const usuarioLocal = JSON.parse(localStorage.getItem('usuario') || 'null') || {};
      const nuevoUsuario = { ...usuarioLocal, ...usuarioActualizado };

      login({
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
        usuario: nuevoUsuario,
      });

      setMensaje('Perfil actualizado correctamente');
      setForm((prev) => ({
        ...prev,
        passwordActual: '',
        passwordNueva: '',
      }));
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.mensaje ||
        err.response?.data ||
        'Error al actualizar perfil'
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        <Container className="mt-4 mb-4">
          <h1 className="titulosPg">Mi Perfil</h1>

          {cargando && (
            <div className="text-center my-4">
              <Spinner animation="border" role="status" />
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {mensaje && (
            <Alert variant="success" className="mt-3">
              {mensaje}
            </Alert>
          )}

          {!cargando && (
            <Row>
              <Col md={8}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                              type="text"
                              name="nombre"
                              value={form.nombre}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                              type="text"
                              name="apellidos"
                              value={form.apellidos}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={form.email}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>RUT</Form.Label>
                            <Form.Control
                              type="text"
                              name="rut"
                              value={form.rut}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                          type="text"
                          name="direccion"
                          value={form.direccion}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Región</Form.Label>
                            <Form.Control
                              type="text"
                              name="region"
                              value={form.region}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Comuna</Form.Label>
                            <Form.Control
                              type="text"
                              name="comuna"
                              value={form.comuna}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <hr />

                      <h5>Cambiar contraseña (opcional)</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>Contraseña nueva</Form.Label>
                        <Form.Control
                          type="password"
                          name="passwordNueva"
                          value={form.passwordNueva}
                          onChange={handleChange}
                          placeholder="Déjala vacía si no deseas cambiarla"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Contraseña actual (si vas a cambiar)</Form.Label>
                        <Form.Control
                          type="password"
                          name="passwordActual"
                          value={form.passwordActual}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        disabled={guardando}
                      >
                        {guardando ? 'Guardando...' : 'Guardar cambios'}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mt-3 mt-md-0">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5>Área de cliente</h5>
                    <p className="text-muted">
                      Desde aquí puedes gestionar tu perfil, revisar tu carrito y ver tu historial de compras.
                    </p>
                    <div className="d-grid gap-2">
                      <Link to="/carrito">
                        <Button variant="outline-primary" className="w-100">
                          Ver carrito
                        </Button>
                      </Link>
                      <Link to="/pedidos">
                        <Button variant="outline-secondary" className="w-100">
                          Ver mis pedidos
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </main>
      <PiePagina />
    </div>
  );
}
