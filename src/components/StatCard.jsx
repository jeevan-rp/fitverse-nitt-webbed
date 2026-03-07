// src/components/StatCard.jsx

export default function StatCard({ icon, value, label, color = "var(--white)", sub }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <div style={{ ...styles.value, color }}>{value}</div>
      <div style={styles.label}>{label}</div>
      {sub && <div style={styles.sub}>{sub}</div>}
    </div>
  );
}

const styles = {
  card: {
    background: "var(--dark2)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: "22px 20px",
    textAlign: "center",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "default",
  },
  icon: {
    fontSize: 28,
    marginBottom: 10,
    lineHeight: 1,
  },
  value: {
    fontFamily: "var(--font-display)",
    fontSize: 48,
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: -1,
  },
  label: {
    fontFamily: "var(--font-display)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "var(--gray)",
    marginTop: 6,
  },
  sub: {
    fontSize: 11,
    color: "var(--gray)",
    marginTop: 4,
    fontFamily: "var(--font-mono)",
  },
};