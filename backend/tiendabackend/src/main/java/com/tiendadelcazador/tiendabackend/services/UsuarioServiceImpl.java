package com.tiendadelcazador.tiendabackend.services;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tiendadelcazador.tiendabackend.entities.Usuario;
import com.tiendadelcazador.tiendabackend.repositories.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String DATE_FMT = "yyyy-MM-dd";

    @Override
    public Usuario createUsuario(Usuario usuario) {
        if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
            throw new RuntimeException("La contraseña es obligatoria");
        }
        // Defaults
        if (usuario.getRol() == null || usuario.getRol().isBlank()) {
            usuario.setRol("USER");
        }
        usuario.setRol(usuario.getRol().toUpperCase(Locale.ROOT)); 

        if (usuario.getEstado() == null) {
            usuario.setEstado(true);
        }
        if (usuario.getFechaCreacion() == null){
            usuario.setFechaCreacion(LocalDate.now());
        }

        // Hash password
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
        return usuarioRepository.findAll();
    }

    @Override
    public void deleteUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con el id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    @Override
    public Usuario updateUsuario(Long id, Usuario usuarioUpdated) {
        Usuario existing = getUsuarioById(id);

        if (usuarioUpdated.getNombre() != null) existing.setNombre(usuarioUpdated.getNombre());
        if (usuarioUpdated.getApellidos() != null) existing.setApellidos(usuarioUpdated.getApellidos());
        if (usuarioUpdated.getEmail() != null) existing.setEmail(usuarioUpdated.getEmail());
        if (usuarioUpdated.getRut() != null) existing.setRut(usuarioUpdated.getRut());
        if (usuarioUpdated.getDireccion() != null) existing.setDireccion(usuarioUpdated.getDireccion());
        if (usuarioUpdated.getRegion() != null) existing.setRegion(usuarioUpdated.getRegion());
        if (usuarioUpdated.getComuna() != null) existing.setComuna(usuarioUpdated.getComuna());

        if (usuarioUpdated.getRol() != null) {
            String rol = usuarioUpdated.getRol().toUpperCase(Locale.ROOT);
            if (!rol.equals("ADMIN") && !rol.equals("USER")) {
                throw new RuntimeException("Rol inválido");
            }
            existing.setRol(rol);
        }

        if (usuarioUpdated.getEstado() != null) {
            existing.setEstado(usuarioUpdated.getEstado());
        }

        if (usuarioUpdated.getPassword() != null && !usuarioUpdated.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(usuarioUpdated.getPassword()));
        }

        return usuarioRepository.save(existing);
    }

    @Override
    public Usuario deactiveUsuario(Long id) {
        Usuario existing = getUsuarioById(id);
        boolean nuevo = (existing.getEstado() == null) ? false : !existing.getEstado();
        existing.setEstado(nuevo);
        return usuarioRepository.save(existing);
    }
}
