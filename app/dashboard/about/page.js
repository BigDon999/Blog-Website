import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About <span style={{ color: 'orange' }}>Blog</span><span style={{ color: 'black' }}>Sphere</span></h1>
        <p className={styles.subtitle}>
          <span style={{ color: 'orange' }}>Blog</span><span style={{ color: 'black' }}>Sphere</span> is your trusted source for curated news and insightful articles. Our platform is dedicated exclusively to news reading—no user-generated content, no distractions, just the latest stories from around the world, delivered with clarity and integrity.
        </p>
      </header>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.sectionText}>
          At <span style={{ color: 'orange' }}>Blog</span><span style={{ color: 'black' }}>Sphere</span>, we believe in the power of information. Our mission is to provide a seamless, ad-free, and reliable news reading experience. Stay informed, stay inspired, and explore the world—one story at a time.
        </p>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why <span style={{ color: 'orange' }}>Blog</span><span style={{ color: 'black' }}>Sphere</span>?</h2>
        <ul className={styles.features}>
          <li>✔️ 100% news-focused, no writing or posting</li>
          <li>✔️ Clean, modern, distraction-free reading experience</li>
          <li>✔️ Curated from top news APIs and sources</li>
          <li>✔️ Responsive and accessible for all devices</li>
          <li>✔️ Always free, no subscription required</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <p className={styles.sectionText}>
          Have questions or feedback? Reach out via our contact page. We love hearing from our readers!
        </p>
      </section>
    </div>
  );
} 