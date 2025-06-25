"use client";

import React, { useState } from "react";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 6rem',
  },
  logo: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  logoBlog: {
    color: "orange",
  },
  navLinks: {
    display: "flex",
    gap: "1.2rem",
    listStyle: "none",
    margin: 0,
    padding: "0 8rem 0 3rem",
    alignItems: "center",
  },
  mobileNavLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    listStyle: "none",
    margin: 0,
    padding: "0.75rem",
    position: "absolute",
    top: "100%",
    right: 0,
    width: "100%",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    zIndex: 100,
    transition: "transform 0.3s ease, opacity 0.3s ease",
    alignItems: "center",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.25)",
    zIndex: 99,
    transition: "opacity 0.3s",
  },
  link: {
    textDecoration: "none",
    color: "#222",
    fontSize: "0.9rem",
    padding: "0.5rem 0.8rem",
    borderRadius: "14px",
    transition: "background 0.2s, color 0.2s",
    display: "block",
    fontWeight: 500,
    width: "fit-content",
    margin: "0 auto",
  },
  login: {
    textDecoration: "none",
    color: "orange",
    border: "1.5px solid orange",
    borderRadius: "14px",
    padding: "0.5rem 1.2rem",
    fontWeight: 600,
    fontSize: "0.85rem",
    transition: "background 0.2s, color 0.2s",
    display: "block",
    background: "none",
    width: "fit-content",
    margin: "0 0.4rem",
  },
  signup: {
    textDecoration: "none",
    color: "#fff",
    background: "orange",
    borderRadius: "14px",
    padding: "0.5rem 1.2rem",
    fontWeight: 600,
    fontSize: "0.85rem",
    border: "1.5px solid orange",
    transition: "background 0.2s, color 0.2s",
    display: "block",
    width: "fit-content",
    margin: "0 0.4rem",
  },
  hamburger: {
    display: "block",
    background: "none",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "#222",
    zIndex: 101,
    padding: "0.5rem",
    marginRight: "2rem",
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen((open) => !open);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <li>
          <button 
            className="nav-login" 
            style={styles.login}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      );
    }

    return (
      <>
        <li>
          <button 
            className="nav-login" 
            style={styles.login}
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </button>
        </li>
        <li>
          <button 
            className="nav-signup" 
            style={styles.signup}
            onClick={() => setShowSignupModal(true)}
          >
            Sign Up
          </button>
        </li>
      </>
    );
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoBlog}>Blog</span>Sphere
        </div>
        {/* Mobile Toggle Button */}
        <button
          className="nav-hamburger"
          style={styles.hamburger}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
        >
          {isOpen ? "✕" : "☰"}
        </button>
        {/* Desktop Navigation */}
        <ul className="nav-inline-links" style={styles.navLinks}>
          <li>
            <a href="/" className="nav-link" style={styles.link}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" style={styles.link}>
              About
            </a>
          </li>
          <li>
            <a href="#faq" className="nav-link" style={styles.link}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" style={styles.link}>
              Contact
            </a>
          </li>
          {renderAuthButtons()}
        </ul>
        {/* Mobile Navigation */}
        <ul
          id="mobile-menu"
          className="nav-mobile-links"
          style={{
            ...styles.mobileNavLinks,
            transform: isOpen ? "translateY(0)" : "translateY(-100%)",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none"
          }}
          role="menu"
          aria-label="Mobile navigation"
        >
          <li>
            <a href="/" className="nav-link" style={styles.link} onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" style={styles.link} onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#faq" className="nav-link" style={styles.link} onClick={closeMenu}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" style={styles.link} onClick={closeMenu}>
              Contact
            </a>
          </li>
          {renderAuthButtons()}
        </ul>
      </nav>
      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={closeMenu}
          tabIndex={0}
          aria-label="Close menu overlay"
          role="button"
        />
      )}
      {/* Responsive styles for toggling and hover effects */}
      <style>{`
        @media (max-width: 900px) {
          .nav-inline-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (min-width: 901px) {
          .nav-hamburger { display: none !important; }
          .nav-inline-links { display: flex !important; }
          .nav-mobile-links { display: none !important; }
        }
        .nav-link:hover {
          background: #fff3e0;
          color: #e65100;
        }
        .nav-login:hover {
          background: orange;
          color: #fff;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.15);
          transform: scale(1.05);
        }
        .nav-signup:hover {
          background: #ff9800;
          color: #fff;
          border-color: #ff9800;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.18);
          transform: scale(1.05);
        }
      `}</style>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={switchToSignup}
      />
      
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default Navbar;
