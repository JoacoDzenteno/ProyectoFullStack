// En: controllers/ProductoRestController.java
package com.tiendadelcazador.tiendabackend.controllers;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// ¡Ruta PÚBLICA! (Coincide con SecurityConfig)
@RequestMapping("/api/productos")
// ¡CORS CORREGIDO! (Permite las cookies de sesión)
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductoRestController {

    @Autowired
    private ProductoService productoService; 

    // Endpoint para la tienda pública (Productos.jsx)
    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        // (Aquí podríamos filtrar por estado=true)
        return ResponseEntity.ok(productoService.getAllProductos());
    }

    // Endpoint para la vista de detalle (ProductoEspecifico.jsx)
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.getProductoById(id));
    }
    
    // Endpoint para el detalle (verificar stock antes de añadir al carro)
    @GetMapping("/{id}/stock")
    public ResponseEntity<Integer> getStockById(@PathVariable Long id) {
        Integer stock = productoService.getStockById(id);
        return ResponseEntity.ok(stock);
    }
}