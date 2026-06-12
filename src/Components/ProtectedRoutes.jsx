import React from 'react'

const ProtectedRoutes = ({children}) => {
  const token=localStorage.getItem('token')
  return token? children:<Navigate to="/login" replace />
}

export default ProtectedRoutes