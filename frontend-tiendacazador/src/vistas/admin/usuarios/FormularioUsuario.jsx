import React, { useState, useEffect } from "react";
import { LayoutAdmin } from "../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx";
import { Form, Button, Card, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import {
  crearUsuarioServicio,
  getUsuarioPorIdServicio,
  updateUsuarioServicio,
} from "../../../servicios/usuarioServicio.js";

import "./FormularioUsuario.css";

export function FormularioUsuario() {
  const { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rut, setRut] = useState("");
  const [direccion, setDireccion] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [rol, setRol] = useState("USER"); 
  const [estado, setEstado] = useState(true);

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const cargar = async () => {
      setCargando(true);
      try {
        const datos = await getUsuarioPorIdServicio(id);
        setNombre(datos.nombre || "");
        setApellidos(datos.apellidos || "");
        setEmail(datos.email || "");
        setRut(datos.rut || "");
        setDireccion(datos.direccion || "");
        setRegion(datos.region || "");
        setComuna(datos.comuna || "");
        setRol((datos.rol || "USER").toUpperCase());
        setEstado(Boolean(datos.estado));
      } catch (e) {
        setError(e?.message || "Error al cargar el usuario.");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [id]);

  const validate = () => {
    if (!nombre.trim()) return "El nombre es obligatorio";
    if (!apellidos.trim()) return "Los apellidos son obligatorios";
    if (!email.trim()) return "El email es obligatorio";
    if (!/\S+@\S+\.\S+/.test(email)) return "Formato de email inválido";
    if (!rut.trim()) return "El RUT es obligatorio";
    if (!["ADMIN", "USER"].includes(rol)) return "Rol inválido";
    if (!id && (!password || password.length < 4))
      return "La contraseña es obligatoria y debe tener al menos 4 caracteres";
    if (id && password && password.length < 4)
      return "La nueva contraseña debe tener al menos 4 caracteres";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) { setError(v); return; }

    setCargando(true);
    try {
      const payload = {
        nombre,
        apellidos,
        email,
        rut,
        direccion: direccion || null,
        region: region || null,
        comuna: comuna || null,
        rol,
        estado,
      };
      if (password) payload.password = password;

      if (id) {
        await updateUsuarioServicio(id, payload);
      } else {
        await crearUsuarioServicio(payload);
      }

      navigate("/admin/usuarios");
    } catch (err) {
      const r = err?.response;
      if (r?.status === 409) {
        setError("Email o RUT ya existen.");
      } else if (r?.status === 400) {
        setError(r?.data?.error || "Datos inválidos.");
      } else {
        setError("Error al guardar el usuario.");
      }
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

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Nombre*</Form.Label>
                <Form.Control
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Apellidos*</Form.Label>
                <Form.Control
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Correo Electrónico*</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Contraseña {id ? "(opcional)" : "*"}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={id ? "Dejar en blanco para no cambiar" : "Mínimo 4 caracteres"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>RUT*</Form.Label>
                <Form.Control
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Rol*</Form.Label>
                <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Form.Check
                  type="switch"
                  id="estado"
                  label="Activo"
                  checked={estado}
                  onChange={(e) => setEstado(e.target.checked)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Región</Form.Label>
                <Form.Control
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Comuna</Form.Label>
                <Form.Control
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                />
              </Col>
            </Row>

            <Button variant="success" type="submit" disabled={cargando}>
              {cargando ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  {" "}Guardando...
                </>
              ) : (
                "Guardar Usuario"
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/admin/usuarios")}
              className="ms-2"
            >
              Cancelar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </LayoutAdmin>
  );
}
