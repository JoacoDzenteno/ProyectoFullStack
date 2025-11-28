package com.tiendadelcazador.tiendabackend.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long numero;

    private LocalDateTime fechaEmision;

    private Long neto;   
    private Long iva;    
    private Long total;  

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToOne(optional = false)
    @JoinColumn(name = "pedido_id", unique = true)
    @JsonIgnoreProperties("boleta") 
    private Pedido pedido;
}