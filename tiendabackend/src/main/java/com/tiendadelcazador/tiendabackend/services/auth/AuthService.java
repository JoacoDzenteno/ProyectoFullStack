package com.tiendadelcazador.tiendabackend.services.auth;

import java.time.LocalDate;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tiendadelcazador.tiendabackend.controllers.auth.AuthResponse;
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
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Usuario u = (Usuario) auth.getPrincipal();

        String accessToken = jwtService.generateToken(u);
        String refreshToken = jwtService.generateRefreshToken(u);

        u.setPassword(null); 

        return AuthResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .usuario(u)
                .build();
    }

    public AuthResponse refreshToken(String refreshToken) {
        String username = jwtService.extractUsername(refreshToken);
        Usuario u = usuarioRepository.findByEmail(username);

        if (u == null || !jwtService.isTokenValid(refreshToken, u)) {
            throw new RuntimeException("Refresh token inválido");
        }

        String newAccessToken = jwtService.generateToken(u);
        u.setPassword(null);

        return AuthResponse.builder()
                .token(newAccessToken)
                .refreshToken(refreshToken)
                .usuario(u)
                .build();
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
        u.setComuna(request.getComuna());
        u.setDireccion(request.getDireccion());
        u.setRegion(request.getRegion());
        u.setFechaCreacion(LocalDate.now());

        return usuarioRepository.save(u);
    }
}