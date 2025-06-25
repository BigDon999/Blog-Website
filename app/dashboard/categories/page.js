import Link from 'next/link';
import { FaGlobe, FaGlobeAmericas, FaFlagUsa, FaBuilding, FaLaptop, FaFilm, FaFutbol, FaFlask, FaHeartbeat } from 'react-icons/fa';
import styles from './Categories.module.css';

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
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>News Categories</h1>
        <p className={styles.subtitle}>Browse news by category. Click a category to view the latest articles.</p>
      </header>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/dashboard/categories/${cat.name.toLowerCase()}`}
            className={styles.card}
            aria-label={`View ${cat.name} news`}
          >
            <span className={styles.icon}>{cat.icon}</span>
            <span className={styles.catName}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 