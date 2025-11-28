package com.tiendadelcazador.tiendabackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiendadelcazador.tiendabackend.entities.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
}
