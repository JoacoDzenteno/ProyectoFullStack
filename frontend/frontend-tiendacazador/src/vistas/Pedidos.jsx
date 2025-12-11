import React, { useEffect, useState } from 'react';
import { BarraNavegacion } from '../componentes/estructura/BarraNavegacion/BarraNavegacion.jsx';
import { PiePagina } from '../componentes/estructura/PiePagina/PiePagina.jsx';
import { useAuth } from '../contexto/AuthContexto.jsx';
import { getPedidosServicio } from '../servicios/CarritoServicio.js';
import {
  Container,
  Table,
  Alert,
  Spinner,
  Button,
  Collapse,
  Card,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../servicios/api.js';



export function Pedidos() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [openDetalleId, setOpenDetalleId] = useState(null);

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }

    const cargarPedidos = async () => {
      try {
        setCargando(true);
        setError('');
        const data = await getPedidosServicio();
        setPedidos(data || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.mensaje ||
            err.response?.data ||
            'Error al cargar pedidos'
        );
      } finally {
        setCargando(false);
      }
    };

    cargarPedidos();
  }, [usuario, navigate]);

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString('es-CL', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  const formatearMonto = (monto) => {
    if (monto == null) return '$0';
    return `$${monto.toLocaleString('es-CL')}`;
  };

  const handleDescargarBoleta = async (pedidoId) => {
  try {
    setError(''); // si tienes state de error
    // Pedimos el PDF al backend con axios + token
    const resp = await api.get(`/pedidos/${pedidoId}/boleta/pdf`, {
      responseType: 'blob',
    });

    // Creamos un blob y lo abrimos en una nueva pestaña
    const blob = new Blob([resp.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (err) {
    console.error(err);
    setError(
      err.response?.data?.mensaje ||
      err.response?.data ||
      'Error al descargar la boleta'
    );
  }
};

  return (
    <div className="layout-pagina">
      <BarraNavegacion />
      <main className="contenido-principal">
        <Container className="mt-4 mb-4">
          <h1 className="titulosPg">Mis Pedidos</h1>

          {cargando && (
            <div className="text-center my-4">
              <Spinner animation="border" role="status" />
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {!cargando && pedidos.length === 0 && !error && (
            <Alert variant="info" className="mt-3">
              Aún no tienes pedidos registrados.
              <div className="mt-3">
                <Link to="/productos">
                  <Button variant="primary">Ir a la tienda</Button>
                </Link>
              </div>
            </Alert>
          )}

          {pedidos.length > 0 && (
            <Table striped bordered hover responsive className="mt-3">
              <thead className="table-dark">
                <tr>
                  <th>N° Pedido</th>
                  <th>N° Boleta</th> {/* NUEVO */}
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p) => (
                  <React.Fragment key={p.id}>
                    <tr>
                      <td>{p.id}</td>
                      {/* Mostrar número de boleta si existe */}
                      <td>{p.boleta?.numero ?? '-'}</td>
                      <td>{formatearFecha(p.fecha)}</td>
                      <td>{formatearMonto(p.total)}</td>
                      <td>
                      {p.boleta ? (
                        <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleDescargarBoleta(p.id)}
                        >
                          Descargar boleta
                        </Button>

                        ) : (
                        <span className="text-muted">Sin boleta</span>
                      )}
                    </td>

                    </tr>
                    <tr>
                      <td colSpan={5} style={{ padding: 0, border: 'none' }}>
                        <Collapse in={openDetalleId === p.id}>
                          <div>
                            <Card className="m-2">
                              <Card.Body>
                                <h5>Detalle del pedido #{p.id}</h5>

                                {/* Info de boleta si quieres mostrar más detalle */}
                                {p.boleta && (
                                  <div className="mb-3">
                                    <strong>Boleta N°:</strong>{' '}
                                    {p.boleta.numero}
                                    <br />
                                    <strong>Neto:</strong>{' '}
                                    {formatearMonto(p.boleta.neto)}
                                    <br />
                                    <strong>IVA:</strong>{' '}
                                      {formatearMonto(p.boleta.iva)}
                                    <br />
                                    <strong>Total boleta:</strong>{' '}
                                      {formatearMonto(p.boleta.total)}
                                  </div>
                                )}

                                {(!p.detalles || p.detalles.length === 0) ? (
                                  <p className="text-muted">Sin detalles.</p>
                                ) : (
                                  <Table size="sm" responsive>
                                    <thead>
                                      <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                        <th>Subtotal</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {p.detalles.map((d) => (
                                        <tr key={d.id}>
                                          <td>{d.producto?.nombre}</td>
                                          <td>{d.cantidad}</td>
                                          <td>
                                            {formatearMonto(
                                              d.precioUnitario
                                            )}
                                          </td>
                                          <td>
                                            {formatearMonto(
                                              (d.precioUnitario || 0) *
                                                (d.cantidad || 0)
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                )}
                              </Card.Body>
                            </Card>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </main>
      <PiePagina />
    </div>
  );
}
