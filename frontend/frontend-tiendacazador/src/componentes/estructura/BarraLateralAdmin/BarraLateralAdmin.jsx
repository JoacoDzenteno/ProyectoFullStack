import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBoxOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap'; 
import imgPerfil from '../../../recursos/imagenes/perfilAdmin.jpg';

import { useAuth } from '../../../contexto/AuthContexto.jsx';
import { useNavigate } from 'react-router-dom';

export function BarraLateralAdmin() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const manejarLogout = (e) => {
    e.preventDefault();
    console.log("Cerrando sesión...");
    logout();
    navigate('/login');
  };
  
  return (
    <aside className="barraLateral">
      <div>
        <a href="/admin/panel" className="logo">
          Tienda<span>X</span>del<span>X</span>cazador
        </a>

        <Nav className="flex-column menu" variant="pills">
          <LinkContainer to="/admin/panel">
            <Nav.Link>
              <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
              Panel
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/admin/usuarios">
            <Nav.Link>
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Usuarios
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/admin/productos">
            <Nav.Link>
              <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
              Productos
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </div>
      
      <div className="perfil">
        <img src={imgPerfil} alt="Perfil Admin" />
        
        <a href="#" onClick={manejarLogout}> 
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Cerrar Sesión
        </a>
      </div>
    </aside>
  );
}