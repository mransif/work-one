import React from "react";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Menu from "./Menu";



const navItems = ["Home", "Mock-Test", "About", "Contact"];

const NavBar = () => {

  const navigate = useNavigate()

  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


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
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 bg-[#EAD196] rounded-xl ">
          <div className="flex items-center gap-7">
            <img src="/images/mcet-logo.png" alt="logo" className="w-30" />

            <Button
              onClick={() => navigate('/auth')}
              id="Login-button"
              title="Login"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-[#98111E] md:flex hidden items-center justify-center gap-1"
            />
                
          </div>
          <div className="flex h-full items-center">
            <div className=" hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="md:hidden sm:block">
              <Menu />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;