package com.tiendadelcazador.tiendabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tiendadelcazador.tiendabackend.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
    boolean existsByEmail(String email);
}
