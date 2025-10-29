// En: src/componentes/layout/BarraLateralAdmin/BarraLateralAdmin.jsx

import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBoxOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap'; 

// Importamos la imagen de perfil
import imgPerfil from '../../../recursos/imagenes/perfilAdmin.jpg'; // Asegúrate que la ruta sea correcta

import { useAuth } from '../../../contexto/AuthContexto.jsx';
import { useNavigate } from 'react-router-dom';

export function BarraLateralAdmin() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const manejarLogout = (e) => {
    e.preventDefault();
    console.log("Cerrando sesión...");
    logout(); // Borra la sesión del contexto y localStorage
    navigate('/login'); // Redirige al login
  };
  
  // Usamos las clases de tu 'estilosAdmin.css' (.barraLateral, .menu, .logo)
  return (
    <aside className="barraLateral">
      <div>
        <a href="/admin/panel" className="logo">
          Tienda<span>X</span>del<span>X</span>cazador
        </a>
        
        {/* Menú de navegación principal del admin */}
        <Nav className="flex-column menu" variant="pills">
          
          {/* Link al Panel (Tu "Tablero de Trabajo") */}
          <LinkContainer to="/admin/panel">
            <Nav.Link>
              <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
              Panel
            </Nav.Link>
          </LinkContainer>

{/* Link a Gestión de Usuarios [cite: 48] */}
          <LinkContainer to="/admin/usuarios">
            <Nav.Link>
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Usuarios
            </Nav.Link>
          </LinkContainer>

          {/* Link a Gestión de Productos [cite: 54] */}
          <LinkContainer to="/admin/productos">
            <Nav.Link>
              <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
              Productos
            </Nav.Link>
          </LinkContainer>

        </Nav>
      </div>
      
      {/* Perfil y botón de Logout [cite: 72] */}
      <div className="perfil">
        <img src={imgPerfil} alt="Perfil Admin" />
        
        {/* --- 4. CAMBIAR EL LINK POR EL BOTÓN DE LOGOUT --- */}
        {/* Usamos 'href="#"' y 'onClick' para llamar a nuestra función */}
        <a href="#" onClick={manejarLogout}> 
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Cerrar Sesión
        </a>
      </div>
    </aside>
  );
}