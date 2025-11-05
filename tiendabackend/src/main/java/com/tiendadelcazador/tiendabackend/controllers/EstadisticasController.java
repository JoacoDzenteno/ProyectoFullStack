package com.tiendadelcazador.tiendabackend.controllers;

import com.tiendadelcazador.tiendabackend.dto.EstadisticasDTO;
import com.tiendadelcazador.tiendabackend.services.EstadisticasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EstadisticasController {

    private final EstadisticasService estadisticasService;

    @GetMapping("/estadisticas")
    public ResponseEntity<EstadisticasDTO> getEstadisticas() {
        EstadisticasDTO dto = estadisticasService.getEstadisticas();
        return ResponseEntity.ok(dto);
    }
}