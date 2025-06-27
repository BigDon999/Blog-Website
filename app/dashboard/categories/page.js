import Link from 'next/link';
import { FaGlobe, FaGlobeAmericas, FaFlagUsa, FaBuilding, FaLaptop, FaFilm, FaFutbol, FaFlask, FaHeartbeat, FaBookmark } from 'react-icons/fa';
import styles from './Categories.module.css';
import { useEffect, useState } from 'react';

const categories = [
  { name: 'General', icon: <FaGlobe /> },
  { name: 'World', icon: <FaGlobeAmericas /> },
  { name: 'Nation', icon: <FaFlagUsa /> },
  { name: 'Business', icon: <FaBuilding /> },
  { name: 'Technology', icon: <FaLaptop /> },
  { name: 'Entertainment', icon: <FaFilm /> },
  { name: 'Sports', icon: <FaFutbol /> },
  { name: 'Science', icon: <FaFlask /> },
  { name: 'Health', icon: <FaHeartbeat /> },
];

export default function Categories() {
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookmarkedCategories');
      setBookmarked(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const toggleBookmark = (catName) => {
    let updated;
    if (bookmarked.includes(catName)) {
      updated = bookmarked.filter((c) => c !== catName);
    } else {
      updated = [...bookmarked, catName];
    }
    setBookmarked(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookmarkedCategories', JSON.stringify(updated));
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>News Categories</h1>
        <p className={styles.subtitle}>Browse news by category. Click a category to view the latest articles.</p>
      </header>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <div key={cat.name} className={styles.card} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(cat.name);
              }}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: bookmarked.includes(cat.name) ? '#ff9800' : '#bbb',
                fontSize: 24,
                zIndex: 2,
                padding: 0,
              }}
              aria-label={bookmarked.includes(cat.name) ? 'Remove Bookmark' : 'Add Bookmark'}
              title={bookmarked.includes(cat.name) ? 'Remove Bookmark' : 'Add Bookmark'}
            >
              <FaBookmark />
            </button>
            <Link
              href={`/dashboard/categories/${cat.name.toLowerCase()}`}
              className={styles.card}
              aria-label={`View ${cat.name} news`}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
            >
              <span className={styles.icon}>{cat.icon}</span>
              <span className={styles.catName}>{cat.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 