import React from 'react';
import Box from '@mui/material/Box';

const ControlPanelButton = ({ children, ...props }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1.2,
            cursor: 'pointer',
            borderRadius: 1,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                backgroundColor: '#e0e0e0',
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            },
            '&:active': {
                transform: 'translateY(0)',
                backgroundColor: '#d0d0d0'
            }
        }}
        {...props}
    >
        {children}
    </Box>
);

export default ControlPanelButton;