import React, { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/api-uso', {
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
  }, []);

  if (loading) return <p>Cargando registros...</p>;

  return (
    <div style={{ padding: '2rem' }}>
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
              <td style={tdStyle}>{r.usuario?.nombre || 'Sin nombre'}</td>
              <td style={tdStyle}>{r.usuario?.email || 'N/A'}</td>
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
