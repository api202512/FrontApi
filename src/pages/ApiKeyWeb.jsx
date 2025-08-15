import React, { useState } from 'react';

export default function ApiKeyWeb() {
  const [apiKey, setApiKey] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async (endpoint) => {
    try {
      const res = await fetch(`https://api-yuu7.onrender.com/${endpoint}`, {
        headers: {
          'x-api-key': apiKey,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mensaje || 'Error al consultar');
      }

      const result = await res.json();
      setData(result);
      setError('');
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Consulta pública con API Key</h2>
      <input
        placeholder="Pega tu API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => fetchData('usuarios')}>Obtener Usuarios</button>
        <button onClick={() => fetchData('materias')} style={{ marginLeft: 10 }}>Obtener Materias</button>
        <button onClick={() => fetchData('ciclo-escolar')} style={{ marginLeft: 10 }}>Obtener Ciclos</button>
        <button onClick={() => fetchData('aulas')} style={{ marginLeft: 10 }}>Obtener Aulas</button>
        <button onClick={() => fetchData('alumno')} style={{ marginLeft: 10 }}>Obtener Alumnos</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '5px', overflowX: 'auto' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
