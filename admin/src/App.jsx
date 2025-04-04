import React from 'react'
import StudentDetails from './pages/StudentDetails'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div className='bg-[#FBE4E3] h-screen '>
      <Routes>
        <Route path='/' element={<StudentDetails />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App