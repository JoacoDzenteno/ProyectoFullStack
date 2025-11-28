import api from './api';

export const getPedidosAdminServicio = async () => {
  try {
    const response = await api.get('/admin/pedidos');
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener pedidos del admin:',
      error.response?.data || error.message
    );
    throw error;
  }
};