import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserById } from '../store/userSlice'
import localStorageService from '../services/localStorage.service'

const NavProfile = () => {
  const id = localStorageService.getUserId()
  const currentUser = useSelector(getUserById(id))
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen((prevState) => !prevState)
  }
  if (!currentUser) return 'loading'
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt=""
          height="35"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link
          to={`/about`}
          className="dropdown-item"
        >
                    Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
                    Log Out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
