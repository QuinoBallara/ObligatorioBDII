// Volver.js
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Volver = ({ to, label = 'Volver', ...props }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleClick} {...props}>
            {label}
        </Button>
    );
};

export default Volver;