// En: src/vistas/PanelAdmin.jsx

import React from 'react';
// 1. Importamos el "caparazón" del layout
import { LayoutAdmin } from '../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';

// (Más adelante importaremos los componentes de estadísticas)
// import { TarjetaEstadistica } from '../componentes/admin/TarjetaEstadistica';

export function PanelAdmin() {
  
  return (
    // 2. Usamos el Layout y le pasamos un título
    <LayoutAdmin titulo="Panel de Control">
      
      {/* --- INICIO: Estadísticas Básicas [cite: 62-65] --- */}
      <div className="contenedor-estadisticas p-4">
        <h2>Estadísticas</h2>
        <div className="row">
          <div className="col-md-4">
            {/* (Este será un componente reutilizable 'TarjetaEstadistica' más adelante) */}
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">Total de Productos</div>
              <div className="card-body">
                <h5 className="card-title">150</h5> 
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Total de Usuarios</div>
              <div className="card-body">
                <h5 className="card-title">25</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger mb-3">
              <div className="card-header">Stock Crítico</div>
              <div className="card-body">
                <h5 className="card-title">3</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- FIN: Estadísticas --- */}


      {/* --- INICIO: Accesos Rápidos (Tus 'botones-admin') [cite: 66] --- */}
      <div className="contenedor-accesos p-4">
        <h2>Accesos Rápidos</h2>
        {/* Usamos tus clases CSS 'botones-admin' y 'btn-admin' */}
        <div className="botones-admin">
          <a href="/admin/productos" className="btn-admin">
            Ver Productos
          </a>
          <a href="/admin/usuarios" className="btn-admin">
            Ver Usuarios
          </a>
        </div>
      </div>
      {/* --- FIN: Accesos Rápidos --- */}

    </LayoutAdmin>
  );
}