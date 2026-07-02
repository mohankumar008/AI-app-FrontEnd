import React from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-violet to-violet-dim text-white shadow-glow hover:shadow-[0_0_55px_rgba(124,92,255,0.55)]",
  ghost:
    "bg-white/5 text-mist border border-white/10 hover:bg-white/10 hover:text-white",
  outline:
    "bg-transparent border border-violet/60 text-violet-glow hover:bg-violet/10",
};

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`w-full rounded-xl px-5 py-3 font-display font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
