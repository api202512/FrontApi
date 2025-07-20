import React from 'react';

export default function Home() {
  return (
    <div className="home">
      <h1>API para Programa Educativo de Tecnologias de la Informacion</h1>
      <p>Regístrate, genera tu clave y consulta datos académicos desde tu sistema.</p>
      <div className="home-buttons">
        <a href="/registro" className="btn green">Registro</a>
        <a href="/login" className="btn gray">Iniciar Sesión</a>
      </div>
    </div>
  );
}





