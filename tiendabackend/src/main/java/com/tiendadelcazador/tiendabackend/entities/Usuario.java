// En: entities/Usuario.java (CORREGIDO Y BLINDADO)
package com.tiendadelcazador.tiendabackend.entities;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuario", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"email"}),
    @UniqueConstraint(columnNames = {"rut"})
})
@Entity
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String rut;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    private String apellidos;
    
    @Column(nullable = false)
    private String email; 
    
    @Column(nullable = false)
    private String password;
    
    private String direccion;
    private String region;
    private String comuna;

    private String rol; 
    private Boolean estado;
    private String fechaCreacion;

    // --- MÉTODOS DE USERDETAILS BLINDADOS ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // ARREGLO 1: Si 'rol' es nulo, asigna una lista vacía.
        if (this.rol == null || this.rol.isEmpty()) {
            return List.of();
        }
        return List.of(new SimpleGrantedAuthority(this.rol));
    }

    @Override
    public String getUsername() {
        return this.email; 
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // ARREGLO 2: Si 'estado' (Boolean) es nulo, trátalo como false (deshabilitado).
        return this.estado != null && this.estado;
    }
}
