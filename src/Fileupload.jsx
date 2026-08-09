import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const BACKEND = "https://ai-app-backend-ypkt.onrender.com";
const allowedtypes = [
  "application/pdf",
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];
const maxfilesize = 5 * 1024 * 1024;

const Fileupload = () => {
  const [file, setfile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [fileMime, setFileMime] = useState(null);
  const [error, seterror] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Vanakkam! 👋 File upload pannunga — PDF, PNG, JPG, WEBP support pannuven. Adha analyze panni ungalukku help pannuven!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const processFile = async (uploadedfile) => {
    seterror("");
    if (!uploadedfile) return;
    if (!allowedtypes.includes(uploadedfile.type)) {
      seterror("❌ Invalid format. Use PDF, PNG, JPG, WEBP only.");
      return;
    }
    if (uploadedfile.size > maxfilesize) {
      seterror("❌ File size must be less than 5MB.");
      return;
    }
    const base64 = await toBase64(uploadedfile);
    setFileBase64(base64);
    setFileMime(uploadedfile.type);
    setfile(uploadedfile);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `✅ "${uploadedfile.name}" upload ஆச்சு! இப்போ இந்த file பத்தி என்ன வேணும்னாலும் கேளுங்க.`,
      },
    ]);
  };

  const handlefileupload = (e) => processFile(e.target.files[0]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const chatHistory = messages
        .filter((m) => typeof m.content === "string")
        .map((m) => ({ role: m.role, content: m.content }));

      const payload = {
        messages: [...chatHistory, { role: "user", content: input }],
      };

      if (fileBase64 && fileMime && fileMime.startsWith("image/")) {
        payload.imageBase64 = fileBase64;
        payload.mimeType = fileMime;
      }

      const response = await axios.post(`${BACKEND}/groq`, payload);
      const reply = response.data.reply;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 700,
        padding: "1rem",
        animation: "fadeInUp 0.5s ease both",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #38BDF8, #818CF8)",
          borderRadius: "18px 18px 0 0",
          padding: "1.2rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
          }}
        >
          🤖
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#0B1120",
            }}
          >
            DocAI
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(11,17,32,0.7)" }}>
            Powered by Groq · Llama
          </div>
        </div>
        {file && (
          <div
            style={{
              marginLeft: "auto",
              background: "rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "0.3rem 0.7rem",
              fontSize: "0.75rem",
              color: "#0B1120",
              fontWeight: 600,
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            📎 {file.name}
          </div>
        )}
      </div>

      {/* File Upload */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderTop: "none",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 200,
            border: `1.5px dashed ${dragging ? "rgba(56,189,248,0.7)" : "rgba(255,255,255,0.15)"}`,
            borderRadius: 12,
            padding: "0.75rem 1rem",
            background: dragging ? "rgba(56,189,248,0.05)" : "transparent",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handlefileupload}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <span style={{ fontSize: "1.2rem" }}>📁</span>
          <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
            {file ? (
              <span style={{ color: "#38BDF8" }}>✅ {file.name}</span>
            ) : (
              <>
                <strong style={{ color: "#38BDF8" }}>Browse</strong> or drop ·
                PDF PNG JPG WEBP · 5MB
              </>
            )}
          </span>
        </div>
        {error && (
          <div style={{ fontSize: "0.8rem", color: "#F87171", width: "100%" }}>
            {error}
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderTop: "none",
          height: 380,
          overflowY: "auto",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.role === "assistant" && (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#38BDF8,#818CF8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  marginRight: "0.5rem",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                🤖
              </div>
            )}
            <div
              style={{
                maxWidth: "75%",
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg,#38BDF8,#0EA5E9)"
                    : "rgba(255,255,255,0.06)",
                color: msg.role === "user" ? "#0B1120" : "#F8FAFC",
                borderRadius:
                  msg.role === "user"
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                padding: "0.75rem 1rem",
                fontSize: "0.88rem",
                lineHeight: 1.65,
                border:
                  msg.role === "assistant"
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "rgba(56,189,248,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  marginLeft: "0.5rem",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                👤
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(135deg,#38BDF8,#818CF8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
              }}
            >
              🤖
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px 18px 18px 4px",
                padding: "0.75rem 1.1rem",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#38BDF8",
                    animation: `bounce 1s ease ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderTop: "none",
          borderRadius: "0 0 18px 18px",
          padding: "1rem 1.5rem",
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send)"
          rows={1}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "0.7rem 1rem",
            color: "#F8FAFC",
            fontSize: "0.9rem",
            fontFamily: "'Inter',sans-serif",
            resize: "none",
            outline: "none",
            lineHeight: 1.5,
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(56,189,248,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: input.trim()
              ? "linear-gradient(135deg,#38BDF8,#0EA5E9)"
              : "rgba(255,255,255,0.05)",
            border: "none",
            cursor: input.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
            color: input.trim() ? "#0B1120" : "#94A3B8",
            fontSize: "1.2rem",
          }}
        >
          ➤
        </button>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default Fileupload;
