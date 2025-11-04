// En: services/UsuarioServiceImpl.java (CORREGIDO)
package com.tiendadelcazador.tiendabackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // <-- IMPORTANTE
import org.springframework.stereotype.Service;

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.UsuarioRepository;
import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // <-- INYECTAMOS EL ENCRIPTADOR

    @Override
    public Usuario createUsuario(Usuario usuario) {
        // ¡ENCRIPTAMOS LA CONTRASEÑA!
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el id: " + id));
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return (List<Usuario>) usuarioRepository.findAll();
    }

    @Override
    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con el id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    @Override
    public Usuario updateUsuario(Long id, Usuario usuario) {
        Usuario existingUsuario = getUsuarioById(id);
        existingUsuario.setNombre(usuario.getNombre());
        existingUsuario.setEmail(usuario.getEmail());
        // ... (actualiza otros campos si quieres)

        // ¡ARREGLO CRÍTICO!
        // NO actualizamos la contraseña a menos que venga una nueva y no esté vacía.
        if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
            existingUsuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }

        return usuarioRepository.save(existingUsuario);
    }
    
    @Override
    public Usuario deactiveUsuario(Long id) {
        Usuario existingUsuario = getUsuarioById(id);
        existingUsuario.setEstado(false);
        return usuarioRepository.save(existingUsuario);
    }
}
