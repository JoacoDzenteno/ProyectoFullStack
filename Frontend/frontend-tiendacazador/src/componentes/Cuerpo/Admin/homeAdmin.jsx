import React from 'react';
// CORRECCIÓN DE RUTA: Subir dos niveles para encontrar BarraLateralAdmin
import BarraLateral from '../../BarraLateralAdmin/BarraLateral.jsx'; 
// Usaremos el EncabezadoAdmin que planeamos antes
import EncabezadoAdmin from '../../Encabezado/EncabezadoAdmin.jsx'; 
import './homeAdmin.css'; 

// 💡 CORRECCIÓN: El nombre del componente DEBE ser con Mayúscula
const AdminLayout = ({ children }) => {
    return (
        <div className="admin-contenedor">
            {/* 1. BARRA LATERAL (Fija a la izquierda) */}
            <BarraLateral />
            
            <div className="admin-right-panel">
                {/* 2. ENCABEZADO SUPERIOR (Fijo arriba) */}
                <EncabezadoAdmin />
                
                {/* 3. CONTENIDO PRINCIPAL (Donde se renderizan las vistas) */}
                <main className="admin-contenido-principal">
                    {/* {children} recibirá el componente de la vista actual (ej: AccionesAdmin) */}
                    {children} 
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;