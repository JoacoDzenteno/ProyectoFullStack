// En: rutas/RutaProtegida.jsx (CORREGIDO)
import React from 'react';
import { useAuth } from '../contexto/AuthContexto.jsx';
import { Navigate, Outlet } from 'react-router-dom';

const ROLES_ADMIN = ['ADMIN']; // <-- ¡ARREGLO DE MAYÚSCULAS!

export function RutaProtegida() {
  const { usuario } = useAuth();

  if (!usuario) {
    console.log("Acceso denegado: No hay sesión. Redirigiendo a /login.");
    return <Navigate to="/login" replace />; 
  }

  if (!ROLES_ADMIN.includes(usuario.rol)) {
    console.log(`Acceso denegado: Rol (${usuario.rol}) no autorizado. Redirigiendo a /`);
    // Arreglo menor: Si no eres admin, te manda al inicio, no de vuelta al login.
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
