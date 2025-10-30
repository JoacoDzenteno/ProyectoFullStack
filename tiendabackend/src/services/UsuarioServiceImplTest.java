package com.tiendadelcazador.tiendabackend.services;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.UsuarioRepository;

class UsuarioServiceImplTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioServiceImpl usuarioService;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUsuario_ShouldReturnSavedUsuario() {

        Usuario usuario = new Usuario();
        usuario.setNombre("Ignacio");
        usuario.setEmail("ig.lopezf@duocuc.cl");
        usuario.setContrasena("123456");
        
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        Usuario savedUsuario = usuarioService.createUsuario(usuario);
        assertNotNull(savedUsuario);
        assertEquals("Ignacio", savedUsuario.getNombre());
        assertEquals("ig.lopezf@duocuc.cl", savedUsuario.getEmail());
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void updateUsuario_ShouldUpdateAndReturnUsuario() {

        Long id = 1L;
        Usuario existingUsuario = new Usuario();
        existingUsuario.setId(id);
        existingUsuario.setNombre("Ignacio");
        existingUsuario.setEmail("ig.lopezf@duocuc.cl");

        Usuario updatedUsuario = new Usuario();
        updatedUsuario.setNombre("Marcelo");
        updatedUsuario.setEmail("ma.lopezf@duocuc.cl");
        
        when(usuarioRepository.findById(id)).thenReturn(Optional.of(existingUsuario));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(updatedUsuario);

        Usuario result = usuarioService.updateUsuario(id, updatedUsuario);

        assertEquals("Marcelo", result.getNombre());
        assertEquals("ma.lopezf@duocuc.cl", result.getEmail());
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void deactiveUsuario_ShouldDeactivateAndReturnUsuario() {

        Long id = 1L;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setEstado(true);
        
        when(usuarioRepository.findById(id)).thenReturn(Optional.of(usuario));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        Usuario deactivatedUsuario = usuarioService.deactiveUsuario(id);

        assertFalse(deactivatedUsuario.getEstado());
        verify(usuarioRepository).save(usuario);
    }
}