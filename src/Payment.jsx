import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Building2,
  ChevronRight,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Wallet,
  Shield,
} from "lucide-react";

const BG = "#EEF0F5";
const NEU = "8px 8px 16px #c8cad4, -8px -8px 16px #ffffff";
const NEU_SM = "4px 4px 8px #c8cad4, -4px -4px 8px #ffffff";
const NEU_INSET = "inset 4px 4px 8px #c8cad4, inset -4px -4px 8px #ffffff";
const GRADIENT = "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)";
const GLOW = "0 4px 20px rgba(108,99,255,0.4)";

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "Pay using any UPI app" },
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: CreditCard,
    desc: "Visa, Mastercard, RuPay",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    icon: Building2,
    desc: "All major banks supported",
  },
  {
    id: "wallet",
    label: "Wallets",
    icon: Wallet,
    desc: "Paytm, PhonePe & more",
  },
];

const banks = [
  "SBI",
  "HDFC",
  "ICICI",
  "Axis",
  "Kotak",
  "Yes Bank",
  "PNB",
  "BOB",
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planName, price } = location.state || {
    planName: "Pro",
    price: "₹999",
  };

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [bank, setBank] = useState("");
  const [wallet, setWallet] = useState("");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCard = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + "/" + clean.slice(2);
    return clean;
  };

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setSuccess(true);
    }, 2200);
  };

  const canPay = () => {
    if (method === "upi") return upiId.includes("@");
    if (method === "card")
      return (
        cardData.number.replace(/\s/g, "").length === 16 &&
        cardData.name &&
        cardData.expiry.length === 5 &&
        cardData.cvv.length === 3
      );
    if (method === "netbanking") return !!bank;
    if (method === "wallet") return !!wallet;
    return false;
  };

  // Success screen
  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: BG }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-full max-w-sm text-center rounded-3xl p-10"
          style={{ backgroundColor: BG, boxShadow: NEU }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: GRADIENT, boxShadow: GLOW }}
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>
          <h2
            className="font-display text-2xl font-bold mb-2"
            style={{ color: "#2D2F4A" }}
          >
            Payment Successful!
          </h2>
          <p className="text-sm mb-1" style={{ color: "#9A9DC0" }}>
            You've subscribed to
          </p>
          <p
            className="font-display text-lg font-bold mb-1"
            style={{ color: "#6C63FF" }}
          >
            {planName}
          </p>
          <p className="text-sm mb-8" style={{ color: "#9A9DC0" }}>
            Amount paid:{" "}
            <span className="font-semibold" style={{ color: "#2D2F4A" }}>
              {price}
            </span>
          </p>

          <div
            className="rounded-2xl p-4 mb-6 text-left"
            style={{
              background: "rgba(108,99,255,0.08)",
              border: "1px solid rgba(108,99,255,0.2)",
            }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: "#6C63FF" }}>
              Transaction Details
            </p>
            <p className="text-xs" style={{ color: "#7A7EA0" }}>
              Transaction ID:{" "}
              <span style={{ color: "#2D2F4A" }}>
                TXN{Date.now().toString().slice(-8)}
              </span>
            </p>
            <p className="text-xs mt-1" style={{ color: "#7A7EA0" }}>
              Date:{" "}
              <span style={{ color: "#2D2F4A" }}>
                {new Date().toLocaleDateString("en-IN")}
              </span>
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="w-full rounded-2xl py-3.5 font-display font-bold text-white transition-all hover:scale-105"
            style={{ background: GRADIENT, boxShadow: GLOW }}
          >
            Continue to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: BG }}>
      {/* Left — Order summary */}
      <div
        className="hidden lg:flex flex-col w-80 shrink-0 px-8 py-10"
        style={{
          background: "linear-gradient(160deg, #1A1D2E 0%, #2D3154 100%)",
          boxShadow: "4px 0 32px rgba(108,99,255,0.18)",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to plans
        </button>

        <p
          className="text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Order Summary
        </p>

        <div
          className="rounded-2xl p-5 mb-4"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-display font-bold text-white">{planName}</p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                DocAI Subscription
              </p>
            </div>
            <p
              className="font-display text-xl font-bold"
              style={{ color: "#00D4AA" }}
            >
              {price}
            </p>
          </div>
          <div className="border-t border-white/10 pt-4 space-y-2">
            {[
              "OCR Support",
              "AI Chat Assistant",
              "Unlimited Sessions",
              "Priority Support",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "#00D4AA" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 mb-auto"
          style={{
            background: "rgba(0,212,170,0.1)",
            border: "1px solid rgba(0,212,170,0.25)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4" style={{ color: "#00D4AA" }} />
            <p className="text-xs font-bold" style={{ color: "#00D4AA" }}>
              100% Secure Payment
            </p>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            256-bit SSL encryption. Your data is safe.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <Lock
            className="h-3.5 w-3.5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            Secured by DocAI Payments
          </p>
        </div>
      </div>

      {/* Right — Payment form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile back */}
          <button
            onClick={() => navigate(-1)}
            className="lg:hidden flex items-center gap-2 text-sm mb-6"
            style={{ color: "#6C63FF" }}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <div
            className="rounded-3xl p-8"
            style={{ backgroundColor: BG, boxShadow: NEU }}
          >
            {/* Top accent */}
            <div
              className="absolute inset-x-0 top-0 h-0.5 rounded-t-3xl"
              style={{ background: GRADIENT }}
            />

            <h2
              className="font-display text-xl font-bold mb-1"
              style={{ color: "#2D2F4A" }}
            >
              Complete Payment
            </h2>
            <p className="text-sm mb-6" style={{ color: "#9A9DC0" }}>
              Choose your preferred payment method
            </p>

            {/* Payment method tabs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setMethod(id)}
                  className="flex items-center gap-2.5 rounded-2xl px-3 py-3 text-left transition-all"
                  style={
                    method === id
                      ? {
                          background: GRADIENT,
                          boxShadow: GLOW,
                          color: "#ffffff",
                        }
                      : {
                          backgroundColor: BG,
                          boxShadow: NEU_SM,
                          color: "#6A6E90",
                        }
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-semibold">{label}</span>
                </button>
              ))}
            </div>

            {/* Payment forms */}
            <AnimatePresence mode="wait">
              {method === "upi" && (
                <motion.div
                  key="upi"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <label
                    className="block text-xs font-bold mb-2"
                    style={{ color: "#6C63FF" }}
                  >
                    UPI ID
                  </label>
                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none mb-3"
                    style={{
                      backgroundColor: BG,
                      boxShadow: NEU_INSET,
                      color: "#4A4E6A",
                      border: "none",
                    }}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {["@okaxis", "@ybl", "@okhdfcbank", "@paytm"].map(
                      (suffix) => (
                        <button
                          key={suffix}
                          onClick={() =>
                            setUpiId((prev) => prev.split("@")[0] + suffix)
                          }
                          className="rounded-xl px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105"
                          style={{
                            backgroundColor: BG,
                            boxShadow: NEU_SM,
                            color: "#6C63FF",
                          }}
                        >
                          {suffix}
                        </button>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {method === "card" && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <label
                      className="block text-xs font-bold mb-2"
                      style={{ color: "#6C63FF" }}
                    >
                      Card Number
                    </label>
                    <input
                      value={cardData.number}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          number: formatCard(e.target.value),
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none font-mono"
                      style={{
                        backgroundColor: BG,
                        boxShadow: NEU_INSET,
                        color: "#4A4E6A",
                        border: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold mb-2"
                      style={{ color: "#6C63FF" }}
                    >
                      Cardholder Name
                    </label>
                    <input
                      value={cardData.name}
                      onChange={(e) =>
                        setCardData({ ...cardData, name: e.target.value })
                      }
                      placeholder="As on card"
                      className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none"
                      style={{
                        backgroundColor: BG,
                        boxShadow: NEU_INSET,
                        color: "#4A4E6A",
                        border: "none",
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        className="block text-xs font-bold mb-2"
                        style={{ color: "#6C63FF" }}
                      >
                        Expiry
                      </label>
                      <input
                        value={cardData.expiry}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        placeholder="MM/YY"
                        className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none"
                        style={{
                          backgroundColor: BG,
                          boxShadow: NEU_INSET,
                          color: "#4A4E6A",
                          border: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-bold mb-2"
                        style={{ color: "#6C63FF" }}
                      >
                        CVV
                      </label>
                      <input
                        value={cardData.cvv}
                        onChange={(e) =>
                          setCardData({
                            ...cardData,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                          })
                        }
                        placeholder="•••"
                        type="password"
                        className="w-full rounded-2xl px-4 py-3.5 text-sm outline-none"
                        style={{
                          backgroundColor: BG,
                          boxShadow: NEU_INSET,
                          color: "#4A4E6A",
                          border: "none",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {method === "netbanking" && (
                <motion.div
                  key="netbanking"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <label
                    className="block text-xs font-bold mb-3"
                    style={{ color: "#6C63FF" }}
                  >
                    Select Bank
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {banks.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBank(b)}
                        className="rounded-2xl py-3 text-xs font-bold transition-all"
                        style={
                          bank === b
                            ? {
                                background: GRADIENT,
                                color: "#fff",
                                boxShadow: GLOW,
                              }
                            : {
                                backgroundColor: BG,
                                boxShadow: NEU_SM,
                                color: "#6A6E90",
                              }
                        }
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {method === "wallet" && (
                <motion.div
                  key="wallet"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <label
                    className="block text-xs font-bold mb-3"
                    style={{ color: "#6C63FF" }}
                  >
                    Select Wallet
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWallet(w)}
                        className="rounded-2xl py-3.5 text-sm font-bold transition-all"
                        style={
                          wallet === w
                            ? {
                                background: GRADIENT,
                                color: "#fff",
                                boxShadow: GLOW,
                              }
                            : {
                                backgroundColor: BG,
                                boxShadow: NEU_SM,
                                color: "#6A6E90",
                              }
                        }
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pay button */}
            <motion.button
              onClick={handlePay}
              disabled={!canPay() || paying}
              whileHover={canPay() && !paying ? { scale: 1.02, y: -1 } : {}}
              whileTap={canPay() && !paying ? { scale: 0.97 } : {}}
              className="w-full mt-6 rounded-2xl py-4 font-display font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: GRADIENT,
                boxShadow: canPay() ? GLOW : "none",
              }}
            >
              {paying ? (
                <>
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Pay {price}
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </motion.button>

            <p
              className="mt-3 text-center text-xs"
              style={{ color: "#B0B3CC" }}
            >
              🔒 256-bit SSL secured · No data stored
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
