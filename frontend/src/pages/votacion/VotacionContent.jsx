import React from 'react'
import './votacion.css'
import CardList from '../../components/UI/Votacion/CardList'
import BlankVote from '../../components/UI/Votacion/BlankVote'
import EpicSelector from '../../components/UI/Votacion/EpicSelector'
import EndVote from '../../components/buttons/endVote'
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