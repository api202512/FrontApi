import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const hideNavRoutes = ['/perfil', '/admin-panel'];
  
  if (hideNavRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <h2>EduAPI</h2>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/registro">Registro</Link>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </nav>
  );
}