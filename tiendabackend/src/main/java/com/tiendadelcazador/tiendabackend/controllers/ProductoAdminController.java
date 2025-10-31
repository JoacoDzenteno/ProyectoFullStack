// En: controllers/ProductoAdminController.java
package com.tiendadelcazador.tiendabackend.controllers;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
// ¡Ruta de ADMIN! (Coincide con SecurityConfig)
@RequestMapping("/api/admin/productos") 
// ¡CORS CORREGIDO!
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProductoAdminController {

    @Autowired
    private ProductoService productoService; 

    // Endpoint para crear producto (FormularioProducto.jsx)
    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.createProducto(producto));
    }

    // Endpoint para actualizar producto (FormularioProducto.jsx)
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.updateProducto(id, producto));
    }

    // Endpoint para borrar producto (ListaProductos.jsx)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
    
    // Endpoint para desactivar producto (ListaProductos.jsx)
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Producto> deactiveProducto(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.desactiveProducto(id));
    }
}