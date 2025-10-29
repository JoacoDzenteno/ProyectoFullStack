// En: src/contexto/AuthContexto.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el Contexto (la "caja" vacía)
const AuthContexto = createContext();

// 2. Creamos un Hook personalizado para usar el contexto fácilmente
//    (Para no tener que escribir 'useContext(AuthContexto)' en cada archivo)
export const useAuth = () => {
  return useContext(AuthContexto);
};

// 3. Creamos el "Proveedor" del contexto
//    (Este componente envolverá a toda nuestra aplicación)
export function AuthProvider({ children }) {
  
  // Aquí guardaremos la información del usuario logueado
  // Lo inicializamos leyendo del 'localStorage' (la memoria del navegador)
  // por si el usuario ya había iniciado sesión antes y recargó la página.
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem('usuario')) || null
  );

  // --- FUNCIÓN PARA INICIAR SESIÓN ---
  // Esta es la función que llamaremos desde el formulario de Login.
  // Recibirá los datos que nos devuelva el BACKEND.
  const login = (datosUsuario) => {
    // 1. Guardamos los datos en el estado de React
    setUsuario(datosUsuario);
    // 2. Guardamos los datos en el localStorage (para que no se borre al recargar)
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  // --- FUNCIÓN PARA CERRAR SESIÓN ---
  const logout = () => {
    // 1. Borramos el usuario del estado
    setUsuario(null);
    // 2. Borramos el usuario del localStorage
    localStorage.removeItem('usuario');
  };

  // 4. Creamos el "valor" que compartiremos con toda la app
  //    Cualquier componente podrá acceder al 'usuario', o a las funciones 'login' y 'logout'
  const valor = {
    usuario,
    login,
    logout
  };

  // 5. Retornamos el proveedor, que "envuelve" al resto de la app
  return (
    <AuthContexto.Provider value={valor}>
      {children}
    </AuthContexto.Provider>
  );
}