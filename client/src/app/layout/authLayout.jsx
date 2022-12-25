import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return <>
    <div className="container mt-5 rounded-3">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <Outlet/>
        </div>
      </div>
    </div>
  </>
}

export default AuthLayout
