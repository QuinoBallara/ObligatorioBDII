import { createContext, useContext } from 'react'


export const VotoContext = createContext();

export const useVoto = () => {
    const context = useContext(VotoContext);
    if (!context) {
        throw new Error('useVoto must be used within a VotoProvider');
    }
    return context;
};