import { createContext, useContext, useState } from 'react'

export const VotoContext = createContext();

export const useVoto = () => {
    const context = useContext(VotoContext);
    if (!context) {
        throw new Error('useVoto must be used within a VotoProvider');
    }
    return context;
};

export const VotoProvider = ({ children }) => {
    const [voto, setVoto] = useState(''); // Estado inicial vacío
    const [modal, setModal] = useState(false); // Estado del modal

    const value = {
        voto,
        setVoto,
        modal,
        setModal
    };

    return (
        <VotoContext.Provider value={value}>
            {children}
        </VotoContext.Provider>
    );
};