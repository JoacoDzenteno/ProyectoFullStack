import api from "./api";

export const getCarritoServicio = async () => {
  try {
    const resp = await api.get("/carrito");
    return resp.data;
  } catch (error) {
    console.error("Error al obtener carrito:", error.response?.data || error.message);
    throw error;
  }
};

export const agregarAlCarritoServicio = async (productoId, cantidad = 1) => {
  try {
    const resp = await api.post("/carrito", { productoId, cantidad });
    return resp.data;
  } catch (error) {
    console.error("Error al agregar al carrito:", error.response?.data || error.message);
    throw error;
  }
};

export const actualizarCantidadCarritoServicio = async (itemId, cantidad) => {
  try {
    const resp = await api.put(`/carrito/${itemId}`, { cantidad });
    return resp.data;
  } catch (error) {
    console.error("Error al actualizar cantidad en carrito:", error.response?.data || error.message);
    throw error;
  }
};

export const eliminarItemCarritoServicio = async (itemId) => {
  try {
    const resp = await api.delete(`/carrito/${itemId}`);
    return resp.data;
  } catch (error) {
    console.error("Error al eliminar item del carrito:", error.response?.data || error.message);
    throw error;
  }
};

export const confirmarPedidoServicio = async () => {
  try {
    const resp = await api.post("/pedidos/confirmar");
    return resp.data;
  } catch (error) {
    console.error("Error al confirmar pedido:", error.response?.data || error.message);
    throw error;
  }
};

export const getPedidosServicio = async () => {
  try {
    const resp = await api.get("/pedidos");
    return resp.data;
  } catch (error) {
    console.error("Error al obtener pedidos:", error.response?.data || error.message);
    throw error;
  }
};

export const vaciarCarritoServicio = async () => {
  try {
    const resp = await api.delete("/carrito/vaciar");
    return resp.data;
  } catch (error) {
    console.error(
      "Error al vaciar carrito en servidor:",
      error.response?.data || error.message
    );
    throw error;
  }
};