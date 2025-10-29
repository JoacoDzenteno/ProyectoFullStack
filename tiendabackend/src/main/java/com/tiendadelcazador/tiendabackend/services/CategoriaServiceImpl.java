package com.tiendadelcazador.tiendabackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiendadelcazador.tiendabackend.entities.Categoria;
import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.repositories.CategoriaRepository;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    public Categoria createCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public Categoria getCategoriaById(Long id) {
        return categoriaRepository.findById(id).
            orElseThrow(() -> new RuntimeException("Categoria no encontrada con el id: " + id));
    }

    @Override
    public List<Categoria> getAllCategorias() {
        return (List<Categoria>) categoriaRepository.findAll();
    }

    @Override
    public void deleteCategoria(Long id) {
        if(!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoria no encontrada con el id: " + id);
        }
        categoriaRepository.deleteById(id);
    }

    @Override
    public Categoria updateCategoria(Long id, Categoria categoria) {
        Categoria existingCategoria = getCategoriaById(id);
        existingCategoria.setNombre(categoria.getNombre());
        return categoriaRepository.save(existingCategoria);
    }

    @Override
    public List<Producto> getProductosByCategoriaId(Long id) {
        Categoria categoria = getCategoriaById(id);
        return categoria.getProductos();
    }
}
