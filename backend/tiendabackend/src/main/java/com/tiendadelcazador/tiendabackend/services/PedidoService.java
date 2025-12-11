package com.tiendadelcazador.tiendabackend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tiendadelcazador.tiendabackend.entities.CarritoItem;
import com.tiendadelcazador.tiendabackend.entities.DetallePedido;
import com.tiendadelcazador.tiendabackend.entities.Pedido;
import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.DetallePedidoRepository;
import com.tiendadelcazador.tiendabackend.repositories.PedidoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final CarritoService carritoService;
    private final PedidoRepository pedidoRepo;
    private final DetallePedidoRepository detalleRepo;

    @Transactional
    public Pedido crearPedidoDesdeCarrito(Usuario usuario) {
        List<CarritoItem> items = carritoService.getCarrito(usuario);

        if (items.isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());

        Long total = 0L;
        List<DetallePedido> detalles = new ArrayList<>();

        pedido = pedidoRepo.save(pedido);

        for (CarritoItem item : items) {
            DetallePedido det = new DetallePedido();
            det.setPedido(pedido);
            det.setProducto(item.getProducto());
            det.setCantidad(item.getCantidad());
            det.setPrecioUnitario(item.getProducto().getPrecio());

            Long subtotal = item.getProducto().getPrecio() * item.getCantidad();
            total += subtotal;

            detalleRepo.save(det);
            detalles.add(det);
        }

        pedido.setTotal(total);
        pedido.setDetalles(detalles);

        pedido = pedidoRepo.save(pedido);

        carritoService.vaciarCarrito(usuario);

        return pedido;
    }

    @Transactional(readOnly = true)
    public List<Pedido> getPedidosDeUsuario(Usuario usuario) {
        return pedidoRepo.findByUsuarioId(usuario.getId());
    }
}