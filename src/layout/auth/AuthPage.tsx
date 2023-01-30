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
        <div className='card card-body'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              <img src={'/images/admin.png'} className='h-50px' />
              <p>
                username: admin <br />
                password: 12345678
              </p>
            </div>
            <div className='d-flex'>
              <img src={'/images/user.png'} className='h-50px' />
              <p>
                username: user <br />
                password: 12345678
              </p>
            </div>
          </div>
        </div>
        {/* <a href='#' className='mb-12'>
          <img alt='Logo' src={('/logo.jpg')} className='h-45px' />
        </a> */}
        <h1 className='badge badge-danger fs-5'>API maybe slow (you need to wait 5s-10s atleast)</h1>
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