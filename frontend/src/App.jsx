import React, { useContext } from 'react'
import Banner from './Components/Banner'
import Navbar from './Components/Navbar'
import { ToastContainer } from 'react-toastify'
import Auth from './Components/Auth'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from './context/AppContext'




const App = () => {

  const { token } = useContext(AppContext);


  return (

    <div className='bg-[#FBE4E3] h-screen '>
      <ToastContainer />
      {
        token &&
        <Navbar />
      }
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App