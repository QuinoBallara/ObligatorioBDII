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

export const postCiudadanoMesa = async (auth) => {
    try {
        const response = await axios.post(
            `${API_URL}/ciudadanoMesa/mesa/${auth.user.mesaId}/ciudadano/${auth.voter.id}`,
            { headers: { 'Authorization': `Bearer ${auth.token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error posting ciudadano mesa:', error);
        throw error;
    }
}

export const patchEmitioVoto = async (auth) => {
    try {
        const response = await axios.patch(
            `${API_URL}/ciudadanoMesa/mesa/${auth.user.mesaId}/ciudadano/${auth.voter.id}`,
            {},
            { headers: { 'Authorization': `Bearer ${auth.token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error patching emitio_voto:', error);
        throw error;
    }
}

export const postVoto = async (auth, voto, es_observado = false) => {
    try {
        const response = await axios.post(
            `${API_URL}/voto`,
            {...voto, es_observado: es_observado},
            { headers: { 'Authorization': `Bearer ${auth.voter.token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error posting voto:', error);
        throw error;
    }
}

export const handleVoto = async (auth, voto) => {
    try {

        const responseCiudadanoMesa = await postCiudadanoMesa(auth);
        console.log('CiudadanoMesa response:', responseCiudadanoMesa);
        const responsePatch = await patchEmitioVoto(auth);
        console.log('Patch response:', responsePatch);
        const responseVoto = await postVoto(auth, voto, true);
        console.log('Voto response:', responseVoto);

    } catch (error) {

        console.error('Error handling voto:', error);
        const responsePatch = await patchEmitioVoto(auth);
        console.error('Error patching emitio_voto:', responsePatch);
        const responseVoto = await postVoto(auth, voto);
        console.error('Error posting voto:', responseVoto);

    }
}