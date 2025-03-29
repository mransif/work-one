import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const navItems = ["Home", "Mock-Test", "Contact"];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, setToken, logoutUser } = useContext(AppContext);

  // const logout = () => {
  //       setToken(false)
  //       localStorage.removeItem('token')
    
  //   // Redirect to login page
  //   window.location.href = '/auth';
  // };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`
      fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 
      ${isScrolled ? 'shadow-md' : ''}
      sm:inset-x-6
    `}>
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 bg-[#A6F1E0] rounded-xl">
          <div className="flex items-center gap-7">
            <img 
              onClick={() => window.location.href = '/auth'}
              src="/images/mcet-logo.png" 
              alt="logo" 
              className="w-30 cursor-pointer"
            />
          </div>
          <div className="flex h-full items-center space-x-4">
            <div className="hidden md:block space-x-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn text-[#73C7C7] hover:text-[#73C7C7]/80"
                >
                  {item}
                </a>
              ))}
            </div>
            
            {token && (
              <button
                onClick={logoutUser}
                className="bg-[#F7CFD8] text-[#73C7C7] px-4 py-2 rounded-lg 
                  hover:bg-[#F7CFD8]/80 transition-colors duration-300 
                  focus:outline-none focus:ring-2 focus:ring-[#73C7C7]/50"
              >
                Logout
              </button>
            )}
            
            <div className="md:hidden sm:block">
              {/* Placeholder for mobile menu */}
              <button className="text-[#73C7C7]">Menu</button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;