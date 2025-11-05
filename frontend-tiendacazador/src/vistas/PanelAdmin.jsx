import { LayoutAdmin } from '../componentes/estructura/LayoutAdmin/LayoutAdmin.jsx';
import { Link } from 'react-router-dom';
import { getEstadisticasServicio } from '../servicios/productoServicio.js'; 
import { useEffect, useState } from 'react';

export function PanelAdmin() {

  const [totalProductos, setTotalProductos] = useState('...');
  const [totalUsuarios, setTotalUsuarios] = useState('...');
  const [stockCritico, setStockCritico] = useState('...');
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const cargarEstadisticas = async () => {
      try {
        const data = await getEstadisticasServicio(); 
        

        setTotalProductos(data.totalProductos);
        setTotalUsuarios(data.totalUsuarios);
        setStockCritico(data.stockCritico);

      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
        setError("No se pudieron cargar los datos.");
      }
    };

    cargarEstadisticas();
  }, []); 


  if (error) {
    return (
      <LayoutAdmin titulo="Error">
        <div className="alert alert-danger p-4">{error}</div>
      </LayoutAdmin>
    );
  }
  
  return (
    <LayoutAdmin titulo="Panel de Control">
      <div className="contenedor-estadisticas p-4">
        <h2>Estadísticas</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">Total de Productos</div>
              <div className="card-body">
                <h5 className="card-title">{totalProductos}</h5> 
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-header">Total de Usuarios</div>
              <div className="card-body">
                <h5 className="card-title">{totalUsuarios}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger mb-3">
              <div className="card-header">Stock Crítico ({'<'} 5)</div>
              <div className="card-body">
                <h5 className="card-title">{stockCritico}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contenedor-accesos p-4">
        <h2>Accesos Rápidos</h2>
        <div className="botones-admin">
          <Link to="/admin/productos" className="btn-admin">
            Ver Productos
          </Link>
          <Link to="/admin/usuarios" className="btn-admin">
            Ver Usuarios
          </Link>
        </div>
      </div>
    </LayoutAdmin>
  );
}