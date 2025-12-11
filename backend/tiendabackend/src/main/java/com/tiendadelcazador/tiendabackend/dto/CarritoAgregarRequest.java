package com.tiendadelcazador.tiendabackend.dto;


import lombok.Data;

@Data
public class CarritoAgregarRequest {
    private Long productoId;
    private Integer cantidad;
}