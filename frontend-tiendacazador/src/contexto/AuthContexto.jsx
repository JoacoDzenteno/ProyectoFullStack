import React, { createContext, useState, useContext } from 'react';

const AuthContexto = createContext();

export const useAuth = () => {
  return useContext(AuthContexto);
}; //useAuth es el "acceso rápido" al contexto

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem('usuario')) || null
  );

  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const valor = {
    usuario,
    login,
    logout
  };
  return (
    <AuthContexto.Provider value={valor}>
      {children}
    </AuthContexto.Provider>
  );
}