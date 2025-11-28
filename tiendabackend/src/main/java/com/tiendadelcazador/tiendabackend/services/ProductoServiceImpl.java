package com.tiendadelcazador.tiendabackend.services;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Date; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public Producto createProducto(Producto producto) {
        producto.setEstado(true);
        producto.setFechaCreacion(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
        return productoRepository.save(producto);
    }

    @Override
    public Producto getProductoById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con el id: " + id));
    }

    @Override
    public List<Producto> getAllProductos() {
        return (List<Producto>) productoRepository.findAll();
    }

    @Override
    public void deleteProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado con el id: " + id);
        }
        productoRepository.deleteById(id);
    }

    @Override
    public Producto updateProducto(Long id, Producto producto) {
        Producto existing = getProductoById(id);

        existing.setNombre(producto.getNombre());
        existing.setDescripcion(producto.getDescripcion());
        existing.setPrecio(producto.getPrecio());
        existing.setStock(producto.getStock());
        existing.setCategoria(producto.getCategoria());


        if (producto.getImagen() != null) {
            existing.setImagen(producto.getImagen());
        }

        if (producto.getImagenes() != null && !producto.getImagenes().isEmpty()) {
            existing.setImagenes(producto.getImagenes());
        }

        return productoRepository.save(existing);
    }

    @Override
    public Integer getStockById(Long id) {
        Producto producto = getProductoById(id);
        return producto.getStock();
    }

    @Override
    public Producto desactiveProducto(Long id){
        Producto producto = getProductoById(id);
        producto.setEstado(false);
        return productoRepository.save(producto);
    }
}
