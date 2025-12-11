import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContexto.jsx';
import {
  getCarritoServicio,
  agregarAlCarritoServicio,
  actualizarCantidadCarritoServicio,
  eliminarItemCarritoServicio,
  vaciarCarritoServicio
} from '../servicios/CarritoServicio.js';

const CarritoContexto = createContext();

export const useCarrito = () => {
  return useContext(CarritoContexto);
};

export function CarritoProvider({ children }) {
  const { usuario } = useAuth();

  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (usuario) {
      const cargarDesdeServidor = async () => {
        try {
          setCargando(true);
          setError(null);
          const itemsServidor = await getCarritoServicio();

          const normalizado = itemsServidor.map((item) => ({
            id: item.id,
            productoId: item.producto.id,
            nombre: item.producto.nombre,
            precio: item.producto.precio,
            imagen: item.producto.imagen
              ? `http://localhost:8080/images/${item.producto.imagen}`
              : '',
            cantidad: item.cantidad,
          }));

          setCarrito(normalizado);
        } catch (err) {
          console.error(err);
          setError('Error al cargar carrito desde servidor');
        } finally {
          setCargando(false);
        }
      };

      cargarDesdeServidor();
    } else {
      const local = JSON.parse(localStorage.getItem('carrito') || '[]');
      setCarrito(local);
    }
  }, [usuario]);

  useEffect(() => {
    if (!usuario) {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito, usuario]);

  // =========================
  //      AGREGAR AL CARRITO
  // =========================
  const agregarAlCarrito = async (producto, cantidad = 1) => {
    try {
      setError(null);

      if (!usuario) {
        const itemExistente = carrito.find((item) => item.id === producto.id);
        if (itemExistente) {
          setCarrito(
            carrito.map((item) =>
              item.id === producto.id
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
            )
          );
        } else {
          setCarrito([
            ...carrito,
            {
              id: producto.id,
              productoId: producto.id,
              nombre: producto.nombre,
              precio: producto.precio,
              imagen: producto.imagen,
              cantidad,
            },
          ]);
        }
      } else {
        await agregarAlCarritoServicio(producto.id, cantidad);
        const itemsServidor = await getCarritoServicio();
        const normalizado = itemsServidor.map((item) => ({
          id: item.id,
          productoId: item.producto.id,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          imagen: item.producto.imagen
            ? `http://localhost:8080/images/${item.producto.imagen}`
            : '',
          cantidad: item.cantidad,
        }));
        setCarrito(normalizado);
      }
    } catch (err) {
      console.error(err);
      setError('Error al agregar al carrito');
    }
  };

  // =========================
  //   ACTUALIZAR CANTIDAD
  // =========================
  const actualizarCantidad = async (idItemCarrito, nuevaCantidad) => {
    try {
      setError(null);

      if (!usuario) {
        if (nuevaCantidad <= 0) {
          setCarrito(carrito.filter((item) => item.id !== idItemCarrito));
        } else {
          setCarrito(
            carrito.map((item) =>
              item.id === idItemCarrito
                ? { ...item, cantidad: nuevaCantidad }
                : item
            )
          );
        }
      } else {
        await actualizarCantidadCarritoServicio(idItemCarrito, nuevaCantidad);
        const itemsServidor = await getCarritoServicio();
        const normalizado = itemsServidor.map((item) => ({
          id: item.id,
          productoId: item.producto.id,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          imagen: item.producto.imagen
            ? `http://localhost:8080/images/${item.producto.imagen}`
            : '',
          cantidad: item.cantidad,
        }));
        setCarrito(normalizado);
      }
    } catch (err) {
      console.error(err);
      setError('Error al actualizar cantidad');
    }
  };

  // =========================
  //    ELIMINAR DEL CARRITO
  // =========================
  const eliminarDelCarrito = async (idItemCarrito) => {
    try {
      setError(null);

      if (!usuario) {
        setCarrito(carrito.filter((item) => item.id !== idItemCarrito));
      } else {
        await eliminarItemCarritoServicio(idItemCarrito);
        const itemsServidor = await getCarritoServicio();
        const normalizado = itemsServidor.map((item) => ({
          id: item.id,
          productoId: item.producto.id,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          imagen: item.producto.imagen
            ? `http://localhost:8080/images/${item.producto.imagen}`
            : '',
          cantidad: item.cantidad,
        }));
        setCarrito(normalizado);
      }
    } catch (err) {
      console.error(err);
      setError('Error al eliminar item del carrito');
    }
  };

  // =========================
  //       VACIAR CARRITO
  // =========================
  const vaciarCarrito = async () => {
    try {
      setError(null);

      if (!usuario) {
        setCarrito([]);
      } else {
        await vaciarCarritoServicio();
        setCarrito([]);
      }
    } catch (err) {
      console.error(err);
      setError('Error al vaciar carrito');
    }
  };

  const valor = {
    carrito,
    cargando,
    error,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  };

  return (
    <CarritoContexto.Provider value={valor}>
      {children}
    </CarritoContexto.Provider>
  );
}