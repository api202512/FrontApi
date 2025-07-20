import { Navigate, Outlet } from 'react-router-dom';

export default function RutaProtegida() {
  console.log('🔒 RutaProtegida ejecutándose...');
  
  const token = localStorage.getItem('token');
  console.log('Token encontrado:', !!token);
  console.log('Token completo:', token);

  if (!token) {
    console.log('❌ No hay token, redirigiendo a login');
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('✅ Token decodificado:', payload);
    
    if (payload.exp) {
      const now = Date.now() / 1000; 
      console.log('Expiración del token:', new Date(payload.exp * 1000));
      console.log('Tiempo actual:', new Date());
      console.log('¿Token expirado?', now >= payload.exp);
      
      if (now >= payload.exp) {
        console.log('❌ Token expirado, limpiando y redirigiendo');
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
      }
    }
    
    console.log('✅ Token válido, permitiendo acceso');
    return <Outlet />;
  } catch (error) {
    console.log('❌ Error al decodificar token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
}