import React from 'react';
import { Link } from 'react-router-dom';
import './Encabezado.css'

const Encabezado = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
                <Link to="/" className="navbar-brand logo">
            Tienda<span>X</span>del<span>X</span>cazador
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link">Productos</Link>
            </li>
            <li className="nav-item">
              <Link to="/nosotros" className="nav-link">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="nav-link">Blogs</Link>
            </li>
          </ul>

          <ul className="navbar-nav d-flex">
            
            <li className="nav-item dropdown">
              <a 
                className="nav-link fas fa-user dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              ></a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="login.html">Inicio Sesión</a></li>
                <li><a className="dropdown-item" href="registro.html">Registro</a></li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link fas fa-shopping-cart position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-count">
                  0
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Encabezado;