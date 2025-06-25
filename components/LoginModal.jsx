import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '2rem',
    width: '90%',
    maxWidth: '400px',
    position: 'relative',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    border: 'none',
    background: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#666',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    color: '#555',
    fontWeight: '500',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s',
    outline: 'none',
  },
  submitButton: {
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.2s',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    gap: '1rem',
  },
  line: {
    flex: 1,
    height: '1px',
    backgroundColor: '#ddd',
  },
  orText: {
    color: '#666',
    fontSize: '0.9rem',
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    textAlign: 'center',
    padding: '0.5rem',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: '4px',
  },
  successMessage: {
    color: '#2ecc71',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    textAlign: 'center',
    padding: '0.5rem',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: '4px',
  },
  signupPrompt: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  signupLink: {
    color: 'orange',
    cursor: 'pointer',
    textDecoration: 'underline',
  }
};

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;
    
    setLoading(true);
    console.log('Attempting login with:', { email: formData.email }); // Log email for debugging

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('Login successful:', userCredential.user.email);
      setSuccess('Login successful!');
      setFormData({ email: '', password: '' });
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError(`Authentication error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMsg('');
    if (!resetEmail || !resetEmail.includes('@')) {
      setResetMsg('Please enter a valid email address.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMsg('Password reset email sent! Check your inbox.');
    } catch (err) {
      setResetMsg('Failed to send reset email. Please check the email address.');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={styles.title}>Welcome Back</h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              style={{
                ...styles.input,
                borderColor: error && error.includes('email') ? '#e74c3c' : '#ddd'
              }}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              disabled={loading}
              autoComplete="email"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              style={{
                ...styles.input,
                borderColor: error && error.includes('password') ? '#e74c3c' : '#ddd'
              }}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.successMessage}>{success}</div>}

          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
            onMouseOver={e => !loading && (e.target.style.backgroundColor = '#ff8c00')}
            onMouseOut={e => !loading && (e.target.style.backgroundColor = 'orange')}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.line}></div>
          <span style={styles.orText}>or</span>
          <div style={styles.line}></div>
        </div>

        <div style={styles.forgotPassword}>
          {!showReset ? (
            <span onClick={() => setShowReset(true)} style={{ color: 'orange', cursor: 'pointer', textDecoration: 'underline' }}>
              Forgot password?
            </span>
          ) : (
            <form onSubmit={handleResetPassword} style={{ marginTop: 10 }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                style={{ ...styles.input, marginBottom: 8 }}
                required
              />
              <button type="submit" style={{ ...styles.submitButton, width: '100%' }}>Send Reset Link</button>
              {resetMsg && <div style={resetMsg.includes('sent') ? styles.successMessage : styles.error}>{resetMsg}</div>}
              <div style={{ marginTop: 8 }}>
                <span onClick={() => setShowReset(false)} style={{ color: '#666', cursor: 'pointer', textDecoration: 'underline', fontSize: 13 }}>
                  Back to login
                </span>
              </div>
            </form>
          )}
        </div>

        <div style={styles.signupPrompt}>
          Don't have an account?{' '}
          <span 
            style={styles.signupLink}
            onClick={() => {
              onClose();
              onSwitchToSignup();
            }}
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 