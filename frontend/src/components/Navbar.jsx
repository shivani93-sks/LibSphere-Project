import React from "react";

function Navbar({ currentPage, setCurrentPage, isLoggedIn, onLogout, borrowedCount }) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo" onClick={() => setCurrentPage("home")}>
          📚 LibSphere
        </div>
        <button className="nav-btn logout-btn mobile-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="navbar-links">
        <button
          className={`nav-btn ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </button>
        <button
          className={`nav-btn ${currentPage === "books" ? "active" : ""}`}
          onClick={() => setCurrentPage("books")}
        >
          Books
        </button>
        <button
          className={`nav-btn ${currentPage === "borrowed" ? "active" : ""}`}
          onClick={() => setCurrentPage("borrowed")}
        >
          Borrowed
          {borrowedCount > 0 && <span className="nav-badge">{borrowedCount}</span>}
        </button>
        <button
          className={`nav-btn ${currentPage === "transactions" ? "active" : ""}`}
          onClick={() => setCurrentPage("transactions")}
        >
          History
        </button>
        <button className="nav-btn logout-btn desktop-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
