'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import UsersDashboard from '@/components/UsersDashboard';
import DashboardNavbar from '@/components/DashboardNavbar';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const getActiveTab = () => {
    const path = pathname.split('/')[2] || 'home';
    return path;
  };

  const handleNavChange = (tab) => {
    router.push(`/dashboard/${tab === 'home' ? '' : tab}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Only show UsersDashboard on the main dashboard page
  const isMainDashboard = pathname === '/dashboard' || pathname === '/dashboard/';

  return (
    <>
      <DashboardNavbar onLogout={handleLogout} />
      {isMainDashboard ? <UsersDashboard /> : children}
    </>
  );
} 