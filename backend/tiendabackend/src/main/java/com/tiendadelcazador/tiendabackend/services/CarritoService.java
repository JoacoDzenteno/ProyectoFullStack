package com.tiendadelcazador.tiendabackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tiendadelcazador.tiendabackend.entities.CarritoItem;
import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.CarritoItemRepository;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final CarritoItemRepository carritoRepo;
    private final ProductoRepository productoRepo;

    public List<CarritoItem> getCarrito(Usuario usuario) {
        return carritoRepo.findByUsuarioId(usuario.getId());
    }

    public CarritoItem agregarItem(Usuario usuario, Long productoId, Integer cantidad) {
        if (cantidad == null || cantidad <= 0) {
            throw new RuntimeException("La cantidad debe ser mayor a 0");
        }

        Producto producto = productoRepo.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no existe"));

        CarritoItem item = carritoRepo.findByUsuarioId(usuario.getId()).stream()
                .filter(i -> i.getProducto().getId().equals(productoId))
                .findFirst()
                .orElse(null);

        if (item == null) {
            item = new CarritoItem();
            item.setUsuario(usuario);
            item.setProducto(producto);
            item.setCantidad(cantidad);
        } else {
            item.setCantidad(item.getCantidad() + cantidad);
        }

        return carritoRepo.save(item);
    }

    public CarritoItem actualizarCantidad(Usuario usuario, Long itemId, Integer cantidad) {
        CarritoItem item = carritoRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        if (!item.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("No puedes modificar un carrito que no es tuyo");
        }

        if (cantidad == null || cantidad <= 0) {
            carritoRepo.delete(item);
            return null;
        }

        item.setCantidad(cantidad);
        return carritoRepo.save(item);
    }

    public void eliminarItem(Usuario usuario, Long itemId) {
        CarritoItem item = carritoRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no existe"));

        if (!item.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("Prohibido");
        }

        carritoRepo.delete(item);
    }

    @Transactional
    public void vaciarCarrito(Usuario usuario) {
        carritoRepo.deleteByUsuarioId(usuario.getId());
    }
}
