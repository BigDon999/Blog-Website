'use client';

import React, { useState } from 'react';

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '3rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    minHeight: '150px',
    resize: 'vertical',
    transition: 'border-color 0.2s',
  },
  focusedInput: {
    borderColor: 'orange',
    outline: 'none',
  },
  submitButton: {
    background: 'orange',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  submitButtonHover: {
    backgroundColor: '#e67e22',
  },
  successMessage: {
    background: '#dff0d8',
    color: '#3c763d',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  errorMessage: {
    background: '#f2dede',
    color: '#a94442',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    textAlign: 'center',
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({
        type: 'success',
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>Have a question or feedback? We'd love to hear from you.</p>
      </header>

      {status && (
        <div style={status.type === 'success' ? styles.successMessage : styles.errorMessage}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.input,
              ...(focusedField === 'name' ? styles.focusedInput : {})
            }}
            placeholder="Your name"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.input,
              ...(focusedField === 'email' ? styles.focusedInput : {})
            }}
            placeholder="your.email@example.com"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="subject" style={styles.label}>Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.input,
              ...(focusedField === 'subject' ? styles.focusedInput : {})
            }}
            placeholder="What is this about?"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...styles.textarea,
              ...(focusedField === 'message' ? styles.focusedInput : {})
            }}
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            ...(isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {})
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor;
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'orange';
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
} 