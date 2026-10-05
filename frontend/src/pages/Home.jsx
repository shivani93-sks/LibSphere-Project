import React from "react";

function Home({ onBrowseClick }) {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-icon">📖</div>
        <h1 className="hero-title">Welcome to LibSphere</h1>
        <p className="hero-subtitle">
          Your simple digital library. Find a book and borrow it easily.
        </p>

        <button className="hero-btn" onClick={onBrowseClick}>
          Browse Books
        </button>

        <p className="hero-note">A few books are waiting for you.</p>
      </div>
    </div>
  );
}

export default Home;
