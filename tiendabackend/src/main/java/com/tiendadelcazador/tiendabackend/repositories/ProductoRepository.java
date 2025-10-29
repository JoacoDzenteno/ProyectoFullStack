package com.tiendadelcazador.tiendabackend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.tiendadelcazador.tiendabackend.entities.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Long>{

}
