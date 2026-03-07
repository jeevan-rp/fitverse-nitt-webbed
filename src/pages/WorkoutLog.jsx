// src/pages/WorkoutLog.jsx
import { useState } from "react";
import { formatDate } from "../utils/helpers";

export default function WorkoutLog({ appState, openLogModal, todayLogged }) {
  const [filter, setFilter] = useState("ALL");
  const TYPES = ["ALL", "Upper Body", "Cardio", "Lower Body", "Core & Flexibility", "HIIT", "Full Body", "Active Recovery"];

  const filtered = filter === "ALL"
    ? appState.workoutLog
    : appState.workoutLog.filter((w) => w.type === filter);

  // Summary stats
  const totalDuration = appState.workoutLog.reduce((s, w) => s + w.duration, 0);
  const avgDuration = appState.workoutLog.length
    ? Math.round(totalDuration / appState.workoutLog.length)
    : 0;
  const totalPts = appState.workoutLog.reduce((s, w) => s + w.pts, 0);

  return (
    <div className="page-wrap fade-up">

      {/* ── HEADER ── */}
      <div style={styles.header}>
        <div>
          <div className="section-label">History</div>
          <h1 className="section-title">
            Workout <span>Log</span>
          </h1>
        </div>
        <button className="btn-primary" onClick={openLogModal}>
          + LOG WORKOUT
        </button>
      </div>

      {/* ── SUMMARY STATS ── */}
      <div style={styles.summaryGrid} className="fade-up fade-up-d1">
        {[
          { label: "Total Sessions", value: appState.workoutLog.length, icon: "📋", color: "#00E5FF" },
          { label: "Total Minutes",  value: totalDuration,              icon: "⏱",  color: "var(--orange)" },
          { label: "Avg Duration",   value: `${avgDuration}m`,          icon: "📊", color: "#B388FF" },
          { label: "Points Earned",  value: totalPts,                   icon: "⭐", color: "#FFD700" },
        ].map((s) => (
          <div key={s.label} style={styles.summaryCard}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div style={{ ...styles.summaryVal, color: s.color }}>{s.value}</div>
            <div style={styles.summaryLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── FILTER TABS ── */}
      {appState.workoutLog.length > 0 && (
        <div style={styles.filterWrap} className="fade-up fade-up-d2">
          <div style={styles.filterScroll}>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  ...styles.filterBtn,
                  background: filter === t ? "var(--orange)" : "var(--dark2)",
                  color: filter === t ? "#fff" : "var(--gray-light)",
                  border: `1px solid ${filter === t ? "var(--orange)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── LOG LIST ── */}
      {filtered.length === 0 && appState.workoutLog.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "64px 24px" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>📋</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
            No Workouts Yet
          </div>
          <div style={{ color: "var(--gray)", fontSize: 14, marginBottom: 28 }}>
            Every rep counts. Log your first workout to start building your history.
          </div>
          <button className="btn-primary" onClick={openLogModal}>LOG FIRST WORKOUT →</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ color: "var(--gray)", fontSize: 14 }}>No {filter} sessions logged yet.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((w, i) => (
            <div
              key={i}
              className="fade-up"
              style={{
                ...styles.logCard,
                borderColor: `${w.color}25`,
                animationDelay: `${i * 0.04}s`,
              }}
            >
              {/* Color strip */}
              <div style={{ ...styles.colorStrip, background: w.color }} />

              <div style={styles.logContent}>
                <div style={styles.logMain}>
                  {/* Icon */}
                  <div style={{ ...styles.logIcon, background: `${w.color}15`, border: `1px solid ${w.color}25` }}>
                    {w.icon}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={styles.logType}>{w.type}</div>
                    <div style={styles.logMeta}>
                      <span>{w.day}</span>
                      <span style={styles.metaDot}>·</span>
                      <span>{formatDate(w.date)}</span>
                      <span style={styles.metaDot}>·</span>
                      <span>⏱ {w.duration} min</span>
                    </div>
                    {w.notes && (
                      <div style={styles.logNotes}>"{w.notes}"</div>
                    )}
                  </div>
                </div>

                {/* Points */}
                <div style={styles.logRight}>
                  <div style={styles.ptsVal}>+{w.pts}</div>
                  <div style={styles.ptsLabel}>POINTS</div>
                  {w.duration >= 60 && (
                    <div style={styles.bonusTag}>60min bonus</div>
                  )}
                  {w.duration >= 30 && w.duration < 60 && (
                    <div style={styles.bonusTag}>30min bonus</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── WEEKLY BREAKDOWN (if any logs) ── */}
      {appState.workoutLog.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div className="section-label">Type Breakdown</div>
          <div style={styles.breakdownGrid}>
            {Object.entries(
              appState.workoutLog.reduce((acc, w) => {
                acc[w.type] = (acc[w.type] || 0) + 1;
                return acc;
              }, {})
            )
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => {
                const schedule = ["Upper Body","Cardio","Lower Body","Core & Flexibility","HIIT","Full Body","Active Recovery"];
                const colors = ["#FF5A00","#FFD600","#00E5FF","#B388FF","#FF4081","#69F0AE","#80CBC4"];
                const idx = schedule.indexOf(type);
                const color = colors[idx] ?? "var(--gray)";
                const pct = Math.round((count / appState.workoutLog.length) * 100);
                return (
                  <div key={type} style={styles.breakdownItem}>
                    <div style={styles.breakdownTop}>
                      <span style={{ fontSize: 12, color: "var(--gray-light)" }}>{type}</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, color }}>{count}x</span>
                    </div>
                    <div className="progress-track" style={{ height: 6 }}>
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                    <div style={{ fontSize: 10, color: "var(--gray)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
                      {pct}% of sessions
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    background: "var(--dark2)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: "18px 16px",
    textAlign: "center",
  },
  summaryVal: {
    fontFamily: "var(--font-display)",
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1,
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: "var(--font-display)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "var(--gray)",
  },
  filterWrap: {
    marginBottom: 20,
  },
  filterScroll: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 4,
    scrollbarWidth: "none",
  },
  filterBtn: {
    padding: "7px 16px",
    borderRadius: 100,
    fontFamily: "var(--font-display)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  logCard: {
    background: "var(--dark2)",
    border: "1px solid",
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    transition: "border-color 0.2s",
  },
  colorStrip: {
    width: 4,
    flexShrink: 0,
  },
  logContent: {
    flex: 1,
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  logMain: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  logIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    flexShrink: 0,
  },
  logType: {
    fontWeight: 700,
    fontSize: 15,
    color: "var(--white)",
    marginBottom: 4,
  },
  logMeta: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "var(--gray)",
    flexWrap: "wrap",
  },
  metaDot: {
    color: "var(--dark4)",
  },
  logNotes: {
    fontSize: 11,
    color: "var(--gray-light)",
    fontStyle: "italic",
    marginTop: 5,
    maxWidth: 320,
  },
  logRight: {
    textAlign: "right",
    flexShrink: 0,
  },
  ptsVal: {
    fontFamily: "var(--font-display)",
    fontSize: 30,
    fontWeight: 900,
    color: "#FFD700",
    lineHeight: 1,
  },
  ptsLabel: {
    fontFamily: "var(--font-display)",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "var(--gray)",
    marginTop: 2,
  },
  bonusTag: {
    display: "inline-block",
    marginTop: 5,
    padding: "2px 7px",
    background: "rgba(105,240,174,0.1)",
    border: "1px solid rgba(105,240,174,0.25)",
    borderRadius: 4,
    fontSize: 9,
    color: "#69F0AE",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  breakdownGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 14,
    marginTop: 10,
  },
  breakdownItem: {
    background: "var(--dark2)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 10,
    padding: "14px 16px",
  },
  breakdownTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
};