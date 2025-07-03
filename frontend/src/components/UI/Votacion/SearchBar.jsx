import { IconButton, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

export default function SearchBar({listaAFiltrar, setListaAFiltrar}) {


  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px', 
      backgroundColor: '#f0f4f8', 
      borderRadius: '30px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      gap: '16px',
      minWidth: '60vh',
    }}>
        <TextField value={listaAFiltrar} variant='standard' label='Buscar una lista' fullWidth onChange={(e) => {console.log(e.target.value); setListaAFiltrar(e.target.value)}} ></TextField>
        <IconButton>
            <SearchIcon />
        </IconButton>
    </div>
  )
}
