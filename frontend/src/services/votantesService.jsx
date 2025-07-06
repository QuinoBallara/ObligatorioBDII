import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getVotantes = async (auth) => {
    try {
        const response = await axios.get(
            `${API_URL}/CiudadanoMesa/${auth.user.mesaId}`,
            { headers: { 'Authorization': `Bearer ${auth.token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching votantes:', error);
        throw error;
    }
}