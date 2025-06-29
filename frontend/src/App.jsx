import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useAuth } from './contexts/authContext'
import LoginCiudadanoPage from './pages/login/index.jsx'
import LoginPresidentePage from './pages/loginGestion/index.jsx'
import ResultsPerListaPage from './pages/resultsPerLista/index.jsx'
import ResultsPerCandidatoPage from './pages/resultsPerCandidato/index.jsx'
import ResultsPerPartidoPage from './pages/resultsPerPartido/index.jsx'
import ControlPanel from './components/controlPanel/index.jsx'

function App() {
  const { isAuthenticated, auth } = useAuth();
  console.log(auth.isPresident)

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <><Outlet /></> : <Navigate to='login' />} >
          <Route path='gestion' element={auth.isPresident ? <div style={{ display: 'flex', height: '100vh' }}>
            <ControlPanel />
            <div style={{ flex: 1 }}>
              <Outlet />
            </div>
          </div> : <Navigate to='/votacion' />} >
            <Route path='home' index element={<h1>Gestion Index</h1>} />
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
          <Route path='votacion' element={<><h1>Votacion</h1><Outlet /></>} >
            <Route path='confirmado' element={<h1>Votacion Confirmado</h1>} />
          </Route>
        </Route>
        <Route path='login' element={<Outlet />} >
          <Route index element={<><LoginCiudadanoPage /></>} />
          <Route path='gestion' element={<LoginPresidentePage />} />
        </Route>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
