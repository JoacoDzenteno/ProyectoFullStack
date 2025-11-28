package com.tiendadelcazador.tiendabackend.entities;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CarritoItem {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    private Integer cantidad;
}
