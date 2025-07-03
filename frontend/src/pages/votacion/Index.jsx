import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import VotacionContent from "./VotacionContent"
import VotacionHeader from "./VotacionHeader"
import { VotoContext } from '../../contexts/votoContext'

export default function Votacion() {
  const location = useLocation()
  const isConfirmationPage = location.pathname.includes('/confirmado')

  const [listaAFiltrar, setListaAFiltrar] = useState("")
  
  const [voto, setVoto] = useState({})

  if (isConfirmationPage) {
    return <Outlet />
  }

  return (
    <div className='votacion'>
      <VotoContext.Provider value={{ voto, setVoto }}>
        <VotacionHeader listaAFiltrar={listaAFiltrar} setListaAFiltrar={setListaAFiltrar}  /> {/* Here goes the back button and the search bar component */}
        <VotacionContent listaAFiltrar={listaAFiltrar} /> {/* Here goes a list of card of listas and the vote buttons */}
      </VotoContext.Provider>
    </div>
  )
}