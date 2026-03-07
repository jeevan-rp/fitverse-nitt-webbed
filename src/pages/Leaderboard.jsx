// src/pages/Leaderboard.jsx
import { LEADERBOARD_DATA, BADGES } from "../utils/constants";
import { getBadge } from "../utils/helpers";

const RANK_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];
const RANK_MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard({ appState, badge }) {
  // Inject user into leaderboard
  const myEntry = {
    name: "You",
    points: appState.points,
    streak: appState.streak,
    level: badge.name,
    avatar: "ME",
    isMe: true,
  };

  const combined = [...LEADERBOARD_DATA, myEntry]
    .sort((a, b) => b.points - a.points)
    .slice(0, 11);

  const myRank = combined.findIndex((u) => u.isMe) + 1;
  const topUser = combined[0];

  return (
    <div className="page-wrap fade-up">

      {/* ── HEADER ── */}
      <div style={styles.header}>
        <div>
          <div className="section-label">Rankings</div>
          <h1 className="section-title">
            Global <span>Leaderboard</span>
          </h1>
          <div style={{ color: "var(--gray)", fontSize: 14, marginTop: 8 }}>
            Rankings update after every logged workout
          </div>
        </div>
        <div style={styles.myRankBadge}>
          <div style={styles.myRankNum}>#{myRank}</div>
          <div style={styles.myRankLabel}>YOUR RANK</div>
        </div>
      </div>

      {/* ── TOP 3 PODIUM ── */}
      {combined.length >= 3 && (
        <div style={styles.podium} className="fade-up fade-up-d1">
          {/* 2nd place */}
          <PodiumCard user={combined[1]} rank={2} />
          {/* 1st place */}
          <PodiumCard user={combined[0]} rank={1} featured />
          {/* 3rd place */}
          <PodiumCard user={combined[2]} rank={3} />
        </div>
      )}

      {/* ── FULL LIST ── */}
      <div className="section-label" style={{ marginBottom: 14 }}>
        Full Rankings
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {combined.map((u, i) => {
          const b = getBadge(u.points);
          const isTop3 = i < 3;
          return (
            <div
              key={i}
              className="fade-up"
              style={{
                ...styles.row,
                background: u.isMe
                  ? "rgba(255,90,0,0.05)"
                  : isTop3
                  ? "rgba(255,215,0,0.03)"
                  : "var(--dark2)",
                border: `1px solid ${
                  u.isMe
                    ? "rgba(255,90,0,0.35)"
                    : isTop3
                    ? "rgba(255,215,0,0.15)"
                    : "rgba(255,255,255,0.06)"
                }`,
                animationDelay: `${i * 0.04}s`,
              }}
            >
              {/* Rank */}
              <div style={styles.rankCol}>
                {isTop3 ? (
                  <span style={{ fontSize: 22 }}>{RANK_MEDALS[i]}</span>
                ) : (
                  <span style={{ ...styles.rankNum, color: RANK_COLORS[i] || "var(--gray)" }}>
                    #{i + 1}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div
                style={{
                  ...styles.avatar,
                  background: u.isMe
                    ? "rgba(255,90,0,0.2)"
                    : `${b.color}18`,
                  border: `2px solid ${u.isMe ? "var(--orange)" : b.color + "50"}`,
                  color: u.isMe ? "var(--orange)" : b.color,
                }}
              >
                {u.avatar}
              </div>

              {/* Name & level */}
              <div style={{ flex: 1 }}>
                <div style={{ ...styles.userName, color: u.isMe ? "var(--orange)" : "var(--white)" }}>
                  {u.name}
                  {u.isMe && (
                    <span style={styles.youTag}>YOU</span>
                  )}
                </div>
                <div style={styles.userSub}>
                  {b.icon} {u.level}
                  <span style={styles.subDot}>·</span>
                  🔥 {u.streak} day streak
                </div>
              </div>

              {/* Points */}
              <div style={styles.pointsCol}>
                <div style={{ ...styles.pointsVal, color: isTop3 ? "#FFD700" : "var(--white)" }}>
                  {u.points.toLocaleString()}
                </div>
                <div style={styles.pointsLabel}>pts</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BADGE TIERS ── */}
      <div style={{ marginTop: 36 }}>
        <div className="section-label">Badge System</div>
        <div style={styles.badgeTiersGrid}>
          {BADGES.map((b) => {
            const isUser = badge.name === b.name;
            return (
              <div
                key={b.name}
                style={{
                  ...styles.badgeTier,
                  background: isUser ? b.bg : "var(--dark2)",
                  border: `1px solid ${isUser ? b.color + "50" : "rgba(255,255,255,0.06)"}`,
                }}
                className="fade-up"
              >
                <div style={{ fontSize: 38, marginBottom: 10 }}>{b.icon}</div>
                <div style={{ ...styles.tierName, color: isUser ? b.color : "var(--white)" }}>
                  {b.name}
                </div>
                <div style={styles.tierRange}>
                  {b.max === Infinity ? `${b.min}+ pts` : `${b.min}–${b.max} pts`}
                </div>
                <div style={{ marginTop: 12 }}>
                  {isUser ? (
                    <div style={{ ...styles.tierActiveChip, background: b.bg, color: b.color, borderColor: b.color + "40" }}>
                      ✓ YOUR LEVEL
                    </div>
                  ) : (
                    <div style={styles.tierCount}>
                      {combined.filter((u) => u.level === b.name).length} athletes
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ user, rank, featured }) {
  const b = getBadge(user.points);
  return (
    <div
      style={{
        ...podStyles.card,
        background: featured
          ? `linear-gradient(160deg, rgba(255,215,0,0.1), var(--dark2))`
          : "var(--dark2)",
        border: `1px solid ${featured ? "rgba(255,215,0,0.35)" : "rgba(255,255,255,0.07)"}`,
        transform: featured ? "scale(1.05)" : "scale(0.97)",
        zIndex: featured ? 1 : 0,
      }}
    >
      <div style={{ fontSize: featured ? 38 : 28 }}>
        {RANK_MEDALS[rank - 1]}
      </div>
      <div
        style={{
          ...podStyles.avatar,
          width: featured ? 60 : 48,
          height: featured ? 60 : 48,
          background: user.isMe ? "rgba(255,90,0,0.2)" : `${b.color}18`,
          border: `2px solid ${user.isMe ? "var(--orange)" : b.color + "60"}`,
          color: user.isMe ? "var(--orange)" : b.color,
          fontSize: featured ? 16 : 13,
        }}
      >
        {user.avatar}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: featured ? 18 : 14,
          fontWeight: 900,
          color: user.isMe ? "var(--orange)" : "var(--white)",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        {user.name}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: featured ? 26 : 20, fontWeight: 900, color: "#FFD700" }}>
        {user.points}
      </div>
      <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-display)", letterSpacing: 2 }}>PTS</div>
      <div style={{ fontSize: 11, color: b.color, marginTop: 4 }}>
        {b.icon} {user.level}
      </div>
    </div>
  );
}

const podStyles = {
  card: {
    flex: 1,
    borderRadius: 14,
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    transition: "all 0.2s",
  },
  avatar: {
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-display)",
    fontWeight: 900,
  },
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 28,
    flexWrap: "wrap",
  },
  myRankBadge: {
    background: "rgba(255,90,0,0.08)",
    border: "1px solid rgba(255,90,0,0.3)",
    borderRadius: 14,
    padding: "16px 24px",
    textAlign: "center",
    flexShrink: 0,
  },
  myRankNum: {
    fontFamily: "var(--font-display)",
    fontSize: 48,
    fontWeight: 900,
    color: "var(--orange)",
    lineHeight: 1,
  },
  myRankLabel: {
    fontFamily: "var(--font-display)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 3,
    color: "var(--gray)",
    textTransform: "uppercase",
    marginTop: 4,
  },
  podium: {
    display: "flex",
    gap: 10,
    marginBottom: 28,
    alignItems: "flex-end",
  },
  row: {
    borderRadius: 12,
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    transition: "all 0.2s",
  },
  rankCol: {
    width: 44,
    display: "flex",
    justifyContent: "center",
    flexShrink: 0,
  },
  rankNum: {
    fontFamily: "var(--font-display)",
    fontSize: 22,
    fontWeight: 900,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-display)",
    fontSize: 14,
    fontWeight: 900,
    flexShrink: 0,
  },
  userName: {
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  youTag: {
    background: "var(--orange)",
    color: "#fff",
    padding: "1px 7px",
    borderRadius: 4,
    fontFamily: "var(--font-display)",
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  userSub: {
    fontSize: 11,
    color: "var(--gray)",
    marginTop: 3,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  subDot: {
    color: "var(--dark4)",
  },
  pointsCol: {
    textAlign: "right",
    flexShrink: 0,
  },
  pointsVal: {
    fontFamily: "var(--font-display)",
    fontSize: 26,
    fontWeight: 900,
    lineHeight: 1,
  },
  pointsLabel: {
    fontFamily: "var(--font-display)",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "var(--gray)",
  },
  badgeTiersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 14,
    marginTop: 10,
  },
  badgeTier: {
    borderRadius: 14,
    padding: "24px 16px",
    textAlign: "center",
    transition: "all 0.2s",
  },
  tierName: {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    fontWeight: 900,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  tierRange: {
    fontSize: 11,
    color: "var(--gray)",
    fontFamily: "var(--font-mono)",
  },
  tierActiveChip: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: 100,
    border: "1px solid",
    fontFamily: "var(--font-display)",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  tierCount: {
    fontSize: 11,
    color: "var(--gray)",
    fontFamily: "var(--font-mono)",
  },
};