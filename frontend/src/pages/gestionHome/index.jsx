import React from 'react'
import { Box, Card, Container, Typography } from '@mui/material'
import { useAuth } from '../../contexts/authContext'

function GestionHome() {
    const { auth } = useAuth()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, m: '15vh auto 0vh auto', width: '100%' }}>
            <Typography variant="h4" component="h1" fontWeight={'bold'} sx={{ textAlign: 'center', width: '90%' }}>
                Bienvenido al sistema de gestión electoral de la comisión receptora de votos
            </Typography>
            <Typography variant="h6" >
                Mesa Nº {auth ? auth.user.mesaId : 'No disponible'}
            </Typography>
        </Box>
    )
}

export default GestionHome