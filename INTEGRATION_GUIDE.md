# 🔧 FitVerse Integration Guide

This guide helps you integrate Firebase auth and EmailJS features throughout your app.

## 🎯 Quick Integration Points

### 1. Update App.jsx with Auth Check
✅ Already done in the main App.jsx file

The app now:
- Checks Firebase auth state on mount
- Shows Landing page if user is not authenticated
- Shows Dashboard if user is authenticated
- Redirects correctly based on auth status

### 2. Log Workout with Email Reminder

In your workout logging function, add email notification:

```javascript
import { sendWorkoutReminder } from "./utils/emailService";
import { notifyStreakMilestone } from "./utils/authHelper";
import { auth } from "./config/firebase";

const logWorkout = async (duration, notes) => {
  // ... existing workout logging code ...

  // NEW: Send email reminder for future workouts
  const schedule = WEEKLY_SCHEDULE[(todayIdx + 1) % 7];
  await sendWorkoutReminder(
    auth.currentUser.email,
    auth.currentUser.displayName || "Athlete",
    schedule.type,
    "Tomorrow at 6 AM"
  );

  // NEW: Notify on streak milestones
  const newStreak = appState.streak + 1;
  await notifyStreakMilestone(auth.currentUser.email, newStreak);
};
```

### 3. Send Welcome Email After Signup

Update your Landing.jsx signup handler:

```javascript
import { handleNewUserSignup } from "./utils/authHelper";

const handleauth = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (isSignup) {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // NEW: Send welcome email
      await handleNewUserSignup(result.user.email);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
  } catch (err) {
    // ... error handling ...
  } finally {
    setLoading(false);
  }
};
```

### 4. Add Logout to Any Component

```javascript
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { handleLogout } from "./utils/authHelper";

const MyComponent = () => {
  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      await handleLogout(() => {
        // Clear any app state
        navigate("/");
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogoutClick}>Sign Out</button>;
};
```

### 5. Protect Routes (Optional)

Create a protected route component:

```javascript
// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
```

Use it in App.jsx:

```javascript
<Route
  path="/dashboard"
  element={
    <PrivateRoute user={user}>
      <Dashboard {...shared} />
    </PrivateRoute>
  }
/>
```

## 📧 Email Sending Examples

### Send Custom Workout Reminder

```javascript
import { sendWorkoutReminder } from "./utils/emailService";

// In your Settings or Profile component
const scheduleReminder = async (workoutType, time) => {
  const result = await sendWorkoutReminder(
    userEmail,
    userName,
    workoutType,
    time
  );

  if (result.success) {
    showToast("Reminder scheduled! 📧");
  } else {
    showToast("Failed to schedule reminder", "error");
  }
};
```

### Send Achievement Email

```javascript
import { sendStreakAchievement } from "./utils/emailService";

// When user reaches milestone
const celebrateStreak = async (streakDays) => {
  const result = await sendStreakAchievement(userEmail, streakDays);

  if (result.success) {
    showToast(`🔥 Celebration email sent for ${streakDays} day streak!`);
  }
};
```

## 🔐 Authentication Helpers

The `authHelper.js` file provides useful utilities:

### Validate Email
```javascript
import { isValidEmail } from "./utils/authHelper";

if (!isValidEmail(email)) {
  showError("Invalid email format");
}
```

### Validate Password
```javascript
import { validatePassword } from "./utils/authHelper";

const validation = validatePassword(password);
if (!validation.valid) {
  showError(validation.message);
}
```

### Get User-Friendly Error Messages
```javascript
import { getFirebaseErrorMessage } from "./utils/authHelper";

try {
  await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
  const message = getFirebaseErrorMessage(error.code);
  showError(message); // User-friendly message
}
```

### Extract Username from Email
```javascript
import { extractUsername } from "./utils/authHelper";

const displayName = extractUsername("john@example.com"); // "JOHN"
```

## 🔔 Auto-send Reminders

To automatically send reminders at scheduled times, use a background job service:

### Option 1: Use Firebase Cloud Functions
```javascript
// triggers/sendWorkoutReminders.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.sendWorkoutReminders = functions.pubsub
  .schedule("0 6 * * *") // Every day at 6 AM
  .onRun(async (context) => {
    // Query users with scheduled workouts
    // Send emails using EmailJS
  });
```

### Option 2: Use External Service (e.g., Zapier)
1. Connect Firebase to Zapier
2. Create workflow: User has scheduled workout → Send email via EmailJS
3. Set schedule

### Option 3: Client-side Scheduling
```javascript
// In Dashboard.jsx or useEffect hook
import { sendWorkoutReminder } from "./utils/emailService";

useEffect(() => {
  // Check if today is a workout day
  const today = WEEKLY_SCHEDULE[todayIdx];
  
  if (today.type !== "Active Recovery") {
    // Schedule reminder for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const timer = setTimeout(() => {
      sendWorkoutReminder(
        auth.currentUser.email,
        extractUsername(auth.currentUser.email),
        today.type,
        "6:00 AM"
      );
    }, calculateTimeUntilReminder(tomorrow));

    return () => clearTimeout(timer);
  }
}, [todayIdx]);
```

## 📱 Mobile App Integration

If you're building a mobile version:

```javascript
// React Native example
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
```

## 🔄 State Management

To persist user state across app session:

```javascript
// Create a custom hook
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};

// Use in any component
const { user, loading } = useAuth();
```

## 🧪 Testing

### Test Firebase Auth
```javascript
// __tests__/auth.test.js
import { getFirebaseErrorMessage, isValidEmail } from "../utils/authHelper";

test("isValidEmail works correctly", () => {
  expect(isValidEmail("test@example.com")).toBe(true);
  expect(isValidEmail("invalid")).toBe(false);
});

test("getFirebaseErrorMessage returns friendly messages", () => {
  expect(getFirebaseErrorMessage("auth/weak-password")).toContain("6 characters");
});
```

### Test Email Service
```javascript
// __tests__/emailService.test.js
import { sendWorkoutReminder } from "../utils/emailService";

test("sendWorkoutReminder sends email", async () => {
  const result = await sendWorkoutReminder(
    "test@example.com",
    "Test User",
    "Strength",
    "6 PM"
  );
  expect(result.success).toBe(true);
});
```

## 🚀 Production Checklist

- [ ] Firebase security rules configured
- [ ] Email templates created in EmailJS
- [ ] Environment variables set in hosting platform
- [ ] CORS configured for Firebase
- [ ] Rate limiting enabled for auth
- [ ] Email sending tested
- [ ] Error handling complete
- [ ] Loading states implemented
- [ ] Mobile responsive tested
- [ ] Accessibility checked

## 📚 Resources

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [EmailJS Docs](https://www.emailjs.com/docs)
- [React Firebase Hooks](https://github.com/csandman/react-firebase-hooks)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

## 💡 Common Issues & Solutions

### Issue: "auth/network-request-failed"
**Solution**: Check internet connection, ensure Firebase is initialized

### Issue: Emails not sending
**Solution**: Verify EmailJS credentials and template IDs match in code

### Issue: Auth state not persisting
**Solution**: Clear browser storage and reload, check Firebase rules

### Issue: CORS errors
**Solution**: Add authorized domains in Firebase Console settings

---

Happy coding! 🚀🔥
