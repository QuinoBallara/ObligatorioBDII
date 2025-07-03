import React from 'react'
import Volver from '../../components/buttons/back'
import SearchBar from '../../components/UI/Votacion/SearchBar'
import './votacion.css'

function VotacionHeader({listaAFiltrar, setListaAFiltrar}) {

  

  return (
    <div className='votacion-header'>
        <Volver to='/login'/>
        <SearchBar listaAFiltrar={listaAFiltrar} setListaAFiltrar={setListaAFiltrar} />
    </div>
  )
}

export default VotacionHeader