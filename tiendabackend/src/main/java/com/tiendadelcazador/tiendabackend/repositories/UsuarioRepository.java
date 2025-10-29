package com.tiendadelcazador.tiendabackend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.tiendadelcazador.tiendabackend.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long>{

}
