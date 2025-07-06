import axios from 'axios';
import { useAuth } from '../contexts/authContext';
const API_URL = import.meta.env.VITE_API_URL;




export const getVotosPerLista = async (auth) => {
   
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${auth.user.mesaId}/resultados/lista`,
            { 
                headers: { 
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json' 
                } 
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getVotosPerPartido = async (auth) => {
   
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${auth.user.mesaId}/resultados/partido`,
            { 
                headers: { 
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json' 
                } 
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getVotosPerCandidato = async (auth) => {
   
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${auth.user.mesaId}/resultados/candidato`,
            { 
                headers: { 
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json' 
                } 
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}