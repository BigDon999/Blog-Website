"use client"

import React, { useState } from 'react';

const styles = {
  footer: {
    background: '#fff',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
    padding: '2.5rem 1.5rem 1.5rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    marginTop: '3rem',
    position: 'relative',
    zIndex: 5,
  },
  topRow: {
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '2rem',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginBottom: '1rem',
  },
  logoBlog: {
    color: 'orange',
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#222',
    fontSize: '1rem',
    padding: '0.3rem 0.5rem',
    borderRadius: '12px',
    transition: 'background 0.2s, color 0.2s',
    fontWeight: 500,
    display: 'inline-block',
  },
  accounts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  login: {
    textDecoration: 'none',
    color: 'orange',
    border: '2px solid orange',
    borderRadius: '12px',
    padding: '0.3rem 1rem',
    fontWeight: 600,
    background: 'none',
    transition: 'background 0.2s, color 0.2s',
    display: 'inline-block',
  },
  signup: {
    textDecoration: 'none',
    color: '#fff',
    background: 'orange',
    borderRadius: '12px',
    padding: '0.3rem 1rem',
    fontWeight: 600,
    border: '2px solid orange',
    transition: 'background 0.2s, color 0.2s',
    display: 'inline-block',
  },
  newsletter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginTop: '0.5rem',
    width: '100%',
    maxWidth: '320px',
  },
  input: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
    marginBottom: '0.5rem',
  },
  button: {
    padding: '0.5rem 1.2rem',
    borderRadius: '8px',
    background: 'orange',
    color: '#fff',
    border: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  copyright: {
    marginTop: '2rem',
    color: '#888',
    fontSize: '0.95rem',
    textAlign: 'center',
    width: '100%',
  },
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.topRow}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoBlog}>Blog</span>Sphere
        </div>
        {/* Nav Links */}
        <ul style={styles.navLinks}>
          <li><a href="#" className="footer-link" style={styles.link}>Home</a></li>
          <li><a href="#" className="footer-link" style={styles.link}>About</a></li>
          <li><a href="#" className="footer-link" style={styles.link}>Blog</a></li>
          <li><a href="#" className="footer-link" style={styles.link}>Contact</a></li>
        </ul>
        {/* Account Links */}
        <div style={styles.accounts}>
          <a href="#" className="footer-login" style={styles.login}>Login</a>
          <a href="#" className="footer-signup" style={styles.signup}>Sign Up</a>
        </div>
        {/* Newsletter Signup */}
        <form style={styles.newsletter} onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" style={{fontWeight:600}}>Sign up for our newsletter</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email address"
            style={styles.input}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <button type="submit" style={styles.button} disabled={submitted}>
            {submitted ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
      <div style={styles.copyright}>
        &copy; {new Date().getFullYear()} BlogSphere. All rights reserved.
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer-link, .footer-login, .footer-signup {
            font-size: 1.1rem;
            padding: 0.7rem 0.8rem;
          }
          footer > div {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
        }
        .footer-link:hover {
          background: #fff3e0;
          color: #e65100;
        }
        .footer-login:hover {
          background: orange;
          color: #fff;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.15);
          transform: scale(1.05);
        }
        .footer-signup:hover {
          background: #ff9800;
          color: #fff;
          border-color: #ff9800;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.18);
          transform: scale(1.05);
        }
        button[disabled] {
          background: #ccc !important;
          color: #fff !important;
          cursor: not-allowed !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
