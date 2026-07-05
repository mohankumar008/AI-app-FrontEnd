import React, { useContext, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, FileStack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserDetailContext } from "./context/UserDetailContext";

const plans = [
  {
    name: "Free Trial",
    price: "Free",
    period: "for 24 hours",
    icon: Sparkles,
    features: [
      "Max file size: 5 MB",
      "OCR support: Yes",
      "Customer support: No",
      "Sessions: Unlimited",
    ],
    cta: "Create free account",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/ week",
    icon: Zap,
    features: [
      "Max file size: 5 MB",
      "OCR support: Yes",
      "Customer support: Yes",
      "Sessions: Unlimited",
    ],
    cta: "Select plan",
    highlight: true,
  },
  {
    name: "Advanced",
    price: "₹3499",
    period: "/ month",
    icon: Crown,
    features: [
      "Max file size: 5 MB",
      "OCR support: Yes",
      "Customer support: Yes",
      "Sessions: Unlimited",
    ],
    cta: "Select plan",
    highlight: false,
  },
];

const Subplans = () => {
  const { planDetails, userCompleteDetails } = useContext(UserDetailContext);
  const url = `https://ai-app-backend-production-b9e9.up.railway.app/planreg`;

  useEffect(() => {
    const sendData = async () => {
      const data = userCompleteDetails();
      await axios.post(url, {
        Yourname: data.Yourname,
        youremail: data.youremail,
        password: data.password,
        plan: data.plan,
      });
    };
    return sendData;
  }, [userCompleteDetails]);

  const navigate = useNavigate();
  const handleAccount = (planName) => {
    planDetails(planName);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#EEF0F5" }}>
      {/* Sidebar */}
      <div
        className="hidden lg:flex flex-col w-64 shrink-0 px-7 py-10 justify-between"
        style={{
          background: "linear-gradient(160deg, #1A1D2E 0%, #2D3154 100%)",
          boxShadow: "4px 0 32px rgba(108,99,255,0.18)",
        }}
      >
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4AA)",
                boxShadow: "0 0 20px rgba(108,99,255,0.5)",
              }}
            >
              <FileStack className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              DocAI
            </span>
          </div>
          <p
            className="text-xs font-semibold mb-4 uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Choose your plan
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            From active listening to strategic implementation, we redefine
            systems for enhanced efficiency and informed decision-making.
          </p>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 DocAI
        </p>
      </div>

      {/* Plans */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h4
            className="font-display text-3xl font-bold"
            style={{ color: "#2D2F4A" }}
          >
            Select your <span style={{ color: "#6C63FF" }}>plan</span>
          </h4>
          <p className="mt-2 text-sm" style={{ color: "#9A9DC0" }}>
            No credit card required for free trial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-4xl">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative flex flex-col rounded-3xl p-7"
                style={
                  plan.highlight
                    ? {
                        background:
                          "linear-gradient(135deg, #6C63FF 0%, #4A42CC 60%, #00D4AA 100%)",
                        boxShadow:
                          "0 16px 48px rgba(108,99,255,0.45), 0 4px 16px rgba(0,212,170,0.2)",
                      }
                    : {
                        backgroundColor: "#EEF0F5",
                        boxShadow:
                          "8px 8px 20px #c8cad4, -8px -8px 20px #ffffff",
                      }
                }
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold"
                    style={{
                      background: "#EEF0F5",
                      color: "#6C63FF",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    Most popular
                  </div>
                )}

                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={
                    plan.highlight
                      ? { background: "rgba(255,255,255,0.2)" }
                      : {
                          background: "rgba(108,99,255,0.1)",
                          boxShadow:
                            "3px 3px 6px #c8cad4, -3px -3px 6px #ffffff",
                        }
                  }
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: plan.highlight ? "#ffffff" : "#6C63FF" }}
                  />
                </div>

                <h5
                  className="font-display text-lg font-bold"
                  style={{ color: plan.highlight ? "#ffffff" : "#2D2F4A" }}
                >
                  {plan.name}
                </h5>
                <div className="mt-1 mb-6 flex items-baseline gap-1">
                  <span
                    className="font-display text-3xl font-bold"
                    style={{ color: plan.highlight ? "#ffffff" : "#2D2F4A" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: plan.highlight
                        ? "rgba(255,255,255,0.7)"
                        : "#9A9DC0",
                    }}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="mb-7 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm"
                      style={{
                        color: plan.highlight
                          ? "rgba(255,255,255,0.9)"
                          : "#6A6E90",
                      }}
                    >
                      <div
                        className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: plan.highlight
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(0,212,170,0.15)",
                        }}
                      >
                        <Check
                          className="h-3 w-3"
                          style={{
                            color: plan.highlight ? "#ffffff" : "#00D4AA",
                          }}
                        />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleAccount(plan.name)}
                  className="w-full rounded-2xl py-3.5 font-display font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  style={
                    plan.highlight
                      ? {
                          background: "#ffffff",
                          color: "#6C63FF",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                        }
                      : {
                          background:
                            "linear-gradient(135deg, #6C63FF, #00D4AA)",
                          color: "#ffffff",
                          boxShadow: "0 4px 16px rgba(108,99,255,0.4)",
                        }
                  }
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subplans;
