package com.tiendadelcazador.tiendabackend.controllers;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.tiendadelcazador.tiendabackend.dto.CarritoAgregarRequest;
import com.tiendadelcazador.tiendabackend.entities.CarritoItem;
import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.services.CarritoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/carrito")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoService carritoService;

    @GetMapping
    public List<CarritoItem> obtenerCarrito(Authentication auth) {
        Usuario user = (Usuario) auth.getPrincipal();
        return carritoService.getCarrito(user);
    }

    @PostMapping
    public CarritoItem agregarAlCarrito(
            Authentication auth,
            @RequestBody CarritoAgregarRequest body) {

        Usuario user = (Usuario) auth.getPrincipal();

        Long productoId = body.getProductoId();
        Integer cantidad = body.getCantidad();

        return carritoService.agregarItem(user, productoId, cantidad);
    }

    @PutMapping("/{itemId}")
    public CarritoItem actualizarCantidad(
            Authentication auth,
            @PathVariable Long itemId,
            @RequestBody CarritoAgregarRequest body) {

        Usuario user = (Usuario) auth.getPrincipal();

        return carritoService.actualizarCantidad(user, itemId, body.getCantidad());
    }

    @DeleteMapping("/{itemId}")
    public void eliminarItem(
            Authentication auth,
            @PathVariable Long itemId) {

        Usuario user = (Usuario) auth.getPrincipal();
        carritoService.eliminarItem(user, itemId);
    }

    @DeleteMapping("/vaciar")
    public void vaciarCarrito(Authentication auth) {
        Usuario user = (Usuario) auth.getPrincipal();
        carritoService.vaciarCarrito(user);
    }
}