import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginCiudadano, loginPresidente, logout } from '../services/authService'; // Use ES6 import
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

const getAuthInitialState = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedVoter = localStorage.getItem('voter');
    return {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken || null,
        voter: storedVoter ? JSON.parse(storedVoter) : null
    };
}

const getIsAuthenticatedInitialState = () => {
    const storedToken = localStorage.getItem('token');
    return storedToken !== null || storedToken !== 'null';
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuthInitialState());
    const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticatedInitialState());

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
            console.log('Attempting to login as presidente with CI:', ci, 'and credencialCivica:', credencialCivica);
            const response = await loginPresidente(ci, credencialCivica);
            setAuth({
                user: {
                    id: response.user.id,
                    mesaId: response.user.mesa_id,
                },
                token: response.token,
                voter: null
            });
            console.log('Login successful:', response);
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
                await logout();
            }
        } catch (error) {
            console.warn('Server logout failed:', error.response);
        } finally {
            setAuth({ user: null, token: null });
            setIsAuthenticated(false);
        }
    }

    const handleLogoutVoter = async () => {
        try {
            if (auth.voter && auth.voter.token) {
                await logout();
            }
        }
        catch (error) {
            console.warn('Server logout failed:', error.response);
        } finally {
            setAuth({ ...prev, voter: null });
        }

        useEffect(() => {
            localStorage.setItem('user', JSON.stringify(auth.user));
            localStorage.setItem('token', auth.token);
            localStorage.setItem('voter', JSON.stringify(auth.voter));
            setIsAuthenticated(auth.token !== null && auth.token !== 'null');
        }, [auth]);

        return (
            <AuthContext.Provider value={{
                auth,
                setAuth,
                isAuthenticated,
                setIsAuthenticated,
                handleLoginCiudadano,
                handleLoginPresidente,
                handleLogoutPresidente,
                handleLogoutVoter
            }}>
                {children}
            </AuthContext.Provider>
        );
    }

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export const getVotosPerLista = async (mesaId, token) => {
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${mesaId}/resultados/lista`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getVotosPerPartido = async (mesaId, token) => {
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${mesaId}/resultados/partido`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getVotosPerCandidato = async (mesaId, token) => {
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${mesaId}/resultados/candidato`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}