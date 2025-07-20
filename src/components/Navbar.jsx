import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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

