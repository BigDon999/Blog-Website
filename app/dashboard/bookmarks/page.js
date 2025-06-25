'use client';

import React, { useEffect, useState } from 'react';
import styles from './Bookmarks.module.css';
import { FaBookOpen, FaTrashAlt, FaBookmark } from 'react-icons/fa';

export default function Bookmarks() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookmarkedArticles');
      setArticles(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const removeBookmark = (articleUrl) => {
    const updated = articles.filter((article) => article.url !== articleUrl);
    setArticles(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarkedArticles', JSON.stringify(updated));
    }
  };

  if (articles.length === 0) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Bookmarks</h1>
          <p className={styles.subtitle}>Save articles to read later</p>
        </header>
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}><FaBookmark /></div>
          <h2>No bookmarks yet</h2>
          <p>Articles you bookmark will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Bookmarks</h1>
        <p className={styles.subtitle}>Your saved articles for later reading</p>
      </header>
      <div className={styles.bookmarksList}>
        {articles.map((article, idx) => (
          <article
            key={article.url || idx}
            className={styles.bookmarkCard}
            onMouseEnter={() => setHoveredCard(article.url)}
            onMouseLeave={() => setHoveredCard(null)}
            tabIndex={0}
            aria-label={article.title}
          >
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className={styles.cardImage}
              />
            )}
            <div className={styles.cardContent}>
              <div className={styles.cardCategory}>{article.source || article.category}</div>
              <h2 className={styles.cardTitle}>{article.title}</h2>
              <p className={styles.cardExcerpt}>{article.description || article.excerpt}</p>
              <div className={styles.cardMeta}>
                <span className={styles.cardDate}>{article.published ? new Date(article.published).toLocaleString() : article.date || ''}</span>
                <div className={styles.cardActions}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButton}
                    aria-label="Read Now"
                  >
                    <FaBookOpen style={{ marginRight: 6 }} /> Read Now
                  </a>
                  <button
                    className={`${styles.actionButton} ${styles.removeButton}`}
                    onClick={() => removeBookmark(article.url)}
                    aria-label="Remove Bookmark"
                  >
                    <FaTrashAlt style={{ marginRight: 6 }} /> Remove
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 