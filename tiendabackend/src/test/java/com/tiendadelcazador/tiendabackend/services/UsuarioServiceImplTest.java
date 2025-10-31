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

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.UsuarioRepository;

// Le decimos a JUnit 5 que use Mockito
@ExtendWith(MockitoExtension.class)
public class UsuarioServiceImplTest {

    // 1. @Mock: Crea una versión "falsa" del Repositorio.
    // No usará la base de datos real.
    @Mock
    private UsuarioRepository usuarioRepository;

    // 2. @InjectMocks: Crea una instancia real del Service
    // e inyéctale los @Mocks (el repo falso).
    @InjectMocks
    private UsuarioServiceImpl usuarioService;

    // 3. Datos de prueba
    private Usuario usuarioPrueba;

    @BeforeEach
    void setUp() {
        // Configuramos un usuario de prueba que se usará en varios tests
        usuarioPrueba = new Usuario();
        usuarioPrueba.setId(1L);
        usuarioPrueba.setNombre("Usuario");
        usuarioPrueba.setEmail("prueba@test.com");
        usuarioPrueba.setEstado(true);
    }

    // --- TEST 1 ---
    @Test
    void testGetAllUsuarios() {
        // Arrange (Preparar)
        // Le decimos al repo falso qué hacer
        when(usuarioRepository.findAll()).thenReturn(List.of(usuarioPrueba, new Usuario()));
        
        // Act (Actuar)
        List<Usuario> usuarios = usuarioService.getAllUsuarios();

        // Assert (Verificar)
        assertNotNull(usuarios);
        assertEquals(2, usuarios.size()); // Verifica que la lista tiene 2 usuarios
        verify(usuarioRepository, times(1)).findAll(); // Verifica que el repo fue llamado 1 vez
    }

    // --- TEST 2 ---
    @Test
    void testGetUsuarioById_Exitoso() {
        // Arrange
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioPrueba));
        
        // Act
        Usuario usuario = usuarioService.getUsuarioById(1L);

        // Assert
        assertNotNull(usuario);
        assertEquals(1L, usuario.getId());
        assertEquals("Usuario", usuario.getNombre());
        verify(usuarioRepository, times(1)).findById(1L);
    }
    
    // --- TEST 3 ---
    @Test
    void testDeactiveUsuario() {
        // Arrange
        // 1. Finge la búsqueda
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioPrueba));
        // 2. Finge el guardado
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i -> {
            Usuario u = i.getArgument(0);
            return u; // Devuelve el mismo usuario que le pasaron
        });
        
        // Act
        Usuario usuarioDesactivado = usuarioService.deactiveUsuario(1L);
        
        // Assert
        assertNotNull(usuarioDesactivado);
        assertEquals(false, usuarioDesactivado.getEstado()); // ¡El estado debe ser false!
        verify(usuarioRepository, times(1)).findById(1L);
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }
}