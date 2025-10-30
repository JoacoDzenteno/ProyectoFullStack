package com.tiendadelcazador.tiendabackend.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.tiendadelcazador.tiendabackend.entities.Producto;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository;

@ExtendWith(MockitoExtension.class)
public class ProductoServiceImplTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoServiceImpl productoService;

    private Producto productoPrueba;

    @BeforeEach
    void setUp() {
        productoPrueba = new Producto();
        productoPrueba.setId(1L);
        productoPrueba.setNombre("Figura Gon");
        productoPrueba.setStock(50);
        productoPrueba.setEstado(true);
    }

    // --- TEST 1 ---
    @Test
    void testGetAllProductos() {
        // Arrange
        when(productoRepository.findAll()).thenReturn(List.of(productoPrueba));
        
        // Act
        List<Producto> productos = productoService.getAllProductos();
        
        // Assert
        assertNotNull(productos);
        assertEquals(1, productos.size());
        verify(productoRepository, times(1)).findAll();
    }

    // --- TEST 2 ---
    @Test
    void testGetProductoById_Exitoso() {
        // Arrange
        when(productoRepository.findById(1L)).thenReturn(Optional.of(productoPrueba));
        
        // Act
        Producto producto = productoService.getProductoById(1L);
        
        // Assert
        assertNotNull(producto);
        assertEquals("Figura Gon", producto.getNombre());
        verify(productoRepository, times(1)).findById(1L);
    }

    // --- TEST 3 ---
    @Test
    void testCreateProducto() {
        // Arrange
        Producto productoNuevo = new Producto();
        productoNuevo.setNombre("Figura Killua");
        
        // Finge la lógica de guardado
        when(productoRepository.save(any(Producto.class))).thenAnswer(i -> {
            Producto p = i.getArgument(0);
            p.setId(2L); // Simula que la BD le asigna un ID
            return p;
        });
        
        // Act
        Producto productoGuardado = productoService.createProducto(productoNuevo);
        
        // Assert
        assertNotNull(productoGuardado);
        assertEquals(2L, productoGuardado.getId());
        assertEquals("Figura Killua", productoGuardado.getNombre());
        // Verifica la lógica de negocio que añadimos (estado=true)
        assertEquals(true, productoGuardado.getEstado()); 
        assertNotNull(productoGuardado.getFechaCreacion()); // Verifica que se puso la fecha
        verify(productoRepository, times(1)).save(any(Producto.class));
    }

    // --- TEST 4 ---
    @Test
    void testGetStockById() {
        // Arrange
        when(productoRepository.findById(1L)).thenReturn(Optional.of(productoPrueba));
        
        // Act
        Integer stock = productoService.getStockById(1L);
        
        // Assert
        assertNotNull(stock);
        assertEquals(50, stock);
        verify(productoRepository, times(1)).findById(1L);
    }
}