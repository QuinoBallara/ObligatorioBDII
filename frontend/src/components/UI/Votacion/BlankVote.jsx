import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useVoto, VotoContext } from '../../../contexts/votoContext';

export default function BlankVote() {

  const { voto, setVoto } = useVoto(VotoContext);

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
        <Button onClick={() => {setVoto("");}} variant='contained' color='primary'>Votar en blanco</Button>
    </div>
  )
}
