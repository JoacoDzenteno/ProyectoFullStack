import React from 'react';
import { useAuth } from '../contexto/AuthContexto.jsx';
import { Navigate, Outlet } from 'react-router-dom';

const ROLES_ADMIN = ['ADMIN'];

export function RutaProtegida() {
  const { usuario, token } = useAuth();

  if (!token || !usuario) {
    console.log("Acceso denegado: No hay sesión o token. Redirigiendo a /login.");
    return <Navigate to="/login" replace />;
  }

  const rolNormalizado = (usuario.rol || '').trim().toUpperCase();
  if (!ROLES_ADMIN.includes(rolNormalizado)) {
    console.log(`Acceso denegado: Rol (${usuario.rol}) no autorizado. Redirigiendo a /`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
