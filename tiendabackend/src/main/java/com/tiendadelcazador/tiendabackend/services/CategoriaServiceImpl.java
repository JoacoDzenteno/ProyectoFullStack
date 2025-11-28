package com.tiendadelcazador.tiendabackend.services;

import com.tiendadelcazador.tiendabackend.entities.Categoria;
import com.tiendadelcazador.tiendabackend.entities.Producto; 
import com.tiendadelcazador.tiendabackend.repositories.CategoriaRepository;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;
    
  
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
        categoriaRepository.deleteById(id);
    }

    @Override
    public Categoria updateCategoria(Long id, Categoria categoria) {
        Categoria c = getCategoriaById(id);
        c.setNombre(categoria.getNombre());
        return categoriaRepository.save(c);
    }

    @Override
    public List<Producto> getProductosByCategoriaId(Long id) {
        return productoRepository.findByCategoriaId(id);
    }
}