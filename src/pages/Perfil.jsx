// src/pages/Perfil.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('TOKEN:', token);

    if (!token) return navigate('/login');

    // Obtener o generar API key
    fetch('https://backapi-jnqq.onrender.com/apikey', {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.apiKey) {
          const clave = typeof data.apiKey === 'object' ? data.apiKey.apiKey : data.apiKey;
          setApiKey(clave);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error obteniendo API key:', error);
        setLoading(false);
      });
  }, [navigate]);

  const copiar = () => {
    navigator.clipboard.writeText(apiKey);
    alert('API Key copiada al portapapeles');
  };

  const handleLogout = () => {
    console.log('🚪 Cerrando sesión desde perfil...');

    localStorage.removeItem('token');
    
    console.log('✅ Sesión cerrada');

    navigate('/login');
  };

  if (loading) {
    return (
      <div className="form" style={{ 
        maxWidth: '500px', 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
        padding: '20px' 
      }}>
        <div style={{ textAlign: 'center' }}>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="form" style={{ 
      maxWidth: '500px', 
      justifyContent: 'center', 
      alignContent: 'center', 
      alignItems: 'center', 
      padding: '20px',
      position: 'relative'
    }}>
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
        {apiKey || 'Cargando...'}
      </code>
      <button 
        onClick={copiar} 
        disabled={!apiKey}
        style={{ 
          margin: '1px', 
          padding: '8px 12px', 
          borderRadius: '4px', 
          background: apiKey ? '#007bff' : '#6c757d', 
          color: '#fff', 
          border: 'none', 
          cursor: apiKey ? 'pointer' : 'not-allowed' 
        }}
      >
        Copiar
      </button>
    </div>
  );
}