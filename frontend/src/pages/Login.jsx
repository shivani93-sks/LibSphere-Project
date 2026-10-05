import React, { useState } from "react";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const basicAuth = "Basic " + btoa(`${username}:${password}`);

    try {
      // Spring Security Authentication request
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": basicAuth,
        },
        credentials: "include", // Sends & receives session cookie JSESSIONID
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLoginSuccess(basicAuth);
      } else {
        setErrorMessage(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.warn("Spring Boot backend offline on port 8080. Using fallback check.", err);
      if (username === "student" && password === "1234") {
        onLoginSuccess(basicAuth);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">📚</div>
        <h2 className="login-title">LibSphere</h2>
        <p className="login-subtitle">Secure Student Login</p>

        {errorMessage && (
          <div className="login-error-badge">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username (student)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password (1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="login-hint">
          Student account: <strong>student</strong> / <strong>1234</strong>
        </p>
      </div>
    </div>
  );
}

export default Login;
