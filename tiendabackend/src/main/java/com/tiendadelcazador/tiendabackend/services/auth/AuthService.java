// En: services/auth/AuthService.java
package com.tiendadelcazador.tiendabackend.services.auth;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final AuthenticationManager authenticationManager;

    /**
     * Autentica al usuario y crea la sesión (Cookie)
     */
    public Usuario login(LoginRequest request) {
        // 1. Autentica con Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // 2. Si es exitoso, establece la sesión
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Devuelve el usuario autenticado (extraído del objeto Authentication)
        return (Usuario) authentication.getPrincipal();
    }

    /**
     * Registra un nuevo usuario
     */
    public Usuario registro(RegistroRequest request) {
        
        // (Opcional: Validar si el email o rut ya existen)

        // 1. Crea el objeto Usuario
        Usuario usuario = Usuario.builder()
                .rut(request.getRut())
                .nombre(request.getNombre())
                .apellidos(request.getApellidos())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // ¡Codifica la pass!
                .direccion(request.getDireccion())
                .region(request.getRegion())
                .comuna(request.getComuna())
                .rol("USER") // Rol por defecto
                .estado(true) // Estado por defecto
                .fechaCreacion(new SimpleDateFormat("yyyy-MM-dd").format(new Date()))
                .build();

        // 2. Guarda en la BD
        return usuarioRepository.save(usuario);
    }
}