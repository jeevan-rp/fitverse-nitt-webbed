// src/App.jsx
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import LogModal from "./components/LogModal";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import WorkoutLog from "./pages/WorkoutLog";
import Leaderboard from "./pages/Leaderboard";
import {
  loadState, saveState, getTodayStr, getYesterdayStr,
  getDayIndex, calcPoints, getBadge,
} from "./utils/helpers";
import { WEEKLY_SCHEDULE } from "./utils/constants";

const DEFAULT_STATE = {
  points: 0,
  streak: 0,
  lastWorkoutDate: null,
  workoutLog: [],
  missedDays: 0,
};

export default function App() {
  // ── STATE ────────────────────────────────────────────────
  const [appState, setAppState] = useState(() => loadState() || DEFAULT_STATE);
  const [showLogModal, setShowLogModal] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── AUTH STATE ──────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── HELPERS ──────────────────────────────────────────────
  const todayIdx   = getDayIndex();
  const todayStr   = getTodayStr();
  const todayLogged = appState.workoutLog.some((w) => w.date === todayStr);
  const badge      = getBadge(appState.points);

  /** Returns true if yesterday was a workout day but nothing was logged */
  const hasMissedPenalty = useCallback(() => {
    const yStr = getYesterdayStr();
    const yDate = new Date();
    yDate.setDate(yDate.getDate() - 1);
    const yIdx = yDate.getDay() === 0 ? 6 : yDate.getDay() - 1;
    const wasWorkout = WEEKLY_SCHEDULE[yIdx].type !== "Active Recovery";
    const didLog = appState.workoutLog.some((w) => w.date === yStr);
    // Only show once — if lastWorkoutDate is yesterday, they're fine
    return wasWorkout && !didLog && appState.lastWorkoutDate !== yStr;
  }, [appState]);

  // ── ACTIONS ──────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  };

  const logWorkout = (duration, notes) => {
    if (todayLogged) {
      showToast("You already logged today's workout!", "info");
      return;
    }

    const yStr = getYesterdayStr();
    const newStreak =
      appState.lastWorkoutDate === yStr || appState.lastWorkoutDate === todayStr
        ? appState.streak + 1
        : 1;

    const pts = calcPoints(duration, newStreak);
    const today = WEEKLY_SCHEDULE[todayIdx];

    // Streak milestone messages
    if (newStreak % 7 === 0) showToast(`🎉 ${newStreak}-day streak! +20 bonus pts!`, "success");
    else if (newStreak % 3 === 0) showToast(`🔥 ${newStreak}-day streak! +10 bonus pts!`, "info");
    else showToast(`+${pts} pts earned! Streak: ${newStreak} day${newStreak !== 1 ? "s" : ""}`, "success");

    setAppState((prev) => ({
      ...prev,
      points: prev.points + pts,
      streak: newStreak,
      lastWorkoutDate: todayStr,
      workoutLog: [
        {
          date:     todayStr,
          day:      today.day,
          type:     today.type,
          icon:     today.icon,
          color:    today.color,
          duration,
          pts,
          notes,
        },
        ...prev.workoutLog,
      ],
    }));

    setShowLogModal(false);
  };

  const applyPenalty = () => {
    setAppState((prev) => ({
      ...prev,
      streak: 0,
      points: Math.max(0, prev.points - 5),
      missedDays: prev.missedDays + 1,
    }));
    showToast("Streak reset. -5 points deducted. Get back on track! 💪", "warn");
  };

  // ── SHARED PROPS ─────────────────────────────────────────
  const shared = {
    appState,
    todayIdx,
    todayStr,
    todayLogged,
    badge,
    hasMissedPenalty,
    applyPenalty,
    showToast,
    openLogModal: () => setShowLogModal(true),
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "var(--black)" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <div className="spinner"></div>
          </div>
        ) : !user ? (
          <Landing onAuthSuccess={(currentUser) => setUser(currentUser)} isAuthenticated={!!user} />
        ) : (
          <>
            <Navbar badge={badge} points={appState.points} streak={appState.streak} />

            <Routes>
              <Route path="/"             element={<Dashboard   {...shared} />} />
              <Route path="/schedule"     element={<Schedule    {...shared} />} />
              <Route path="/log"          element={<WorkoutLog  {...shared} />} />
              <Route path="/leaderboard"  element={<Leaderboard {...shared} />} />
              <Route path="*"             element={<Navigate to="/" replace />} />
            </Routes>

            {/* Log Modal */}
            {showLogModal && (
              <LogModal
                todayIdx={todayIdx}
                todayLogged={todayLogged}
                onLog={logWorkout}
                onClose={() => setShowLogModal(false)}
              />
            )}

            {/* Toasts */}
            <div style={toastContainerStyle}>
              {toasts.map((t) => (
                <Toast key={t.id} msg={t.msg} type={t.type} />
              ))}
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

const toastContainerStyle = {
  position: "fixed",
  bottom: 24,
  right: 24,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};