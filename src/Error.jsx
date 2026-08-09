import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-wrap">
      <div className="error-code">401</div>
      <h2 className="error-title">Access Denied</h2>
      <p className="error-desc">You need to login first to access this page.</p>
      <button
        className="btn-auth"
        style={{ maxWidth: 200, margin: "0 auto", display: "block" }}
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Error;
