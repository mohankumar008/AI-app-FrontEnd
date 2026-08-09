import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || "Pro";
  const price = plan === "Pro" ? "999" : "3499";
  const period = plan === "Pro" ? "week" : "month";

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardType, setCardType] = useState("");

  const detectCardType = (num) => {
    const n = num.replace(/\s/g, "");
    if (/^4/.test(n)) return "VISA";
    if (/^5[1-5]/.test(n)) return "MC";
    if (/^6[0-9]/.test(n)) return "RuPay";
    return "";
  };

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = formatCardNumber(value);
      setCardType(detectCardType(value));
    }
    if (name === "expiry") value = formatExpiry(value);
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 3);
    setCardData({ ...cardData, [name]: value });
  };

  const isValid =
    cardData.name.trim().length > 2 &&
    cardData.number.replace(/\s/g, "").length === 16 &&
    cardData.expiry.length === 5 &&
    cardData.cvv.length === 3;

  const handlePay = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2200);
  };

  if (success) {
    return (
      <div className="auth-card" style={{ textAlign: "center", maxWidth: 420 }}>
        <div className="success-icon-wrap">✓</div>
        <h2 className="auth-title" style={{ color: "#34D399" }}>
          Payment Successful!
        </h2>
        <p
          style={{
            color: "#94A3B8",
            fontSize: "0.9rem",
            margin: "0.75rem 0 2rem",
            lineHeight: 1.7,
          }}
        >
          You're now subscribed to the{" "}
          <strong style={{ color: "#F8FAFC" }}>{plan}</strong> plan.
          <br />
          Enjoy unlimited access!
        </p>
        <button className="btn-auth" onClick={() => navigate("/login")}>
          Continue to Login
        </button>
      </div>
    );
  }

  return (
    <div className="payment-wrap">
      {/* Order Summary */}
      <div className="payment-summary">
        <div>
          <div className="payment-summary-label">Subscribing to</div>
          <div className="payment-summary-plan">{plan} Plan</div>
          <div className="payment-summary-period">Billed per {period}</div>
        </div>
        <div className="payment-summary-price">₹{price}</div>
      </div>

      {/* Card Preview */}
      <div className="card-preview">
        <div className="card-preview-circle1" />
        <div className="card-preview-circle2" />
        <div className="card-preview-top">
          <div className="card-preview-type-label">Debit / Credit Card</div>
          <div className="card-preview-brand">
            {cardType || <span style={{ opacity: 0.3 }}>····</span>}
          </div>
        </div>
        <div
          className="card-preview-number"
          style={{
            color: cardData.number ? "#F8FAFC" : "rgba(255,255,255,0.2)",
          }}
        >
          {cardData.number || "•••• •••• •••• ••••"}
        </div>
        <div className="card-preview-bottom">
          <div>
            <div className="card-preview-meta-label">CARD HOLDER</div>
            <div
              className="card-preview-meta-value"
              style={{
                color: cardData.name ? "#F8FAFC" : "rgba(255,255,255,0.25)",
              }}
            >
              {cardData.name || "YOUR NAME"}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="card-preview-meta-label">EXPIRES</div>
            <div
              className="card-preview-meta-value"
              style={{
                color: cardData.expiry ? "#F8FAFC" : "rgba(255,255,255,0.25)",
              }}
            >
              {cardData.expiry || "MM/YY"}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="auth-card" style={{ padding: "1.5rem" }}>
        <div className="field-group">
          <label className="field-label">Cardholder name</label>
          <div className="field-input-wrap">
            <span className="field-icon">
              <svg
                width="15"
                height="15"
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
              name="name"
              placeholder="Name on card"
              value={cardData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Card number</label>
          <div className="field-input-wrap">
            <span className="field-icon">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </span>
            <input
              type="text"
              className="field-input"
              name="number"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={handleChange}
              maxLength={19}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div className="field-group">
            <label className="field-label">Expiry</label>
            <div className="field-input-wrap">
              <span className="field-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <input
                type="text"
                className="field-input"
                name="expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={handleChange}
                maxLength={5}
              />
            </div>
          </div>
          <div className="field-group">
            <label className="field-label">CVV</label>
            <div className="field-input-wrap">
              <span className="field-icon">
                <svg
                  width="15"
                  height="15"
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
                type="password"
                className="field-input"
                name="cvv"
                placeholder="•••"
                value={cardData.cvv}
                onChange={handleChange}
                maxLength={3}
              />
            </div>
          </div>
        </div>

        {/* UPI Option */}
        <div className="upi-option">
          <div className="upi-icon">UPI</div>
          <div>
            <div className="upi-title">Pay with UPI</div>
            <div className="upi-subtitle">GPay, PhonePe, Paytm and more</div>
          </div>
          <div style={{ marginLeft: "auto", color: "#94A3B8" }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>

        <button
          className="btn-auth"
          onClick={handlePay}
          disabled={!isValid || loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Processing...
            </>
          ) : (
            `Pay ₹${price}`
          )}
        </button>

        <div className="secure-badge">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secured with 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
};

export default Payment;
