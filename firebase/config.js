import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3c_uVgvATv6j_mAqkE-5ke_0XfpgGfSE",
  authDomain: "blogsphere-9b87c.firebaseapp.com",
  projectId: "blogsphere-9b87c",
  storageBucket: "blogsphere-9b87c.firebasestorage.app",
  messagingSenderId: "891415965835",
  appId: "1:891415965835:web:b379b72388c86b991f248e"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (error.code !== 'app/duplicate-app') {
    console.error('Firebase initialization error:', error);
  }
  app = initializeApp(firebaseConfig, 'blogsphere'); // Use a unique name as fallback
}

// Initialize Auth
const auth = getAuth(app);

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Auth initialized');
}

export { auth };
export default app; 