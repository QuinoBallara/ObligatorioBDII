import React from 'react'
import './votacion.css'
import CardList from '../../components/UI/Votacion/CardList'
import RightContent from './RightContent'

function VotacionContent() {
  return (
    <div className="votacion-content">
      <CardList />
      <RightContent/>
    </div>
  )
}

export default VotacionContent