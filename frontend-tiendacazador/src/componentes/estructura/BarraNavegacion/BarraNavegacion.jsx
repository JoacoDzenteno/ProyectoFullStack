import React from 'react';
// CAMBIO 1: Importamos 'NavDropdown'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Nombramos los íconos para claridad
const iconoUsuario = faUser;
const iconoCarrito = faShoppingCart;

export function BarraNavegacion() {
  
  return (
    <Navbar 
      bg="light" 
      variant="light" 
      expand="lg" 
      fixed="top" 
      className="shadow-sm" 
    >
      <Container>
        
        <Navbar.Brand href="/">
          Tienda<span>X</span>del<span>X</span>cazador
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal-colapsable" />

        <Navbar.Collapse id="menu-principal-colapsable">
          
          <Nav className="me-auto"> 
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/nosotros">Nosotros</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            
            {/* --- CAMBIO 2: Reemplazamos el Nav.Link por NavDropdown --- */}
            <NavDropdown 
              // El 'title' (título) del dropdown será el ícono de usuario
              title={<FontAwesomeIcon icon={iconoUsuario} />} 
              id="menu-usuario-dropdown"
              align="end" // Alinea el menú a la derecha para que no se salga
            >
              <NavDropdown.Item href="/login">Iniciar Sesión</NavDropdown.Item>
              <NavDropdown.Item href="/registro">Registro</NavDropdown.Item>
            </NavDropdown>
            {/* --- Fin del Cambio --- */}


            {/* El ícono del carrito se queda igual */}
            <Nav.Link href="/carrito" className="position-relative">
              <FontAwesomeIcon icon={iconoCarrito} />
              
              <Badge 
                pill       
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: '0.6em' }} 
              >
                0
              </Badge>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}