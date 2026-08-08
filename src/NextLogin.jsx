import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NextLogin = () => {
  const [show, setshow] = useState("password");
  const [loading, setLoading] = useState(false);
  const [logindatas, setlogindatas] = useState({ youremail: "", password: "" });
  const navigate = useNavigate();

  const handleshow = () => setshow(show === "password" ? "text" : "password");
  const handlecreate = () => navigate("/");
  const handlechangeinlogin = (e) => {
    const { name, value } = e.target;
    setlogindatas({ ...logindatas, [name]: value });
  };

  const url = `https://ai-app-backend-ypkt.onrender.com/savelogin`;

  const handleAuthenticate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url, {
        youremail: logindatas.youremail,
        password: logindatas.password,
      });
      if (response.status === 201) {
        alert("user not found");
      } else if (response.status === 202) {
        alert("invalid password");
      } else if (response.status === 203) {
        alert("Your plan expired, please create new account!");
        navigate("/plan");
      } else {
        const tokens = response.data.token;
        localStorage.setItem("token", tokens);
        window.dispatchEvent(new Event("token-update"));
        navigate("/fileupload");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-icon">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0B1120"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      </div>
      <h2 className="auth-title">Login to your account</h2>
      <p className="auth-subtitle">Enter your email and password to login</p>

      <div className="field-group" style={{ animationDelay: "0.05s" }}>
        <label className="field-label">Email</label>
        <div className="field-input-wrap">
          <span className="field-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m22 6-10 7L2 6" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
          </span>
          <input
            type="email"
            className="field-input"
            name="youremail"
            placeholder="name@example.com"
            onChange={handlechangeinlogin}
          />
        </div>
      </div>

      <div className="field-group" style={{ animationDelay: "0.1s" }}>
        <label className="field-label">Password</label>
        <div className="field-input-wrap">
          <span className="field-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            type={show}
            className="field-input has-toggle"
            name="password"
            placeholder="••••••••"
            onChange={handlechangeinlogin}
          />
          <button type="button" className="field-toggle" onClick={handleshow}>
            {show === "password" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleAuthenticate}
        className="btn-auth"
        style={{ marginTop: "1.5rem" }}
        disabled={loading}
      >
        {loading && <span className="spinner" />}
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="auth-divider">don't have an account</div>
      <button onClick={handlecreate} className="btn-auth-outline">
        Create an account
      </button>
    </div>
  );
};

export default NextLogin;
