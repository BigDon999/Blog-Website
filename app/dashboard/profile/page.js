"use client"

import { useAuth } from '@/context/AuthContext';
import { FaUserCircle, FaEnvelope, FaEdit } from 'react-icons/fa';
import styles from './Profile.module.css';
import md5 from 'md5';
import { useState } from 'react';
import { updateProfile, updateEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function Profile() {
  const { user } = useAuth();
  const avatar = user?.photoURL || (user?.email ? `https://www.gravatar.com/avatar/${md5(user.email.trim().toLowerCase())}?d=identicon` : '');
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleEdit = () => {
    setEditing(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setEditing(false);
    setDisplayName(user?.displayName || '');
    setEmail(user?.email || '');
    setSuccess('');
    setError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      if (user.displayName !== displayName) {
        await updateProfile(auth.currentUser, { displayName });
      }
      if (user.email !== email) {
        await updateEmail(auth.currentUser, email);
      }
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          {avatar ? (
            <img src={avatar} alt="Avatar" className={styles.avatarImg} />
          ) : (
            <FaUserCircle className={styles.avatar} />
          )}
        </div>
        <div className={styles.infoSection}>
          {editing ? (
            <form className={styles.editForm} onSubmit={handleSave}>
              <input
                className={styles.input}
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Full Name"
                required
                disabled={loading}
              />
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={loading}
              />
              <div className={styles.editActions}>
                <button className={styles.saveBtn} type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                <button className={styles.cancelBtn} type="button" onClick={handleCancel} disabled={loading}>Cancel</button>
              </div>
              {success && <div className={styles.savedMsg}>{success}</div>}
              {error && <div className={styles.savedMsg} style={{ color: 'red' }}>{error}</div>}
            </form>
          ) : (
            <>
              <h1 className={styles.name}>{user?.displayName || user?.email || ''}</h1>
              <div className={styles.email}><FaEnvelope style={{ marginRight: 8 }} /> {user?.email || ''}</div>
              <button className={styles.editButton} onClick={handleEdit}><FaEdit style={{ marginRight: 6 }} />Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 