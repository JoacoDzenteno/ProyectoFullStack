import React, { createContext, useState, useContext, useEffect } from 'react';

const CarritoContexto = createContext();

export const useCarrito = () => {
  return useContext(CarritoContexto);
};

export function CarritoProvider({ children }) {

  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem('carrito')) || []
  );

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const itemExistente = carrito.find((item) => item.id === producto.id);
    if (itemExistente) {
      setCarrito(
        carrito.map((item) =>item.id === producto.id? 
        { ...item, cantidad: item.cantidad + cantidad }:
         item)
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito(
      carrito.filter((item) => item.id !== idProducto)
    );
  };
  
  const vaciarCarrito = () => {
    setCarrito([]);
  };
  
  const valor = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito
  };
  return (
    <CarritoContexto.Provider value={valor}>
      {children}
    </CarritoContexto.Provider>
  );
}