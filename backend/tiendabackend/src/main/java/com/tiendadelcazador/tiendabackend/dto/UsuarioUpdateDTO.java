package com.tiendadelcazador.tiendabackend.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioUpdateDTO {
  private String nombre;
  private String apellidos;
  private String email;

  @Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
  private String password; 
  private String rut;
  private String direccion;
  private String region;
  private String comuna;
  
   @Pattern(regexp = "ADMIN|USER", message = "Rol inválido")
  private String rol;      
  private Boolean estado; 
}
