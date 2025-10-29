// En: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { AuthProvider } from './contexto/AuthContexto.jsx'; // (Esto lo hicimos en el paso anterior)

// --- TUS ÚNICAS IMPORTACIONES DE CSS ---
import 'bootstrap/dist/css/bootstrap.min.css';
import './recursos/estilos/global.css';

// ¡ASEGÚRATE DE QUE NO HAYA NINGÚN 'import ./.../estilosAdmin.css' AQUÍ!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      </AuthProvider>
  </React.StrictMode>,
);