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


@ExtendWith(MockitoExtension.class)
public class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioServiceImpl usuarioService;

    private Usuario usuarioPrueba;

    @BeforeEach
    void setUp() {
        usuarioPrueba = new Usuario();
        usuarioPrueba.setId(1L);
        usuarioPrueba.setNombre("Usuario");
        usuarioPrueba.setEmail("prueba@test.com");
        usuarioPrueba.setEstado(true);
    }

    @Test
    void testGetAllUsuarios() {
        when(usuarioRepository.findAll()).thenReturn(List.of(usuarioPrueba, new Usuario()));
        
        List<Usuario> usuarios = usuarioService.getAllUsuarios();

        assertNotNull(usuarios);
        assertEquals(2, usuarios.size()); // Verifica que la lista tiene 2 usuarios
        verify(usuarioRepository, times(1)).findAll(); // Verifica que el repo fue llamado 1 vez
    }

    // --- TEST 2 ---
    @Test
    void testGetUsuarioById_Exitoso() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioPrueba));
        
        Usuario usuario = usuarioService.getUsuarioById(1L);

        assertNotNull(usuario);
        assertEquals(1L, usuario.getId());
        assertEquals("Usuario", usuario.getNombre());
        verify(usuarioRepository, times(1)).findById(1L);
    }
    
    // --- TEST 3 ---
    @Test
    void testDeactiveUsuario() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuarioPrueba));
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i -> {
            Usuario u = i.getArgument(0);
            return u;
        });
        
        Usuario usuarioDesactivado = usuarioService.deactiveUsuario(1L);
        
        assertNotNull(usuarioDesactivado);
        assertEquals(false, usuarioDesactivado.getEstado()); // ¡El estado debe ser false!
        verify(usuarioRepository, times(1)).findById(1L);
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }
}