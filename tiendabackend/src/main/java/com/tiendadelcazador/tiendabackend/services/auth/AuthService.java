package com.tiendadelcazador.tiendabackend.services.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tiendadelcazador.tiendabackend.controllers.auth.LoginRequest;
import com.tiendadelcazador.tiendabackend.controllers.auth.RegistroRequest;
import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public Usuario login(LoginRequest request) {
        Usuario u = usuarioRepository.findByEmail(request.getEmail());
        if (u == null) return null;

        if (!passwordEncoder.matches(request.getPassword(), u.getPassword())) {
            return null;
        }
        return u;
    }

    public Usuario registro(RegistroRequest request) {
        Usuario u = new Usuario();
        u.setNombre(request.getNombre());
        u.setApellidos(request.getApellidos());
        u.setEmail(request.getEmail());
        u.setRut(request.getRut());
        u.setRol("USER");
        u.setEstado(true);
        u.setPassword(passwordEncoder.encode(request.getPassword()));
        return usuarioRepository.save(u);
    }
}
