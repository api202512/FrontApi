// pages/admin/CrearAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [claveSecreta, setClaveSecreta] = useState('');
  const [rol] = useState('admin');

  const crearAdmin = async (e) => {
    e.preventDefault();

    try {
  const res = await fetch('http://localhost:3000/api/login/crear-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, claveSecreta, rol }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al crear admin');

  alert('Administrador creado correctamente');
  navigate('/login');
} catch (error) {
  console.error('Error desde el frontend:', error);
  alert(error.message);
}

  };

  return (
    <form onSubmit={crearAdmin} className="form">
      <h2>Crear Administrador</h2>
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Clave secreta" value={claveSecreta} onChange={(e) => setClaveSecreta(e.target.value)} />
      <button type="submit">Crear Admin</button>
    </form>
  );
}
