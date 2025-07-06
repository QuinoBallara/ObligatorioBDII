import { Button, List, ListItem } from '@mui/material'
import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Card from './Card'
import { useVoto, VotoContext } from '../../../contexts/votoContext'
import { getListas } from '../../../services/votacionService'
import { useAuth } from '../../../contexts/authContext'

export default function CardList({listaAFiltrar}) {

  const [cards, setCards] = useState([])

  const { voto, setVoto } = useVoto();



  const handleClick = (card) => {
    setVoto(card);
  }
  const {auth} = useAuth();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const listas = await getListas(auth);
        if (listas) {
          setCards(listas);
        } else {
          console.error("No se encontraron listas");
        }
      } catch (error) {
        console.error("Error al obtener las listas:", error);
      }
    }

    fetchData();

  }, []);

  // Filtrar las cards basándose en listaAFiltrar
  const cardsFiltradas = useMemo(() => {
    if (!listaAFiltrar || listaAFiltrar.trim() === '') {
      return cards;
    }
    
    return cards.filter((card) => {
      // Filtrar por número de lista
      const numeroCoincide = card.numero?.toString().includes(listaAFiltrar);

      const partidoCoincide = card.partido_nombre?.toLowerCase().includes(listaAFiltrar.toLowerCase().trim());

      const departamentoCoincide = card.departamento_nombre?.toLowerCase().includes(listaAFiltrar.toLowerCase().trim());

      return numeroCoincide || partidoCoincide || departamentoCoincide;
    });

  }, [cards, listaAFiltrar]);

  return (
    <List 
      className="custom-scrollbar"
      style={{
        minHeight: '70vh',
        maxHeight: '70vh',
        overflowY: 'auto',
        minWidth: '80vh',
      }}>
        {cardsFiltradas.map((card) => (
            <ListItem key={card.lista_id} style={{
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'space-between',
               gap:'20px', 
               flexDirection: 'column', 
               padding: '10px', 
               border: '1px solid #ccc', 
               borderRadius: '15px', 
               margin: '10px 0',
               maxWidth: '100%',}}>
                <Card {...card} />
                <Button onClick={() => handleClick(card)} variant="contained" color="primary">Seleccionar</Button>
            </ListItem>
        ))}
    </List>
  )
}
