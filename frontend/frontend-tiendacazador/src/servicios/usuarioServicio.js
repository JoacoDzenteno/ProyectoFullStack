import api from "./api";

const normalizarPayload = (datos = {}, { isUpdate = false } = {}) => {
  const limpio = {
    nombre: datos.nombre?.trim(),
    apellidos: datos.apellidos?.trim(),
    email: datos.email?.trim(),
    rut: datos.rut?.trim(),
    direccion: datos.direccion?.trim() || null,
    region: datos.region?.trim() || null,
    comuna: datos.comuna?.trim() || null,
    rol: (datos.rol || 'USER').toUpperCase(),               
    estado: typeof datos.estado === 'boolean' ? datos.estado : true,
  };

  if (!isUpdate) {
     limpio.password = datos.password;
  } else if (datos.password) {
    limpio.password = datos.password;
  }

  return limpio;
};

export const getUsuariosServicio = async () => {
  try {
    const response = await api.get('/admin/usuarios');
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.response?.data || error.message);
    throw error;
  }
};

export const getUsuarioPorIdServicio = async (id) => {
  try {
    const response = await api.get(`/admin/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const crearUsuarioServicio = async (datosUsuario) => {
  try {
    const body = normalizarPayload(datosUsuario, { isUpdate: false });
    const response = await api.post('/auth/registro', body);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUsuarioServicio = async (id, datosUsuario) => {
  try {
    const body = normalizarPayload(datosUsuario, { isUpdate: true });
    const response = await api.put(`/admin/usuarios/${id}`, body);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteUsuarioServicio = async (id) => {
  try {
    const response = await api.delete(`/admin/usuarios/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error al borrar usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const desactivarUsuarioServicio = async (id) => {
  try {
    const response = await api.patch(`/admin/usuarios/${id}/desactivar`);
    return response.data;
  } catch (error) {
    console.error(`Error al desactivar usuario ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
