package com.tiendadelcazador.tiendabackend.services;

import java.util.List;

import com.tiendadelcazador.tiendabackend.entities.Usuario;

public interface UsuarioService {
    
    Usuario createUsuario(Usuario usuario);
    Usuario getUsuarioById(Long id);
    List<Usuario> getAllUsuarios();
    void deleteUsuario(Long id);
    Usuario updateUsuario(Long id, Usuario usuario);
    Usuario deactiveUsuario(Long id);
}
