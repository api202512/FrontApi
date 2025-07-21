import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Puedes seguir usando esta variable para la URL
});

// Interceptor para agregar la API Key del usuario desde localStorage
api.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem('apiKey'); // 🔑 Obtenemos la API Key dinámica del usuario
    if (apiKey) {
        config.headers['x-api-key'] = apiKey;
    }
    return config;
});

export default api;
