"use client"
import styles from './Settings.module.css';
import { useState } from 'react';
import { updatePassword, updateEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useAuth } from '@/context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [showPasswordDropdown, setShowPasswordDropdown] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await updateEmail(auth.currentUser, email);
      setSuccess('Email updated successfully!');
      setShowEmailDropdown(false);
    } catch (err) {
      setError(err.message || 'Failed to update email.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await updatePassword(auth.currentUser, password);
      setSuccess('Password updated successfully!');
      setPassword('');
      setShowPasswordDropdown(false);
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your Blogsphere preferences</p>
      </header>
      <form className={styles.form} onSubmit={handleSave}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="notifications">Notifications</label>
          <input
            id="notifications"
            type="checkbox"
            checked={notifications}
            onChange={e => setNotifications(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.checkboxLabel}>Enable notifications</span>
        </div>
        <button className={styles.saveButton} type="submit">
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24, gap: 16 }}>
        <button
          className={styles.saveButton}
          type="button"
          style={{ width: 220, margin: '0 auto' }}
          onClick={() => setShowEmailDropdown((prev) => !prev)}
        >
          Change Email
        </button>
        {showEmailDropdown && (
          <form className={styles.form} onSubmit={handleEmailChange} style={{ marginTop: 8, width: '100%' }}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">New Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.select}
                required
                disabled={loading}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button className={styles.saveButton} type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Email'}
              </button>
              <button className={styles.cancelBtn} type="button" onClick={() => setShowEmailDropdown(false)} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        )}
        <button
          className={styles.saveButton}
          type="button"
          style={{ width: 220, margin: '0 auto' }}
          onClick={() => setShowPasswordDropdown((prev) => !prev)}
        >
          Change Password
        </button>
        {showPasswordDropdown && (
          <form className={styles.form} onSubmit={handlePasswordChange} style={{ marginTop: 8, width: '100%' }}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.select}
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button className={styles.saveButton} type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Password'}
              </button>
              <button className={styles.cancelBtn} type="button" onClick={() => setShowPasswordDropdown(false)} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {success && <div style={{ color: '#ff8800', textAlign: 'center', marginTop: 16 }}>{success}</div>}
      {error && <div style={{ color: 'red', textAlign: 'center', marginTop: 16 }}>{error}</div>}
    </div>
  );
} 