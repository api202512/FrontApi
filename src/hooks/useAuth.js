import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        isAdmin: false,
        loading: true
    });

    useEffect(() => {
        const validateToken = () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setAuth({ isAuthenticated: false, isAdmin: false, loading: false });
                return;
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));

                // Verificar expiración
                if (payload.exp && Date.now() >= payload.exp * 1000) {
                    localStorage.removeItem('token');
                    setAuth({ isAuthenticated: false, isAdmin: false, loading: false });
                    return;
                }

                setAuth({
                    isAuthenticated: true,
                    isAdmin: payload.rol === 'admin',
                    loading: false
                });
            } catch (error) {
                console.error('Error validating token:', error);
                localStorage.removeItem('token');
                setAuth({ isAuthenticated: false, isAdmin: false, loading: false });
            }
        };

        validateToken();

        window.addEventListener('storage', validateToken);
        return () => window.removeEventListener('storage', validateToken);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ isAuthenticated: false, isAdmin: false, loading: false });
    };

    return { ...auth, logout };
};