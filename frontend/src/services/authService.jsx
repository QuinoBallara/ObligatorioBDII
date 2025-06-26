const axios = (import('axios')).default;
const API_URL = import.meta.env.API_URL;

export const loginCiudadano = async (ci = null, credencialCivica = null) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/login`,
            { ci: ci == null ? null : ci, credencialCivica: credencialCivica == null ? null : credencialCivica },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

export const loginPresidente = async (ci, credencialCivica) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/loginPresidente`,
            { ci, credencialCivica },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during presidente login:', error);
        throw error;
    }
}

export const logout = (token) => {
    try {
        const response = axios.post(
            `${API_URL}/auth/logout`,
            {},
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        if (!response.ok) {
            throw new Error('Logout failed');
        }
        const data = response.json();
        return data;
    }
    catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}