import React, { useState } from "react";

const allowedtypes = [
  "application/pdf",
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];
const maxfilesize = 5 * 1024 * 1024;

const Fileupload = () => {
  const [error, seterror] = useState("");
  const [info, setinfo] = useState("");
  const [file, setfile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handlefileupload = (e) => {
    const uploadedfile = e.target.files[0];
    processFile(uploadedfile);
  };

  const processFile = (uploadedfile) => {
    seterror("");
    setinfo("");
    if (uploadedfile) {
      if (!allowedtypes.includes(uploadedfile.type)) {
        seterror("❌ Invalid file format. Use PDF, PNG, JPG, WEBP only.");
        setfile(null);
      } else if (uploadedfile.size > maxfilesize) {
        seterror("❌ File size must be less than 5MB.");
        setfile(null);
      } else {
        setinfo("✅ File ready! Click Submit to proceed.");
        setfile(uploadedfile);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    processFile(dropped);
  };

  return (
    <div className="upload-wrap">
      <div className="upload-card">
        <div className="upload-icon-wrap">📄</div>
        <h2 className="upload-title">Upload your file</h2>
        <p className="upload-subtitle">
          PDF, PNG, JPG, WEBP supported · Max 5MB
        </p>

        <div
          className="upload-dropzone"
          style={{
            borderColor: dragging ? "rgba(56,189,248,0.6)" : undefined,
            background: dragging ? "rgba(56,189,248,0.05)" : undefined,
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" onChange={handlefileupload} />
          <div style={{ pointerEvents: "none" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>☁️</div>
            <p className="upload-dropzone-text">
              Drop file here or <strong>browse</strong>
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(148,163,184,0.5)",
                marginTop: "0.3rem",
              }}
            >
              PDF · PNG · JPG · WEBP · 5MB
            </p>
          </div>
        </div>

        {file && (
          <div className="upload-filename">
            <span>📎</span>
            <span
              style={{
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {file.name}
            </span>
            <span
              style={{
                color: "var(--muted)",
                fontSize: "0.75rem",
                flexShrink: 0,
              }}
            >
              {(file.size / 1024).toFixed(0)} KB
            </span>
          </div>
        )}

        {error && <div className="upload-error">{error}</div>}
        {info && <div className="upload-info">{info}</div>}

        <button
          className="btn-auth"
          disabled={!file}
          style={{ marginTop: "0.5rem" }}
        >
          Submit
        </button>

        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            fontSize: "0.78rem",
            color: "var(--muted)",
          }}
        >
          <span>🔒 Secure upload</span>
          <span>⚡ Fast processing</span>
          <span>🤖 AI powered</span>
        </div>
      </div>
    </div>
  );
};

export default Fileupload;
