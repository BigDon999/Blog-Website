"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupModal from "@/components/SignupModal";

const getStartedStyle = (hover) => ({
  background: hover ? "#ff9800" : "orange",
  color: "#fff",
  borderRadius: 20,
  border: `2px solid ${hover ? "#ff9800" : "orange"}`,
  fontWeight: 500,
  boxShadow: "none",
  padding: "0 20px",
  height: 48,
  fontSize: 16,
  lineHeight: "20px",
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s, border-color 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
});

const learnMoreStyle = (hover) => ({
  background: hover ? "#fff3e0" : "#fff",
  color: hover ? "#e65100" : "orange",
  borderRadius: 20,
  border: `2px solid ${hover ? "#ff9800" : "orange"}`,
  fontWeight: 500,
  boxShadow: "none",
  padding: "0 20px",
  height: 48,
  fontSize: 16,
  lineHeight: "20px",
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s, border-color 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
});

const testimonies = [
  {
    quote:
      "BlogSphere keeps me up to date with the latest news, all in one place. The ad-free experience is a game changer!",
    name: "Alex M.",
  },
  {
    quote:
      "I love how easy it is to find news by category. The site is clean and fast!",
    name: "Priya S.",
  },
  {
    quote: "No distractions, just news. BlogSphere is my go-to every morning.",
    name: "James L.",
  },
];

export default function Home() {
  const [getStartedHover, setGetStartedHover] = useState(false);
  const [learnMoreHover, setLearnMoreHover] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const contactRef = useRef(null);

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>
              Welcome to <span style={{ color: "orange" }}>Blog</span>Sphere
            </h1>
            <p>
              Your place to read the latest and most interesting news. Stay
              informed with curated stories from around the world.
            </p>
            <div className={styles.ctas}>
              <button
                type="button"
                style={getStartedStyle(getStartedHover)}
                onMouseEnter={() => setGetStartedHover(true)}
                onMouseLeave={() => setGetStartedHover(false)}
                onClick={() => setShowSignup(true)}
              >
                Get Started
              </button>
              <button
                type="button"
                style={learnMoreStyle(learnMoreHover)}
                onMouseEnter={() => setLearnMoreHover(true)}
                onMouseLeave={() => setLearnMoreHover(false)}
                onClick={() => {
                  if (contactRef.current) {
                    contactRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/assets/hero.jpg"
              alt="Hero"
              width={500}
              height={400}
              style={{
                borderRadius: "24px",
                objectFit: "cover",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </section>

        <section className={styles.servicesSection} id="services">
          <h2 className={styles.servicesTitle}>What We Offer</h2>
          <div className={styles.servicesList}>
            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" fill="#ffe0b2" />
                  <rect x="6" y="8" width="7" height="2" rx="1" fill="#ff9800" />
                  <rect x="6" y="12" width="12" height="2" rx="1" fill="#ff9800" />
                </svg>
              </span>
              <div>
                <h3 className={styles.serviceHeading}>Curated News</h3>
                <p className={styles.serviceText}>
                  Handpicked, high-quality news from trusted sources, updated daily for
                  your reading pleasure.
                </p>
              </div>
            </div>

            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="#ffe0b2" />
                  <path
                    d="M12 6v6l4 2"
                    stroke="#ff9800"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <h3 className={styles.serviceHeading}>Real-Time Updates</h3>
                <p className={styles.serviceText}>
                  Stay ahead with instant news updates as they happen, all in one place.
                </p>
              </div>
            </div>

            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="2" fill="#ffe0b2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" fill="#ff9800" />
                  <rect x="3" y="14" width="7" height="7" rx="2" fill="#ff9800" />
                  <rect x="14" y="14" width="7" height="7" rx="2" fill="#ffe0b2" />
                </svg>
              </span>
              <div>
                <h3 className={styles.serviceHeading}>Personalized Categories</h3>
                <p className={styles.serviceText}>
                  Browse news by topics you care about, from world news to technology and
                  more.
                </p>
              </div>
            </div>

            <div className={styles.serviceItem}>
              <span className={styles.serviceIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <rect x="2" y="6" width="20" height="12" rx="4" fill="#ffe0b2" />
                  <path
                    d="M6 12h12"
                    stroke="#ff9800"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <h3 className={styles.serviceHeading}>Ad-Free Experience</h3>
                <p className={styles.serviceText}>
                  Enjoy uninterrupted reading with a clean, distraction-free interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection} id="about">
          <div className={styles.aboutImageWrapper}>
            <Image
              src="/assets/about1.jpg"
              alt="About us"
              width={420}
              height={320}
              style={{
                borderRadius: "20px",
                objectFit: "cover",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className={styles.aboutText}>
            <h2>About Us</h2>
            <p>
              BlogSphere is dedicated to delivering the latest, most relevant news from
              around the globe. Our mission is to keep you informed and inspired, with a
              focus on quality, accuracy, and a seamless reading experience.
            </p>
            <p>
              Whether you're interested in world events, technology, health, or culture,
              BlogSphere brings you curated stories that matter. No distractions, no
              noise—just the news you want to read.
            </p>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqCol}>
              <div className={styles.faqItem}>
                <h4>What is BlogSphere?</h4>
                <p>
                  BlogSphere is a news platform dedicated to providing curated,
                  high-quality news for readers only.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>Is BlogSphere free to use?</h4>
                <p>
                  Yes, BlogSphere is completely free for all users. No subscription or
                  payment required.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>Do I need to create an account?</h4>
                <p>No account is required to read news. You can browse and read freely.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Can I submit or write articles?</h4>
                <p>
                  No, BlogSphere is for reading news only. There is no option to write or
                  submit articles.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>How often is the news updated?</h4>
                <p>
                  News is updated in real-time, so you always have access to the latest
                  stories.
                </p>
              </div>
            </div>
            <div className={styles.faqCol}>
              <div className={styles.faqItem}>
                <h4>Where does BlogSphere get its news?</h4>
                <p>
                  We aggregate news from trusted, reputable sources to ensure accuracy and
                  quality.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>Is there an app for BlogSphere?</h4>
                <p>
                  Currently, BlogSphere is web-based and works great on all devices. An
                  app may come in the future.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>Can I personalize my news feed?</h4>
                <p>
                  Yes, you can browse by categories and topics that interest you most.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>Are there ads on BlogSphere?</h4>
                <p>No, BlogSphere offers an ad-free reading experience for all users.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>How do I contact support?</h4>
                <p>
                  You can reach out via our contact page for any questions or support
                  needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.testimoniesSection} id="testimonies">
          <h2 className={styles.testimoniesTitle}>What Our Readers Say</h2>
          <div className={styles.scroller}>
            <div className={styles.testimoniesList}>
              {[...testimonies, ...testimonies].map((testimony, index) => (
                <div key={index} className={styles.testimony}>
                  <p className={styles.testimonyQuote}>
                    &ldquo;{testimony.quote}&rdquo;
                  </p>
                  <span className={styles.testimonyName}>— {testimony.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contactSection} id="contact" ref={contactRef}>
          <h2 className={styles.contactTitle}>Contact Us</h2>
          <form
            className={styles.contactForm}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for reaching out!");
            }}
          >
            <div className={styles.contactRow}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className={styles.contactInput}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className={styles.contactInput}
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className={styles.contactTextarea}
              rows={5}
            ></textarea>
            <button type="submit" className={styles.contactButton}>
              Send Message
            </button>
          </form>
        </section>
      </div>
      <Footer />
      <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} />
    </>
  );
}
