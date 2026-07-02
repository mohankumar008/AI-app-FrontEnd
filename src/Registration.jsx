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

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData({ ...formData, [name]: value });
  };

  const handleterms = () => {
    setischecked(!ischecked);
  };

  const handleshow = () => {
    setshow(show === "password" ? "text" : "password");
  };

  const gologinpage = () => {
    navigate("/login");
  };

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
        const data = response.data;

        if (response.status === 200) {
          if (!data.success) {
            alert("Email aleady exists,please login or use another email");
          } else {
            if (data.success) {
              navigate("/plan");
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
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
            <FileText className="h-6 w-6 text-ink" />
          </motion.div>
          <h5 className="font-display text-2xl font-bold text-white">
            Create your account
          </h5>
          <p className="mt-1 text-sm text-mist/70">
            Start scanning, extracting, and understanding your documents
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

        <label className="mb-6 mt-1 flex cursor-pointer items-start gap-2 text-sm text-mist/80">
          <input
            type="checkbox"
            onClick={handleterms}
            className="mt-0.5 h-4 w-4 cursor-pointer accent-violet"
          />
          I agree and accept the terms and conditions
        </label>

        <Button onClick={handlelogin} disabled={ischecked}>
          Create account
        </Button>

        <p className="mt-6 text-center text-sm text-mist/70">
          Already have an account?{" "}
          <button
            onClick={gologinpage}
            className="font-semibold text-violet-glow transition-colors hover:text-cyan"
          >
            Log in
          </button>
        </p>
      </GlassCard>
    </AuthShell>
  );
};

export default Registration;
