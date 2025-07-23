import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://api-production-db94.up.railway.app/login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Error al iniciar sesión');
        return;
      }

      if (!data.token) {
        alert('No se recibió token del servidor');
        return;
      }

      localStorage.setItem('token', data.token);

      const tokenParts = data.token.split('.');
      if (tokenParts.length !== 3) {
        alert('Token inválido');
        return;
      }

      alert('Inicio de sesión exitoso');
      if (data.usuario.rol === 'admin') {
        navigate('/admin-panel');
      } else if (data.usuario.rol === 'usuario') {
        navigate('/perfil'); 
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Fallo al conectar con el servidor');
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Iniciar sesión</h2>
      <input
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
