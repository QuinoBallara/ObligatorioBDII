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
        justifyContent: 'center',
        gap: '60px',
        }}>
        <BlankVote />
        <EpicSelector />
        <div>
          <Typography variant='h6' >
            Lista seleccionada para votar:
          </Typography>
          {typeof voto.lista_id === 'number' ? <Card {...voto} /> : <Typography variant='subtitle1' style={{color: 'gray'}}>VOTO EN BLANCO/ANULADO</Typography>}
        </div>
        <Button onClick={()=> {setModal(!modal);console.log(modal)}} variant='contained' >Finalizar votación</Button>
    </div>
  )
}
