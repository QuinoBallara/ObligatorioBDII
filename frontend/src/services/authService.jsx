import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const loginCiudadano = async (ci = null, credencialCivica = null) => {
    try {
        const payload = {};
        if (ci != null) payload.id = ci;
        if (credencialCivica != null) payload.credencialCivica = credencialCivica;
        const response = await axios.post(
            `${API_URL}/auth/login/ciudadano`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const loginPresidente = async (ci, credencialCivica) => {
    try {
        const payload = {
            id: ci,
            credencialCivica: credencialCivica
        }
        const response = await axios.post(
            `${API_URL}/auth/login/presidente`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async (token) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/logout`,
            {},
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

export const validateToken = async (token) => {
    try {
        const response = await axios.get(
            `${API_URL}/auth/validate`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const checkEmitioVoto = async (auth) => {
    try {
        const response = await axios.get(
            `${API_URL}/ciudadanoMesa/mesa/${auth.user.mesaId}/ciudadano/${auth.voter.id}`,
            { headers: { 'Authorization': `Bearer ${auth.token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error checking if voto was emitted:', error);
        throw error;
    }
}

export const fecthMesa = async (auth) => {
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${auth.user.mesaId}`,
            { headers: { 'Authorization': `Bearer ${auth.token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching mesa:', error);
        throw error;
    }
}