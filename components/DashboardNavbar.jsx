'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaHome, FaInfoCircle, FaBookmark, FaUser, FaCog, FaSignOutAlt, FaGlobe, FaBuilding, FaLaptop, FaFilm, FaFutbol, FaFlask, FaHeartbeat, FaFlagUsa, FaGlobeAmericas, FaBars, FaTimes } from 'react-icons/fa';
import styles from './DashboardNavbar.module.css';
import { useAuth } from '@/context/AuthContext';
import md5 from 'md5';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const categories = [
  { name: 'General', icon: <FaGlobe /> },
  { name: 'World', icon: <FaGlobeAmericas /> },
  { name: 'Nation', icon: <FaFlagUsa /> },
  { name: 'Business', icon: <FaBuilding /> },
  { name: 'Technology', icon: <FaLaptop /> },
  { name: 'Entertainment', icon: <FaFilm /> },
  { name: 'Sports', icon: <FaFutbol /> },
  { name: 'Science', icon: <FaFlask /> },
  { name: 'Health', icon: <FaHeartbeat /> },
];

export default function DashboardNavbar({ active, onNavChange, onLogout }) {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isTouch, setIsTouch] = useState(false);
  const categoriesDropdownRef = useRef(null);

  // Compute avatar for navbar
  const avatar = user?.photoURL || (user?.email ? `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon` : '');

  const handleNavClick = (tab) => {
    if (onNavChange) onNavChange(tab);
    setShowDropdown(false);
    setShowCategories(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    setShowCategories(false);
    setMobileMenuOpen(false);
    if (onLogout) onLogout();
  };

  const handleCategoryClick = (cat) => {
    setShowCategories(false);
    if (onNavChange) onNavChange('categories');
    router.push(`/dashboard/categories/${cat.toLowerCase()}`);
  };

  useEffect(() => {
    // Detect if device is touch
    function handleTouch() {
      setIsTouch(true);
      window.removeEventListener('touchstart', handleTouch);
    }
    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouch);
  }, []);

  // Close dropdown when clicking outside (for both desktop and mobile)
  useEffect(() => {
    if (!showCategories) return;
    function handleClick(e) {
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(e.target)
      ) {
        setShowCategories(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [showCategories]);

  // Accessibility: close dropdowns on Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowDropdown(false);
        setShowCategories(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/dashboard" className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: 0, fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
            <span style={{ color: 'orange' }}>Blog</span><span style={{ color: 'black' }}>Sphere</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
          <Link
            href="/dashboard"
            className={`${styles.navItem} ${active === 'home' ? styles.navItemActive : ''}`}
            onClick={() => handleNavClick('home')}
            aria-current={active === 'home' ? 'page' : undefined}
          >
            <FaHome className={styles.navIcon} /> Home
          </Link>
          <Link
            href="/dashboard/about"
            className={`${styles.navItem} ${active === 'about' ? styles.navItemActive : ''}`}
            onClick={() => handleNavClick('about')}
            aria-current={active === 'about' ? 'page' : undefined}
          >
            <FaInfoCircle className={styles.navIcon} /> About
          </Link>
          <div
            className={styles.dropdownMenu}
            tabIndex={0}
            onBlur={!isTouch ? () => setShowCategories(false) : undefined}
            ref={categoriesDropdownRef}
          >
            <span
              className={`${styles.navItem} ${active === 'categories' ? styles.navItemActive : ''}`}
              onClick={() => setShowCategories((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={showCategories}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Categories <span style={{ fontSize: 10, marginLeft: 4 }}>▼</span>
            </span>
            {showCategories && (
              <div
                className={styles.categoriesDropdown}
                role="menu"
              >
                <Link
                  href="/dashboard/categories"
                  className={styles.categoryItem}
                  onClick={() => handleNavClick('categories')}
                  role="menuitem"
                  style={{ fontWeight: 700, color: '#ff8800' }}
                >
                  All Categories
                </Link>
                {categories.map((cat) => {
                  const isActive = pathname === `/dashboard/categories/${cat.name.toLowerCase()}`;
                  return (
                    <button
                      key={cat.name}
                      className={styles.categoryItem + (isActive ? ' ' + styles.navItemActive : '')}
                      onClick={() => handleCategoryClick(cat.name)}
                      role="menuitem"
                      style={{
                        display: 'flex', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontWeight: isActive ? 700 : 500, color: isActive ? '#ff8800' : undefined
                      }}
                    >
                      <span className={styles.categoryIcon}>{cat.icon}</span> {cat.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <Link
            href="/dashboard/bookmarks"
            className={`${styles.navItem} ${active === 'bookmarks' ? styles.navItemActive : ''}`}
            onClick={() => handleNavClick('bookmarks')}
            aria-current={active === 'bookmarks' ? 'page' : undefined}
          >
            <FaBookmark className={styles.navIcon} /> Bookmarks
          </Link>
          {user && (
            <div className={styles.profileSection}>
              <button
                className={styles.profileButton}
                onClick={() => setShowDropdown((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={showDropdown}
              >
                <span className={styles.avatar}>
                  {avatar ? (
                    <img src={avatar} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                  ) : (
                    <FaUser />
                  )}
                </span>
                <span style={{ fontSize: 10 }}>▼</span>
              </button>
              {showDropdown && (
                <div className={styles.dropdown} role="menu">
                  <Link
                    href="/dashboard/profile"
                    className={styles.dropdownItem}
                    onClick={() => setShowDropdown(false)}
                    role="menuitem"
                  >
                    <FaUser className={styles.dropdownIcon} /> Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={styles.dropdownItem}
                    onClick={() => setShowDropdown(false)}
                    role="menuitem"
                  >
                    <FaCog className={styles.dropdownIcon} /> Settings
                  </Link>
                  <hr className={styles.dropdownDivider} />
                  <button
                    onClick={() => { setShowDropdown(false); if (onLogout) onLogout(); }}
                    className={styles.logoutButton}
                    role="menuitem"
                  >
                    <FaSignOutAlt className={styles.dropdownIcon} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}