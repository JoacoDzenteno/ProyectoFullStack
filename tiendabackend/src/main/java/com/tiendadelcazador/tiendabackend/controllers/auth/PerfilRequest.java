package com.tiendadelcazador.tiendabackend.controllers.auth;

import lombok.Data;

@Data
public class PerfilRequest {
    private String nombre;
    private String apellidos;
    private String direccion;
    private String region;
    private String comuna;

    private String passwordActual;    // opcional, si quieres validar
    private String passwordNueva;     // opcional
}