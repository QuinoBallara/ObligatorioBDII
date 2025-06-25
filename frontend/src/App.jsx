import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

function App() {
  const isAuthenticated = true
  const isPresident = true

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <h1>hola</h1> : <Navigate to='login' />} >
          <Route path='gestion' element={isPresident ? <h1>Gestion</h1> : <Navigate to='/votacion' />} >
            <Route path='home' index element={<h1>Gestion Index</h1>} />
            <Route path='resultados/candidatos' element={<h1>Resultados Candidatos</h1>} />
            <Route path='resultados/listas' element={<h1>Resultados Listas</h1>} />
            <Route path='resultados/partidos' element={<h1>Resultados Partidos</h1>} />
            <Route path='listas' element={<h1>Listas</h1>} />
            <Route path='votantes' element={<h1>Votantes</h1>} />
            <Route path='votosObservados' element={<h1>Votos Observados</h1>} />
            <Route path='cargarDatos' element={<h1>Cargar Datos</h1>} />
          </Route>
          <Route path='votacion' element={<h1>Votacion</h1>} />
          <Route path='votacion/confirmado' element={<h1>Votacion Confirmado</h1>} />
        </Route>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path='gestion/login' element={<h1>Login Gestion</h1>} />
      </Routes>
    </Router>
  )
}

export default App
