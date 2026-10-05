import React, { useState, useEffect } from "react";

function Transactions({ authHeader }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = {};
        if (authHeader) {
          headers["Authorization"] = authHeader;
        }
        const response = await fetch("http://localhost:8080/api/transactions", {
          headers: headers,
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.warn("Could not fetch transactions from backend.", err);
        setError("Unable to load transactions from backend. Make sure Spring Boot is running!");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [authHeader]);

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h1 className="page-title">Transaction History</h1>
        <p className="page-desc">Complete record of your borrowing and returning activities.</p>
      </div>

      {loading && <p className="status-message">Loading transactions...</p>}

      {error && <div className="error-banner">⚠️ {error}</div>}

      {!loading && !error && transactions.length === 0 && (
        <div className="empty-state">
          <p className="empty-title">No transactions recorded yet.</p>
          <p className="empty-subtitle">Borrow a book from the Books catalog to record your first transaction!</p>
        </div>
      )}

      {!loading && transactions.length > 0 && (
        <div className="transactions-list">
          {transactions.map((tx) => (
            <div key={tx.id} className="transaction-card">
              <div className="tx-header">
                <span className="tx-book-icon">📕</span>
                <h3 className="tx-book-title">{tx.book ? tx.book.title : "Unknown Book"}</h3>
                <span
                  className={`tx-status-badge ${
                    tx.status === "BORROWED" ? "tx-status-borrowed" : "tx-status-returned"
                  }`}
                >
                  {tx.status}
                </span>
              </div>

              <div className="tx-details">
                <p>
                  <strong>Borrowed:</strong> {tx.borrowDate || "—"}
                </p>
                <p>
                  <strong>Returned:</strong> {tx.returnDate || "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;
