# Tienda del Cazador — Frontend (React + Vite)

Proyecto frontend de una tienda (React + Vite) para gestión de productos, usuarios y carrito. Incluye panel de administración con rutas protegidas y autenticación basada en cookies.

## Resumen
- Frontend en React + Vite.
- Comunicación con backend REST en `http://localhost:8080/api` a través de la instancia axios en [`src/servicios/api.js`](src/servicios/api.js).
- Soporta sesiones por cookie (`withCredentials = true`).
- Rutas públicas y panel admin protegido por roles.

## Estructura principal
- Rutas y entry:
  - [`src/main.jsx`](src/main.jsx) — punto de entrada.
  - [`src/App.jsx`](src/App.jsx) — componente raíz.
  - [`src/rutas/AppRutas.jsx`](src/rutas/AppRutas.jsx) — definición de rutas.
  - [`src/rutas/RutaProtegida.jsx`](src/rutas/RutaProtegida.jsx) — wrapper para rutas admin.
- Contextos:
  - Autenticación: [`AuthProvider`, `useAuth`](src/contexto/AuthContexto.jsx).
  - Carrito: [`CarritoProvider`, `useCarrito`](src/contexto/CarritoContexto.jsx).
- Servicios (API):
  - Auth: [`src/servicios/authServicio.js`](src/servicios/authServicio.js) (login, registro, verificar perfil, logout).
  - Productos: [`src/servicios/productoServicio.js`](src/servicios/productoServicio.js).
  - Usuarios (admin): [`src/servicios/usuarioServicio.js`](src/servicios/usuarioServicio.js).
  - Axios central: [`src/servicios/api.js`](src/servicios/api.js).
- Componentes y vistas:
  - Layout admin: [`src/componentes/estructura/LayoutAdmin/LayoutAdmin.jsx`](src/componentes/estructura/LayoutAdmin/LayoutAdmin.jsx).
  - Barra de navegación: [`src/componentes/estructura/BarraNavegacion/BarraNavegacion.jsx`](src/componentes/estructura/BarraNavegacion/BarraNavegacion.jsx).
  - Vistas públicas: [`src/vistas/Inicio.jsx`](src/vistas/Inicio.jsx), [`src/vistas/Productos.jsx`](src/vistas/Productos.jsx), [`src/vistas/ProductoEspecifico.jsx`](src/vistas/ProductoEspecifico.jsx), [`src/vistas/InicioSesion.jsx`](src/vistas/InicioSesion.jsx), [`src/vistas/Registro.jsx`](src/vistas/Registro.jsx), [`src/vistas/Carrito.jsx`](src/vistas/Carrito.jsx).
  - Vistas admin: panel, gestión de productos y usuarios (carpetas en `src/vistas/admin/...`).

## Requisitos
- Node.js >= 18 recomendado.
- Backend corriendo en `http://localhost:8080` con las rutas esperadas:
  - /api/auth/login, /api/auth/registro, /api/auth/perfil, /api/auth/logout
  - /api/productos, /api/productos/:id, /api/categorias
  - /api/admin/productos, /api/admin/usuarios, etc.

## Instalación y ejecución
1. Instalar dependencias:
```sh
npm install
```
2. Ejecutar en modo desarrollo:
```sh
npm run dev
```
3. Crear build de producción:
```sh
npm run build
```
4. Previsualizar build:
```sh
npm run preview
```
5. Ejecutar linter:
```sh
npm run lint
```

## Variables y configuración
- URL del backend hardcoded en [`src/servicios/api.js`](src/servicios/api.js) como `http://localhost:8080/api`. Ajustar si es necesario.
- La instancia axios usa `withCredentials: true` para enviar cookies de sesión.

## Flujo de autenticación
- Al cargar la app, [`AuthProvider`](src/contexto/AuthContexto.jsx) llama a [`verificarPerfil`](src/servicios/authServicio.js) para comprobar si hay sesión activa; hasta entonces la aplicación no renderiza los children.
- El login usa [`loginServicio`](src/servicios/authServicio.js) y el resultado se guarda con `login()` del contexto.
- El logout llama a [`logoutServicio`](src/servicios/authServicio.js) y limpia el estado.

## Protección de rutas (Admin)
- Las rutas bajo el wrapper [`RutaProtegida`](src/rutas/RutaProtegida.jsx) requieren usuario autenticado y rol en la lista `ROLES_ADMIN`.
- Archivo a revisar: [`src/rutas/RutaProtegida.jsx`](src/rutas/RutaProtegida.jsx).

Importante: se detectó una inconsistencia de valores de rol en el proyecto. Se sugiere alinear con el backend. El código actual de `RutaProtegida` ahora normaliza el rol a minúsculas y acepta `admin` y `super-admin`.

## Notas y recomendaciones
- Validar respuesta del backend y mostrar mensajes de error más amigables donde sea necesario.
- Considerar centralizar los textos de roles/constantes en un archivo para evitar inconsistencias.
- Añadir protección adicional en cliente y validar permisos del backend para acciones admin.
- Implementar manejo de token/cookie expirado con redirección automática a login si `verificarPerfil` falla.

## Archivos relevantes (rápido acceso)
- [package.json](package.json)
- [vite.config.js](vite.config.js)
- [eslint.config.js](eslint.config.js)
- [index.html](index.html)
- [src/main.jsx](src/main.jsx)
- [src/App.jsx](src/App.jsx)
- [src/rutas/AppRutas.jsx](src/rutas/AppRutas.jsx)
- [src/rutas/RutaProtegida.jsx](src/rutas/RutaProtegida.jsx)
- [src/contexto/AuthContexto.jsx](src/contexto/AuthContexto.jsx)
- [src/servicios/api.js](src/servicios/api.js)
- [src/servicios/authServicio.js](src/servicios/authServicio.js)
- [src/servicios/productoServicio.js](src/servicios/productoServicio.js)
- [src/servicios/usuarioServicio.js](src/servicios/usuarioServicio.js)
- [src/contexto/CarritoContexto.jsx](src/contexto/CarritoContexto.jsx)
- [src/componentes/estructura/LayoutAdmin/LayoutAdmin.jsx](src/componentes/estructura/LayoutAdmin/LayoutAdmin.jsx)
- [src/vistas/InicioSesion.jsx](src/vistas/InicioSesion.jsx)
- [src/vistas/Registro.jsx](src/vistas/Registro.jsx)
- [src/vistas/admin/productos/FormularioProducto.jsx](src/vistas/admin/productos/FormularioProducto.jsx)
- [src/vistas/admin/productos/ListaProductos.jsx](src/vistas/admin/productos/ListaProductos.jsx)
- [src/vistas/admin/usuarios/FormularioUsuario.jsx](src/vistas/admin/usuarios/FormularioUsuario.jsx)
- [src/vistas/admin/usuarios/ListaUsuarios.jsx](src/vistas/admin/usuarios/ListaUsuarios.jsx)
