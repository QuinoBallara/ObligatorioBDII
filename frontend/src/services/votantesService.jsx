import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getVotantes = async (auth) => {
    console.log('Fetching votantes for mesaId:', auth.user);
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${auth.user.mesaId}/ciudadano`,
            { headers: { 'Authorization': `Bearer ${auth.token}` } }
        );
        console.log('Votantes response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching votantes:', error);
        throw error;
    }
}