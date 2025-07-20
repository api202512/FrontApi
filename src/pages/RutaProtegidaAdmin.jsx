
import { Navigate, Outlet } from 'react-router-dom';

export default function RutaProtegidaAdmin() {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.rol === 'admin') {
      return <Outlet />;
    } else if (payload.rol === 'usuario') {
      return <Outlet />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }
}
