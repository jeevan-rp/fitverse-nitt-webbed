// src/utils/authHelper.js
/**
 * Helper functions for Firebase authentication and email integration
 */

import { sendWorkoutReminder, sendStreakAchievement, sendWelcomeEmail } from "./emailService";

/**
 * Handle new user signup and send welcome email
 * @param {string} email - User's email
 * @param {object} userData - Additional user data
 */
export const handleNewUserSignup = async (email, userData = {}) => {
  try {
    // Send welcome email
    const emailResult = await sendWelcomeEmail(email);
    
    if (emailResult.success) {
      console.log("✅ Welcome email sent to:", email);
      return { success: true, message: "Account created! Check your email." };
    } else {
      console.warn("⚠️ Email failed but account created:", emailResult.message);
      return { success: true, message: "Account created! Email notification pending." };
    }
  } catch (error) {
    console.error("Error in signup:", error);
    return { success: false, message: error.message };
  }
};

/**
 * Send scheduled workout reminder
 * @param {string} email - User's email
 * @param {object} workout - Workout details {type, scheduledTime, day}
 */
export const scheduleWorkoutReminder = async (email, workout) => {
  try {
    const result = await sendWorkoutReminder(
      email,
      email.split("@")[0],
      workout.type || "Workout",
      workout.scheduledTime || "Tomorrow"
    );

    if (result.success) {
      console.log("📧 Reminder sent for:", workout.type);
    }
    return result;
  } catch (error) {
    console.error("Error sending reminder:", error);
    return { success: false, message: error.message };
  }
};

/**
 * Send achievement email for milestone streaks
 * @param {string} email - User's email
 * @param {number} streakDays - Number of consecutive workout days
 */
export const notifyStreakMilestone = async (email, streakDays) => {
  // Send email for milestone streaks (7, 14, 21, 30 days, etc)
  const milestones = [7, 14, 21, 30, 45, 60, 90, 100];
  
  if (milestones.includes(streakDays)) {
    try {
      const result = await sendStreakAchievement(email, streakDays);
      if (result.success) {
        console.log("🔥 Milestone achievement email sent:", streakDays, "days");
      }
      return result;
    } catch (error) {
      console.error("Error sending achievement email:", error);
      return { success: false, message: error.message };
    }
  }

  return { success: true, message: "Not a milestone streak" };
};

/**
 * Format user email for display (remove domain)
 * @param {string} email - User's email
 * @returns {string} - Username part of email
 */
export const extractUsername = (email) => {
  return email.split("@")[0].toUpperCase();
};

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if password meets requirements
 * @param {string} password - Password to validate
 * @returns {object} - {valid: boolean, message: string}
 */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain letters" };
  }
  return { valid: true, message: "Password is valid" };
};

/**
 * Get Firebase error message for UI display
 * @param {string} errorCode - Firebase error code
 * @returns {string} - User-friendly error message
 */
export const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/email-already-in-use": "This email is already registered. Try signing in instead.",
    "auth/weak-password": "Password must be at least 6 characters long.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many login attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/operation-not-allowed": "Email/password authentication is not enabled.",
  };

  return errorMessages[errorCode] || "An error occurred. Please try again.";
};

/**
 * Logout user and clear app state
 * @param {Function} onLogout - Callback function to clear app state
 */
export const handleLogout = async (onLogout) => {
  try {
    // Clear any app-specific data
    localStorage.removeItem("fitverseState");
    sessionStorage.clear();

    // Call provided callback
    if (onLogout) {
      onLogout();
    }

    console.log("✅ Logged out successfully");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: error.message };
  }
};
