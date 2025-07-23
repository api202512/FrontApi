import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return navigate('/login');

     fetch('https://api-production-1ea4.up.railway.app/api-uso', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.mensaje || 'Error al cargar registros');
        }
        return res.json();
      })
      .then((data) => setRegistros(data))
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    console.log('🚪 Cerrando sesión desde admin panel...');
    
    localStorage.removeItem('token');
    
    console.log('✅ Sesión cerrada');

    navigate('/login');
  };

  if (loading) return <p>Cargando registros...</p>;

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <button 
        onClick={handleLogout}
        style={{ 
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '6px 12px',
          borderRadius: '4px',
          background: '#dc3545',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Cerrar Sesión
      </button>

      <h2>Panel de Administrador - Registros de Uso de API Keys</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={thStyle}>Usuario</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>API Key</th>
            <th style={thStyle}>Endpoint</th>
            <th style={thStyle}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={tdStyle}>{r.userId?.nombre || 'Sin nombre'}</td>
              <td style={tdStyle}>{r.userId?.email || 'N/A'}</td>
              <td style={tdStyle}>{r.apiKey}</td>
              <td style={tdStyle}>{r.endpoint}</td>
              <td style={tdStyle}>{new Date(r.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};