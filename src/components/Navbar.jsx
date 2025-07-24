import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isOnRegister = location.pathname === '/registro';
  const isOnLogin = location.pathname === '/login';

  return (
    <nav className="navbar">
      <div className="logo">EduAPI</div>
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>

        {!isOnRegister && (
          <li>
            <Link to="/registro">Registro</Link>
          </li>
        )}
        {!isOnLogin && (
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
