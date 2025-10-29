// En: src/rutas/RutaProtegida.jsx

import React from 'react';
import { useAuth } from '../contexto/AuthContexto.jsx';
import { Navigate, Outlet } from 'react-router-dom';

// Definimos los roles que SÍ pueden entrar a la sección de admin
const ROLES_ADMIN = ['super-admin'];

export function RutaProtegida() {
  
  const { usuario } = useAuth(); // Leemos el usuario de nuestro contexto

  // --- 1. Verificación: ¿Hay sesión? ---
  if (!usuario) {
    console.log("Acceso denegado: No hay sesión. Redirigiendo a /login.");
    // Si no hay usuario, lo redirigimos al login
    return <Navigate to="/login" replace />; 
    // 'replace' evita que pueda volver con el botón "atrás"
  }

  // --- 2. Verificación: ¿Tiene el rol correcto? ---
  if (!ROLES_ADMIN.includes(usuario.rol)) {
    console.log(`Acceso denegado: Rol (${usuario.rol}) no autorizado. Redirigiendo a home.`);
    // Si tiene sesión pero no es admin (ej. es "cliente"),
    // lo redirigimos a la página de inicio pública.
    return <Navigate to="/login" replace />;
  }

  // --- 3. Acceso Permitido ---
  // Si pasó las dos verificaciones, le damos acceso.
  // 'Outlet' es un componente de React Router que dice:
  // "Renderiza aquí el componente hijo de esta ruta"
  // (es decir, PanelAdmin, ListaUsuarios, etc.)
  return <Outlet />;
}