import React, { useEffect, useState } from 'react';
import { LayoutAdmin } from '../../../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Table, Alert, Spinner, Button, Collapse, Card } from 'react-bootstrap';
import { getPedidosAdminServicio } from '../../../servicios/pedidoAdminServicio.js';

export function ListaPedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [openDetalleId, setOpenDetalleId] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        setError('');
        const data = await getPedidosAdminServicio();
        setPedidos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.mensaje ||
            err.response?.data ||
            'Error al cargar pedidos.'
        );
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

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

  return (
    <LayoutAdmin titulo="Compras realizadas">
      <h2>Listado de compras</h2>

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
          No hay pedidos registrados.
        </Alert>
      )}

      {pedidos.length > 0 && (
        <div
          style={{
            maxHeight: '65vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingRight: '5px'
          }}
        >
          <Table striped bordered hover responsive className="mt-3">
            <thead className="table-dark">
              <tr>
                <th>N° Pedido</th>
                <th>N° Boleta</th>
                <th>Cliente</th>
                <th>Email</th>
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
                    <td>{p.boleta?.numero ?? '-'}</td>
                    <td>{p.usuario?.nombre} {p.usuario?.apellidos}</td>
                    <td>{p.usuario?.email}</td>
                    <td>{formatearFecha(p.fecha)}</td>
                    <td>{formatearMonto(p.total)}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          setOpenDetalleId(openDetalleId === p.id ? null : p.id)
                        }
                      >
                        {openDetalleId === p.id ? 'Ocultar' : 'Ver detalles'}
                      </Button>
                    </td>
                  </tr>

                  {/* PANEL OCULTO */}
                  <tr>
                    <td colSpan={7} style={{ padding: 0, border: 'none' }}>
                      <Collapse in={openDetalleId === p.id}>
                        <div>
                          <Card className="m-2">
                            <Card.Body>

                              {/* FILA ENCABEZADO */}
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Detalle del pedido #{p.id}</h5>

                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => setOpenDetalleId(null)}
                                >
                                  Cerrar
                                </Button>
                              </div>

                              {/* INFO BOLETA */}
                              {p.boleta && (
                                <div className="mb-3">
                                  <strong>Boleta N°:</strong> {p.boleta.numero}
                                  <br />
                                  <strong>Neto:</strong> {formatearMonto(p.boleta.neto)}
                                  <br />
                                  <strong>IVA:</strong> {formatearMonto(p.boleta.iva)}
                                  <br />
                                  <strong>Total boleta:</strong>{' '}
                                  {formatearMonto(p.boleta.total)}
                                </div>
                              )}

                              {/* DETALLES */}
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
                                        <td>{formatearMonto(d.precioUnitario)}</td>
                                        <td>
                                          {formatearMonto(
                                            (d.precioUnitario || 0) * (d.cantidad || 0)
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
        </div>
      )}
    </LayoutAdmin>
  );
}