package com.tiendadelcazador.tiendabackend.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.tiendadelcazador.tiendabackend.entities.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Long>{
    List<Producto> findByCategoriaId(Long categoriaId);
}
