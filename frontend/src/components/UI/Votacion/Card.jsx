import React from 'react'
import Typography from '@mui/material/Typography';
import { Box, Chip } from '@mui/material';

export default function Card({ 
  lista_id, 
  eleccion_id, 
  partido_nombre,
  partido_politico_id, 
  departamento_nombre,
  departamento_id, 
  numero, 
  ciudadanos = [] 
}) {
  // Función para obtener el nombre del tipo de ciudadano
  const getTipoCiudadano = (tipo_ciudadano_id) => {
    switch (tipo_ciudadano_id) {
      case 1:
        return 'Presidente';
      case 2:
        return 'Vicepresidente';
      case 3:
        return 'Candidato';
      default:
        return 'Otro';
    }
  };

  // Ordenar ciudadanos por número
  const ciudadanosOrdenados = ciudadanos.sort((a, b) => a.numero - b.numero);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '20px',
      minWidth: '93%'
    }}>
      <img 
        src="https://stickerly.pstatic.net/sticker_pack/GKxNn91GyJYvRhMszE6eOQ/XJ2XIR/25/84289762.png" 
        alt="Card Image" 
        style={{ width: '80px', height: '80px' }} 
      />
      
      <Box sx={{ flex: 1, paddingLeft: '20px' }}>
        <Typography variant="h5" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
          Lista {numero}
        </Typography>

        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center', marginBottom: '15px' }}>
          Departamento: {departamento_nombre}
        </Typography>

        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center', marginBottom: '15px' }}>
          Partido: {partido_nombre}
        </Typography>


        {/* Lista de ciudadanos */}
        {ciudadanosOrdenados.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography variant="body2" style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Candidatos:
            </Typography>
            {ciudadanosOrdenados.map((ciudadano, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">
                  {ciudadano.numero}. Ciudadano ID: {ciudadano.ciudadano_id}
                </Typography>
                <Chip 
                  label={getTipoCiudadano(ciudadano.tipo_ciudadano_id)} 
                  size="small" 
                  variant="outlined"
                  color={ciudadano.tipo_ciudadano_id === 1 ? 'primary' : 
                         ciudadano.tipo_ciudadano_id === 2 ? 'secondary' : 'default'}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
  )
}
