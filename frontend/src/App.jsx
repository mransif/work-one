import React, { useContext, useEffect } from 'react'
import Banner from './Components/Banner'
import Navbar from './Components/Navbar'
import { Toaster } from 'sonner';
import Auth from './Components/Auth'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import Lenis from '@studio-freight/lenis'

const App = () => {
  const { token } = useContext(AppContext);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Optional: store globally if needed
    window.lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className='bg-[#FBE4E3] min-h-screen'>
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