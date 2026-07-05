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
  FileStack,
  Paperclip,
  X,
} from "lucide-react";

const NEU = "8px 8px 16px #c8cad4, -8px -8px 16px #ffffff";
const NEU_SM = "4px 4px 8px #c8cad4, -4px -4px 8px #ffffff";
const NEU_INSET = "inset 4px 4px 8px #c8cad4, inset -4px -4px 8px #ffffff";
const GRADIENT = "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)";
const GLOW = "0 4px 20px rgba(108,99,255,0.45)";
const BG = "#EEF0F5";

const Fileupload = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Vanakkam! 👋 File upload pannunga — PDF, PNG, JPG, WEBP support pannuven. Adha analyze panni ungalukku help pannuven!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const mobileFileRef = useRef(null);

  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];
  const maxSize = 5 * 1024 * 1024;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const readFileAsBase64 = (f) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result.split(",")[1]);
      reader.onerror = rej;
      reader.readAsDataURL(f);
    });

  const processFile = async (f) => {
    setFileError(null);
    if (!f) return;
    if (!allowedTypes.includes(f.type)) {
      setFileError("Only PDF, PNG, JPG, WEBP supported.");
      return;
    }
    if (f.size > maxSize) {
      setFileError("File must be under 5MB.");
      return;
    }
    setFile(f);
    try {
      const b64 = await readFileAsBase64(f);
      setFileContent({ base64: b64, type: f.type, name: f.name });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `"${f.name}" ready! Idha pathi enna therinja venum? Analyze pannattuma?`,
        },
      ]);
    } catch {
      setFileError("File read failed. Try again.");
    }
  };

  const handleFileInput = (e) => processFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    processFile(e.dataTransfer.files[0]);
  };
  const removeFile = () => {
    setFile(null);
    setFileContent(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (mobileFileRef.current) mobileFileRef.current.value = "";
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const model = fileContent?.type.startsWith("image/")
        ? "llama-3.2-11b-vision-preview"
        : "llama-3.3-70b-versatile";
      const fileContext = fileContent ? `[File: "${fileContent.name}"]\n` : "";
      const apiMessages = [
        {
          role: "system",
          content: `You are an expert AI document assistant. ${fileContent ? `A file "${fileContent.name}" is uploaded.` : ""} Respond in Tamil/Tanglish if user writes in it.`,
        },
        ...newMessages.slice(-8).map((m) => {
          if (
            m.role === "user" &&
            fileContent?.type.startsWith("image/") &&
            newMessages.indexOf(m) === newMessages.length - 1
          ) {
            return {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${fileContent.type};base64,${fileContent.base64}`,
                  },
                },
                { type: "text", text },
              ],
            };
          }
          return {
            role: m.role,
            content:
              m.role === "user" &&
              newMessages.indexOf(m) === newMessages.length - 1
                ? fileContext + m.content
                : m.content,
          };
        }),
      ];
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages: apiMessages,
            max_tokens: 1024,
          }),
        },
      );
      const data = await response.json();
      const reply =
        data.choices?.[0]?.message?.content || "Maafi, error vandhuchu.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error vandhuchu. Try again." },
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
    setMessages([
      {
        role: "assistant",
        content:
          "Vanakkam! 👋 File upload pannunga — PDF, PNG, JPG, WEBP support pannuven. Adha analyze panni ungalukku help pannuven!",
      },
    ]);
    removeFile();
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: BG }}>
      {/* Sidebar */}
      <div
        className="hidden lg:flex flex-col w-64 shrink-0 px-6 py-8"
        style={{
          background: "linear-gradient(160deg, #1A1D2E 0%, #2D3154 100%)",
          boxShadow: "4px 0 32px rgba(108,99,255,0.18)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center"
            style={{ background: GRADIENT, boxShadow: GLOW }}
          >
            <FileStack className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-white">
            DocAI
          </span>
        </div>

        {/* Upload zone */}
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Upload File
        </p>
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center rounded-2xl px-4 py-7 text-center cursor-pointer transition-all"
          style={{
            border: dragActive
              ? "2px solid #00D4AA"
              : "2px dashed rgba(255,255,255,0.2)",
            background: dragActive
              ? "rgba(0,212,170,0.1)"
              : "rgba(255,255,255,0.04)",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
          />
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(108,99,255,0.2)" }}
          >
            <UploadCloud className="h-5 w-5" style={{ color: "#8B83FF" }} />
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Drop file or <span style={{ color: "#8B83FF" }}>browse</span>
          </span>
          <span
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            PDF · PNG · JPG · WEBP · 5MB
          </span>
        </label>

        {fileError && (
          <div
            className="mt-2 flex items-start gap-1.5 text-xs"
            style={{ color: "#FF6B6B" }}
          >
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            {fileError}
          </div>
        )}

        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{
                background: "rgba(108,99,255,0.2)",
                border: "1px solid rgba(108,99,255,0.3)",
              }}
            >
              <FileCheck2
                className="h-4 w-4 shrink-0"
                style={{ color: "#00D4AA" }}
              />
              <span
                className="flex-1 truncate text-xs font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {file.name}
              </span>
              <button
                onClick={removeFile}
                style={{ color: "rgba(255,255,255,0.4)" }}
                className="hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-6">
          <button
            onClick={clearChat}
            className="flex items-center gap-2 text-xs transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear chat
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ backgroundColor: BG, boxShadow: NEU_SM }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: GRADIENT, boxShadow: GLOW }}
            >
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p
                className="font-display font-bold text-sm"
                style={{ color: "#2D2F4A" }}
              >
                AI Assistant
              </p>
              <p className="text-xs" style={{ color: "#9A9DC0" }}>
                {file ? file.name : "No file uploaded"}
              </p>
            </div>
          </div>
          <label
            className="lg:hidden cursor-pointer flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all"
            style={{ backgroundColor: BG, boxShadow: NEU_SM, color: "#6C63FF" }}
          >
            <input
              ref={mobileFileRef}
              type="file"
              onChange={handleFileInput}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
            />
            <Paperclip className="h-4 w-4" />
            {file ? "Change" : "Upload"}
          </label>
        </div>

        {/* Messages */}
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
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={
                    msg.role === "assistant"
                      ? { background: GRADIENT, boxShadow: GLOW }
                      : { backgroundColor: BG, boxShadow: NEU_SM }
                  }
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-white" />
                  ) : (
                    <User className="h-4 w-4" style={{ color: "#6C63FF" }} />
                  )}
                </div>
                <div
                  className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    msg.role === "assistant"
                      ? {
                          backgroundColor: BG,
                          boxShadow: NEU,
                          color: "#4A4E6A",
                        }
                      : {
                          background: GRADIENT,
                          color: "#ffffff",
                          boxShadow: GLOW,
                        }
                  }
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
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ background: GRADIENT, boxShadow: GLOW }}
              >
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div
                className="flex items-center gap-1.5 rounded-2xl px-4 py-3"
                style={{ backgroundColor: BG, boxShadow: NEU }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: "#6C63FF", opacity: 0.5 }}
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

        {/* Input */}
        <div className="px-4 py-4 shrink-0" style={{ backgroundColor: BG }}>
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mb-2 flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(108,99,255,0.08)",
                  border: "1px solid rgba(108,99,255,0.2)",
                }}
              >
                <FileCheck2
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#6C63FF" }}
                />
                <span
                  className="flex-1 truncate text-xs"
                  style={{ color: "#6C63FF" }}
                >
                  {file.name}
                </span>
                <button onClick={removeFile} style={{ color: "#9A9DC0" }}>
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="flex items-end gap-3 rounded-2xl px-4 py-3 transition-all"
            style={{ backgroundColor: BG, boxShadow: NEU_INSET }}
          >
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                file
                  ? `Ask about "${file.name}"...`
                  : "Type a message... (Enter to send)"
              }
              className="flex-1 resize-none bg-transparent text-sm outline-none"
              style={{ color: "#4A4E6A", maxHeight: "120px" }}
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
              style={{ background: GRADIENT, boxShadow: GLOW }}
            >
              <Send className="h-4 w-4" />
            </motion.button>
          </div>
          <p className="mt-2 text-center text-xs" style={{ color: "#B0B3CC" }}>
            Powered by Groq · Llama 3.3 70B
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fileupload;
