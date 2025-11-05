import React, { createContext, useState, useContext, useEffect } from 'react';
import { verificarPerfil, logoutServicio } from '../servicios/authServicio.js';

const AuthContexto = createContext();

export const useAuth = () => {
  return useContext(AuthContexto);
};

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    
    const verificarSesion = async () => {
      try {
        const data = await verificarPerfil();
        
        setUsuario(data);
      } catch (error) {
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };
    
    verificarSesion();
  }, []); 

  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const logout = async () => {
    try {
      await logoutServicio(); 
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      setUsuario(null);
    }
  };

  const valor = {
    usuario,
    cargando,
    login,
    logout
  };

  return (
    <AuthContexto.Provider value={valor}>
      {!cargando && children}
    </AuthContexto.Provider>
  );
}