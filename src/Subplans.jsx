import React, { useContext, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserDetailContext } from "./context/UserDetailContext";
import AuthShell from "./components/AuthShell";
import Button from "./components/Button";

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
      "Total sessions: Unlimited",
    ],
    cta: "Create a free account",
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
      "Total sessions: Unlimited",
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
      "Total sessions: Unlimited",
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
    <AuthShell wide>
      <div className="mb-12 text-center">
        <motion.h4
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-white sm:text-4xl"
        >
          Select your <span className="text-violet-glow">plan</span>
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-3 max-w-xl text-sm text-mist/70 sm:text-base"
        >
          From active listening to strategic implementation, we redefine systems
          for enhanced efficiency, simplified processes, and informed
          decision-making.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan, i) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col rounded-2xl border p-7 backdrop-blur-xl transition-shadow ${
                plan.highlight
                  ? "border-violet/60 bg-surface/80 shadow-glow"
                  : "border-white/10 bg-surface/50 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet to-cyan/70 px-3 py-1 text-xs font-semibold text-ink">
                  Most popular
                </span>
              )}

              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet/15">
                <Icon className="h-5 w-5 text-violet-glow" />
              </div>

              <h5 className="font-display text-lg font-semibold text-white">
                {plan.name}
              </h5>
              <div className="mt-1 mb-5 flex items-baseline gap-1">
                <span className="font-display text-2xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-mist/60">{plan.period}</span>
              </div>

              <ul className="mb-7 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-mist/80"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleAccount(plan.name)}
                variant={plan.highlight ? "primary" : "outline"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </AuthShell>
  );
};

export default Subplans;
