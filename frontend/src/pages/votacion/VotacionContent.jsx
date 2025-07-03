import React from 'react'
import './votacion.css'
import CardList from '../../components/UI/Votacion/CardList'
import RightContent from './RightContent'

function VotacionContent({listaAFiltrar}) {


  return (
    <div className="votacion-content">
      <CardList listaAFiltrar={listaAFiltrar}/>
      <RightContent />
    </div>
  )
}

export default VotacionContent