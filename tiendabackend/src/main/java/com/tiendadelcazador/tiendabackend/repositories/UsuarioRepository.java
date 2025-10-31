package com.tiendadelcazador.tiendabackend.repositories;

import java.util.Optional; 
import org.springframework.data.repository.CrudRepository;
import com.tiendadelcazador.tiendabackend.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long>{

    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByRut(String rut);
}