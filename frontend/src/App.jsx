import React from 'react'
import Banner from './Components/Banner'
import Aninavbar from './Components/Aninavbar'
import Navbar from './Components/Navbar'
import Mocktest from './Components/Mocktest'
// import Login from './Components/Login'
// import { ToastContainer } from 'react-toastify'
import Auth from './Components/Auth'




const App = () => {
  return (
    <div className='bg-[#FBE4E3] h-screen '>
      {/* <ToastContainer /> */}
      <Navbar />
      {/* <Auth /> */}
      <Banner />
      <Mocktest />
    </div>
  )
}

export default App