import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('token');
  console.log('TOKEN:', token);

  if (!token) return navigate('/login');

  fetch('http://localhost:3000/api/apikey', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.apiKey) {
        const clave = typeof data.apiKey === 'object' ? data.apiKey.apiKey : data.apiKey;
        setApiKey(clave);
      }

    });
}, [navigate]);


  const copiar = () => {
    navigator.clipboard.writeText(apiKey);
    alert('Clave copiada');
  };

  return (
  <div className="form" style={{ maxWidth: '500px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: '20px' }}>
    <h2>Tu API Key</h2>
    <code
      style={{
        display: 'block',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        wordBreak: 'break-all',
        background: '#f5f5f5',
        padding: '8px',
        borderRadius: '6px',
        marginBottom: '10px',
        textAlign: 'left',
      }}
    >
      {apiKey}
    </code>
    <button onClick={copiar} style={{ margin: '1px', padding: '8px 12px', borderRadius: '4px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Copiar</button>
  </div>
);

}
