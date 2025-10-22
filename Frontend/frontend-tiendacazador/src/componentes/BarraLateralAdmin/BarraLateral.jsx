import React from 'react';
import { Link } from 'react-router-dom';
import './BarraLateral.css'; // Importación de estilos locales

const BarraLateral = () => {
    return (
        // Usamos la clase "barraLateral" para tus estilos CSS
        <aside className="barraLateral">
            
            {/* 1. LOGO */}
            <div className="logo">
                {/* Asumimos que la ruta de inicio del admin es /admin */}
                <Link to="/admin" className="logo-link"> 
                    Tienda<span>X</span>del<span>X</span>cazador
                </Link>
            </div>
            
            {/* 2. MENÚ DE NAVEGACIÓN */}
            <nav className="menu">
                <h4 className="titulo">TABLERO DE TRABAJO</h4>
                
                {/* Enlaces de administración */}
                <Link to="/admin/dashboard" className="menu-item">
                    <i className="fas fa-tachometer-alt me-2"></i> Dashboard
                </Link>
                <Link to="/admin/productos" className="menu-item">
                    <i className="fas fa-boxes me-2"></i> Productos
                </Link>
                <Link to="/admin/usuarios" className="menu-item">
                    <i className="fas fa-users me-2"></i> Usuarios
                </Link>
                
                {/* Puedes añadir un enlace más para "Cerrar Sesión" o dejarlo en la barra superior si la tienes */}
            </nav>
            
            {/* 3. PERFIL */}
            <div className="perfil">
                {/* Asumimos que la imagen de perfil está en public/Imagenes/ */}
                <img src="/Imagenes/perfilAdmin.jpg" alt="Perfil Admin" />
                <Link to="/admin/perfil" className="perfil-link">Perfil</Link>
            </div>
            
        </aside>
    );
};

export default BarraLateral;