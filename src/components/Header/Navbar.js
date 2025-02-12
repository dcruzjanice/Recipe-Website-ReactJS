import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss";
import { BiFoodMenu } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import { useSidebarContext } from '../../context/sidebarContext';
import ThemeToggle from '../Theme/ThemeToggle';

const Navbar = () => {
  const { openSidebar } = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar bg-[#172b4d] flex align-center ${scrolled ? 'scrolled' : ""}`}>
      <div className='container w-100'>
        <div className='navbar-content text-white'>
          <div className='brand-and-toggler flex align-center justify-between'>
            <Link to="/" className='navbar-brand fw-3 fs-22 flex align-center'>
              <BiFoodMenu />
              <span className='navbar-brand-text fw-7'>TasteTrail</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="flex items-center">
                <Link to="/favorites" className='navbar-link text-white' style={{ marginRight: '15px', fontSize: '20px' }}>Favorites</Link>
                <Link to="/meal-planner" className='navbar-link text-white' style={{ marginRight: '15px', fontSize: '20px' }}>Meal Planner</Link>
                <Link to="/chatbot" className='navbar-link text-white' style={{ marginRight: '10px', fontSize: '20px' }}>Chatbot</Link>
                <ThemeToggle />
              </div>
              <button type="button" className='navbar-show-btn text-white' onClick={() => openSidebar()} style={{ marginBottom: '6px', marginTop: '10px' }}>
                <IoMdMenu size={27} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
