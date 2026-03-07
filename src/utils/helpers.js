// src/utils/helpers.js
import { BADGES, STORAGE_KEY } from "./constants";

/** Returns today as "YYYY-MM-DD" */
export function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

/** Returns yesterday as "YYYY-MM-DD" */
export function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

/** Returns schedule index 0=Mon … 6=Sun */
export function getDayIndex() {
  const d = new Date().getDay(); // 0=Sun
  return d === 0 ? 6 : d - 1;
}

/** Returns full badge object for given points */
export function getBadge(points) {
  return BADGES.find((b) => points >= b.min && points < b.max) || BADGES[0];
}

/** Calculates next badge */
export function getNextBadge(points) {
  const idx = BADGES.findIndex((b) => points >= b.min && points < b.max);
  return BADGES[Math.min(idx + 1, BADGES.length - 1)];
}

/** Calculates badge progress % */
export function getBadgeProgress(points) {
  const badge = getBadge(points);
  if (badge.name === "Diamond") return 100;
  const next = getNextBadge(points);
  return Math.min(100, ((points - badge.min) / (next.min - badge.min)) * 100);
}

/** Load app state from localStorage */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

/** Save app state to localStorage */
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

/** Calculate points earned for a workout */
export function calcPoints(duration, streak) {
  let pts = 10;
  if (duration >= 30) pts += 5;
  if (duration >= 60) pts += 5;
  if (streak > 0 && streak % 7 === 0) pts += 20;
  else if (streak > 0 && streak % 3 === 0) pts += 10;
  return pts;
}

/** Format a date string nicely */
export function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}