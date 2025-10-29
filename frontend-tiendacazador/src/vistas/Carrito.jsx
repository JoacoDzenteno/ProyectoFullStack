import React from 'react';
import { Link } from 'react-router-dom';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { useCarrito } from '../contexto/CarritoContexto.jsx';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../recursos/estilos/global.css'; 

export function Carrito() {

  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const handleVaciarCarrito = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      vaciarCarrito();
    }
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        <Container className="carrito-container">
          <h1 className="titulosPg">Tu Carrito de Compras</h1>

          {carrito.length === 0 ? (
            <Alert variant="info" className="text-center">
              Tu carrito está vacío.
              <div className="mt-3">
                <Link to="/productos">
                  <Button variant="primary">Ir a la Tienda</Button>
                </Link>
              </div>
            </Alert>
          ) : (
            
            <Row>
              <Col lg={8}>
                <Table striped bordered hover responsive className="carrito-tabla">
                  <thead className="table-dark">
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img src={item.imagen} alt={item.nombre} className="carrito-img" />
                          <span className="carrito-nombre">{item.nombre}</span>
                        </td>
                        <td>${item.precio.toLocaleString('es-CL')}</td>
                        <td>{item.cantidad}</td>
                        <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                        <td>
                          <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => eliminarDelCarrito(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              
              <Col lg={4}>
                <div className="resumen-carrito">
                  <h3>Resumen del Pedido</h3>
                  <div className="resumen-total">
                    <span>Total:</span>
                    <span>${total.toLocaleString('es-CL')}</span>
                  </div>
                  <Button variant="success" size="lg" className="w-100">
                    Ir a Pagar (Simulación)
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="w-100 mt-2"
                    onClick={handleVaciarCarrito}
                  >
                    Vaciar Carrito
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </main>
      <PiePagina />
    </div>
  );
}