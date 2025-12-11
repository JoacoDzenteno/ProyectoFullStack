package com.tiendadelcazador.tiendabackend.services;

import com.tiendadelcazador.tiendabackend.dto.EstadisticasDTO;
import com.tiendadelcazador.tiendabackend.repositories.ProductoRepository;
import com.tiendadelcazador.tiendabackend.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstadisticasService {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    private static final int STOCK_CRITICO_LIMITE = 5;

    public EstadisticasDTO getEstadisticas() {
        
        long usuarios = usuarioRepository.count();
        long productos = productoRepository.count();
        long criticos = productoRepository.countByStockLessThan(STOCK_CRITICO_LIMITE);

        return new EstadisticasDTO(usuarios, productos, criticos);
    }
}