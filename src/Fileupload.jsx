import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileCheck2,
  AlertTriangle,
  Send,
  Bot,
  User,
  Trash2,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AuthShell from "./components/AuthShell";
import GlassCard from "./components/GlassCard";
import Button from "./components/Button";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction:
    "You are a helpful, friendly AI assistant. Answer clearly and concisely. If the user writes in Tamil or Tanglish, respond in the same language.",
});

const Fileupload = () => {
  const [error, seterror] = useState();
  const [file, setfile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Vanakkam! 👋 Naan ungaloda AI assistant. Enna venum-na kelu!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const bottomRef = useRef(null);

  const allowedtypes = [
    "application/pdf",
    "application/doc",
    "application/docx",
    "image/png",
    "image/jpg",
  ];
  const maxfilesize = 5 * 1024 * 1024;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const processFile = (uplodedfile) => {
    if (uplodedfile) {
      if (!allowedtypes.includes(uplodedfile.type)) {
        seterror("Invalid file format. Please use PDF, DOC, DOCX, PNG or JPG.");
        setfile(null);
      } else if (uplodedfile.size > maxfilesize) {
        seterror("File size must be less than 5MB.");
      } else {
        seterror(null);
        setfile(uplodedfile);
      }
    }
  };

  const handlefileupload = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (!file) return;
    // start a fresh Gemini chat session
    const chatSession = model.startChat({ history: [] });
    setChat(chatSession);
    setSubmitted(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `"${file.name}" ready! Idha pathi enna therinja venum?`,
      },
    ]);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || !chat) return;

    const newUserMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const result = await chat.sendMessage(text);
      const reply = result.response.text();
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Error vandhuruku. API key check pannunga.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    const chatSession = model.startChat({ history: [] });
    setChat(chatSession);
    setMessages([
      {
        role: "assistant",
        content: "Vanakkam! 👋 Naan ungaloda AI assistant. Enna venum-na kelu!",
      },
    ]);
  };

  // ── UPLOAD SCREEN ──
  if (!submitted) {
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
              <UploadCloud className="h-6 w-6 text-white" />
            </motion.div>
            <h4 className="font-display text-2xl font-bold text-slate-800">
              Upload your file
            </h4>
            <p className="mt-1 text-sm text-mist/70">
              PDF, DOC, DOCX, PNG or JPG — up to 5MB
            </p>
          </div>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
              dragActive
                ? "border-violet bg-violet/10"
                : "border-slate-200 bg-slate-50 hover:border-violet/50"
            }`}
          >
            <input type="file" onChange={handlefileupload} className="hidden" />
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <FileCheck2 className="h-8 w-8 text-violet" />
                  <span className="max-w-[220px] truncate text-sm font-medium text-slate-700">
                    {file.name}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <UploadCloud className="h-8 w-8 text-slate-400" />
                  <span className="text-sm text-slate-500">
                    Drag &amp; drop or{" "}
                    <span className="font-semibold text-violet">browse</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </label>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <Button onClick={handleSubmit} disabled={!file} className="mt-6">
            Submit &amp; Start Chat
          </Button>
        </GlassCard>
      </AuthShell>
    );
  }

  // ── CHAT SCREEN ──
  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-cyan/70">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-display font-semibold text-slate-800">
              Gemini AI Assistant
            </p>
            {file && (
              <p className="text-xs text-slate-400 truncate max-w-[200px]">
                {file.name}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" /> Clear
        </button>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-violet to-cyan/70"
                    : "bg-slate-200"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-white" />
                ) : (
                  <User className="h-4 w-4 text-slate-600" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "assistant"
                    ? "bg-white text-slate-700 shadow-sm border border-slate-100"
                    : "bg-violet text-white"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan/70">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-violet/60"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div className="border-t border-slate-200 bg-white px-4 py-4">
        <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-violet focus-within:ring-2 focus-within:ring-violet/20 transition-all">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send)"
            className="flex-1 resize-none bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
            style={{ maxHeight: "120px" }}
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet text-white disabled:opacity-40 transition-opacity"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          Powered by Google Gemini 1.5 Flash
        </p>
      </div>
    </div>
  );
};

export default Fileupload;
