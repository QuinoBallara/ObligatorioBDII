import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const loginCiudadano = async (ci = null, credencialCivica = null) => {
    try {
        const payload = {};
        if (ci != null) payload.id = ci;
        if (credencialCivica != null) payload.credencialCivica = credencialCivica;
        console.log('API_URL:', API_URL);
        console.log('Full URL:', `${API_URL}/auth/login/ciudadano`);
        console.log('Payload being sent:', payload);
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
        console.log('Login response:', response.data);
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