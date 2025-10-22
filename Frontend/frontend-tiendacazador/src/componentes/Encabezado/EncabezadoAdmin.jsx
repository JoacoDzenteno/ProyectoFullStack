import React from 'react';
import './EncabezadoAdmin.css'; 

const EncabezadoAdmin = () => {
    // En una aplicación real, el nombre vendría del estado de autenticación.
    const adminName = "Admin Cazador"; 

    return (
        // Usamos una barra Bootstrap simple (navbar) pero la estilizaremos en CSS
        // para que se fije al top del 'admin-right-panel'.
        <nav className="admin-top-header navbar navbar-light bg-light">
            <div className="container-fluid justify-content-end">
                
                {/* 1. Mensaje de Bienvenida */}
                <span className="navbar-text welcome-message me-4">
                    Bienvenido, **{adminName}**
                </span>

                {/* 2. Ícono de Notificaciones */}
                <a href="#" className="notification-icon position-relative me-3">
                    <i className="fas fa-bell"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                    </span>
                </a>

                {/* 3. Enlace/Botón de Perfil o Cerrar Sesión */}
                <a href="#" className="btn btn-sm btn-outline-secondary logout-btn">
                    <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </a>
            </div>
        </nav>
    );
};

export default EncabezadoAdmin;