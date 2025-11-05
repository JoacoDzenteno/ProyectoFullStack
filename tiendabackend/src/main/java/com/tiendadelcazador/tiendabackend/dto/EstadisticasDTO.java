package com.tiendadelcazador.tiendabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EstadisticasDTO {
    private long totalUsuarios;
    private long totalProductos;
    private long stockCritico;
}