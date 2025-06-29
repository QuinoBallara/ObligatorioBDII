import React from 'react'
import Typography from '@mui/material/Typography';

export default function Card() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '20px',}}>
      <img src="https://stickerly.pstatic.net/sticker_pack/GKxNn91GyJYvRhMszE6eOQ/XJ2XIR/25/84289762.png" alt="Card Image" style={{ width: '35%'}} />
      <Typography variant="h6" style={{ padding: '65px', textAlign: 'center' }}>
        Número de lista
      </Typography>
    </div>
  )
}
