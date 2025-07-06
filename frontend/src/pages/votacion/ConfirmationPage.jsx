import { Typography, Button } from '@mui/material'
import React from 'react'
import Card from '../../components/UI/Votacion/Card'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import './votacion.css'
import { useVoto } from '../../contexts/votoContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function ConfirmationPage() {

  const {voto} = useVoto();

  const {handleLogoutVoter} = useAuth();

  const navigate = useNavigate();


  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        
        <div className="confirmation-icon">
          <CheckCircleIcon style={{ fontSize: '40px', color: 'white' }} />
        </div>

        <Typography variant="h4" className="confirmation-title">
          ¡Felicitaciones!
        </Typography>
        
        <Typography variant="h6" className="confirmation-subtitle">
          Su voto ha sido registrado exitosamente
        </Typography>
        
        <div className="confirmation-card-wrapper">
          <Typography variant="subtitle1" style={{ marginBottom: '15px', color: '#6c757d' }}>
            Usted votó por:
          </Typography>
          <Card {...voto}/>
        </div>
        
        <Typography variant="body2" style={{ color: '#6c757d', maxWidth: '400px' }}>
          Gracias por participar en el proceso democrático. Su voto es importante y ha sido contabilizado de forma segura.
        </Typography>
        
        <Button onClick={async () => {await handleLogoutVoter() ;navigate('/votacion/login')}}
          variant='contained' 
          className="confirmation-button"
          size="large"
        >
          Finalizar
        </Button>
      </div>
    </div>
  )
}
