import React from 'react'
import SearchBar from '../../components/UI/Votacion/SearchBar'
import LogoutButton from '../../components/buttons/logoutVoter'
import './votacion.css'

function VotacionHeader({listaAFiltrar, setListaAFiltrar}) {

  

  return (
    <div className='votacion-header'>
        <LogoutButton />
        <SearchBar listaAFiltrar={listaAFiltrar} setListaAFiltrar={setListaAFiltrar} />
    </div>
  )
}

export default VotacionHeader