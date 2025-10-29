package com.tiendadelcazador.tiendabackend.services;

import java.util.List;

import com.tiendadelcazador.tiendabackend.entities.Producto;

public interface ProductoService {

    Producto createProducto(Producto producto);
    Producto getProductoById(Long id);
    List<Producto> getAllProductos();
    void deleteProducto(Long id);
    Producto updateProducto(Long id, Producto producto);
    Integer getStockById(Long id);
    Producto desactiveProducto(Long id);
    
}
