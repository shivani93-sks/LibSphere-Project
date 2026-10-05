import React, { useState, useRef, useEffect } from "react";

function BookCard({ book, onBorrow, onReturn, allowReturn = false }) {
  const [showConcepts, setShowConcepts] = useState(false);
  const dropdownRef = useRef(null);

  const concepts = book.keyConcepts
    ? book.keyConcepts.split(",").map((c) => c.trim())
    : [];

  // Close floating options menu if user clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowConcepts(false);
      }
    }

    if (showConcepts) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConcepts]);

  return (
    <div className="book-card">
      <div className="book-icon">📕</div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>

      {/* Options-style Floating Dropdown */}
      {concepts.length > 0 && (
        <div className="concepts-dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            className={`toggle-concepts-btn ${showConcepts ? "active" : ""}`}
            onClick={() => setShowConcepts(!showConcepts)}
          >
            {showConcepts ? "Hide Concepts ▴" : "💡 Key Concepts ▾"}
          </button>

          {showConcepts && (
            <div className="concepts-floating-menu">
              <div className="concepts-floating-header">
                <span className="concepts-heading">💡 Core Takeaways</span>
                <button
                  type="button"
                  className="concepts-close-btn"
                  onClick={() => setShowConcepts(false)}
                  title="Close"
                >
                  ✕
                </button>
              </div>
              <div className="concepts-tags">
                {concepts.map((concept, index) => (
                  <span key={index} className="concept-tag">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="book-status-wrapper">
        {book.borrowed ? (
          <span className="status-badge status-borrowed">● Borrowed</span>
        ) : (
          <span className="status-badge status-available">● Available</span>
        )}
      </div>

      <div className="book-action">
        {book.borrowed ? (
          allowReturn ? (
            <button
              className="action-btn return-btn"
              onClick={() => onReturn(book.id)}
            >
              Return
            </button>
          ) : (
            <button className="action-btn disabled-btn" disabled>
              Borrowed
            </button>
          )
        ) : (
          <button
            className="action-btn borrow-btn"
            onClick={() => onBorrow(book.id)}
          >
            Borrow
          </button>
        )}
      </div>
    </div>
  );
}

export default BookCard;
