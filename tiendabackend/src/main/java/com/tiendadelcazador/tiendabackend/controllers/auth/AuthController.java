package com.tiendadelcazador.tiendabackend.controllers.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.services.auth.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // ¡Importante el allowCredentials!
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginRequest request) {
        // Devuelve el usuario (Spring se encarga de la cookie de sesión)
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "/registro")
    public ResponseEntity<Usuario> registro(@RequestBody RegistroRequest request) {
        // Devuelve el nuevo usuario registrado
        return ResponseEntity.ok(authService.registro(request));
    }

    // --- ¡ENDPOINT ADICIONAL IMPORTANTE! ---
    // El frontend llamará a esto cada vez que se recargue la página
    // para saber si ya hay una sesión activa (cookie).
    
    @GetMapping(value = "/perfil")
    public ResponseEntity<Usuario> getPerfil() {
        // Spring Security (gracias a la cookie) ya sabe quién eres.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            // Si no hay sesión, devuelve un error 401 (No autorizado)
            return ResponseEntity.status(401).build(); 
        }
        
        // Si hay sesión, devuelve los datos del usuario
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(usuario);
    }

    // El endpoint de logout lo maneja automáticamente Spring Security
    // en "/api/auth/logout" (como lo configuramos en SecurityConfig)
}