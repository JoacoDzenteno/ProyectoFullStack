package com.tiendadelcazador.tiendabackend.repositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tiendadelcazador.tiendabackend.entities.Boleta;

public interface BoletaRepository extends JpaRepository<Boleta, Long> {

    @Query("select coalesce(max(b.numero), 0) from Boleta b")
    Long findMaxNumero();

    List<Boleta> findByUsuarioId(Long usuarioId);

    Optional<Boleta> findByPedidoId(Long pedidoId);
}