// src/componentes/Cuerpo/Admin/AccionesAdmin/AccionesAdmin.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './AccionesAdmin.css';

const AccionesAdmin = () => {
    return (
        <div className="acciones-panel p-4">
            <h2 className="mb-4">Tablero de Control y Acciones Rápidas</h2>
            
            <div className="row">
                
                {/* 1. BOTÓN DE GESTIÓN DE PRODUCTOS */}
                <div className="col-md-4 mb-4">
                    <Link to="/admin/productos" className="btn btn-primary btn-lg w-100 accion-btn">
                        <i className="fas fa-boxes fa-3x mb-2"></i>
                        <h4>Gestión de Productos</h4>
                        <p>Crear, editar o eliminar inventario.</p>
                    </Link>
                </div>

                {/* 2. BOTÓN DE GESTIÓN DE USUARIOS */}
                <div className="col-md-4 mb-4">
                    <Link to="/admin/usuarios" className="btn btn-success btn-lg w-100 accion-btn">
                        <i className="fas fa-users fa-3x mb-2"></i>
                        <h4>Gestión de Usuarios</h4>
                        <p>Ver perfiles y permisos de clientes/admins.</p>
                    </Link>
                </div>

                {/* 3. BOTÓN DE GESTIÓN DE PEDIDOS */}
                <div className="col-md-4 mb-4">
                    <Link to="/admin/pedidos" className="btn btn-warning text-dark btn-lg w-100 accion-btn">
                        <i className="fas fa-clipboard-list fa-3x mb-2"></i>
                        <h4>Revisar Pedidos</h4>
                        <p>Procesar y actualizar el estado de las ventas.</p>
                    </Link>
                </div>
                
                {/* ... Otros botones según necesidad (Blogs, Reportes, etc.) ... */}
            </div>
        </div>
    );
};

export default AccionesAdmin;