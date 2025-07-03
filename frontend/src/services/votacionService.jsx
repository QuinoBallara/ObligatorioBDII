import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getListas = async (auth) => {

    console.log('Fetching listas for mesa:', auth.user.mesaId);
    console.log('Using token:', auth.token);

    const fecthMesa = async (auth) => {
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
    const mesa = await fecthMesa(auth);
    const fecthListas = async (mesa) => {
        try {
            const response = await axios.get(
                `${API_URL}/listaPresidencial/eleccion/${mesa.eleccion_id}`,
                { headers: { 'Authorization': `Bearer ${auth.token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching listas:', error);
            throw error;
        }
    }
    const listas = await fecthListas(mesa);
    return listas;
}