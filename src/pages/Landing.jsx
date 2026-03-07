// src/pages/Landing.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./Landing.module.css";

const CAROUSEL_ITEMS = [
  "FORCE YOUR LEGEND",
  "TRACK WORKOUTS. EARN POINTS",
  "CRUSH THE LEADERBOARD",
  "BUILD YOUR STREAK",
];

export default function Landing({ onAuthSuccess, isAuthenticated }) {
  const navigate = useNavigate();
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ── AUTH STATE ──────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        onAuthSuccess?.(currentUser);
        navigate("/");
      }
    });
    return unsubscribe;
  }, [navigate, onAuthSuccess]);

  // ── CAROUSEL ────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(
      () => setActiveCarousel((prev) => (prev + 1) % CAROUSEL_ITEMS.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  // ── HANDLERS ────────────────────────────────────
  const handleauth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const errorMap = {
        "auth/email-already-in-use": "Email already registered",
        "auth/weak-password": "Password must be 6+ characters",
        "auth/invalid-email": "Invalid email address",
        "auth/user-not-found": "Email not found",
        "auth/wrong-password": "Incorrect password",
      };
      setError(errorMap[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError("Logout failed: " + err.message);
    }
  };

  if (user) {
    return (
      <div className={styles.landingContainer}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🔥</span>
            FITVERSE
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            SIGN OUT
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "120px" }}>
          <h2>Welcome, {user.email}!</h2>
          <p style={{ marginTop: "20px", color: "var(--gray)" }}>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.landingContainer}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🔥</span>
          FITVERSE
        </div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>
            FEATURES
          </a>
          <a href="#programs" className={styles.navLink}>
            PROGRAMS
          </a>
          <a href="#pricing" className={styles.navLink}>
            PRICING
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          {/* Carousel Text */}
          <div className={styles.carouselWrapper}>
            <h1 className={styles.heroTitle}>
              {CAROUSEL_ITEMS.map((item, idx) => (
                <span
                  key={idx}
                  className={`${styles.carouselItem} ${
                    idx === activeCarousel ? styles.active : ""
                  }`}
                >
                  {item}
                </span>
              ))}
            </h1>
          </div>

          {/* Description */}
          <p className={styles.heroDesc}>
            Track workouts. Earn points. Crush the leaderboard. FitVerse transforms
            every rep into a step toward greatness — with AI-driven plans built for
            your goals.
          </p>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>ACTIVE ATHLETES</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>2M+</div>
              <div className={styles.statLabel}>WORKOUTS LOGGED</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>SATISFACTION RATE</div>
            </div>
          </div>

          {/* Auth Form */}
          <form className={styles.authForm} onSubmit={handleauth}>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                placeholder="Enter password"
                className={styles.formInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Loading..." : isSignup ? "CREATE ACCOUNT" : "SIGN IN"}
            </button>

            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
            >
              {isSignup ? "Already have an account? Sign In" : "New here? Create Account"}
            </button>
          </form>
        </div>

        {/* Hero Image / Illustration area */}
        <div className={styles.heroImage}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.dumbbell}>💪</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionLabel}>FEATURES</div>
        <h2 className={styles.sectionTitle}>
          Why <span>FitVerse</span> Dominates
        </h2>

        <div className={styles.featureGrid}>
          {[
            { icon: "📊", title: "Progress Analytics", desc: "Track every rep and rep of your journey" },
            { icon: "🏆", title: "Leaderboards", desc: "Compete globally and locally" },
            { icon: "📅", title: "Smart Scheduling", desc: "AI-optimized workout plans" },
            { icon: "⚡", title: "Real-time Points", desc: "Earn points instantly after workouts" },
            { icon: "📧", title: "Smart Reminders", desc: "EmailJS powered workout notifications" },
            { icon: "🔥", title: "Streak System", desc: "Build unstoppable momentum" },
          ].map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to become a legend?</h2>
        <p>Join thousands of athletes already transforming their fitness journey</p>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2026 FitVerse. All rights reserved.</p>
      </footer>
    </div>
  );
}
