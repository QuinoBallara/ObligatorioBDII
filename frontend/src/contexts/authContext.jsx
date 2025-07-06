import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginCiudadano, loginPresidente, logout, validateToken } from '../services/authService'; // Use ES6 import
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

const getAuthInitialState = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedVoter = localStorage.getItem('voter');

    let user = null;
    let voter = null;
    
    try {
        user = (storedUser && storedUser !== 'null' && storedUser !== 'undefined') ? JSON.parse(storedUser) : null;
    } catch (e) {
        console.warn('Failed to parse stored user:', e);
        user = null;
    }
    
    try {
        voter = (storedVoter && storedVoter !== 'null' && storedVoter !== 'undefined') ? JSON.parse(storedVoter) : null;
    } catch (e) {
        console.warn('Failed to parse stored voter:', e);
        voter = null;
    }
    
    return {
        user,
        token: (storedToken && storedToken !== 'null' && storedToken !== 'undefined') ? storedToken : null,
        voter
    };
}

const getIsAuthenticatedInitialState = () => {
    const storedToken = localStorage.getItem('token');
    return storedToken !== null && storedToken !== 'null' && storedToken !== 'undefined';
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuthInitialState());
    const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticatedInitialState());
    const [isValidating, setIsValidating] = useState(false);

    const handleLoginCiudadano = async (ci, credencialCivica) => {
        try {
            const response = await loginCiudadano(ci, credencialCivica);
            setAuth(prev => ({
                ...prev,
                voter: {
                    id: response.user.id,
                    credencialCivica: response.user.credencialCivica,
                    token: response.token,
                },
            }));
        } catch (error) {
            console.error('Login failed:', error.response);
            alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            setAuth(prev => ({ ...prev, voter: null }));
        }
    }

    const handleLoginPresidente = async (ci, credencialCivica) => {
        try {
            const response = await loginPresidente(ci, credencialCivica);
            setAuth({
                user: {
                    id: response.user.ciudadano_id,
                    mesaId: response.user.mesa_id,
                },
                token: response.token,
                voter: null
            });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error.response);
            alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            setAuth({ user: null, token: null, voter: null });
            setIsAuthenticated(false);
        }
    }

    const handleLogoutPresidente = async () => {
        try {
            if (auth.token) {
                await logout(auth.token);
            }
        } catch (error) {
            console.warn('Server logout failed:', error.response);
        } finally {
            setAuth({ user: null, token: null, voter: null });
            setIsAuthenticated(false);
        }
    }

    const handleLogoutVoter = async () => {
        try {
            if (auth.voter && auth.voter.token) {
                await logout(auth.voter.token);
            }
        }
        catch (error) {
            console.warn('Server logout failed:', error.response);
        } finally {
            setAuth(prev => ({ ...prev, voter: null }));
        }
    }

    const validateCurrentToken = async () => {
        setIsValidating(true);
        try {
            // Check presidente token
            if (auth.token) {
                await validateToken(auth.token);
                setIsAuthenticated(true);
                return true;
            }
            
            // Check voter token
            if (auth.voter && auth.voter.token) {
                await validateToken(auth.voter.token);
                return true;
            }
            
            // No valid tokens found
            clearAuth();
            return false;
        } catch (error) {
            console.warn('Token validation failed:', error);
            clearAuth();
            return false;
        } finally {
            setIsValidating(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        const intervalId = setInterval(async () => {
            await validateCurrentToken();
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearInterval(intervalId);
    }, [isAuthenticated]);

    const clearAuth = () => {
        setAuth({ user: null, token: null, voter: null });
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('voter');
    };

    // Validate token on app load
    useEffect(() => {
        const initializeAuth = async () => {
            if (auth.token || (auth.voter && auth.voter.token)) {
                await validateCurrentToken();
            }
        };
        
        initializeAuth();
    }, []); // Only run once on mount


    useEffect(() => {
        if (auth.user && auth.user !== undefined) {
            localStorage.setItem('user', JSON.stringify(auth.user));
        } else {
            localStorage.removeItem('user');
        }
        
        if (auth.token && auth.token !== undefined && auth.token !== 'undefined') {
            localStorage.setItem('token', auth.token);
        } else {
            localStorage.removeItem('token');
        }
        
        if (auth.voter && auth.voter !== undefined) {
            localStorage.setItem('voter', JSON.stringify(auth.voter));
        } else {
            localStorage.removeItem('voter');
        }
        
        setIsAuthenticated(auth.token !== null && auth.token !== 'null' && auth.token !== undefined && auth.token !== 'undefined');
    }, [auth]);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            isAuthenticated,
            setIsAuthenticated,
            isValidating,
            handleLoginCiudadano,
            handleLoginPresidente,
            handleLogoutPresidente,
            handleLogoutVoter
        }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}