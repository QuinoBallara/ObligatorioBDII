import React from 'react'
import Button from '@mui/material/Button';
import { useVoto } from './../../contexts/votoContext';
import { Typography } from '@mui/material';
import Card from '../../components/UI/Votacion/Card';
import './votacion.css';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationModal() {

    const navigate = useNavigate();

    const handleConfirmar = () => {
        
        try {
            // TODO Lógica para enviar el voto al backend
            // TODO Lógica para enviar el voto al backend
            // TODO Lógica para enviar el voto al backend

            navigate('/votacion/confirmado');

        }catch (error) {
            console.error("Error al confirmar el voto:", error);
            alert("Hubo un error al confirmar el voto. Por favor, inténtelo de nuevo más tarde.");
        }

    }

    const {voto, modal, setModal} = useVoto();

  return (
    <div className='confirmation-modal'>
        <div className='confirmation-modal-container'>

            <Typography variant='h5' style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                ¿Está seguro de que quiere votar por la siguiente lista? No podrá retornar después de confirmar el voto!
            </Typography>
            
            <div className='confirmation-modal-card'>
                {typeof voto.lista_id === 'number' ? <Card {...voto} /> : <Typography variant='subtitle1' style={{color: 'gray'}}>VOTO EN BLANCO/ANULADO</Typography>}
            </div>

            <div className='confirmation-modal-buttons'>
                <Button 
                    onClick={() => {setModal(!modal)}} 
                    variant='contained' 
                    style={{backgroundColor: '#ff0000', color: 'white', borderRadius: '25px', padding: '12px 30px'}}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={() => {handleConfirmar()}} 
                    variant='contained' 
                    style={{backgroundColor: '#00ff00', color: 'white', borderRadius: '25px', padding: '12px 30px'}}
                >
                    Confirmar
                </Button>               
            </div>
            
        </div>
    </div>
  )
}
