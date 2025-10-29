package com.tiendadelcazador.tiendabackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.services.ProductoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/productos")
public class ProductoRestController {

    @Autowired
    private ProductoService productoService;

    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        Producto newProducto = productoService.createProducto(producto);
        return ResponseEntity.ok(newProducto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Producto producto = productoService.getProductoById(id);
        return ResponseEntity.ok(producto);
    }
    
    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        List<Producto> productos = productoService.getAllProductos();
        return ResponseEntity.ok(productos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto productoUpdated) {
        Producto producto = productoService.updateProducto(id, productoUpdated);
        return ResponseEntity.ok(producto);
    }

    @GetMapping("/{id}/stock")
    public ResponseEntity<Integer> getStockById(@PathVariable Long id) {
        Integer stock = productoService.getStockById(id);
        return ResponseEntity.ok(stock);
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Producto> deactiveProducto(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.deactiveProducto(id));
    }
    
}
