// En: controllers/auth/AuthController.java
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

import com.tiendadelcazador.tiendabackend.controllers.auth.LoginRequest; // (Asegúrate de importar tus DTOs)
import com.tiendadelcazador.tiendabackend.controllers.auth.RegistroRequest; // (Asegúrate de importar tus DTOs)
import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.services.auth.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")

@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // --- ¡CORREGIDO! ---
    // El método 'login' SÓLO recibe el 'LoginRequest'
    @PostMapping(value = "/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginRequest request) {
        // Llama al servicio, que es el que SÍ hace la autenticación
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "/registro")
    public ResponseEntity<Usuario> registro(@RequestBody RegistroRequest request) {
        return ResponseEntity.ok(authService.registro(request));
    }
    
    @GetMapping(value = "/perfil")
    public ResponseEntity<Usuario> getPerfil(Authentication authentication) { // <-- ¡Aquí SÍ va!
        
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(401).build(); 
        }
        
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return ResponseEntity.ok(usuario);
    }
}