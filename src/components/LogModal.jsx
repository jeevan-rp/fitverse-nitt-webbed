// src/components/LogModal.jsx
import { useState } from "react";
import { WEEKLY_SCHEDULE } from "../utils/constants";
import { calcPoints } from "../utils/helpers";

export default function LogModal({ todayIdx, todayLogged, onLog, onClose }) {
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const today = WEEKLY_SCHEDULE[todayIdx];
  const pts = calcPoints(duration, 0); // preview (streak bonus shown separately)

  const handleLog = async () => {
    if (todayLogged) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate save
    onLog(duration, notes);
    setLoading(false);
  };

  return (
    /* Backdrop */
    <div style={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.modalLabel}>Log Workout</div>
            <div style={styles.modalTitle}>
              {today.icon} {today.type}
            </div>
            <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 2 }}>
              {today.day} · {today.exercises.length} exercises
            </div>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Exercises preview */}
        <div style={styles.exerciseList}>
          {today.exercises.map((ex, i) => (
            <div key={i} style={{ ...styles.exTag, borderColor: `${today.color}35`, color: today.color }}>
              {ex}
            </div>
          ))}
        </div>

        <div style={styles.divider} />

        {/* Duration slider */}
        <div style={styles.section}>
          <div style={styles.sliderHeader}>
            <span style={styles.sliderLabel}>DURATION</span>
            <span style={{ ...styles.sliderValue, color: today.color }}>
              {duration} MIN
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={styles.slider}
          />
          <div style={styles.sliderTicks}>
            <span>5</span>
            <span style={{ color: duration >= 30 ? "#69F0AE" : "var(--gray)" }}>30 +5pts</span>
            <span style={{ color: duration >= 60 ? "#69F0AE" : "var(--gray)" }}>60 +10pts</span>
            <span>120</span>
          </div>
        </div>

        {/* Points preview */}
        <div style={styles.pointsBox}>
          <div style={styles.pointsRow}>
            <span style={{ color: "var(--gray-light)", fontSize: 13 }}>Base</span>
            <span style={styles.pts}>+10 pts</span>
          </div>
          {duration >= 30 && (
            <div style={styles.pointsRow}>
              <span style={{ color: "var(--gray-light)", fontSize: 13 }}>30-min bonus</span>
              <span style={styles.pts}>+5 pts</span>
            </div>
          )}
          {duration >= 60 && (
            <div style={styles.pointsRow}>
              <span style={{ color: "var(--gray-light)", fontSize: 13 }}>60-min bonus</span>
              <span style={styles.pts}>+5 pts</span>
            </div>
          )}
          <div style={styles.divider} />
          <div style={styles.pointsRow}>
            <span style={{ color: "var(--white)", fontSize: 14, fontWeight: 700 }}>Total earned</span>
            <span style={{ ...styles.pts, fontSize: 22, color: "#FFD700" }}>+{pts} pts</span>
          </div>
        </div>

        {/* Notes */}
        <div style={styles.section}>
          <label style={styles.sliderLabel}>NOTES (OPTIONAL)</label>
          <textarea
            className="form-input"
            style={{ marginTop: 8, minHeight: 80 }}
            placeholder="How did it feel? Any PRs? 💪"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button className="btn-ghost" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            style={{ flex: 2 }}
            onClick={handleLog}
            disabled={loading || todayLogged}
          >
            {loading ? (
              <><span className="spinner" /> Saving...</>
            ) : todayLogged ? (
              "✓ Already Logged"
            ) : (
              `CONFIRM LOG · +${pts} PTS`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(6px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "var(--dark2)",
    border: "1px solid rgba(255,90,0,0.25)",
    borderRadius: 20,
    padding: 36,
    width: "min(500px, 100%)",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
    animation: "slideUp 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  modalLabel: {
    fontFamily: "var(--font-display)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    color: "var(--orange)",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  modalTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 1,
  },
  closeBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "none",
    color: "var(--gray)",
    width: 34,
    height: 34,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s",
  },
  exerciseList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  exTag: {
    padding: "4px 10px",
    borderRadius: 6,
    border: "1px solid",
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    background: "rgba(255,255,255,0.03)",
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.07)",
    margin: "16px 0",
  },
  section: {
    marginBottom: 20,
  },
  sliderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sliderLabel: {
    fontFamily: "var(--font-display)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    color: "var(--gray)",
    textTransform: "uppercase",
  },
  sliderValue: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: 2,
  },
  slider: {
    width: "100%",
    accentColor: "var(--orange)",
    cursor: "pointer",
  },
  sliderTicks: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10,
    color: "var(--gray)",
    marginTop: 6,
    fontFamily: "var(--font-mono)",
  },
  pointsBox: {
    background: "var(--dark3)",
    border: "1px solid rgba(255,215,0,0.15)",
    borderRadius: 10,
    padding: "16px 20px",
    marginBottom: 20,
  },
  pointsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pts: {
    fontFamily: "var(--font-display)",
    fontSize: 16,
    fontWeight: 900,
    color: "#FFD700",
    letterSpacing: 1,
  },
  actions: {
    display: "flex",
    gap: 12,
    marginTop: 8,
  },
};