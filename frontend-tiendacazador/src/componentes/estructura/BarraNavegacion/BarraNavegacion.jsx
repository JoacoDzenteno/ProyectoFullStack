import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useCarrito } from '../../../contexto/CarritoContexto';

export function BarraNavegacion() {
  
  const { carrito } = useCarrito();
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

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
              title={<FontAwesomeIcon icon={faUser} />} 
              id="menu-usuario-dropdown"
              align="end" 
            >
              <LinkContainer to="/login">
                <NavDropdown.Item>Iniciar Sesión</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/registro">
                <NavDropdown.Item>Registro</NavDropdown.Item>
              </LinkContainer>
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