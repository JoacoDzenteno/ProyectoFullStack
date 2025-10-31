// En: controllers/CategoriaRestController.java
package com.tiendadelcazador.tiendabackend.controllers;

import com.tiendadelcazador.tiendabackend.entities.Categoria;
import com.tiendadelcazador.tiendabackend.entities.Producto; // <-- Importa Producto
import com.tiendadelcazador.tiendabackend.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // <-- Cambia a *

import java.util.List;

@RestController
@RequestMapping("/api/categorias") 
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CategoriaRestController {

    @Autowired
    private CategoriaService categoriaService;

    // --- ENDPOINTS PÚBLICOS (Para la tienda) ---

    @GetMapping
    public ResponseEntity<List<Categoria>> getAllCategorias() {
        return ResponseEntity.ok(categoriaService.getAllCategorias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.getCategoriaById(id));
    }
    
    // Endpoint de filtro: "Dame los productos de esta categoría"
    @GetMapping("/{id}/productos")
    public ResponseEntity<List<Producto>> getProductosPorCategoria(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.getProductosByCategoriaId(id));
    }

    // --- ENDPOINTS DE ADMIN (Protegidos por SecurityConfig) ---
    // (Debemos moverlos a /api/admin/categorias)

    // ¡¡¡NOTA!!!
    // Por ahora los dejamos aquí, pero para que la seguridad funcione,
    // deberíamos crear un "CategoriaAdminController.java"
    // con la ruta "/api/admin/categorias" para estos 3:
    
    @PostMapping
    public ResponseEntity<Categoria> createCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.createCategoria(categoria));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, @RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.updateCategoria(id, categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        categoriaService.deleteCategoria(id);
        return ResponseEntity.noContent().build();
    }
}