import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const LogOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    console.log('logout')
    dispatch(logOut())
    navigate('/')
  }, [])
  return <h1>Loading</h1>
}

export default LogOut
