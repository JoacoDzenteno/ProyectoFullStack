import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    usuario: JSON.parse(localStorage.getItem('usuario') || 'null'),
  });

  const [cargando, setCargando] = useState(false);


  const login = (datos) => {
    setAuth({
      token: datos.token,
      refreshToken: datos.refreshToken,
      usuario: datos.usuario,
    });

    if (datos.token) localStorage.setItem('token', datos.token);
    if (datos.refreshToken)
      localStorage.setItem('refreshToken', datos.refreshToken);
    if (datos.usuario)
      localStorage.setItem('usuario', JSON.stringify(datos.usuario));
  };

  const logout = () => {
    setAuth({ token: null, refreshToken: null, usuario: null });
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}