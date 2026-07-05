import React from "react";

const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        backgroundColor: "#EEF0F5",
        boxShadow: "8px 8px 20px #c8cad4, -8px -8px 20px #ffffff",
      }}
    >
      {/* scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 overflow-hidden">
        <div
          className="h-px w-full animate-scan"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)",
          }}
        />
      </div>
      {/* top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-3xl"
        style={{ background: "linear-gradient(90deg, #6C63FF, #00D4AA)" }}
      />
      <div className="relative z-10 p-8 sm:p-10">{children}</div>
    </div>
  );
};

export default GlassCard;
