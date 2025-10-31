// En: src/servicios/usuarioServicio.js

import api from './api'; // ¡Importamos el axios centralizado!

// (Todos estos son servicios de Admin y usan la cookie de sesión)

/**
 * (Admin) Obtiene la lista de todos los usuarios
 * GET /api/admin/usuarios
 */
export const getUsuariosServicio = async () => {
  try {
    const response = await api.get('/admin/usuarios');
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Admin) Obtiene un solo usuario por su ID
 * GET /api/admin/usuarios/:id
 */
export const getUsuarioPorIdServicio = async (id) => {
  try {
    const response = await api.get(`/admin/usuarios/${id}`);
    return response.data;
  } catch (error)
 {
    console.error(`Error al obtener usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Admin) Crea un nuevo usuario
 * POST /api/admin/usuarios
 */
export const crearUsuarioServicio = async (datosUsuario) => {
  try {
    // datosUsuario debe coincidir con la entidad Usuario.java
    const response = await api.post('/admin/usuarios', datosUsuario);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Admin) Actualiza un usuario
 * PUT /api/admin/usuarios/:id
 */
export const updateUsuarioServicio = async (id, datosUsuario) => {
  try {
    const response = await api.put(`/admin/usuarios/${id}`, datosUsuario);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Admin) Borra un usuario
 * DELETE /api/admin/usuarios/:id
 */
export const deleteUsuarioServicio = async (id) => {
  try {
    const response = await api.delete(`/admin/usuarios/${id}`);
    return response.data; // Devuelve 204 No Content
  } catch (error) {
    console.error(`Error al borrar usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Admin) Desactiva un usuario
 * PATCH /api/admin/usuarios/:id/desactivar
 */
export const desactivarUsuarioServicio = async (id) => {
  try {
    const response = await api.patch(`/admin/usuarios/${id}/desactivar`);
    return response.data;
  } catch (error) {
    console.error(`Error al desactivar usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};