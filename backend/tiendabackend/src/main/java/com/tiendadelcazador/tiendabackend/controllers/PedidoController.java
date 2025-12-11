package com.tiendadelcazador.tiendabackend.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.tiendadelcazador.tiendabackend.entities.CarritoItem;
import com.tiendadelcazador.tiendabackend.entities.DetallePedido;
import com.tiendadelcazador.tiendabackend.entities.Pedido;
import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.DetallePedidoRepository;
import com.tiendadelcazador.tiendabackend.repositories.PedidoRepository;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository;
import com.tiendadelcazador.tiendabackend.services.BoletaService;
import com.tiendadelcazador.tiendabackend.services.CarritoService;


import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final CarritoService carritoService;
    private final PedidoRepository pedidoRepo;
    private final DetallePedidoRepository detalleRepo;
    private final BoletaService boletaService;
    private final ProductoRepository productoRepo;

    // ==========================
    //        CONFIRMAR PEDIDO
    // ==========================
    @PostMapping("/confirmar")
    @Transactional
    public Pedido confirmarPedido(Authentication auth) {

        Usuario user = (Usuario) auth.getPrincipal();
        List<CarritoItem> items = carritoService.getCarrito(user);

        if (items.isEmpty()) {
            throw new RuntimeException("Carrito vacío");
        }

        Pedido pedido = new Pedido();
        pedido.setUsuario(user);
        pedido.setFecha(LocalDateTime.now());

        Long total = 0L;
        List<DetallePedido> detalles = new ArrayList<>();

        pedido = pedidoRepo.save(pedido);

        // ==========================================
        //   RECORRER ITEMS Y DESCONTAR STOCK
        // ==========================================
        for (CarritoItem item : items) {

            var producto = item.getProducto();
            Integer stockActual = producto.getStock() == null ? 0 : producto.getStock();
            Integer cantidad = item.getCantidad();

            if (cantidad == null || cantidad <= 0) {
                throw new RuntimeException("Cantidad inválida para el producto " + producto.getNombre());
            }

            if (stockActual < cantidad) {
                throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            producto.setStock(stockActual - cantidad);
            productoRepo.save(producto);

            DetallePedido det = new DetallePedido();
            det.setPedido(pedido);
            det.setProducto(producto);
            det.setCantidad(cantidad);
            det.setPrecioUnitario(producto.getPrecio());

            Long subtotal = producto.getPrecio() * cantidad;
            total += subtotal;

            detalleRepo.save(det);
            detalles.add(det);
        }

        pedido.setTotal(total);
        pedido.setDetalles(detalles);

        pedidoRepo.save(pedido);

        var boleta = boletaService.generarParaPedido(pedido);
        pedido.setBoleta(boleta);

        carritoService.vaciarCarrito(user);

        return pedido;
    }

    // ==========================
    //       LISTAR PEDIDOS
    // ==========================
    @GetMapping
    public List<Pedido> obtenerPedidos(Authentication auth) {
        Usuario user = (Usuario) auth.getPrincipal();
        return pedidoRepo.findByUsuarioId(user.getId());
    }

    // ==========================================
    //       DESCARGAR BOLETA EN PDF
    // ==========================================
    @GetMapping("/{id}/boleta/pdf")
    @Transactional(readOnly = true)
    public ResponseEntity<byte[]> descargarBoletaPdf(
            @PathVariable Long id,
            Authentication auth) {

        Usuario user = (Usuario) auth.getPrincipal();

        Pedido pedido = pedidoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));

        if (!pedido.getUsuario().getId().equals(user.getId())
                && !"ADMIN".equalsIgnoreCase(user.getRol())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        boletaService.generarParaPedido(pedido);

        byte[] pdf = boletaService.generarPdfBoleta(pedido);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(
                ContentDisposition.attachment()
                        .filename("boleta-" + pedido.getId() + ".pdf")
                        .build()
        );

        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }
}
