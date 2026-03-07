// src/pages/Schedule.jsx
import { WEEKLY_SCHEDULE } from "../utils/constants";

export default function Schedule({ todayIdx, todayLogged, appState, openLogModal }) {
  const loggedDates = new Set(appState.workoutLog.map((w) => w.date));

  // Build a display of recent dates per day-of-week
  const getRecentLog = (dayIndex) => {
    return appState.workoutLog.find((w) => {
      const d = new Date(w.date + "T00:00:00");
      const wday = d.getDay() === 0 ? 6 : d.getDay() - 1;
      return wday === dayIndex;
    });
  };

  return (
    <div className="page-wrap fade-up">

      {/* ── HEADER ── */}
      <div style={styles.header}>
        <div>
          <div className="section-label">Training Plan</div>
          <h1 className="section-title">
            Weekly <span>Schedule</span>
          </h1>
          <div style={{ color: "var(--gray)", fontSize: 14, marginTop: 8 }}>
            7-day repeating routine — structured for balanced progress
          </div>
        </div>
        {!todayLogged && (
          <button className="btn-primary" onClick={openLogModal}>
            + LOG TODAY
          </button>
        )}
      </div>

      {/* ── DAY PILL STRIP ── */}
      <div style={styles.pillStrip}>
        {WEEKLY_SCHEDULE.map((d, i) => {
          const isToday = i === todayIdx;
          const recentLog = getRecentLog(i);
          return (
            <div
              key={i}
              style={{
                ...styles.dayPill,
                background: isToday ? `${d.color}18` : "var(--dark2)",
                border: `1px solid ${isToday ? d.color + "60" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              <span style={{ fontSize: 18 }}>{d.icon}</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: isToday ? d.color : "var(--gray)",
                  textTransform: "uppercase",
                }}
              >
                {d.day.slice(0, 3)}
              </span>
              {recentLog && (
                <span style={{ fontSize: 10, color: "#69F0AE" }}>✓</span>
              )}
              {isToday && !recentLog && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: d.color,
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── DAY CARDS ── */}
      <div style={styles.dayList}>
        {WEEKLY_SCHEDULE.map((d, i) => {
          const isToday = i === todayIdx;
          const recentLog = getRecentLog(i);
          return (
            <div
              key={i}
              style={{
                ...styles.dayCard,
                background: isToday
                  ? `linear-gradient(135deg, var(--dark2), ${d.color}08)`
                  : "var(--dark2)",
                border: `1px solid ${isToday ? d.color + "50" : "rgba(255,255,255,0.06)"}`,
              }}
              className="fade-up"
            >
              {/* Left accent bar */}
              <div style={{ ...styles.accentBar, background: d.color }} />

              <div style={styles.cardContent}>
                {/* Top row */}
                <div style={styles.cardTop}>
                  <div style={styles.dayMeta}>
                    <span style={styles.dayIcon}>{d.icon}</span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 22,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: d.color,
                            letterSpacing: 1,
                          }}
                        >
                          {d.type}
                        </div>
                        <div
                          style={{
                            ...styles.tag,
                            background: `${d.color}18`,
                            border: `1px solid ${d.color}35`,
                            color: d.color,
                          }}
                        >
                          {d.tag}
                        </div>
                        {isToday && (
                          <div style={styles.todayChip}>TODAY</div>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--gray)",
                          marginTop: 2,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {d.day} · {d.exercises.length} exercises
                      </div>
                    </div>
                  </div>

                  {/* Action / Status */}
                  <div style={styles.cardAction}>
                    {recentLog ? (
                      <div style={styles.loggedBadge}>
                        <span>✓</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 12 }}>LOGGED</div>
                          <div style={{ fontSize: 10, color: "var(--gray)", marginTop: 1 }}>
                            {recentLog.duration}min · +{recentLog.pts}pts
                          </div>
                        </div>
                      </div>
                    ) : isToday ? (
                      todayLogged ? (
                        <div style={styles.loggedBadge}>✓ DONE</div>
                      ) : (
                        <button className="btn-primary" onClick={openLogModal} style={{ fontSize: 13 }}>
                          LOG NOW
                        </button>
                      )
                    ) : null}
                  </div>
                </div>

                {/* Exercises */}
                <div style={styles.exRow}>
                  {d.exercises.map((ex, j) => (
                    <div key={j} style={styles.exItem}>
                      <span style={{ color: d.color, fontSize: 10 }}>▸</span>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 28,
    flexWrap: "wrap",
  },
  pillStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
    marginBottom: 24,
  },
  dayPill: {
    borderRadius: 10,
    padding: "10px 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    transition: "all 0.2s",
  },
  dayList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  dayCard: {
    borderRadius: 14,
    overflow: "hidden",
    display: "flex",
    transition: "all 0.2s",
  },
  accentBar: {
    width: 4,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    padding: "20px 24px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  dayMeta: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
  },
  dayIcon: {
    fontSize: 32,
    lineHeight: 1,
    marginTop: 2,
  },
  tag: {
    padding: "2px 8px",
    borderRadius: 4,
    fontFamily: "var(--font-display)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  todayChip: {
    background: "var(--orange)",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 4,
    fontFamily: "var(--font-display)",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  cardAction: {
    flexShrink: 0,
  },
  loggedBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(105,240,174,0.08)",
    border: "1px solid rgba(105,240,174,0.3)",
    borderRadius: 8,
    padding: "8px 14px",
    color: "#69F0AE",
    fontFamily: "var(--font-display)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  exRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 8,
  },
  exItem: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    fontSize: 12,
    color: "var(--gray-light)",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 6,
    padding: "6px 10px",
    fontFamily: "var(--font-mono)",
  },
};