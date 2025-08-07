import React, { use } from 'react'
import BlankVote from '../../components/UI/Votacion/BlankVote'
import EpicSelector from '../../components/UI/Votacion/EpicSelector'
import Button from '@mui/material/Button'

import { useVoto } from '../../contexts/votoContext'
import Card from '../../components/UI/Votacion/Card'
import { Typography } from '@mui/material'

export default function RightContent() {

  const {voto, modal, setModal} = useVoto();



  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75vh', // Take full viewport height
        padding: '1rem',
        boxSizing: 'border-box',
        minHeight: '200px', // Minimum height to prevent overcrowding
        }}>
        <BlankVote />
        <EpicSelector />
        <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
          <Typography variant='h6' >
            Lista seleccionada para votar:
          </Typography>
          {typeof voto.lista_id === 'number' ? <Card {...voto} /> : <Typography variant='subtitle1' style={{color: 'gray'}}>VOTO EN BLANCO/ANULADO</Typography>}
        </div>
        <Button onClick={()=> {setModal(!modal);}} variant='contained' >Finalizar votación</Button>
    </div>
  )
}
