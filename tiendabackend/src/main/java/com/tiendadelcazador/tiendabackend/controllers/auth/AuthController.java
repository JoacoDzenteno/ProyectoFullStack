package com.tiendadelcazador.tiendabackend.controllers.auth;

import java.util.Collection;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;               
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.services.auth.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginRequest request, HttpServletRequest httpReq) {
        Usuario usuario = authService.login(request);
        if (usuario == null) return ResponseEntity.status(401).build();

        Collection<? extends GrantedAuthority> authorities = usuario.getAuthorities();

        var authToken = new UsernamePasswordAuthenticationToken(usuario, null, authorities);

        SecurityContext ctx = SecurityContextHolder.createEmptyContext();
        ctx.setAuthentication(authToken);
        SecurityContextHolder.setContext(ctx);
        httpReq.getSession(true).setAttribute("SPRING_SECURITY_CONTEXT", ctx);

        usuario.setPassword(null); 
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/registro")
    public ResponseEntity<Usuario> registro(@RequestBody RegistroRequest request) {
        Usuario nuevo = authService.registro(request);
        if (nuevo != null) nuevo.setPassword(null);
        return ResponseEntity.ok(nuevo);
    }

    @GetMapping("/perfil")
    public ResponseEntity<Usuario> getPerfil(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) return ResponseEntity.status(401).build();
        Usuario u = (Usuario) auth.getPrincipal();
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest req) {
        var session = req.getSession(false);
        if (session != null) session.invalidate();
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }
}
