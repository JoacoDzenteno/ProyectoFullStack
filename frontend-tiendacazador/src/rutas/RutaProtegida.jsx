import React from 'react';
import { useAuth } from '../contexto/AuthContexto.jsx';
import { Navigate, Outlet } from 'react-router-dom';

const ROLES_ADMIN = ['super-admin'];

export function RutaProtegida() {
  const { usuario } = useAuth();

  if (!usuario) {
    console.log("Acceso denegado: No hay sesión. Redirigiendo a /login.");
    return <Navigate to="/login" replace />; 
  }

  if (!ROLES_ADMIN.includes(usuario.rol)) {
    console.log(`Acceso denegado: Rol (${usuario.rol}) no autorizado. Redirigiendo a home.`);
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}