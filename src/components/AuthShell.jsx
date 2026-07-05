import React from "react";
import { motion } from "framer-motion";
import { FileStack, Cpu, Eye, Shield, Zap } from "lucide-react";

const features = [
  { icon: Cpu, label: "Smart document analysis" },
  { icon: Eye, label: "OCR powered extraction" },
  { icon: Zap, label: "AI chat assistant" },
  { icon: Shield, label: "Secure & private" },
];

const AuthShell = ({ children, wide = false }) => {
  return (
    <div
      className="min-h-screen w-full flex"
      style={{ backgroundColor: "#EEF0F5" }}
    >
      {/* Dark sidebar */}
      <div
        className="hidden lg:flex flex-col w-72 shrink-0 px-8 py-10 justify-between"
        style={{
          background: "linear-gradient(160deg, #1A1D2E 0%, #2D3154 100%)",
          boxShadow: "4px 0 32px rgba(108,99,255,0.18)",
        }}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div
              className="h-11 w-11 rounded-2xl flex items-center justify-center animate-float"
              style={{
                background: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
                boxShadow: "0 0 24px rgba(108,99,255,0.5)",
              }}
            >
              <FileStack className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-wide">
              DocAI
            </span>
          </div>

          {/* Feature list */}
          <div className="space-y-1">
            {features.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(108,99,255,0.25)" }}
                >
                  <Icon
                    className="h-3.5 w-3.5 text-violet-glow"
                    style={{ color: "#8B83FF" }}
                  />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Decorative card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 rounded-2xl p-5"
            style={{
              background: "rgba(108,99,255,0.15)",
              border: "1px solid rgba(108,99,255,0.25)",
            }}
          >
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: "#8B83FF" }}
            >
              Free tier includes
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Unlimited sessions · OCR support · 5MB file size
            </p>
          </motion.div>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 DocAI. All rights reserved.
        </p>
      </div>

      {/* Light content area */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`w-full ${wide ? "max-w-4xl" : "max-w-md"}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthShell;
