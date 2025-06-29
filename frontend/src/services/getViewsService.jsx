import axios from 'axios';
import { useAuth } from '../contexts/authContext';
const API_URL = import.meta.env.VITE_API_URL;

const auth = {}
auth.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODI3MTYzIiwianRpIjoiMjI2YWY1OTMtOGI1OC00NjA5LWI1MzMtYjNmZjcyNGQwMjQyIiwiaWF0IjoxNzUxMTY4NDYxLCJleHAiOjE3NTEyMTE2NjF9.Mnvyx0xZPI8Wx-HOJEGu9hbxZV_2rwpMkoChPdfRzOo'

export const getVotosPerLista = async (mesaId) => {
   
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${mesaId}/resultados/lista`,
            { 
                headers: { 
                    'Authorization': `Bearer ${auth.token}`,
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

export const getVotosPerPartido = async (mesaId) => {
   
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${mesaId}/resultados/partido`,
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

export const getVotosPerCandidato = async (mesaId) => {
    
    try {
        const response = await axios.get(
            `${API_URL}/mesa/${mesaId}/resultados/candidato`,
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