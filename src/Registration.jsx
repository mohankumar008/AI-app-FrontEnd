import React, { useState, useContext } from "react";
import axios from "axios";
import { UserDetailContext } from "./context/UserDetailContext";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { saveUserDetails } = useContext(UserDetailContext);
  const [formData, setformData] = useState({
    Yourname: "",
    youremail: "",
    password: "",
  });
  const [ischecked, setischecked] = useState(true);
  const [show, setshow] = useState("password");
  const [loading, setLoading] = useState(false);
  const [shakeTerms, setShakeTerms] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleshow = () => setshow(show === "password" ? "text" : "password");
  const gologinpage = () => navigate("/login");

  const url = `https://ai-app-backend-ypkt.onrender.com/reg`;

  const handlelogin = async () => {
    saveUserDetails(formData);
    if (ischecked) {
      setShakeTerms(true);
      setTimeout(() => setShakeTerms(false), 400);
      alert("please accept the terms and conditions to process");
    } else {
      setLoading(true);
      try {
        const response = await axios.post(url, {
          Yourname: formData.Yourname,
          youremail: formData.youremail,
          password: formData.password,
        });
        const data = response.data;
        if (response.status === 200) {
          if (!data.success) {
            alert("Email already exists, please login or use another email");
          } else if (data.success) {
            navigate("/plan");
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <h2 className="auth-title">Create your account</h2>
      <p className="auth-subtitle">Enter your details to get started</p>

      <div className="field-group" style={{ animationDelay: "0.05s" }}>
        <label className="field-label">Your name</label>
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input
            type="text"
            className="field-input"
            name="Yourname"
            placeholder="John Doe"
            onChange={handlechange}
          />
        </div>
      </div>

      <div className="field-group" style={{ animationDelay: "0.1s" }}>
        <label className="field-label">Your email</label>
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
            onChange={handlechange}
          />
        </div>
      </div>

      <div className="field-group" style={{ animationDelay: "0.15s" }}>
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
            onChange={handlechange}
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

      <div className={`field-checkbox-row ${shakeTerms ? "shake" : ""}`}>
        <input
          type="checkbox"
          className="field-checkbox"
          id="terms"
          onClick={() => setischecked(!ischecked)}
        />
        <label htmlFor="terms" className="field-checkbox-label">
          I agree and accept the terms and conditions
        </label>
      </div>

      <button onClick={handlelogin} className="btn-auth" disabled={loading}>
        {loading && <span className="spinner" />}
        {loading ? "Creating account..." : "Create account"}
      </button>

      <div className="auth-divider">already have an account</div>
      <button onClick={gologinpage} className="btn-auth-outline">
        Login instead
      </button>
    </div>
  );
};

export default Registration;
