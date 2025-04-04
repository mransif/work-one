import React, { useContext } from 'react'
import Banner from './Components/Banner'
import Navbar from './Components/Navbar'
import { Toaster } from 'sonner';
import Auth from './Components/Auth'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from './context/AppContext'




const App = () => {

  const { token } = useContext(AppContext);


  return (

    <div className='bg-[#FBE4E3] h-screen '>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#363636',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }
        }}
      />

      {
        // token &&
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