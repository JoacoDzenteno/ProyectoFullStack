package com.tiendadelcazador.tiendabackend.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;



@Entity
@Data

public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private LocalDateTime fecha;

    private Long total;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("pedido") 
    private List<DetallePedido> detalles;

    @OneToOne(mappedBy = "pedido")
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("pedido")
    private Boleta boleta;
}
