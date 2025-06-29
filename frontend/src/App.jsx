import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useAuth } from './contexts/authContext'
import LoginCiudadanoPage from './pages/login/index.jsx'
import LoginPresidentePage from './pages/loginGestion/index.jsx'
import ResultsPerListaPage from './pages/resultsPerLista/index.jsx'
import ResultsPerCandidatoPage from './pages/resultsPerCandidato/index.jsx'
import ResultsPerPartidoPage from './pages/resultsPerPartido/index.jsx'
import ControlPanel from './components/controlPanel/index.jsx'
import Votacion from './pages/votacion/Index';
import ConfirmationPage from './pages/votacion/ConfirmationPage';
import GestionHome from './pages/gestionHome/index.jsx'
import { SidebarContext } from './contexts/sidebarContext.jsx'

function App() {
  const { isAuthenticated, auth } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <><Outlet /></> : <Navigate to='login' />} >
            <Route path='gestion' element={auth.isPresident ?
              <div style={{ display: 'flex', height: '100vh' }}>
                <ControlPanel />
                <div style={{
                  flex: 1,
                  marginLeft: showSidebar ? '0' : '0',
                  transition: 'margin-left 0.3s ease'
                }}>
                  <Outlet />
                </div>
              </div> : <Navigate to='/votacion' />} >
              <Route path='home' index element={<GestionHome />} />
              <Route path='resultados' element={<Outlet />} >
                <Route path='candidatos' element={<ResultsPerCandidatoPage />} />
                <Route path='listas' element={<ResultsPerListaPage />} />
                <Route path='partidos' element={<ResultsPerPartidoPage />} />
              </Route>
              <Route path='listas' element={<h1>Listas</h1>} />
              <Route path='votantes' element={<h1>Votantes</h1>} />
              <Route path='votosObservados' element={<h1>Votos Observados</h1>} />
              <Route path='cargarDatos' element={<h1>Cargar Datos</h1>} />
            </Route>
            <Route path='votacion' element={<Votacion />} >
              <Route path='confirmado' element={<ConfirmationPage />} />
            </Route>
          </Route>
          <Route path='login' element={<Outlet />} >
            <Route index element={<><LoginCiudadanoPage /></>} />
            <Route path='gestion' element={<LoginPresidentePage />} />
          </Route>
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </SidebarContext.Provider>
  )
}

export default App