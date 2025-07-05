import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';

const LogoutButton = ({ ...props }) => {
    const navigate = useNavigate();
    const { handleLogoutVoter, auth } = useAuth();

    const handleClick = async () => {
        await handleLogoutVoter();
    };

    useEffect(() => {
        if (auth && !auth.voter) {
            navigate('/votacion/login');
        }
    }, [auth]);

    return (
        <Button variant="contained" color="primary" onClick={handleClick} {...props}>
            Salir
        </Button>
    );
};

export default LogoutButton;