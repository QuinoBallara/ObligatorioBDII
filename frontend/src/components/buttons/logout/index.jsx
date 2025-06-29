
import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
   
    const handleLogout = () => {
        //Missing logout logic for clearing user data, tokens, etc.

        navigate('/login'); 
    }


  return (
    <>
        <Button onClick={handleLogout}>
            Logout
        </Button>
    </>
  )
}

export default Logout
