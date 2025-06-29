import { Typography, Button } from '@mui/material'
import React from 'react'
import Card from '../../components/UI/Votacion/Card'


export default function ConfirmationPage() {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c3e1ff',
        borderRadius: '20px',
        padding: '50px',
        gap: '20px',

    }}>
        <Typography variant="h5" align="center" style={{ marginTop: '20px' }}>
            Felicitaciones! Su voto ha sido registrado exitosamente.
        </Typography>
        <Card></Card>
        <Button variant='contained'>Finalizar</Button>
    </div>
  )
}
