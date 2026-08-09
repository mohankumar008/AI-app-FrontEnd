import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDetailContext } from "./context/UserDetailContext";

const plans = [
  {
    name: "Free Trial",
    price: "Free",
    period: "Expires in 24 hours",
    featured: false,
    features: [
      { label: "Max file size: 5 MB", yes: true },
      { label: "OCR support", yes: true },
      { label: "Customer support", yes: false },
      { label: "Unlimited sessions", yes: true },
    ],
    cta: "Get started free",
    free: true,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "per week",
    featured: true,
    badge: "Popular",
    features: [
      { label: "Max file size: 5 MB", yes: true },
      { label: "OCR support", yes: true },
      { label: "Customer support", yes: true },
      { label: "Unlimited sessions", yes: true },
    ],
    cta: "Subscribe — ₹999/wk",
    free: false,
  },
  {
    name: "Advanced",
    price: "₹3499",
    period: "per month",
    featured: false,
    features: [
      { label: "Max file size: 5 MB", yes: true },
      { label: "OCR support", yes: true },
      { label: "Customer support", yes: true },
      { label: "Unlimited sessions", yes: true },
    ],
    cta: "Subscribe — ₹3499/mo",
    free: false,
  },
];

const Subplans = () => {
  const { planDetails, userCompleteDetails } = useContext(UserDetailContext);
  const navigate = useNavigate();

  const url = `https://ai-app-backend-ypkt.onrender.com/planreg`;

  const handleAccount = async (plan) => {
    planDetails(plan.name);

    if (plan.free) {
      // Free Trial — directly register & go to login
      const data = userCompleteDetails
        ? { ...userCompleteDetails(), plan: plan.name }
        : { plan: plan.name };
      try {
        await axios.post(url, {
          Yourname: data.Yourname,
          youremail: data.youremail,
          password: data.password,
          plan: data.plan,
        });
      } catch (e) {
        console.log(e);
      }
      navigate("/login");
    } else {
      // Paid plan — pass user data to payment page
      const data = userCompleteDetails ? userCompleteDetails() : {};
      navigate("/payment", {
        state: {
          plan: plan.name,
          userData: {
            Yourname: data.Yourname,
            youremail: data.youremail,
            password: data.password,
          },
        },
      });
    }
  };

  return (
    <div className="plans-wrap">
      <h2 className="plans-title">Select your plan</h2>
      <p className="plans-subtitle">
        From active listening to strategic implementation, we redefine systems
        for enhanced efficiency, simplified processes, and informed
        decision-making.
      </p>

      <div className="plans-grid">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`plan-card ${plan.featured ? "featured" : ""}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}

            <div className="plan-header">
              <div className="plan-name">{plan.name}</div>
            </div>

            <div className="plan-body">
              <div className="plan-price">
                {plan.price}
                {!plan.free && (
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--muted)",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    /{plan.period.replace("per ", "")}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                {plan.period}
              </div>

              {plan.features.map((f) => (
                <div key={f.label} className="plan-feature">
                  <div className={`plan-feature-icon ${f.yes ? "yes" : "no"}`}>
                    {f.yes ? "✓" : "✕"}
                  </div>
                  {f.label}
                </div>
              ))}

              <button
                className="btn-plan"
                onClick={() => handleAccount(plan)}
                style={
                  plan.featured
                    ? {
                        background: "var(--blue)",
                        color: "var(--navy)",
                        border: "none",
                      }
                    : {}
                }
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subplans;
