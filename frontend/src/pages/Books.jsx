import React, { useState } from "react";
import BookCard from "../components/BookCard";

function Books({ books, onBorrow, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Case-insensitive filtering by title OR author
  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesTitle = book.title.toLowerCase().includes(term);
    const matchesAuthor = book.author.toLowerCase().includes(term);
    return matchesTitle || matchesAuthor;
  });

  return (
    <div className="books-page">
      <div className="page-header">
        <h1 className="page-title">Books</h1>
        <p className="page-desc">Browse the available books and borrow one.</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          id="book-search"
          type="text"
          className="search-input"
          placeholder="🔍 Search books by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Loading state */}
      {loading && <p className="status-message">Loading books from library...</p>}

      {/* Backend connection warning / fallback message */}
      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      {/* Books Grid */}
      {!loading && (
        <>
          {filteredBooks.length === 0 ? (
            <p className="no-books-message">No books found.</p>
          ) : (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBorrow={onBorrow}
                  allowReturn={false}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Books;
