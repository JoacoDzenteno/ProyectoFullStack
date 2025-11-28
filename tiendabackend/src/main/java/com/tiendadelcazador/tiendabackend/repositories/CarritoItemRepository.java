package com.tiendadelcazador.tiendabackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiendadelcazador.tiendabackend.entities.CarritoItem;

public interface CarritoItemRepository extends JpaRepository<CarritoItem, Long> {
    List<CarritoItem> findByUsuarioId(Long usuarioId);
    void deleteByUsuarioId(Long usuarioId);
}