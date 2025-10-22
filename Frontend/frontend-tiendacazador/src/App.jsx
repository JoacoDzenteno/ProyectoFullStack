import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Encabezado from './componentes/Encabezado/Encabezado.jsx';
import PiePagina from './componentes/PiePagina/PiePagina.jsx';
//Importes de Usuario
import HomeUsuario from './componentes/Cuerpo/Usuario/homeUsuario.jsx';
import Nosotros from './componentes/Cuerpo/Usuario/nosotros.jsx'; 
import Contacto from './componentes/Cuerpo/Usuario/Contacto.jsx';
import Blogs from './componentes/Cuerpo/Usuario/Blogs.jsx';
//Importes de administracion
import AdminLayout from './componentes/Cuerpo/Admin/homeAdmin.jsx';
import AccionesAdmin from './componentes/Cuerpo/Admin/AccionesAdmin.jsx';

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    const renderHeader = () => {
        if (!isAdminRoute) {
            return <Encabezado />;
        }
        return null;
    };

    if (isAdminRoute) {
        return (
            <AdminLayout>
                <Routes>
                    {/* RUTAS DE ADMIN: Todas apuntan a AccionesAdmin (Botonera) */}
                    <Route path="/admin/*" element={<AccionesAdmin />} />
                </Routes>
            </AdminLayout>
        );
    }
    return (
        <>
            {renderHeader()}
            
            <main className="content-wrapper">
                <Routes>
                    <Route path="/" element={<HomeUsuario />} /> 
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path='/blogs' element={<Blogs/>} />
                </Routes>
            </main>
            
            <PiePagina />
        </>
    );
}

export default App;