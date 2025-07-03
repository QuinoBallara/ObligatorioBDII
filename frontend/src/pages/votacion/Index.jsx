import { Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import VotacionContent from "./VotacionContent"
import VotacionHeader from "./VotacionHeader"
import { useVoto, VotoContext } from '../../contexts/votoContext'
import ConfirmationModal from './ConfirmationModal'

export default function Votacion() {
  const location = useLocation()
  const isConfirmationPage = location.pathname.includes('/confirmado')

  const [listaAFiltrar, setListaAFiltrar] = useState("")

  const {modal} = useVoto();
  

  if (isConfirmationPage) {
    return <Outlet />
  }

  return (
    <div className='votacion'>
        {<VotacionHeader listaAFiltrar={listaAFiltrar} setListaAFiltrar={setListaAFiltrar}  />} {/* Here goes the back button and the search bar component */}
        {<VotacionContent listaAFiltrar={listaAFiltrar} />} {/* Here goes a list of card of listas and the vote buttons */}
        {modal && <ConfirmationModal />} {/* This is the confirmation modal that appears when a user clicks on a vote button */}
    </div>
  )
}