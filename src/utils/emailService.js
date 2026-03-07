// src/utils/emailService.js
import emailjs from "emailjs-com";

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

/**
 * Send workout reminder email
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 * @param {string} workoutType - Type of workout
 * @param {string} scheduledTime - Scheduled time for workout
 */
export const sendWorkoutReminder = async (userEmail, userName, workoutType, scheduledTime) => {
  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userName.split("@")[0].toUpperCase(),
      workout_type: workoutType,
      scheduled_time: scheduledTime,
      subject: `🔥 Reminder: ${workoutType} Workout Coming Up!`,
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log("Workout reminder sent successfully!", response);
    return { success: true, message: "Email sent!" };
  } catch (error) {
    console.error("Failed to send workout reminder:", error);
    return { success: false, message: error.text || error.message };
  }
};

/**
 * Send streak achievement email
 * @param {string} userEmail - User's email address
 * @param {number} streakDays - Number of days in current streak
 */
export const sendStreakAchievement = async (userEmail, streakDays) => {
  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userEmail.split("@")[0].toUpperCase(),
      streak_days: streakDays,
      subject: `🔥 Amazing! You're on a ${streakDays}-Day Streak!`,
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      "template_streak", // Different template for achievement
      templateParams
    );

    console.log("Streak achievement email sent!", response);
    return { success: true, message: "Achievement email sent!" };
  } catch (error) {
    console.error("Failed to send achievement email:", error);
    return { success: false, message: error.text || error.message };
  }
};

/**
 * Send welcome email to new user
 * @param {string} userEmail - User's email address
 */
export const sendWelcomeEmail = async (userEmail) => {
  try {
    const templateParams = {
      to_email: userEmail,
      to_name: userEmail.split("@")[0].toUpperCase(),
      subject: "Welcome to FitVerse! 🔥",
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      "template_welcome",
      templateParams
    );

    console.log("Welcome email sent!", response);
    return { success: true, message: "Welcome email sent!" };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, message: error.text || error.message };
  }
};
