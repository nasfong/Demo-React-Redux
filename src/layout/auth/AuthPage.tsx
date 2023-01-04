import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './component/Login'

const AuthPage = () => {

  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])
  return (
    <div className='position-relative fw-bolder'>
      <div className='position-fixed top-50 start-50 translate-middle'>
        {/* <a href='#' className='mb-12'>
          <img alt='Logo' src={('/logo.jpg')} className='h-45px' />
        </a> */}
        <div className='w-500px p-15 shadow rounded'>
          <Routes>
            <Route path='auth'>
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to="/auth/login" replace />}
            />
          </Routes>
          {/* <Login /> */}
        </div>

      </div>
    </div>
  )
}

export default AuthPage