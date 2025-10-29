// En: src/rutas/AppRutas.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes
import { Inicio } from '../vistas/Inicio.jsx';
import { PanelAdmin } from '../vistas/PanelAdmin.jsx';
import { InicioSesion } from '../vistas/InicioSesion.jsx';

// Admin Usuarios
import { ListaUsuarios } from '../vistas/admin/usuarios/ListaUsuarios.jsx';
import { FormularioUsuario } from '../vistas/admin/usuarios/FormularioUsuario.jsx';
// Admin Productos
import { ListaProductos } from '../vistas/admin/productos/ListaProductos.jsx';
import { FormularioProducto } from '../vistas/admin/productos/FormularioProducto.jsx';

// Seguridad
import { RutaProtegida } from './RutaProtegida.jsx';

//Vistas Publicas
import { Nosotros } from '../vistas/Nosotros.jsx';
import { Contacto } from '../vistas/Contacto.jsx';
import { Blogs } from '../vistas/Blogs.jsx';
import { Productos } from '../vistas/Productos.jsx';
import { ProductoEspecifico } from '../vistas/ProductoEspecifico.jsx';
import { Registro } from '../vistas/Registro.jsx';

// (Componente de relleno para páginas pendientes)
const PaginaEnConstruccion = ({ pagina }) => (
  <div style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '100vh', background: '#fff' }}>
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Página: "{pagina}"</h1>
    <p style={{ fontSize: '1.5rem', color: '#555' }}>Este componente aún está en construcción.</p>
    <a href="/">Volver al Inicio</a> | 
    <a href="/admin/panel" style={{ fontSize: '1.5rem' }}> Volver al Panel</a>
  </div>
);


export function AppRutas() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ======================================= */}
        {/* --- RUTAS PÚBLICAS --- */}
        {/* (Cualquiera puede verlas) */}
        {/* ======================================= */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoEspecifico />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/carrito" element={<PaginaEnConstruccion pagina="Carrito" />} />

        
        {/* ======================================= */}
        {/* --- RUTAS PROTEGIDAS (ADMIN) --- */}
        {/* (Solo usuarios con rol de admin pueden verlas) */}
        {/* ======================================= */}
        
        {/* 2. CREAMOS UNA RUTA "CONTENEDORA" QUE USA AL GUARDIA */}
        <Route element={<RutaProtegida />}>
          
          {/* Todas las rutas aquí adentro están protegidas */}
          <Route path="/admin/panel" element={<PanelAdmin />} />
          <Route path="/admin/usuarios" element={<ListaUsuarios />} />
          {/* --- 2. AÑADE LA NUEVA RUTA --- */}
          <Route path="/admin/usuarios/crear" element={<FormularioUsuario />} />
          <Route path="/admin/usuarios/editar/:id" element={<FormularioUsuario />} />

          <Route path="/admin/productos" element={<ListaProductos />} />
          <Route path="/admin/productos/crear" element={<FormularioProducto />} />
          <Route path="/admin/productos/editar/:id" element={<FormularioProducto />} />

        </Route>
        
        {/* Ruta por defecto (404) */}
        <Route path="*" element={<PaginaEnConstruccion pagina="404 - Página no encontrada" />} />

      </Routes>
    </BrowserRouter>
  );
}