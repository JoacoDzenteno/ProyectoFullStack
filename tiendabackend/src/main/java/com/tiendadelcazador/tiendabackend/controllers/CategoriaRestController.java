package com.tiendadelcazador.tiendabackend.controllers;

import com.tiendadelcazador.tiendabackend.entities.Categoria;
import com.tiendadelcazador.tiendabackend.entities.Producto; 
import com.tiendadelcazador.tiendabackend.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; 
import java.util.List;

@RestController
@RequestMapping("/api/categorias") 
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CategoriaRestController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> getAllCategorias() {
        return ResponseEntity.ok(categoriaService.getAllCategorias());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.getCategoriaById(id));
    }
    
     @GetMapping("/{id}/productos")
    public ResponseEntity<List<Producto>> getProductosPorCategoria(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.getProductosByCategoriaId(id));
    }

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