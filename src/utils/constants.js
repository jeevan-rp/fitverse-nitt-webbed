// src/utils/constants.js

export const WEEKLY_SCHEDULE = [
  {
    day: "Monday",
    type: "Upper Body",
    exercises: ["Push-ups 3×15", "Pull-ups 3×10", "Shoulder Press 3×12", "Bicep Curls 3×15"],
    icon: "💪",
    color: "#FF5A00",
    tag: "STRENGTH",
  },
  {
    day: "Tuesday",
    type: "Cardio",
    exercises: ["5km Run", "Jump Rope 10min", "High Knees 3×60s", "Burpees 3×15"],
    icon: "🏃",
    color: "#FFD600",
    tag: "CARDIO",
  },
  {
    day: "Wednesday",
    type: "Lower Body",
    exercises: ["Squats 4×15", "Lunges 3×12", "Deadlifts 3×10", "Calf Raises 4×20"],
    icon: "🦵",
    color: "#00E5FF",
    tag: "STRENGTH",
  },
  {
    day: "Thursday",
    type: "Core & Flexibility",
    exercises: ["Plank 3×60s", "Crunches 3×20", "Yoga Flow 20min", "Stretching 15min"],
    icon: "🧘",
    color: "#B388FF",
    tag: "FLEX",
  },
  {
    day: "Friday",
    type: "HIIT",
    exercises: ["Tabata 4 rounds", "Box Jumps 3×15", "Mountain Climbers 3×30s", "Sprint Intervals 6×30s"],
    icon: "⚡",
    color: "#FF4081",
    tag: "HIIT",
  },
  {
    day: "Saturday",
    type: "Full Body",
    exercises: ["Deadlifts 3×8", "Bench Press 3×10", "Rows 3×12", "Core Circuit 3×"],
    icon: "🏋️",
    color: "#69F0AE",
    tag: "FULL BODY",
  },
  {
    day: "Sunday",
    type: "Active Recovery",
    exercises: ["Walk 30min", "Light Stretching", "Foam Rolling 20min", "Breathing Exercises"],
    icon: "🌿",
    color: "#80CBC4",
    tag: "RECOVERY",
  },
];

export const BADGES = [
  { min: 0,   max: 100,      name: "Bronze",  icon: "🥉", color: "#CD7F32", bg: "rgba(205,127,50,0.12)"  },
  { min: 100, max: 300,      name: "Silver",  icon: "🥈", color: "#C0C0C0", bg: "rgba(192,192,192,0.12)" },
  { min: 300, max: 700,      name: "Gold",    icon: "🥇", color: "#FFD700", bg: "rgba(255,215,0,0.12)"   },
  { min: 700, max: Infinity, name: "Diamond", icon: "💎", color: "#00E5FF", bg: "rgba(0,229,255,0.12)"   },
];

export const LEADERBOARD_DATA = [
  { name: "Alex K.",   points: 1240, streak: 22, level: "Diamond", avatar: "AK" },
  { name: "Maria S.",  points: 980,  streak: 18, level: "Diamond", avatar: "MS" },
  { name: "Jordan P.", points: 750,  streak: 15, level: "Gold",    avatar: "JP" },
  { name: "Sam L.",    points: 610,  streak: 12, level: "Gold",    avatar: "SL" },
  { name: "Taylor R.", points: 480,  streak: 9,  level: "Gold",    avatar: "TR" },
  { name: "Chris M.",  points: 310,  streak: 7,  level: "Silver",  avatar: "CM" },
  { name: "Jamie W.",  points: 220,  streak: 5,  level: "Silver",  avatar: "JW" },
  { name: "Drew B.",   points: 150,  streak: 3,  level: "Silver",  avatar: "DB" },
  { name: "Casey F.",  points: 90,   streak: 2,  level: "Bronze",  avatar: "CF" },
  { name: "Riley H.",  points: 45,   streak: 1,  level: "Bronze",  avatar: "RH" },
];

export const STORAGE_KEY = "fitverse_v2";