// src/pages/Dashboard.jsx
import { useState } from "react";
import { WEEKLY_SCHEDULE, BADGES } from "../utils/constants";
import { getBadge, getNextBadge, getBadgeProgress } from "../utils/helpers";
import StatCard from "../components/StatCard";

export default function Dashboard({
  appState,
  todayIdx,
  todayStr,
  todayLogged,
  hasMissedPenalty,
  applyPenalty,
  openLogModal,
  showToast,
}) {
  const [reminderSet, setReminderSet] = useState(false);
  const [penaltyApplied, setPenaltyApplied] = useState(false);

  const today = WEEKLY_SCHEDULE[todayIdx];
  const badge = getBadge(appState.points);
  const nextBadge = getNextBadge(appState.points);
  const progress = getBadgeProgress(appState.points);
  const missed = hasMissedPenalty() && !penaltyApplied;

  const handlePenalty = () => {
    applyPenalty();
    setPenaltyApplied(true);
  };

  const handleReminder = () => {
    setReminderSet(true);
    showToast("Reminder set for today's workout! 💪", "success");
  };

  return (
    <div className="page-wrap fade-up">

      {/* ── MISSED WORKOUT BANNER ── */}
      {missed && (
        <div style={styles.penaltyBanner} className="fade-up">
          <div>
            <div style={{ color: "#FF4081", fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
              ⚠️ MISSED WORKOUT DETECTED
            </div>
            <div style={{ color: "var(--gray-light)", fontSize: 12 }}>
              You skipped yesterday's session. Your streak will reset and you'll lose 5 points.
            </div>
          </div>
          <button className="btn-secondary" style={{ borderColor: "#FF408140", color: "#FF4081", flexShrink: 0 }} onClick={handlePenalty}>
            ACKNOWLEDGE
          </button>
        </div>
      )}

      {/* ── TODAY HERO CARD ── */}
      <div style={{ ...styles.heroCard, background: `linear-gradient(135deg, var(--dark2) 50%, ${today.color}0C)`, borderColor: `${today.color}30` }} className="fade-up">
        {/* Giant background icon */}
        <div style={{ ...styles.bgIcon, color: today.color }}>{today.icon}</div>

        <div style={styles.heroContent}>
          <div>
            <div style={styles.heroLabel}>TODAY · {today.day.toUpperCase()}</div>
            <div style={{ ...styles.heroTitle, color: today.color }}>
              {today.icon} {today.type}
            </div>
            <div style={{ ...styles.heroTag, background: `${today.color}18`, border: `1px solid ${today.color}35`, color: today.color }}>
              {today.tag}
            </div>
            {/* Exercises */}
            <div style={styles.exGrid}>
              {today.exercises.map((ex, i) => (
                <div key={i} style={{ ...styles.exChip, borderColor: `${today.color}25` }}>
                  {ex}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.heroActions}>
            {todayLogged ? (
              <div style={styles.doneBadge}>✓ COMPLETED TODAY</div>
            ) : (
              <button className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }} onClick={openLogModal}>
                LOG WORKOUT →
              </button>
            )}
            <button
              className="btn-secondary"
              onClick={handleReminder}
              style={reminderSet ? { borderColor: "#69F0AE40", color: "#69F0AE" } : {}}
            >
              {reminderSet ? "✓ REMINDER SET" : "🔔 SET REMINDER"}
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div style={styles.statsGrid} className="fade-up fade-up-d1">
        <StatCard icon="⭐" value={appState.points} label="Total Points" color="#FFD700" />
        <StatCard icon="🔥" value={appState.streak} label="Day Streak" color="var(--orange)" sub={appState.streak >= 3 ? "Bonus active!" : "Keep going"} />
        <StatCard icon="📋" value={appState.workoutLog.length} label="Workouts" color="#00E5FF" />
        <StatCard icon="😓" value={appState.missedDays} label="Missed" color="#FF4081" />
      </div>

      {/* ── BADGE PROGRESS ── */}
      <div className="card fade-up fade-up-d2" style={{ marginBottom: 24 }}>
        <div style={styles.badgeRow}>
          <div style={{ ...styles.badgeIcon, background: badge.bg, border: `2px solid ${badge.color}` }}>
            <span style={{ fontSize: 30 }}>{badge.icon}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={styles.badgeHeader}>
              <div>
                <div style={{ ...styles.badgeName, color: badge.color }}>{badge.name} ATHLETE</div>
                <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 2 }}>
                  {appState.points} points
                  {badge.name !== "Diamond" && (
                    <span> · {nextBadge.min - appState.points} pts to {nextBadge.name}</span>
                  )}
                </div>
              </div>
              {badge.name !== "Diamond" && (
                <div style={styles.nextBadgeHint}>
                  Next: {nextBadge.icon} {nextBadge.name}
                </div>
              )}
            </div>
            <div className="progress-track" style={{ marginTop: 14 }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-mono)" }}>
              <span>{badge.min} pts</span>
              <span style={{ color: badge.color }}>{Math.round(progress)}%</span>
              <span>{badge.max === Infinity ? "∞" : badge.max} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL BADGES ── */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-label">Badge Tiers</div>
        <div style={styles.allBadges}>
          {BADGES.map((b) => (
            <div
              key={b.name}
              style={{
                ...styles.badgeTier,
                background: badge.name === b.name ? b.bg : "var(--dark2)",
                border: `1px solid ${badge.name === b.name ? b.color + "60" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <span style={{ fontSize: 24 }}>{b.icon}</span>
              <div style={{ ...styles.badgeTierName, color: badge.name === b.name ? b.color : "var(--gray-light)" }}>
                {b.name}
              </div>
              <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-mono)" }}>
                {b.max === Infinity ? `${b.min}+` : `${b.min}–${b.max}`} pts
              </div>
              {badge.name === b.name && (
                <div style={{ ...styles.youBadge, background: b.bg, color: b.color, borderColor: b.color + "40" }}>
                  YOU
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT ACTIVITY ── */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div className="section-label" style={{ marginBottom: 0 }}>Recent Activity</div>
          {!todayLogged && (
            <button className="btn-secondary" style={{ fontSize: 12, padding: "8px 16px" }} onClick={openLogModal}>
              + LOG WORKOUT
            </button>
          )}
        </div>

        {appState.workoutLog.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "52px 24px" }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🏋️</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              No workouts yet
            </div>
            <div style={{ color: "var(--gray)", fontSize: 14, marginBottom: 24 }}>
              Log your first session to start earning points and building your streak!
            </div>
            <button className="btn-primary" onClick={openLogModal}>LOG FIRST WORKOUT →</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {appState.workoutLog.slice(0, 6).map((w, i) => (
              <div key={i} style={{ ...styles.logItem, borderColor: `${w.color}20`, animationDelay: `${i * 0.05}s` }} className="fade-up">
                <div style={styles.logLeft}>
                  <div style={{ ...styles.logIcon, background: `${w.color}15` }}>{w.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: w.color }}>{w.type}</div>
                    <div style={{ fontSize: 11, color: "var(--gray)", marginTop: 2 }}>
                      {w.day} · {w.date} · {w.duration}min
                    </div>
                    {w.notes && (
                      <div style={{ fontSize: 11, color: "var(--gray-light)", marginTop: 3, fontStyle: "italic" }}>
                        "{w.notes}"
                      </div>
                    )}
                  </div>
                </div>
                <div style={styles.logPts}>
                  <div style={styles.logPtsVal}>+{w.pts}</div>
                  <div style={{ fontSize: 9, color: "var(--gray)", textTransform: "uppercase", letterSpacing: 1 }}>pts</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  penaltyBanner: {
    background: "rgba(255,64,129,0.06)",
    border: "1px solid rgba(255,64,129,0.35)",
    borderRadius: 12,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  heroCard: {
    borderRadius: 16,
    border: "1px solid",
    padding: 28,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  bgIcon: {
    position: "absolute",
    right: -20,
    top: -20,
    fontSize: 140,
    opacity: 0.05,
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "none",
  },
  heroContent: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 24,
    flexWrap: "wrap",
  },
  heroLabel: {
    fontFamily: "var(--font-display)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 4,
    color: "var(--gray)",
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: "var(--font-display)",
    fontSize: 42,
    fontWeight: 900,
    textTransform: "uppercase",
    lineHeight: 1,
    letterSpacing: 1,
    marginBottom: 10,
  },
  heroTag: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 4,
    fontFamily: "var(--font-display)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  exGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  exChip: {
    padding: "4px 12px",
    borderRadius: 6,
    border: "1px solid",
    fontSize: 12,
    color: "var(--gray-light)",
    background: "rgba(255,255,255,0.03)",
    fontFamily: "var(--font-mono)",
  },
  heroActions: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-end",
  },
  doneBadge: {
    background: "rgba(105,240,174,0.1)",
    border: "1px solid rgba(105,240,174,0.3)",
    color: "#69F0AE",
    padding: "12px 24px",
    borderRadius: 8,
    fontFamily: "var(--font-display)",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 14,
    marginBottom: 20,
  },
  badgeRow: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },
  badgeIcon: {
    width: 68,
    height: 68,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  badgeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 8,
  },
  badgeName: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  nextBadgeHint: {
    fontFamily: "var(--font-display)",
    fontSize: 12,
    color: "var(--gray)",
    letterSpacing: 1,
  },
  allBadges: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
    marginTop: 10,
  },
  badgeTier: {
    borderRadius: 12,
    padding: "18px 16px",
    textAlign: "center",
    position: "relative",
    transition: "all 0.2s",
  },
  badgeTierName: {
    fontFamily: "var(--font-display)",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 2,
    textTransform: "uppercase",
    margin: "6px 0 3px",
  },
  youBadge: {
    display: "inline-block",
    marginTop: 8,
    padding: "2px 10px",
    borderRadius: 100,
    border: "1px solid",
    fontFamily: "var(--font-display)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  logItem: {
    background: "var(--dark2)",
    border: "1px solid",
    borderRadius: 12,
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "border-color 0.2s",
  },
  logLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  logIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },
  logPts: {
    textAlign: "right",
    flexShrink: 0,
  },
  logPtsVal: {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    fontWeight: 900,
    color: "#FFD700",
    lineHeight: 1,
  },
};