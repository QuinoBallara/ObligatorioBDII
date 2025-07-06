import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getListas = async (auth) => {

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
    console.log(mesa)
    console.log(auth)
    
    const fecthListas = async (mesa, auth) => {
        try {
            const response = await axios.get(
                `${API_URL}/listaPresidencial/eleccion/${mesa.eleccion_id}`,
                {departamento_id: mesa.departamento_id},
                {
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching listas:', error);
            throw error;
        }
    }
    
    const listas = await fecthListas(mesa, auth);
    return listas;
}