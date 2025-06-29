import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BlankVote() {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c3e1ff',
        borderRadius: '20px',
        padding: '20px',
        gap: '20px',}}>
        <Typography component="div" style={{ textAlign: 'center'}}>
            ¿Desea votar en blanco?
        </Typography>
        <Button variant='contained' color='primary'>Votar en blanco</Button>
    </div>
  )
}
