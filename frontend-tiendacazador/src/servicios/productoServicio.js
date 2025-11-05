import api from './api'; 


export const getProductosServicio = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error.response?.data || error.message);
    throw error;
  }
};

export const getProductoPorIdServicio = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const getCategoriasServicio = async () => {
  try {
    const response = await api.get('/categorias');
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error.response?.data || error.message);
    throw error;
  }
};


export const crearProductoServicio = async (datosProducto) => {
  try {
    const response = await api.post('/admin/productos', datosProducto);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProductoServicio = async (id, datosProducto) => {
  try {
    const response = await api.put(`/admin/productos/${id}`, datosProducto);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteProductoServicio = async (id) => {
  try {
    const response = await api.delete(`/admin/productos/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error al borrar producto ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const getEstadisticasServicio = async () => {
  try {
    const response = await api.get('/admin/estadisticas');
    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas:", error.response?.data || error.message);
    throw error;
  }
};