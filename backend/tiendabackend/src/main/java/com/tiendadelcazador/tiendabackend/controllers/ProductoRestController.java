package com.tiendadelcazador.tiendabackend.controllers;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoRestController {

    @Autowired
    private ProductoService productoService; 

    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        return ResponseEntity.ok(productoService.getAllProductos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.getProductoById(id));
    }
    
    @GetMapping("/{id}/stock")
    public ResponseEntity<Integer> getStockById(@PathVariable Long id) {
        Integer stock = productoService.getStockById(id);
        return ResponseEntity.ok(stock);
    }

    
}