package com.tiendadelcazador.tiendabackend.controllers.auth;

import com.tiendadelcazador.tiendabackend.entities.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;        // access token
    private String refreshToken; // refresh token
    private Usuario usuario;     // datos del usuario logueado
}