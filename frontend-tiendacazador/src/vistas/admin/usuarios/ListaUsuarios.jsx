import React, { useEffect, useState } from "react";
import { LayoutAdmin } from "../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getUsuariosServicio,
  deleteUsuarioServicio,
  desactivarUsuarioServicio,
} from "../../../servicios/usuarioServicio.js";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const cargar = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const data = await getUsuariosServicio();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e) {
      setMsg({ type: "error", text: "Error al cargar usuarios." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar usuario definitivamente?")) return;
    try {
      await deleteUsuarioServicio(id);
      setMsg({ type: "success", text: "Usuario eliminado." });
      cargar();
    } catch {
      setMsg({ type: "error", text: "No se pudo eliminar." });
    }
  };

  const desactivar = async (id) => {
    if (!confirm("¿Desactivar usuario?")) return;
    try {
      await desactivarUsuarioServicio(id);
      setMsg({ type: "success", text: "Usuario actualizado." });
      cargar();
    } catch {
      setMsg({ type: "error", text: "No se pudo actualizar." });
    }
  };

  return (
    <LayoutAdmin titulo="Gestión de Usuarios">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Usuarios</h2>
        <Button onClick={() => navigate("/admin/usuarios/crear")} variant="success">
          Crear Usuario
        </Button>
      </div>

      {msg && (
        <Alert variant={msg.type === "error" ? "danger" : "success"}>{msg.text}</Alert>
      )}

      {loading ? (
        <div className="py-4 d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : usuarios.length === 0 ? (
        <Alert className="mt-3">No hay usuarios.</Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>RUT</th>
                <th>Rol</th>
                <th>Estado</th>
                <th style={{ width: 220 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre} {u.apellidos}</td>
                  <td>{u.email}</td>
                  <td>{u.rut}</td>
                  <td>{u.rol}</td>
                  <td>{u.estado ? "Activo" : "Inactivo"}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/admin/usuarios/editar/${u.id}`)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => desactivar(u.id)}
                    >
                      (Des)Activar
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => eliminar(u.id)}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </LayoutAdmin>
  );
}
