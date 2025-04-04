import React from 'react'
import StudentDetails from './pages/StudentDetails'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner';



const App = () => {
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
      <Routes>
        <Route path='/' element={<StudentDetails />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App