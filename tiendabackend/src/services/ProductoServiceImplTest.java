package com.tiendadelcazador.tiendabackend.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository;

class ProductoServiceImplTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoServiceImpl productoService;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProducto_ShouldReturnSavedProducto() {

        Producto producto = new Producto();
        producto.setNombre("Naruto");
        producto.setPrecio(25000L);
        
        when(productoRepository.save(any(Producto.class))).thenReturn(producto);

        Producto savedProducto = productoService.createProducto(producto);

        assertNotNull(savedProducto);
        assertEquals("Naruto", savedProducto.getNombre());
        verify(productoRepository).save(any(Producto.class));
    }

    @Test
    void getAllProductos_ShouldReturnListOfProductos() {

        Producto producto1 = new Producto();
        producto1.setNombre("Naruto");
        Producto producto2 = new Producto();
        producto2.setNombre("Kakashi");
        List<Producto> expectedProductos = Arrays.asList(producto1, producto2);
        
        when(productoRepository.findAll()).thenReturn(expectedProductos);

        List<Producto> actualProductos = productoService.getAllProductos();

        assertEquals(2, actualProductos.size());
        verify(productoRepository).findAll();
    }

    @Test
    void deactiveProducto_ShouldDeactivateAndReturnProducto() {

        Long id = 1L;
        Producto producto = new Producto();
        producto.setId(id);
        producto.setEstado(true);
        
        when(productoRepository.findById(id)).thenReturn(Optional.of(producto));
        when(productoRepository.save(any(Producto.class))).thenReturn(producto);

        Producto deactivatedProducto = productoService.deactiveProducto(id);

        assertFalse(deactivatedProducto.getEstado());
        verify(productoRepository).save(producto);
    }

    @Test
    void getProductoById_WhenProductoNotFound_ShouldThrowException() {

        Long id = 1L;
        when(productoRepository.findById(id)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            productoService.getProductoById(id);
        });
        
        assertEquals("Producto no encontrado con el id: " + id, exception.getMessage());
        verify(productoRepository).findById(id);
    }
}