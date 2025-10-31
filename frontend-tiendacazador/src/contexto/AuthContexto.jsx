// En: src/contexto/AuthContexto.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
// Importaremos los servicios que "hablan" con el backend
import { verificarPerfil, logoutServicio } from '../servicios/authServicio.js';

const AuthContexto = createContext();

export const useAuth = () => {
  return useContext(AuthContexto);
};

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  
  // 1. El nuevo estado de "cargando"
  // (Inicia en true, porque siempre verificaremos la sesión al cargar)
  const [cargando, setCargando] = useState(true);

  // 2. useEffect para verificar la sesión (cookie) al cargar la app
  useEffect(() => {
    
    // Función interna para llamar al backend
    const verificarSesion = async () => {
      try {
        // Llamamos al endpoint GET /api/auth/perfil
        // (Esto lo crearemos en authServicio.js)
        const data = await verificarPerfil();
        
        // Si tiene éxito, guardamos el usuario en el estado
        setUsuario(data);
      } catch (error) {
        // Si falla (error 401), significa que no hay sesión.
        setUsuario(null);
      } finally {
        // En cualquier caso (éxito o fracaso), terminamos de cargar.
        setCargando(false);
      }
    };
    
    verificarSesion();
  }, []); // El [] vacío asegura que esto solo se ejecute UNA vez

  // 3. El 'login' ahora es más simple
  // (El servicio que lo llame le pasará los datos del usuario)
  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  // 4. El 'logout' ahora debe llamar al backend
  const logout = async () => {
    try {
      // Llama a POST /api/auth/logout (que borra la cookie)
      await logoutServicio(); 
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      // Independientemente de si el backend falló, 
      // borramos el usuario del frontend.
      setUsuario(null);
    }
  };

  const valor = {
    usuario,
    cargando, // Pasamos el estado de carga
    login,
    logout
  };

  return (
    <AuthContexto.Provider value={valor}>
      {/* No mostramos la app (children) hasta que 'cargando' sea false.
        Esto evita el "parpadeo" de la página de login 
        mientras verificamos la sesión.
      */}
      {!cargando && children}
    </AuthContexto.Provider>
  );
}