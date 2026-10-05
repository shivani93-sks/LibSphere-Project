import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BorrowedBooks from "./pages/BorrowedBooks";
import Transactions from "./pages/Transactions";
import "./App.css";

const API_BASE_URL = "http://localhost:8080/api/books";
const AUTH_URL = "http://localhost:8080/api/auth";

const INITIAL_DEMO_BOOKS = [
  {
    id: 1,
    title: "Java Basics",
    author: "Herbert Schildt",
    borrowed: false,
    keyConcepts: "OOP Principles, Collections, Multithreading, Exceptions"
  },
  {
    id: 2,
    title: "HTML & CSS",
    author: "Jon Duckett",
    borrowed: false,
    keyConcepts: "Semantic HTML, Flexbox & Grid, CSS Box Model, Responsive Design"
  },
  {
    id: 3,
    title: "JavaScript",
    author: "Marijn Haverbeke",
    borrowed: false,
    keyConcepts: "ES6+ Syntax, Async/Await, DOM Manipulation, Closures"
  },
  {
    id: 4,
    title: "Spring Boot Basics",
    author: "Craig Walls",
    borrowed: false,
    keyConcepts: "Dependency Injection, REST APIs, Spring Data JPA, Embedded Tomcat"
  },
  {
    id: 5,
    title: "Database Fundamentals",
    author: "Beginner Guide",
    borrowed: false,
    keyConcepts: "SQL Queries, Normalization, Primary/Foreign Keys, Indexing"
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authHeader, setAuthHeader] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [books, setBooks] = useState(INITIAL_DEMO_BOOKS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }
    return headers;
  };

  // 1. Fetch books from Spring Boot REST API
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        headers: getHeaders(),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.warn("Backend error fetching books:", err);
      setError("Spring Boot is not running yet. Displaying demo books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks();
    }
  }, [isLoggedIn, authHeader]);

  // 2. Borrow a book (PUT /api/books/{id}/borrow)
  const handleBorrow = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/borrow`, {
        method: "PUT",
        headers: getHeaders(),
        credentials: "include",
      });
      if (response.ok) {
        const updatedBook = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === id ? updatedBook : b))
        );
      } else {
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === id ? { ...b, borrowed: true } : b))
        );
      }
    } catch (err) {
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === id ? { ...b, borrowed: true } : b))
      );
    }
  };

  // 3. Return a book (PUT /api/books/{id}/return)
  const handleReturn = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/return`, {
        method: "PUT",
        headers: getHeaders(),
        credentials: "include",
      });
      if (response.ok) {
        const updatedBook = await response.json();
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === id ? updatedBook : b))
        );
      } else {
        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === id ? { ...b, borrowed: false } : b))
        );
      }
    } catch (err) {
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === id ? { ...b, borrowed: false } : b))
      );
    }
  };

  const handleLoginSuccess = (basicHeader) => {
    if (basicHeader) {
      setAuthHeader(basicHeader);
    }
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = async () => {
    try {
      await fetch(`${AUTH_URL}/logout`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
      });
    } catch (e) {
      console.warn("Logout request failed", e);
    }
    setAuthHeader("");
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  const borrowedCount = books.filter((b) => b.borrowed).length;

  return (
    <div className="app-container">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        borrowedCount={borrowedCount}
      />

      <main className="main-content">
        {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}

        {isLoggedIn && currentPage === "home" && (
          <Home onBrowseClick={() => setCurrentPage("books")} />
        )}

        {isLoggedIn && currentPage === "books" && (
          <Books
            books={books}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
            loading={loading}
            error={error}
          />
        )}

        {isLoggedIn && currentPage === "borrowed" && (
          <BorrowedBooks books={books} onReturn={handleReturn} />
        )}

        {isLoggedIn && currentPage === "transactions" && (
          <Transactions authHeader={authHeader} />
        )}
      </main>
    </div>
  );
}

export default App;
