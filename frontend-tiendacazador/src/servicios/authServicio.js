import api from './api';

export const loginServicio = async (email, password) => {
  try {
     const response = await api.post('/auth/login', { email, password });
    
    return response.data;
  } catch (error) {
    console.error("Error en loginServicio:", error.response?.data || error.message);
    throw error;
  }
};

export const registroServicio = async (datosRegistro) => {
  try {
    const response = await api.post('/auth/registro', datosRegistro);

    return response.data;
  } catch (error) {
    console.error("Error en registroServicio:", error.response?.data || error.message);
    throw error;
  }
};

export const verificarPerfil = async () => {
  try {
    const response = await api.get('/auth/perfil');

    return response.data;
  } catch (error) {

    console.log("No hay sesión activa.");
    throw error;
  }
};


export const logoutServicio = async () => {
  try {
    const response = await api.post('/auth/logout');
  
    return response.data; 0
  } catch (error) {
    console.error("Error en logoutServicio:", error.response?.data || error.message);
    throw error;
  }
};