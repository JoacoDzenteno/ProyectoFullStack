package com.tiendadelcazador.tiendabackend.entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
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

    @Column(nullable = false)  private String rut;
    @Column(nullable = false)  private String nombre;
    @Column(nullable = false)  private String apellidos;
    @Column(nullable = false)  private String email;

    @JsonIgnore                 
    @Column(nullable = false)   private String password;

    private String direccion;
    private String region;
    private String comuna;

   
    private String rol;

 
    private Boolean estado;
    private LocalDate fechaCreacion;

  
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (rol == null || rol.isBlank()) return List.of();
        // Spring espera "ROLE_*"
        return List.of(new SimpleGrantedAuthority("ROLE_" + rol.toUpperCase()));
    }

    @Override
    public String getUsername() { return email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return Boolean.TRUE.equals(estado); }
}
