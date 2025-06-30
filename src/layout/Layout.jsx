import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

import { useAuthStore } from '../store/useAuthStore'

const Layout = () => {
  const { userLoggedIn } = useAuthStore()

  return (
    <>
      <Navbar isLoggedIn={userLoggedIn}/>
      <Outlet />
    </>
  )
}

export default Layout