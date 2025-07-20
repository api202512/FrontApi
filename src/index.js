import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/home.css';
import { AuthProvider } from './../src/context/AuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (<AuthProvider>
    <App />
  </AuthProvider>)
);