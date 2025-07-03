import React from 'react'
import BlankVote from '../../components/UI/Votacion/BlankVote'
import EpicSelector from '../../components/UI/Votacion/EpicSelector'
import Button from '@mui/material/Button'

export default function RightContent() {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '80px',
        }}>
        <BlankVote />
        <EpicSelector />
        <Button variant='contained' >Finalizar votación</Button>
    </div>
  )
}
