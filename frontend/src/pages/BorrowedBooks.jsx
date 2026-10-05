import React from "react";
import BookCard from "../components/BookCard";

function BorrowedBooks({ books, onReturn }) {
  const borrowedBooks = books.filter((book) => book.borrowed === true);

  return (
    <div className="borrowed-page">
      <div className="page-header">
        <h1 className="page-title">Borrowed Books</h1>
        <p className="page-desc">Books currently checked out by you.</p>
      </div>

      {borrowedBooks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No books borrowed yet.</p>
          <p className="empty-subtitle">
            Visit the Books page to explore and borrow a book!
          </p>
        </div>
      ) : (
        <div className="books-grid">
          {borrowedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onBorrow={() => {}}
              onReturn={onReturn}
              allowReturn={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BorrowedBooks;
