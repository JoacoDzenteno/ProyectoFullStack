import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { AuthProvider } from './contexto/AuthContexto.jsx';
import { CarritoProvider } from './contexto/CarritoContexto.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './recursos/estilos/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>,
);