import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const getAuthInitialState = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedIsPresident = localStorage.getItem('isPresident') === 'true';
    return {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken || null,
        isPresident: storedIsPresident,
    };
}

const getIsAuthenticatedInitialState = () => {
    const storedToken = localStorage.getItem('token');
    return storedToken !== null;
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getAuthInitialState());
    const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticatedInitialState());

    const handleLogin = (ci, credencialCivica) => {

    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(auth.user));
        localStorage.setItem('token', auth.token);
        localStorage.setItem('isPresident', auth.isPresident);
        setIsAuthenticated(!!auth.token);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}