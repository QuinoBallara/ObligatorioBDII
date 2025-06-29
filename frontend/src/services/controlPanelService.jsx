import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const getTableInfo = async (tableId, token) => {
    try {
        const result = await axios.get(`${API_URL}/mesa/${tableId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return result.data;
    }
    catch (error) {
        console.error('Error fetching table info:', error);
        throw error;
    }

}

export const changeTableState = async (tableId, token, newState) => {
    try {
        console.log('Changing table state for tableId:', tableId, 'to newState:', newState);
        const result = await axios.patch(`${API_URL}/mesa/${tableId}`, {
            'esta_abierta': newState ? true : false
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log('Table state changed:', result.data);
        return result.data;
    }
    catch (error) {
        console.error('Error changing table state:', error);
        throw error;
    }
}

