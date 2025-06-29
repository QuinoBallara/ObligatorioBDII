import { Button, List, ListItem } from '@mui/material'
import React from 'react'
import Card from './Card'

export default function CardList() {

  const [cards, setCards] = React.useState([1,2,3,4,5])

  return (
    <List style={{
      maxHeight: '550px',
      overflowY: 'auto',
    }}>
        {cards.map((card, index) => (
            <ListItem key={index} style={{
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'space-between',
               gap:'20px', 
               flexDirection: 'column', 
               padding: '10px', 
               border: '1px solid #ccc', 
               borderRadius: '15px', 
               margin: '10px 0',
               maxWidth: '450px',}}>
                <Card {...card} />
                <Button variant="contained" color="primary">Seleccionar</Button>
            </ListItem>
        ))}
    </List>
  )
}
