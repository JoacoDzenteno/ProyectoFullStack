import api from './api';

export const loginServicio = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, refreshToken, usuario } = response.data;

    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    return { usuario, token, refreshToken };
  } catch (error) {
    console.error(
      "Error en loginServicio:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const registroServicio = async (datosRegistro) => {
  try {
    const response = await api.post("/auth/registro", datosRegistro);
    return response.data;
  } catch (error) {
    console.error("Error en registroServicio:", error.response?.data || error.message);
    throw error;
  }
};


export const verificarPerfilServicio = async () => {
  try {
    const response = await api.get("/auth/perfil");
    return response.data;
  } catch (error) {
    console.error(
      "Error al verificar perfil:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const refreshTokenServicio = async (refreshToken) => {
  try {
    const response = await api.post("/auth/refresh", { refreshToken });

    const { token, refreshToken: nuevoRefresh } = response.data;

    if (token) localStorage.setItem("token", token);
    if (nuevoRefresh) localStorage.setItem("refreshToken", nuevoRefresh);

    return { token, refreshToken: nuevoRefresh };
  } catch (error) {
    console.error(
      "Error al refrescar token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const logoutServicio = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const actualizarPerfilServicio = async (datosPerfil) => {
  try {
    const response = await api.put("/auth/perfil", datosPerfil);
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar perfil:",
      error.response?.data || error.message
    );
    throw error;
  }
};