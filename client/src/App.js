import React, { useEffect } from 'react'
import NavBar from './app/components/navBar'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList, loadProductsList } from './app/store/productSlice'
import { getCategorysList, loadCategorysList } from './app/store/categirysSlice'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './app/layout/authLayout'
import Product from './app/components/product'
import EditForm from './app/components/form/editForm'
import AddForm from './app/components/form/AddForm'
import MainPage from './app/components/MainPage'
import LoginForm from './app/components/form/loginForm'
import RegisterForm from './app/components/form/registerForm'
import { ToastContainer } from 'react-toastify'
import { loadUsersList } from './app/store/userSlice'
import LogOut from './app/components/logOut'
import AdminPage from './app/components/adminPage'
import ProtectedRoute from './app/components/ProtectedRoute'
function App() {
  const dispatch = useDispatch()
  const categories = useSelector(getCategorysList())
  const products = useSelector(getProductsList())
  const loading = products?.length> 0 && categories?.length > 0
  useEffect(() => {
    dispatch(loadProductsList())
    dispatch(loadCategorysList())
    dispatch(loadUsersList())
  }, [])
  return (
    loading
      ? <div>
        <NavBar/>
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route path=':productId' element={<Product/>} />
          <Route path='addProduct' element={<ProtectedRoute><AddForm/></ProtectedRoute>}/>
          <Route path=':productId/:edit' element={<ProtectedRoute><EditForm/></ProtectedRoute>}/>
          <Route path='admin' element={<ProtectedRoute><AdminPage/></ProtectedRoute>}/>
          <Route path='auth' element={<AuthLayout/>}>
            <Route path='login' element={<LoginForm/>}/>
            <Route path='signup' element={<RegisterForm/>}/>
            <Route path='*' element={<Navigate to='/auth/login'/>}/>
          </Route>
          <Route path='logout' element={<LogOut/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
        <ToastContainer/>
      </div>
      :<h2>Loading...</h2>
  )
}

export default App
