'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from '../Categories.module.css';
import { FaBookmark } from 'react-icons/fa';

const NEWS_API_KEY = 'a299620ce7e54dd999c01568c07b2cfc';
const GNEWS_API_KEY = 'd2f21bd9cce90430955e4208384e54c3';
const CURRENTS_API_KEY = '78rb0XvdMoUW_FPUbAjxXzNcgpztgFS0SSLIud2WPEs4UI7W';

export default function CategoryPage() {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookmarkedArticles');
      setBookmarks(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const isBookmarked = (article) => {
    return bookmarks.some((a) => a.url === article.url);
  };

  const toggleBookmark = (article) => {
    let updated;
    if (isBookmarked(article)) {
      updated = bookmarks.filter((a) => a.url !== article.url);
    } else {
      updated = [...bookmarks, article];
    }
    setBookmarks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updated));
    }
  };

  useEffect(() => {
    async function fetchCategoryNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/news?category=${category}`);
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryNews();
  }, [category]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
        <p className={styles.subtitle}>Latest articles in {category}.</p>
      </header>
      {loading && <div>Loading news...</div>}
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {!loading && !error && news.length === 0 && (
        <div>No news found for this category.</div>
      )}
      <div className={styles.grid}>
        {news.map((article, idx) => (
          <div key={idx} className={styles.card} style={{ textDecoration: 'none', position: 'relative' }}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', width: '100%' }}
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className={styles.icon}
                  style={{ minHeight: 120, objectFit: 'cover', background: '#ffe5cc', width: '100%' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
              <span className={styles.catName}>{article.title}</span>
              <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>{article.published ? new Date(article.published).toLocaleString() : ''}</div>
              <div style={{ color: '#444', fontSize: 15, marginTop: 8 }}>{article.description}</div>
            </a>
            <button
              onClick={() => toggleBookmark(article)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isBookmarked(article) ? '#ff9800' : '#bbb',
                fontSize: 24,
                zIndex: 2,
              }}
              aria-label={isBookmarked(article) ? 'Remove Bookmark' : 'Add Bookmark'}
              title={isBookmarked(article) ? 'Remove Bookmark' : 'Add Bookmark'}
            >
              <FaBookmark />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 