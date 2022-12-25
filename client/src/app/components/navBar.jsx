import React, { useState } from 'react'
import Cart from './cart'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAuthUser } from '../store/userSlice'
import NavProfile from './navProfile'
export default function NavBar() {
  const currentUser = useSelector(getAuthUser())
  const navigate = useNavigate()
  const [cartOpen, setcartOpen] = useState(false)
  const handlToggleCart = () => {
    setcartOpen((prevState) => !prevState)
  }
  const handleClickSetting = () => {
    navigate('/admin')
  }
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">D-Shop</NavLink>
          <ul className="nav">
            <li className="nav-item">

              <i className='bi bi-cart2' onClick={handlToggleCart} role='button'></i>
            </li>
            {currentUser
              ? <><li className="nav-item"><NavProfile/></li>
                <li role='button' onClick={handleClickSetting}><i className="bi bi-gear"></i></li>
              </>
              :<li className="nav-item">
                <NavLink className="nav-link" to="/auth/login"><i className="bi bi-person"></i></NavLink>
              </li>
            }
          </ul>{cartOpen&&<Cart/>}
        </div>
      </nav>
    </>
  )
}
