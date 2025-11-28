package com.tiendadelcazador.tiendabackend.controllers.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistroRequest {
    String rut;
    String nombre;
    String apellidos;
    String email;
    String password;
    String direccion;
    String region;
    String comuna;
}