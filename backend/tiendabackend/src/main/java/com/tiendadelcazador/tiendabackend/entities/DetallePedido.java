package com.tiendadelcazador.tiendabackend.entities;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DetallePedido {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"detalles","boleta"}) 
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    private Integer cantidad;

    private Long precioUnitario;
}
