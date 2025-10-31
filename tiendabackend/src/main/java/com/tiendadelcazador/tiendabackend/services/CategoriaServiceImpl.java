// En: services/CategoriaServiceImpl.java
package com.tiendadelcazador.tiendabackend.services;

import com.tiendadelcazador.tiendabackend.entities.Categoria;
import com.tiendadelcazador.tiendabackend.entities.Producto; // <-- Importa Producto
import com.tiendadelcazador.tiendabackend.repositories.CategoriaRepository;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository; // <-- Importa ProductoRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;
    
    // Inyectamos el repo de productos para el filtro
    @Autowired
    private ProductoRepository productoRepository; 

    @Override
    public Categoria createCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria getCategoriaById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada: " + id));
    }

    @Override
    public List<Categoria> getAllCategorias() {
        return (List<Categoria>) categoriaRepository.findAll();
    }

    @Override
    public void deleteCategoria(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada: " + id);
        }
        // (Opcional: antes de borrar, deberíamos verificar que no haya productos 
        // usando esta categoría, pero por ahora la borramos directamente)
        categoriaRepository.deleteById(id);
    }

    @Override
    public Categoria updateCategoria(Long id, Categoria categoria) {
        Categoria c = getCategoriaById(id);
        c.setNombre(categoria.getNombre());
        // (Añade aquí otros campos si los tuviera, ej: c.setDescripcion(...))
        return categoriaRepository.save(c);
    }

    @Override
    public List<Producto> getProductosByCategoriaId(Long id) {
        // Usamos el método que acabamos de crear en el ProductoRepository
        return productoRepository.findByCategoriaId(id);
    }
}