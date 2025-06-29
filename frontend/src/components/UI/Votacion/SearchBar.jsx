import { IconButton, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

export default function SearchBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%', 
      padding: '20px', 
      backgroundColor: '#f0f4f8', 
      borderRadius: '30px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      gap: '16px',
      minWidth: '60vh',
    }}>
        <TextField variant='standard' label='Buscar una lista' fullWidth ></TextField>
        <IconButton>
            <SearchIcon />
        </IconButton>
    </div>
  )
}
