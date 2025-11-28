import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useCarrito } from '../../../contexto/CarritoContexto.jsx';
import { useAuth } from '../../../contexto/AuthContexto.jsx';
import { useNavigate } from 'react-router-dom';

export function BarraNavegacion() {
  const { carrito } = useCarrito();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const handleLogout = () => {
    logout();          
    navigate('/');     
  };

  const tituloUsuario = usuario
    ? (usuario.nombre ? `${usuario.nombre}` : usuario.email)
    : null;

  return (
    <Navbar 
      bg="light" 
      variant="light" 
      expand="lg" 
      fixed="top" 
      className="shadow-sm" 
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            Tienda<span>X</span>del<span>X</span>cazador
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="menu-principal-colapsable" />

        <Navbar.Collapse id="menu-principal-colapsable">
          
          <Nav className="me-auto"> 
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/productos"><Nav.Link>Productos</Nav.Link></LinkContainer>
            <LinkContainer to="/nosotros"><Nav.Link>Nosotros</Nav.Link></LinkContainer>
            <LinkContainer to="/contacto"><Nav.Link>Contacto</Nav.Link></LinkContainer>
            <LinkContainer to="/blogs"><Nav.Link>Blogs</Nav.Link></LinkContainer>
          </Nav>

          <Nav className="ms-auto">
            <NavDropdown
              title={
                <>
                  <FontAwesomeIcon icon={faUser} />
                  {usuario && (
                    <span className="ms-2">
                      {tituloUsuario}
                    </span>
                  )}
                </>
              }
              id="menu-usuario-dropdown"
              align="end"
            >
              {!usuario && (
                <>
                  <LinkContainer to="/login">
                    <NavDropdown.Item>Iniciar Sesión</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/registro">
                    <NavDropdown.Item>Registro</NavDropdown.Item>
                  </LinkContainer>
                </>
              )}

              {usuario && (
                <>
                  <LinkContainer to="/perfil">
                    <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/pedidos">
                    <NavDropdown.Item>Mis pedidos</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <LinkContainer to="/carrito">
              <Nav.Link className="position-relative"> 
                <FontAwesomeIcon icon={faShoppingCart} />
                {totalItems > 0 && (
                  <Badge 
                    pill 
                    bg="danger" 
                    className="carrito-badge"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}