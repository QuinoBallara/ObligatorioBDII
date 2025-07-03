import { FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useVoto } from '../../../contexts/votoContext';

export default function EpicSelector() {

  const {voto, setVoto } = useVoto();


  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c3e1ff',
        borderRadius: '20px',
        padding: '20px',}}>
    <Typography component="div" style={{ textAlign: 'center'}}>
            ¿Desea agregar un objeto extraño?
    </Typography>
    <FormControl variant='standard' color='primary' fullWidth>
        {/* <label>¿Desea agregar un objeto extraño?</label> */}
        <InputLabel id="demo-simple-select-label">Objeto extraño</InputLabel>
        <Select onChange={(e) => {
            console.log(e.target.value);
            setVoto(e.target.value);}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeof voto.lista_id === 'number' ? "" : voto}
          >
          <MenuItem value="">Nada</MenuItem>
          <MenuItem value={"0"}>0 - Pizza</MenuItem>
          <MenuItem value={"1"}>1 - Salame</MenuItem>
          <MenuItem value={"2"}>2 - 600 doláres</MenuItem>
          <MenuItem value={"3"}>3 - Un gato</MenuItem>
          <MenuItem value={"4"}>4 - Un preservativo</MenuItem>
          <MenuItem value={"5"}>5 - 3 gramos de marihuana</MenuItem>
          <MenuItem value={"6"}>6 - Una cuchara de plástico usada</MenuItem>
          <MenuItem value={"7"}>7 - Una foto de Nicolas Cage</MenuItem>
          <MenuItem value={"8"}>8 - Un manual de IKEA en japonés</MenuItem>
          <MenuItem value={"9"}>9 - Un USB con 47 fotos de patos</MenuItem>
          <MenuItem value={"10"}>10 - Una copia pirata de Los Sims en CD</MenuItem>
          <MenuItem value={"11"}>11 - Una bolsa de té usada 3 veces</MenuItem>
          <MenuItem value={"12"}>12 - Un manual de Windows 95 en ruso</MenuItem>
          <MenuItem value={"13"}>13 - Un par de medias distintas</MenuItem>
        </Select>
      </FormControl>
          </div>
  )
}
