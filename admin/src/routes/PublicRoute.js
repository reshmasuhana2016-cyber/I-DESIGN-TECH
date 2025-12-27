import React from 'react'
import { Navigate } from 'react-router-dom'

const publicRoute = ({children}) => {
    const token = localStorage.getItem("Token")
  return token ? <Navigate to="/dashboard" replace /> : children
}

export default publicRoute
