package com.tiendadelcazador.tiendabackend.controllers.auth;


import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.UsuarioRepository;
import com.tiendadelcazador.tiendabackend.services.auth.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // ============================
    //           LOGIN
    // ============================
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // ============================
    //          REFRESH
    // ============================
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        AuthResponse response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    // ============================
    //          REGISTRO
    // ============================
    @PostMapping("/registro")
    public ResponseEntity<Usuario> registro(@RequestBody RegistroRequest request) {
        Usuario nuevo = authService.registro(request);
        if (nuevo != null) nuevo.setPassword(null);
        return ResponseEntity.ok(nuevo);
    }

    // ============================
    //       OBTENER PERFIL
    // ============================
    @GetMapping("/perfil")
    public ResponseEntity<Usuario> getPerfil(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        Usuario u = (Usuario) auth.getPrincipal();
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    // ============================
    //       ACTUALIZAR PERFIL
    // ============================
    @PutMapping("/perfil")
    public ResponseEntity<Usuario> actualizarPerfil(
            Authentication auth,
            @RequestBody PerfilRequest body) {

        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        // Usuario logueado actual
        Usuario u = (Usuario) auth.getPrincipal();

        // Campos editables del perfil
        if (body.getNombre() != null) {
            u.setNombre(body.getNombre().trim());
        }
        if (body.getApellidos() != null) {
            u.setApellidos(body.getApellidos().trim());
        }
        if (body.getDireccion() != null) {
            u.setDireccion(body.getDireccion().trim());
        }
        if (body.getRegion() != null) {
            u.setRegion(body.getRegion().trim());
        }
        if (body.getComuna() != null) {
            u.setComuna(body.getComuna().trim());
        }

        // Cambio de contraseña (opcional)
        if (body.getPasswordNueva() != null && !body.getPasswordNueva().isBlank()) {
            // Si quisieras validar la actual:
            // if (body.getPasswordActual() == null ||
            //     !passwordEncoder.matches(body.getPasswordActual(), u.getPassword())) {
            //     return ResponseEntity.status(400).body(null);
            // }

            u.setPassword(passwordEncoder.encode(body.getPasswordNueva()));
        }

        // Guardar en base de datos
        Usuario guardado = usuarioRepository.save(u);
        guardado.setPassword(null); // nunca devolvemos el hash

        return ResponseEntity.ok(guardado);
    }

    // ============================
    //           LOGOUT
    // ============================
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // Con JWT: el cliente borra token/refreshToken del localStorage
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }
}