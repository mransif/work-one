import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Menu from "./Menu";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { Link } from "react-scroll";
import StyledDropdown from "./StyledDropdown";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, logoutUser } = useContext(AppContext);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowConfirmation(false); // Hide the popup on scroll
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

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    logoutUser();
    setShowConfirmation(false);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleSignIn = () => {
    navigate("/auth");
  };

  const handleTestsClick = () => {
    if (!token) {
      navigate("/auth");
    }
    // If user is logged in, StyledDropdown component will handle its own functionality
  };

  return (
    <div>
      <div
        ref={navContainerRef}
        className={`
          fixed inset-x-0 top-4 z-30 h-16 border-none transition-all duration-700
          ${isScrolled ? 'shadow-md' : ''}
          sm:inset-x-6
        `}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4 bg-[#FFEDD5] rounded-xl">
            <div className="flex items-center gap-5">
              <img
                onClick={() => window.location.href = '/'}
                src="/images/mcet-logo.webp"
                alt="logo"
                className="md:w-45 cursor-pointer w-25"
              />
              <p className="font-sans text-[#37474F]">INSTITUTION CODE- <span className="font-bold">MCK</span></p>
            </div>
            <div className="flex h-full items-center space-x-4 ">
              <div className="hidden lg:block space-x-4">
                <Link to="home" smooth={true} duration={500}>
                  <button className="nav-hover-btn text-[#37474F] hover:text-gray-900">Home</button>
                </Link>
                <button
                  className="nav-hover-btn text-[#37474F] hover:text-gray-900"
                  onClick={token ? null : handleTestsClick}
                >
                  {token ? <StyledDropdown /> : "Tests"}
                </button>
                <Link to="contact" smooth={true} duration={500}>
                  <button className="nav-hover-btn text-[#37474F] mr-8 hover:text-gray-900">Contact</button>
                </Link>
              </div>

              {token ? (
                <div className="items-center gap-1 cursor-pointer text-[#37474F] hover:text-gray-800 nav-hover-btn hidden lg:flex">
                  <button
                    onClick={handleLogout}
                    className="font-medium"
                  >
                    Logout
                  </button>
                  <BiLogOut className="text-lg" />
                </div>
              ) : (
                <div className="items-center gap-1 cursor-pointer text-[#37474F] hover:text-gray-800 nav-hover-btn hidden md:flex">
                  <button
                    onClick={handleSignIn}
                    className="font-medium"
                  >
                    Sign In
                  </button>
                  <BiLogIn className="text-lg" />
                </div>
              )}
              {/* phone dropdown */}
              <div className="lg:hidden block">
                <Menu
                  token={token}
                  logoutUser={handleLogout}
                  handleSignIn={handleSignIn}
                />
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-[#11111136] bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50">
            <p className="text-lg font-medium mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-200 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;