// En: src/servicios/productoServicio.js

import api from './api'; // ¡Importamos el axios centralizado!

// --- 1. SERVICIOS PÚBLICOS (Para la Tienda) ---

/**
 * (Público) Obtiene la lista de todos los productos
 * GET /api/productos
 */
export const getProductosServicio = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Público) Obtiene un solo producto por su ID
 * GET /api/productos/:id
 */
export const getProductoPorIdServicio = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Público) Obtiene la lista de todas las categorías
 * GET /api/categorias
 * (¡Lo necesitaremos para el formulario de productos!)
 */
export const getCategoriasServicio = async () => {
  try {
    const response = await api.get('/categorias');
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error.response?.data || error.message);
    throw error;
  }
};


// --- 2. SERVICIOS DE ADMIN (Para el Panel) ---

/**
 * (Admin) Crea un nuevo producto
 * POST /api/admin/productos
 */
export const crearProductoServicio = async (datosProducto) => {
  try {
    // El backend espera 'datosProducto' con el formato de la entidad Producto.java
    // (Ej: { nombre: "...", categoria: { id: 1 } })
    const response = await api.post('/admin/productos', datosProducto);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Admin) Actualiza un producto existente
 * PUT /api/admin/productos/:id
 */
export const updateProductoServicio = async (id, datosProducto) => {
  try {
    const response = await api.put(`/admin/productos/${id}`, datosProducto);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * (Admin) Borra un producto
 * DELETE /api/admin/productos/:id
 */
export const deleteProductoServicio = async (id) => {
  try {
    const response = await api.delete(`/admin/productos/${id}`);
    return response.data; // (Esto devolverá un 204 No Content, pero está bien)
  } catch (error) {
    console.error(`Error al borrar producto ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// (NOTA: Los servicios de 'desactivar' y 'stock' los podemos añadir aquí si los necesitas)