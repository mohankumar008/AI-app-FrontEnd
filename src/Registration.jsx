import React, { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserDetailContext } from "./context/UserDetailContext";
import AuthShell from "./components/AuthShell";
import GlassCard from "./components/GlassCard";
import Input from "./components/Input";
import Button from "./components/Button";

const Registration = () => {
  const { saveUserDetails } = useContext(UserDetailContext);
  const [formData, setformData] = useState({
    Yourname: "",
    youremail: "",
    password: "",
  });
  const [ischecked, setischecked] = useState(true);
  const [show, setshow] = useState("password");
  const navigate = useNavigate();

  const handlechange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });
  const handleterms = () => setischecked(!ischecked);
  const handleshow = () => setshow(show === "password" ? "text" : "password");
  const gologinpage = () => navigate("/login");

  const url = `https://ai-app-backend-production-b9e9.up.railway.app/reg`;
  const handlelogin = async () => {
    saveUserDetails(formData);
    if (ischecked) {
      alert("please accept the terms and conditions to process");
    } else {
      try {
        const response = await axios.post(url, {
          Yourname: formData.Yourname,
          youremail: formData.youremail,
          password: formData.password,
        });
        if (response.status === 200) {
          if (!response.data.success)
            alert("Email already exists, please login or use another email");
          else navigate("/plan");
        }
      } catch (e) {
        console.error(e);
      }
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
            <FileText className="h-8 w-8 text-white" />
          </motion.div>
          <h5
            className="font-display text-2xl font-bold"
            style={{ color: "#2D2F4A" }}
          >
            Create your account
          </h5>
          <p className="mt-1.5 text-sm" style={{ color: "#7A7EA0" }}>
            Start analyzing your documents with AI
          </p>
        </div>

        <Input
          label="Your name"
          name="Yourname"
          onChange={handlechange}
          placeholder="Jordan Lee"
        />
        <Input
          label="Your email"
          type="email"
          name="youremail"
          onChange={handlechange}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type={show}
          name="password"
          onChange={handlechange}
          placeholder="••••••••"
          rightSlot={
            <button
              type="button"
              onClick={handleshow}
              style={{ color: "#9A9DC0" }}
              className="hover:text-violet transition-colors"
            >
              {show === "password" ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          }
        />

        <label
          className="mb-6 flex cursor-pointer items-center gap-3 text-sm select-none"
          style={{ color: "#7A7EA0" }}
        >
          <div
            onClick={handleterms}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md cursor-pointer transition-all"
            style={{
              boxShadow: ischecked
                ? "inset 2px 2px 4px #c8cad4, inset -2px -2px 4px #ffffff"
                : "none",
              background: ischecked
                ? "#EEF0F5"
                : "linear-gradient(135deg, #6C63FF, #00D4AA)",
            }}
          >
            {!ischecked && (
              <span className="text-white text-xs font-bold">✓</span>
            )}
          </div>
          I agree and accept the terms and conditions
        </label>

        <Button onClick={handlelogin} disabled={ischecked}>
          Create account
        </Button>

        <p className="mt-6 text-center text-sm" style={{ color: "#9A9DC0" }}>
          Already have an account?{" "}
          <button
            onClick={gologinpage}
            className="font-semibold transition-colors"
            style={{ color: "#6C63FF" }}
          >
            Log in
          </button>
        </p>
      </GlassCard>
    </AuthShell>
  );
};

export default Registration;
