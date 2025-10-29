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
import { Carrito } from '../vistas/Carrito.jsx';


export function AppRutas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USUARIO */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoEspecifico />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />

        {/* ADMIN */}
        <Route element={<RutaProtegida />}>
          <Route path="/admin/panel" element={<PanelAdmin />} />
          <Route path="/admin/usuarios" element={<ListaUsuarios />} />
          <Route path="/admin/usuarios/crear" element={<FormularioUsuario />} />
          <Route path="/admin/usuarios/editar/:id" element={<FormularioUsuario />} />
          <Route path="/admin/productos" element={<ListaProductos />} />
          <Route path="/admin/productos/crear" element={<FormularioProducto />} />
          <Route path="/admin/productos/editar/:id" element={<FormularioProducto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}