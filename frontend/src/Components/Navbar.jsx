import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Menu from "./Menu";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { BiLogOut } from "react-icons/bi";

const navItems = ["Home", "Mock-Test", "Contact"];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, setToken, logoutUser } = useContext(AppContext);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className={`
        fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 
        ${isScrolled ? 'shadow-md' : ''}
        sm:inset-x-6
      `}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 bg-[#FFEDD5] rounded-xl">
          <div className="flex items-center gap-7">
            <img
              onClick={() => window.location.href = '/'}
              src="/images/mcet-logo.png"
              alt="logo"
              className="w-30 cursor-pointer"
            />
          </div>
          <div className="flex h-full items-center space-x-4 ">
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
              <div className=" items-center gap-1 cursor-pointer text-[#37474F] hover:text-red-950 ml-10 hidden md:flex">
              <button
                onClick={logoutUser}
                className="font-medium"
              >
                Logout
              </button>
              <BiLogOut className="text-lg" />
            </div>

            )}

            <div className="md:hidden sm:block">
              {/* Placeholder for mobile menu */}
              <Menu
                token={token}
                logoutUser={logoutUser}
              />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;