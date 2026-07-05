import React from "react";
import { motion } from "framer-motion";
import { FileWarning } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import GlassCard from "./components/GlassCard";
import Button from "./components/Button";

const Error = () => {
  const navigate = useNavigate();
  return (
    <AuthShell>
      <GlassCard className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface shadow-neu animate-float"
        >
          <FileWarning className="h-7 w-7 text-violet" />
        </motion.div>
        <h1 className="font-display text-2xl font-bold text-mist">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-mist/60">
          Looks like you need to log in again, or this page doesn't exist.
        </p>
        <Button onClick={() => navigate("/login")} className="mt-7">
          Back to login
        </Button>
      </GlassCard>
    </AuthShell>
  );
};

export default Error;
