import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol] = useState('usuario');

  const handleRegister = async (e) => {
    
    const correoValido = /^[a-zA-Z0-9._%+-]+@uthh\.edu\.mx$/;

    if (!correoValido.test(email)) {
      return alert('Solo se permiten correos institucionales');
    }
    e.preventDefault();
    const res = await fetch('https://api-production-1ea4.up.railway.app/login/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        email,
        password,
        rol, 
      })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || 'Error');
    alert('Registro exitoso');
    navigate('/login');
  };

  return (
    <form onSubmit={handleRegister} className="form">
      <h2>Registro</h2>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} type='email'/>
      <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <button type="submit">Registrarse</button>
    </form>
  );
}
