import React from 'react';
import { BarraLateralAdmin } from '../BarraLateralAdmin/BarraLateralAdmin';

import './estilosAdmin.css'; 

export function LayoutAdmin({ children, titulo }) {
  return (
    <div className="contenedor-admin">
      <BarraLateralAdmin />
        <div className="contenido-principal">
        <header className="barraArriba">
          <h1>{titulo}</h1>
        </header>
        <main className="layout-admin-contenido">
          {children}
        </main>
      </div>
    </div>
  );
}