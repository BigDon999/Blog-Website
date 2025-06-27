'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../Categories.module.css';
import { FaBookmark } from 'react-icons/fa';
import UsersDashboard from '@/components/UsersDashboard';

const NEWS_API_KEY = 'a299620ce7e54dd999c01568c07b2cfc';
const GNEWS_API_KEY = 'd2f21bd9cce90430955e4208384e54c3';
const CURRENTS_API_KEY = '78rb0XvdMoUW_FPUbAjxXzNcgpztgFS0SSLIud2WPEs4UI7W';

export default function CategoryPage() {
  const { category } = useParams();
  return <UsersDashboard category={category.charAt(0).toUpperCase() + category.slice(1)} />;
} 