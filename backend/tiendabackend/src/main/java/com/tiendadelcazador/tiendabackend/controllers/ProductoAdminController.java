package com.tiendadelcazador.tiendabackend.controllers;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.services.ProductoService;

import java.nio.file.Paths;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/productos") 


public class ProductoAdminController {

    @Autowired
    private ProductoService productoService; 

    @Value("${app.upload.dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.createProducto(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.updateProducto(id, producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Producto> deactiveProducto(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.desactiveProducto(id));
    }

    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductosAdmin() {
    return ResponseEntity.ok(productoService.getAllProductos());
    }

    @PostMapping("/{id}/imagen")
    public ResponseEntity<?> subirImagen(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {

        try {
            Producto producto = productoService.getProductoById(id);
            if (producto == null) {
                return ResponseEntity.notFound().build();
            }

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Archivo vacío");
            }

            String originalName = file.getOriginalFilename();
            if (originalName == null || !originalName.contains(".")) {
                return ResponseEntity.badRequest().body("Nombre de archivo inválido");
            }

            String extension = originalName.substring(originalName.lastIndexOf("."));
            String nombreNuevo = "prod_" + id + "_" + UUID.randomUUID() + extension;

            Path uploadPath = Paths.get(uploadDir).toAbsolutePath() ;
            Files.createDirectories(uploadPath);

            Files.copy(
                file.getInputStream(),
                uploadPath.resolve(nombreNuevo),
                StandardCopyOption.REPLACE_EXISTING
            );

            producto.getImagenes().add(nombreNuevo);
            if (producto.getImagen() == null || producto.getImagen().isEmpty()) {
                producto.setImagen(nombreNuevo);
            }
            productoService.updateProducto(id, producto);


            return ResponseEntity.ok(Map.of(
                "imagen", nombreNuevo,
                "url", "/images/" + nombreNuevo
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al subir imagen: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}/imagen")
    public ResponseEntity<?> eliminarImagen(
            @PathVariable Long id,
            @RequestParam("nombre") String nombreImagen) {

        try {
            Producto producto = productoService.getProductoById(id);
            if (producto == null) {
                return ResponseEntity.notFound().build();
            }

            if (producto.getImagenes() != null) {
                producto.getImagenes().removeIf(img -> img.equals(nombreImagen));
            }

            if (nombreImagen.equals(producto.getImagen())) {
                String nuevaPrincipal = null;
                if (producto.getImagenes() != null && !producto.getImagenes().isEmpty()) {
                    nuevaPrincipal = producto.getImagenes().get(0);
                }
                producto.setImagen(nuevaPrincipal);
            }

            Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
            Files.deleteIfExists(uploadPath.resolve(nombreImagen));

            productoService.updateProducto(id, producto);

            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("Error al eliminar la imagen: " + e.getMessage());
        }
    }

}