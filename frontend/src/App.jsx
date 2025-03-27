import React from 'react'
import Banner from './Components/Banner'
import Navbar from './Components/Navbar'
// import Mocktest from './Components/Mocktest'
// import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import Auth from './Components/Auth'
import { Route, Routes } from 'react-router-dom'
import Contact from './Components/Contact'




const App = () => {
  return (

    <div className='bg-[#FBE4E3] h-screen '>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Contact />
    </div>
  )
}

export default App