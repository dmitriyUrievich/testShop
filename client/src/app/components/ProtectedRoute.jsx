import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../store/userSlice'

const ProtectedRoute = ({ children }) => {
  // const location = useLocation()
  const isLoggedIn = useSelector(getIsLoggedIn())
  if (!isLoggedIn) return <Navigate to='/auth/login'/>
  return children
}
ProtectedRoute.propTypes = {
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProtectedRoute
