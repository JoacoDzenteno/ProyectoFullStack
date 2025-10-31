// En: src/servicios/authServicio.js

// 1. Importamos la 'instancia' de axios que creamos en api.js
// Esta ya tiene la baseURL ('http://localhost:8080/api') 
// y el withCredentials: true (para enviar cookies)
import api from './api';

/**
 * 2. Servicio de Login (real)
 * Llama a POST /api/auth/login
 */
export const loginServicio = async (email, password) => {
  try {
    // El { email, password } debe coincidir con el LoginRequest.java
    const response = await api.post('/auth/login', { email, password });
    
    // El backend (AuthService) nos devuelve el objeto Usuario
    return response.data;
  } catch (error) {
    // Si falla (ej. 401 Contraseña incorrecta), axios lanza un error
    console.error("Error en loginServicio:", error.response?.data || error.message);
    // Relanzamos el error para que el formulario (InicioSesion.jsx) lo atrape
    throw error;
  }
};

/**
 * 3. Servicio de Registro (real)
 * Llama a POST /api/auth/registro
 */
export const registroServicio = async (datosRegistro) => {
  try {
    // datosRegistro es el objeto del formulario
    // (debe coincidir con RegistroRequest.java)
    const response = await api.post('/auth/registro', datosRegistro);
    
    // El backend nos devuelve el usuario recién creado
    return response.data;
  } catch (error) {
    console.error("Error en registroServicio:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 4. Servicio de Verificar Perfil (¡Nuevo!)
 * Llama a GET /api/auth/perfil
 * AuthContexto.jsx usa esto para saber si ya hay una sesión (cookie)
 */
export const verificarPerfil = async () => {
  try {
    const response = await api.get('/auth/perfil');
    // Devuelve el usuario si la cookie es válida
    return response.data;
  } catch (error) {
    // Esto es normal si no hay sesión (devuelve 401)
    console.log("No hay sesión activa.");
    throw error;
  }
};

/**
 * 5. Servicio de Logout (¡Nuevo!)
 * Llama a POST /api/auth/logout
 */
export const logoutServicio = async () => {
  try {
    // Esta URL la definimos en SecurityConfig.java
    const response = await api.post('/auth/logout');
    return response.data; // Devuelve un OK 200
  } catch (error) {
    console.error("Error en logoutServicio:", error.response?.data || error.message);
    throw error;
  }
};