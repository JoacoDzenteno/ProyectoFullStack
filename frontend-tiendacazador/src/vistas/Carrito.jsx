import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { useCarrito } from '../contexto/CarritoContexto.jsx';
import { useAuth } from '../contexto/AuthContexto.jsx';
import { Container, Row, Col, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { confirmarPedidoServicio } from '../servicios/CarritoServicio.js';
import '../recursos/estilos/global.css';

export function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad,
    cargando,
    error
  } = useCarrito();

  const { usuario } = useAuth();

  const [mensaje, setMensaje] = useState('');
  const [errorConfirmar, setErrorConfirmar] = useState('');
  const [cargandoConfirmar, setCargandoConfirmar] = useState(false);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleVaciarCarrito = async () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      await vaciarCarrito();
      setMensaje('Carrito vaciado correctamente');
    }
  };

  const handleIncrementar = async (item) => {
    await actualizarCantidad(item.id, item.cantidad + 1);
  };

  const handleDecrementar = async (item) => {
    if (item.cantidad <= 1) {
      if (
        window.confirm(
          'La cantidad será 0, ¿deseas eliminar el producto del carrito?'
        )
      ) {
        await eliminarDelCarrito(item.id);
      }
      return;
    }
    await actualizarCantidad(item.id, item.cantidad - 1);
  };

  const handleConfirmarPedido = async () => {
    setErrorConfirmar('');
    setMensaje('');

    if (!usuario) {
      setErrorConfirmar('Debes iniciar sesión para confirmar la compra.');
      return;
    }

    if (carrito.length === 0) {
      setErrorConfirmar('Tu carrito está vacío.');
      return;
    }

    try {
      setCargandoConfirmar(true);
      const pedido = await confirmarPedidoServicio();

      const numBoleta = pedido.boleta?.numero ?? '-';
      const totalPedido = pedido.total ?? 0;

      setMensaje(
        `Pedido confirmado correctamente. Nº de pedido: ${pedido.id}, ` +
          `Boleta N° ${numBoleta}, Total: $${totalPedido.toLocaleString(
            'es-CL'
          )}`
      );

      await vaciarCarrito();
    } catch (err) {
      console.error(err);
      setErrorConfirmar(
        err.response?.data?.mensaje ||
          err.response?.data ||
          'Error al confirmar el pedido.'
      );
    } finally {
      setCargandoConfirmar(false);
    }
  };

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        <Container className="carrito-container">
          <h1 className="titulosPg">Tu Carrito de Compras</h1>

          {cargando && (
            <div className="text-center my-3">
              <Spinner animation="border" role="status" />
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mt-2">
              {error}
            </Alert>
          )}

          {mensaje && (
            <Alert variant="success" className="mt-2">
              {mensaje}
            </Alert>
          )}

          {errorConfirmar && (
            <Alert variant="danger" className="mt-2">
              {errorConfirmar}
            </Alert>
          )}

          {carrito.length === 0 ? (
            <Alert variant="info" className="text-center mt-3">
              Tu carrito está vacío.
              <div className="mt-3">
                <Link to="/productos">
                  <Button variant="primary">Ir a la Tienda</Button>
                </Link>
              </div>
            </Alert>
          ) : (
            <Row className="mt-3">
              <Col lg={8}>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="carrito-tabla"
                >
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
                          {item.imagen && (
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              className="carrito-img"
                            />
                          )}
                          <span className="carrito-nombre">
                            {item.nombre}
                          </span>
                        </td>
                        <td>${item.precio.toLocaleString('es-CL')}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2 justify-content-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleDecrementar(item)}
                            >
                              -
                            </Button>
                            <span>{item.cantidad}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleIncrementar(item)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>
                          $
                          {(item.precio * item.cantidad).toLocaleString(
                            'es-CL'
                          )}
                        </td>
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

                  <Button
                    variant="success"
                    size="lg"
                    className="w-100 mt-3"
                    onClick={handleConfirmarPedido}
                    disabled={cargandoConfirmar}
                  >
                    {cargandoConfirmar
                      ? 'Confirmando...'
                      : 'Confirmar Compra'}
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="w-100 mt-2"
                    onClick={handleVaciarCarrito}
                  >
                    Vaciar Carrito
                  </Button>

                  {!usuario && (
                    <Alert variant="warning" className="mt-3">
                      Para que tu compra quede registrada como pedido, por
                      favor inicia sesión o regístrate.
                    </Alert>
                  )}
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
