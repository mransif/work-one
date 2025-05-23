import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { Link } from "react-scroll";
import { useNavigate } from 'react-router-dom';

const Menu = ({ token, logoutUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  
  const closeDropdown = () => {
    setIsOpen(false);
  };
  
  const handleAuthRequired = () => {
    closeDropdown();
    navigate("/auth");
  };
  
  // Close dropdown when clicking outside or on scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    
    const handleScroll = () => {
      closeDropdown();
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <StyledWrapper ref={menuRef}>
      <div className="main" onClick={toggleDropdown}>
        <div className="bar">
          <span className={`bar-list ${isOpen ? "open" : ""}`} />
          <span className={`bar-list ${isOpen ? "open" : ""}`} />
          <span className={`bar-list ${isOpen ? "open" : ""}`} />
        </div>
      </div>
      {isOpen && (
        <section className="menu-container">
          <Link to="home" smooth={true} duration={500} onClick={closeDropdown}>
            <div className="menu-list">Home</div>
          </Link>
          
          {token ? (
            <>
              <Link to="lbstest" smooth={true} duration={500} onClick={closeDropdown}>
                <div className="menu-list">LBS Mock Test</div>
              </Link>
              <Link to="kmat" smooth={true} duration={500} onClick={closeDropdown}>
                <div className="menu-list">KMAT mock Test</div>
              </Link>
              <Link to="mocktest" smooth={true} duration={500} onClick={closeDropdown}>
                <div className="menu-list">KEAM Mock Test</div>
              </Link>
              <Link to="maintest" smooth={true} duration={500} onClick={closeDropdown}>
                <div className="menu-list">KEAM Main Test</div>
              </Link>
            </>
          ) : (
            <>
              <div onClick={handleAuthRequired} className="menu-list">
                KEAM Mock Test
              </div>
              <div onClick={handleAuthRequired} className="menu-list">
                KEAM Main Test
              </div>
            </>
          )}
          
          <Link to="contact" smooth={true} duration={500} onClick={closeDropdown}>
            <div className="menu-list">Contacts</div>
          </Link>
          
          {token ? (
            <div onClick={() => { logoutUser(); closeDropdown(); }} className="menu-list flex items-center gap-1">
              Logout <BiLogOut className="text-lg" />
            </div>
          ) : (
            <div onClick={handleAuthRequired} className="menu-list flex items-center gap-1">
              Sign In <BiLogIn className="text-lg" />
            </div>
          )}
        </section>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  .main {
    font-weight: 500;
    color: white;
    padding: 3px 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 2.5rem;
    cursor: pointer;
    justify-content: space-between;
  }
  .menu-container {
    background-color: #FFEDD5;
    color: #37474F;
    border-radius: 10px;
    position: absolute;
    width: 9.5rem;
    right: 0;
    top: 100%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
  .menu-list {
    padding: 10px 15px;
    transition: background-color 0.3s;
    cursor: pointer;
  }
  .menu-list:hover {
    background-color: #EAD196;
  }
  .bar {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .bar-list {
    width: 25px;
    height: 3px;
    background: #37474F;
    transition: all 0.3s;
  }
  .bar-list.open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .bar-list.open:nth-child(2) {
    opacity: 0;
  }
  .bar-list.open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

export default Menu;