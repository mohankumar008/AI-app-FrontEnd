import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const styles = {
    primary: {
      background: disabled
        ? "#c8cad4"
        : "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
      color: "#ffffff",
      boxShadow: disabled
        ? "none"
        : "0 4px 20px rgba(108,99,255,0.45), 0 2px 8px rgba(0,212,170,0.2)",
    },
    ghost: {
      background: "#EEF0F5",
      color: "#6C63FF",
      boxShadow: "5px 5px 10px #c8cad4, -5px -5px 10px #ffffff",
    },
    outline: {
      background: "#EEF0F5",
      color: "#6C63FF",
      boxShadow: "5px 5px 10px #c8cad4, -5px -5px 10px #ffffff",
      border: "1px solid rgba(108,99,255,0.3)",
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`w-full rounded-2xl px-5 py-3.5 font-display font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed ${className}`}
      style={styles[variant] || styles.primary}
    >
      {children}
    </motion.button>
  );
};

export default Button;
