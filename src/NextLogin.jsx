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
  const [logindatas, setlogindatas] = useState({
    youremail: "",
    password: "",
  });

  const handleshow = () => {
    setshow(show === "password" ? "text" : "password");
  };

  const navigate = useNavigate();

  const handlecreate = () => {
    navigate("/");
  };

  const handlechangeinlogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setlogindatas({ ...logindatas, [name]: value });
  };

  const url = `https://ai-app-backend-production-b9e9.up.railway.app/savelogin`;

  const handleAuthenticate = async () => {
    try {
      const response = await axios.post(url, {
        youremail: logindatas.youremail,
        password: logindatas.password,
      });

      if (response.status === 201) {
        alert("user not found");
      } else {
        if (response.status === 202) {
          alert("invalid password");
        } else {
          if (response.status === 203) {
            alert("Your plan expired,please create new account!");
            navigate("/plan");
          } else {
            const tokens = response.data.token;
            localStorage.setItem("token", tokens);
            window.dispatchEvent(new Event("token-update"));
            navigate("/fileupload");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthShell>
      <GlassCard>
        <div className="mb-7 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-cyan/70 shadow-glow"
          >
            <ScanLine className="h-6 w-6 text-ink" />
          </motion.div>
          <h5 className="font-display text-2xl font-bold text-white">
            Welcome back
          </h5>
          <p className="mt-1 text-sm text-mist/70">
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
              className="text-mist/60 transition-colors hover:text-violet-glow"
              aria-label="Toggle password visibility"
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

        <p className="mt-6 text-center text-sm text-mist/70">
          Don't have an account?{" "}
          <button
            onClick={handlecreate}
            className="font-semibold text-violet-glow transition-colors hover:text-cyan"
          >
            Create an account
          </button>
        </p>
      </GlassCard>
    </AuthShell>
  );
};

export default NextLogin;
