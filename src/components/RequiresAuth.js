import React from 'react'
import {useAuth} from "../context/AuthContext"
import { Navigate, useLocation } from 'react-router-dom'
function RequiresAuth({children}) {
    const {token} = useAuth()
    const location = useLocation()
  return (
    
        token ? {children} : <Navigate to="/login" state={{from:location}} replace/>
    
  )
}

export default RequiresAuth