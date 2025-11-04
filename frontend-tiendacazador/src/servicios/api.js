// En: src/servicios/api.js (EL CÓDIGO CORRECTO)
import axios from 'axios';

const api = axios.create({
  // La URL base de tu backend
  baseURL: 'http://localhost:8080/api', 
  
  // ¡CRÍTICO! Esto envía la cookie de sesión (JSESSIONID)
  withCredentials: true 
});

export default api;
