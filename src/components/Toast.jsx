// src/components/Toast.jsx

const TYPE_STYLES = {
  success: {
    background: "rgba(0,25,12,0.97)",
    border: "1px solid rgba(0,200,100,0.35)",
    color: "#69F0AE",
    icon: "✅",
  },
  error: {
    background: "rgba(25,0,0,0.97)",
    border: "1px solid rgba(255,50,50,0.35)",
    color: "#FF6B6B",
    icon: "❌",
  },
  info: {
    background: "rgba(10,15,25,0.97)",
    border: "1px solid rgba(255,90,0,0.35)",
    color: "#FF8C5A",
    icon: "🔥",
  },
  warn: {
    background: "rgba(20,12,0,0.97)",
    border: "1px solid rgba(255,200,0,0.35)",
    color: "#FFD700",
    icon: "⚠️",
  },
};

export default function Toast({ msg, type = "info" }) {
  const s = TYPE_STYLES[type] || TYPE_STYLES.info;
  return (
    <div style={{ ...styles.toast, background: s.background, border: s.border }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
      <span style={{ color: s.color, fontSize: 13, lineHeight: 1.5 }}>{msg}</span>
    </div>
  );
}

const styles = {
  toast: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 18px",
    borderRadius: 10,
    minWidth: 270,
    maxWidth: 380,
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    animation: "slideUpToast 0.3s ease",
    fontFamily: "var(--font-body)",
  },
};

// Inject toast animation
if (!document.getElementById("toast-anim")) {
  const s = document.createElement("style");
  s.id = "toast-anim";
  s.textContent = `
    @keyframes slideUpToast {
      from { transform: translateY(16px); opacity: 0; }
      to   { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(s);
}