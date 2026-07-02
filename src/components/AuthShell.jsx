import React from "react";
import { motion } from "framer-motion";

/**
 * Shared shell for auth/plan screens.
 * Provides the animated indigo backdrop + grid texture + floating glow orbs.
 * `children` is the foreground content (usually a glass card).
 */
const AuthShell = ({ children, wide = false }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-ink flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-grid-fade opacity-30 pointer-events-none" />

      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet/10 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-cyan/10 blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative z-10 w-full ${wide ? "max-w-5xl" : "max-w-md"}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthShell;
