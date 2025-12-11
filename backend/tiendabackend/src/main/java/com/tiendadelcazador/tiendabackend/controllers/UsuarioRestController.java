package com.tiendadelcazador.tiendabackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.services.UsuarioService;

@RestController
@RequestMapping("/api/admin/usuarios")
public class UsuarioRestController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        Usuario newUsuario = usuarioService.createUsuario(usuario);
        newUsuario.setPassword(null);
        return ResponseEntity.ok(newUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = usuarioService.getUsuarioById(id);
        usuario.setPassword(null);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        usuarios.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(usuarios);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioUpdated) {
        Usuario usuario = usuarioService.updateUsuario(id, usuarioUpdated);
        usuario.setPassword(null);
        return ResponseEntity.ok(usuario);
    }

    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Usuario> deactiveUsuario(@PathVariable Long id) {
        Usuario u = usuarioService.deactiveUsuario(id);
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }
}
