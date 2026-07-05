import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff, ScanLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthShell from "./components/AuthShell";
import GlassCard from "./components/GlassCard";
import Input from "./components/Input";
import Button from "./components/Button";

const NextLogin = () => {
  const [show, setshow] = useState("password");
  const [logindatas, setlogindatas] = useState({ youremail: "", password: "" });
  const navigate = useNavigate();

  const handleshow = () => setshow(show === "password" ? "text" : "password");
  const handlecreate = () => navigate("/");
  const handlechangeinlogin = (e) =>
    setlogindatas({ ...logindatas, [e.target.name]: e.target.value });

  const url = `https://ai-app-backend-production-b9e9.up.railway.app/savelogin`;
  const handleAuthenticate = async () => {
    try {
      const response = await axios.post(url, {
        youremail: logindatas.youremail,
        password: logindatas.password,
      });
      if (response.status === 201) alert("user not found");
      else if (response.status === 202) alert("invalid password");
      else if (response.status === 203) {
        alert("Your plan expired, please create new account!");
        navigate("/plan");
      } else {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("token-update"));
        navigate("/fileupload");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthShell>
      <GlassCard>
        <div className="mb-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl animate-float"
            style={{
              background: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
              boxShadow: "0 8px 32px rgba(108,99,255,0.45)",
            }}
          >
            <ScanLine className="h-8 w-8 text-white" />
          </motion.div>
          <h5
            className="font-display text-2xl font-bold"
            style={{ color: "#2D2F4A" }}
          >
            Welcome back
          </h5>
          <p className="mt-1.5 text-sm" style={{ color: "#7A7EA0" }}>
            Log in to continue to your workspace
          </p>
        </div>

        <Input
          label="Email"
          type="email"
          name="youremail"
          onChange={handlechangeinlogin}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type={show}
          name="password"
          onChange={handlechangeinlogin}
          placeholder="••••••••"
          rightSlot={
            <button
              type="button"
              onClick={handleshow}
              style={{ color: "#9A9DC0" }}
            >
              {show === "password" ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          }
        />

        <Button onClick={handleAuthenticate} className="mt-2">
          Login
        </Button>

        <p className="mt-6 text-center text-sm" style={{ color: "#9A9DC0" }}>
          Don't have an account?{" "}
          <button
            onClick={handlecreate}
            className="font-semibold"
            style={{ color: "#6C63FF" }}
          >
            Create an account
          </button>
        </p>
      </GlassCard>
    </AuthShell>
  );
};

export default NextLogin;
