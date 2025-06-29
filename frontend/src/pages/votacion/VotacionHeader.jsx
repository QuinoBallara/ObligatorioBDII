import React from 'react'
import Volver from '../../components/buttons/back'
import SearchBar from '../../components/UI/Votacion/SearchBar'

function VotacionHeader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', gap: '75vh' }}>
        <Volver/>
        <SearchBar/>
    </div>
  )
}

export default VotacionHeader