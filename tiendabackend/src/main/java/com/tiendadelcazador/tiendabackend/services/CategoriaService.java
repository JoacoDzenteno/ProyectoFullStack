package com.tiendadelcazador.tiendabackend.services;

import java.util.List;

import com.tiendadelcazador.tiendabackend.entities.Categoria;
import com.tiendadelcazador.tiendabackend.entities.Producto;

public interface CategoriaService {

    Categoria createCategoria(Categoria categoria);
    Categoria getCategoriaById(Long id);
    List<Categoria> getAllCategorias();
    void deleteCategoria(Long id);
    Categoria updateCategoria(Long id, Categoria categoria);
    List<Producto> getProductosByCategoriaId(Long id);
    
}
