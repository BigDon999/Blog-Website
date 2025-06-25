import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
  terms: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.85rem',
    color: '#666',
  },
  termsLink: {
    color: 'orange',
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
  },
  successMessage: {
    color: '#2ecc71',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  loginPrompt: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  loginLink: {
    color: 'orange',
    cursor: 'pointer',
    textDecoration: 'underline',
  }
};

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
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
    console.log('Attempting signup with:', { email: formData.email, name: formData.fullName });

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log('User created successfully:', userCredential.user.email);

      // Update user profile with full name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      console.log('Profile updated successfully');
      setSuccess('Account created successfully!');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error.code, error.message);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please log in instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled. Please contact support.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please use at least 6 characters.');
          break;
        default:
          setError(`Registration error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>×</button>
        <h2 style={styles.title}>Create Account</h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="fullName">Full Name</label>
            <input
              style={{
                ...styles.input,
                borderColor: error && error.includes('name') ? '#e74c3c' : '#ddd'
              }}
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

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
              placeholder="Create a password"
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
            <input
              style={{
                ...styles.input,
                borderColor: error && error.includes('password') ? '#e74c3c' : '#ddd'
              }}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              disabled={loading}
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={styles.terms}>
          By signing up, you agree to our{' '}
          <span style={styles.termsLink}>Terms of Service</span>{' '}
          and{' '}
          <span style={styles.termsLink}>Privacy Policy</span>
        </div>

        <div style={styles.loginPrompt}>
          Already have an account?{' '}
          <span 
            style={styles.loginLink}
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
          >
            Log in here
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupModal; 