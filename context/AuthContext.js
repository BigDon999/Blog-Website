'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      // Cleanup subscription
      return () => unsubscribe();
    } catch (error) {
      console.error('Auth state change error:', error);
      setError(error);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 