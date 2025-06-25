"use client";
import React, { useEffect, useState } from "react";
import styles from "../app/dashboard/Dashboard.module.css";
import { FaBookmark } from "react-icons/fa";
import Image from "next/image";

const PAGE_SIZE = 12;

function UsersDashboard({ children }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookmarkedArticles");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    async function fetchAllNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllNews();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmarkedArticles", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const isBookmarked = (article) =>
    bookmarks.some((b) => b.url === article.url);
  const handleBookmark = (article) => {
    if (isBookmarked(article)) {
      setBookmarks(bookmarks.filter((b) => b.url !== article.url));
    } else {
      setBookmarks([...bookmarks, article]);
    }
  };

  const filteredNews = news.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.description &&
        a.description.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filteredNews.length / PAGE_SIZE);
  const paginatedNews = filteredNews.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const recentNews = filteredNews.slice(0, 5);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section
      style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0.3rem 0.2rem" : "0.7rem 0.5rem",
          borderRadius: 8,
          boxShadow: "0 1px 6px rgba(255,136,0,0.03)",
          marginBottom: "0.5rem",
          gap: isMobile ? "0.3rem" : "0.5rem",
          width: "100%",
      }}
    >
      {/* Image Block */}
        <div
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <img
            src="/assets/newshd1.jpg"
            alt="Hero"
            style={{
              width: "100%",
              maxWidth: isMobile ? "80%" : "100%",
              height: isMobile ? 180 : 300,
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
              display: "block",
              margin: isMobile ? "0 auto" : undefined,
          }}
        />
      </div>

      {/* Text Block */}
      <div
        style={{
          flex: 1,
            textAlign: isMobile ? "center" : "left",
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            justifyContent: "center",
            width: "100%",
        }}
      >
        <h1
          style={{
              fontSize: isMobile ? "1.8rem" : "2.5rem",
            fontWeight: 800,
              color: "#ff8800",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Welcome to Your News Dashboard
        </h1>
        <p
          style={{
              fontSize: isMobile ? "1rem" : "1.15rem",
              color: "#444",
              lineHeight: "1.7",
            maxWidth: 600,
              margin: "0 auto",
          }}
        >
            Stay informed with top stories and real-time headlines from around
            the world. All your news, curated and ad-free.
        </p>
      </div>
    </section>

      {/* Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "2rem" : 32,
        }}
      >
        {/* Main News */}
        <div style={{ flex: 3 }}>
          <div
            style={{
            marginBottom: 24,
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news..."
              style={{
                padding: "0.7rem 1.2rem",
                borderRadius: 13,
                border: "1px solid #eee",
                fontSize: 16,
                width: "100%",
                maxWidth: 340,
                boxShadow: "0 1px 4px rgba(255,136,0,0.04)",
              }}
            />
          </div>

          <h2
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.6rem",
              fontWeight: 700,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Top Headlines
          </h2>

          {loading && <div>Loading news...</div>}
          {error && (
            <div style={{ color: "red", marginBottom: 16 }}>{error}</div>
          )}

          {!loading && !error && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {paginatedNews.map((article, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                      position: "relative",
                    }}
                  >
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                          background: "#ffe5cc",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <button
                      onClick={() => handleBookmark(article)}
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "none",
                        border: "none",
                        fontSize: 22,
                        color: isBookmarked(article) ? "#ff8800" : "#bbb",
                        cursor: "pointer",
                      }}
                    >
                      <FaBookmark />
                    </button>
                    <div style={{ padding: "1rem" }}>
                      <div
                        style={{
                          color: "#ff8800",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {article.source}
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          margin: "0.5rem 0",
                        }}
                      >
                        {article.title}
                      </div>
                      <div
                        style={{
                          color: "#666",
                          fontSize: 15,
                          marginBottom: 12,
                        }}
                      >
                        {article.description}
                      </div>
                      <div style={{ fontSize: 13, color: "#888" }}>
                        {article.published
                          ? new Date(article.published).toLocaleString()
                          : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "2.5rem 0 1.5rem",
                  gap: 8,
                }}
              >
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: 6,
                    border: "1px solid #eee",
                    background: page === 1 ? "#f3f3f3" : "#fff",
                    color: "#ff8800",
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: page === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  ←
                </button>
                <span style={{ fontWeight: 600, fontSize: 16 }}>
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: 6,
                    border: "1px solid #eee",
                    background: page === totalPages ? "#f3f3f3" : "#fff",
                    color: "#ff8800",
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside
          style={{
          flex: 1,
            width: "100%",
            maxWidth: isMobile ? 320 : 340,
            marginLeft: isMobile ? 0 : "auto",
            margin: isMobile ? "24px auto 0" : undefined,
            background: "#fff7ef",
          borderRadius: 12,
            boxShadow: "0 2px 8px rgba(255,136,0,0.07)",
            padding: "1.5rem 1rem",
            height: "fit-content",
            position: isMobile ? "static" : "sticky",
          top: 32,
            marginTop: isMobile ? 0 : 132,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <h3
            style={{
              color: "#ff8800",
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 18,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Recent News
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {recentNews.map((article, idx) => (
              <li key={idx}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#222",
                    textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {article.title.length > 70
                    ? article.title.slice(0, 67) + "..."
                    : article.title}
                </a>
                <div style={{ color: "#888", fontSize: 13 }}>
                  {article.published
                    ? new Date(article.published).toLocaleString()
                    : ""}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      {children}
    </div>
  );
}

export default UsersDashboard;
