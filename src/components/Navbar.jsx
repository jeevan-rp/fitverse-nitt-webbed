// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const LINKS = [
  { to: "/",            label: "Dashboard",   icon: "📊" },
  { to: "/schedule",   label: "Schedule",    icon: "📅" },
  { to: "/log",        label: "My Log",      icon: "📋" },
  { to: "/leaderboard",label: "Leaderboard", icon: "🏆" },
];

export default function Navbar({ badge, points, streak }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <header style={styles.navbar}>
        {/* Logo */}
        <NavLink to="/" style={styles.logo} onClick={() => setMobileOpen(false)}>
          <div style={styles.logoHex}>⚡</div>
          <span style={styles.logoText}>
            FIT<span style={{ color: "var(--orange)" }}>VERSE</span>
          </span>
        </NavLink>

        {/* Nav links */}
        <nav style={styles.navLinks}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              style={({ isActive }) => ({
                ...styles.navLink,
                color: isActive ? "var(--orange)" : "var(--gray-light)",
                background: isActive ? "rgba(255,90,0,0.08)" : "transparent",
              })}
            >
              {l.icon} {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: badge + stats */}
        <div style={styles.navRight}>
          <div style={styles.statChip}>
            <span style={{ color: "#FFD700", fontSize: 16 }}>⭐</span>
            <span style={styles.statVal}>{points}</span>
            <span style={styles.statLabel}>pts</span>
          </div>
          <div style={styles.statChip}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={styles.statVal}>{streak}</span>
            <span style={styles.statLabel}>streak</span>
          </div>
          <div
            style={{
              ...styles.badgePill,
              background: badge.bg,
              border: `1px solid ${badge.color}40`,
              color: badge.color,
            }}
          >
            {badge.icon} {badge.name}
          </div>

          {/* Hamburger */}
          <button
            style={styles.hamburger}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <span style={{ ...styles.bar, transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ ...styles.bar, opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ ...styles.bar, transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              ...styles.logoutBtn,
              display: window.innerWidth > 860 ? "flex" : "none",
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div style={styles.mobileMenu}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                ...styles.mobileLink,
                color: isActive ? "var(--orange)" : "var(--gray-light)",
                borderLeftColor: isActive ? "var(--orange)" : "transparent",
                background: isActive ? "rgba(255,90,0,0.06)" : "transparent",
              })}
            >
              <span style={{ fontSize: 18 }}>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
          <div style={styles.mobileDivider} />
          <button
            onClick={handleLogout}
            style={{
              ...styles.mobileLogoutBtn,
            }}
          >
            🚪 SIGN OUT
          </button>
          <div style={{ display: "flex", gap: 12, padding: "8px 0" }}>
            <div style={styles.statChip}>⭐ <strong>{points}</strong> pts</div>
            <div style={styles.statChip}>🔥 <strong>{streak}</strong> streak</div>
            <div style={{ ...styles.badgePill, background: badge.bg, border: `1px solid ${badge.color}40`, color: badge.color }}>
              {badge.icon} {badge.name}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(8,12,18,0.96)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,90,0,0.12)",
    height: 66,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    gap: 20,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    flexShrink: 0,
  },
  logoHex: {
    width: 36,
    height: 36,
    background: "var(--orange)",
    clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  logoText: {
    fontFamily: "var(--font-display)",
    fontSize: 24,
    fontWeight: 900,
    letterSpacing: 3,
    color: "var(--white)",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: 4,
    flex: 1,
    justifyContent: "center",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    borderRadius: 6,
    fontFamily: "var(--font-display)",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
    textDecoration: "none",
    transition: "all 0.15s",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  statChip: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: "var(--dark3)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 13,
  },
  statVal: {
    fontFamily: "var(--font-display)",
    fontSize: 17,
    fontWeight: 900,
    color: "var(--white)",
  },
  statLabel: {
    fontSize: 10,
    color: "var(--gray)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  badgePill: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 12px",
    borderRadius: 8,
    fontFamily: "var(--font-display)",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "var(--orange)",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    fontFamily: "var(--font-display)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  mobileLogoutBtn: {
    background: "var(--orange)",
    color: "white",
    border: "none",
    padding: "13px 16px",
    borderRadius: 8,
    fontFamily: "var(--font-display)",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.2s",
    width: "100%",
    marginBottom: "8px",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 6,
  },
  bar: {
    width: 22,
    height: 2,
    background: "var(--white)",
    borderRadius: 2,
    display: "block",
    transition: "all 0.3s",
  },
  mobileMenu: {
    position: "fixed",
    top: 66,
    left: 0,
    right: 0,
    zIndex: 99,
    background: "rgba(8,12,18,0.98)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,90,0,0.15)",
    padding: "12px 5% 20px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "13px 16px",
    borderRadius: 8,
    fontFamily: "var(--font-display)",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1,
    textDecoration: "none",
    borderLeft: "3px solid transparent",
    transition: "all 0.15s",
  },
  mobileDivider: {
    height: 1,
    background: "rgba(255,255,255,0.06)",
    margin: "8px 0",
  },
};

// Inject hamburger visibility via CSS
const styleTag = document.createElement("style");
styleTag.textContent = `
  @media (max-width: 860px) {
    nav { display: none !important; }
    [aria-label="Menu"] { display: flex !important; }
    .stat-chip-desktop { display: none !important; }
  }
`;
document.head.appendChild(styleTag);