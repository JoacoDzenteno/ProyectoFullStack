// En: src/componentes/layout/LayoutAdmin/LayoutAdmin.jsx

import React from 'react';
import { BarraLateralAdmin } from '../BarraLateralAdmin/BarraLateralAdmin';

// Importamos los estilos del admin (que ya tiene .barraArriba)
import './estilosAdmin.css'; 

// Recibe 'children' (la página) y 'titulo' (para la barra de arriba)
export function LayoutAdmin({ children, titulo }) {
  
  return (
    <div className="contenedor-admin">
      
      {/* 1. La Barra Lateral (Izquierda) */}
      <BarraLateralAdmin />
      
      {/* 2. El Contenido Principal (Derecha) */}
      <div className="contenido-principal">
        
        {/* --- AQUÍ ESTÁ LA BARRA QUE FALTABA --- */}
        <header className="barraArriba">
          <h1>{titulo || "AdministradorCazador"}</h1>
        </header>
        {/* --- FIN DE LA BARRA --- */}

        {/* 'children' es la página que se mostrará */}
        <main className="layout-admin-contenido">
          {children}
        </main>
      </div>
    </div>
  );
}