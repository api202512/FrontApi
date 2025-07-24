import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const hideNavRoutes = ['/perfil', '/admin-panel'];
  
  if (hideNavRoutes.includes(location.pathname)) {
    return null;
  }

  const isOnRegister = location.pathname === '/registro';
  const isOnLogin = location.pathname === '/login';

  return (
    <nav className="navbar">
      <h2>EduAPI</h2>
      <div>
        <Link to="/">Inicio</Link>
        {!isOnRegister && (
            <Link to="/registro">Registro</Link>
        )}
        {!isOnLogin && (
            <Link to="/login">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
}