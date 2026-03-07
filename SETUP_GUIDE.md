# FitVerse - Firebase & EmailJS Setup Guide

## 🔥 Overview
This guide will help you set up Firebase authentication and EmailJS for workout reminders in FitVerse.

---

## 1️⃣ Firebase Setup

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `fitverse`
4. Accept the terms and continue
5. Disable Google Analytics (optional) and create the project

### Step 2: Enable Email/Password Authentication
1. In your Firebase project, go to **Authentication** (left sidebar)
2. Click **"Get started"**
3. Select **"Email/Password"**
4. Enable both **"Email/Password"** and **"Email link (passwordless sign-in)"**
5. Click **"Save"**

### Step 3: Get Firebase Config
1. In Firebase, click the **Settings** (gear icon)
2. Go to **Project Settings**
3. Scroll down to **"Your apps"** section
4. If no app exists, click **"iOS"**, **"Android"**, or **"Web"** (choose **Web**)
5. Register your app
6. Copy the Firebase config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 4: Update `.env` File
Open `.env` in your project root and fill in your Firebase credentials:
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

---

## 2️⃣ EmailJS Setup

### Step 1: Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up with your email
3. Verify your email

### Step 2: Create Email Service
1. In EmailJS, go to **Email Services** (left sidebar)
2. Click **"Create New Service"**
3. Choose **Gmail** (recommended):
   - Click **"Gmail"**
   - Allow EmailJS to access your Gmail
   - Copy the **Service ID**

### Step 3: Create Email Templates
1. Go to **Email Templates** in EmailJS
2. Click **"Create New Template"**

#### Template 1: Workout Reminder
- **Template ID**: `template_workout_reminder`
- **Name**: Workout Reminder
- **Subject**: 🔥 {{subject}}
- **HTML Content**:
```html
<table width="100%" style="font-family: Arial, sans-serif; background: #080C12; color: #EDF2F7;">
  <tr>
    <td style="padding: 40px; text-align: center;">
      <h1 style="color: #FF5A00; font-size: 32px; margin: 20px 0;">🔥 {{to_name}}, Time to Train!</h1>
      <p style="font-size: 18px; color: #8FA3B8; margin: 20px 0;">Your <strong>{{workout_type}}</strong> workout is scheduled for <strong>{{scheduled_time}}</strong></p>
      <p style="font-size: 16px; color: #5A7084; margin: 20px 0;">Don't miss out! Stay consistent and keep your streak alive.</p>
      <a href="https://yourapp.com" style="display: inline-block; padding: 15px 30px; background: #FF5A00; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
        OPEN FITVERSE
      </a>
      <p style="font-size: 12px; color: #5A7084; margin-top: 40px;">Stay legendary. 💪</p>
    </td>
  </tr>
</table>
```

#### Template 2: Streak Achievement
- **Template ID**: `template_streak`
- **Name**: Streak Achievement
- **Subject**: 🔥 {{streak_days}}-Day Streak! Amazing Progress!
- **HTML Content**:
```html
<table width="100%" style="font-family: Arial, sans-serif; background: #080C12; color: #EDF2F7;">
  <tr>
    <td style="padding: 40px; text-align: center;">
      <h1 style="color: #FF5A00; font-size: 36px; margin: 20px 0;">🔥 {{streak_days}}-DAY STREAK! 🔥</h1>
      <p style="font-size: 20px; color: #8FA3B8; margin: 20px 0;">Incredible work, {{to_name}}!</p>
      <p style="font-size: 16px; color: #5A7084; margin: 20px 0;">You're dominating the competition. Keep up this momentum!</p>
      <a href="https://yourapp.com" style="display: inline-block; padding: 15px 30px; background: #FF5A00; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
        VIEW YOUR PROGRESS
      </a>
    </td>
  </tr>
</table>
```

#### Template 3: Welcome Email
- **Template ID**: `template_welcome`
- **Name**: Welcome to FitVerse
- **Subject**: {{subject}}
- **HTML Content**:
```html
<table width="100%" style="font-family: Arial, sans-serif; background: #080C12; color: #EDF2F7;">
  <tr>
    <td style="padding: 40px; text-align: center;">
      <h1 style="color: #FF5A00; font-size: 36px; margin: 20px 0;">Welcome to FitVerse! 🏆</h1>
      <p style="font-size: 18px; color: #8FA3B8; margin: 20px 0;">Hi {{to_name}},</p>
      <p style="font-size: 16px; color: #5A7084; margin: 20px 0;">You're now part of an elite community of fitness enthusiasts. Track your workouts, earn points, and crush the leaderboard!</p>
      <a href="https://yourapp.com" style="display: inline-block; padding: 15px 30px; background: #FF5A00; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
        START YOUR JOURNEY
      </a>
      <p style="font-size: 12px; color: #5A7084; margin-top: 40px;">Let's make you a legend. 💪</p>
    </td>
  </tr>
</table>
```

### Step 4: Get EmailJS Keys
1. In EmailJS, go to **Account** (top right)
2. Copy your **Public Key**
3. Go back to **Email Services** and copy the **Service ID**

### Step 5: Update `.env` File
Fill in your EmailJS credentials:
```
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=template_workout_reminder
```

---

## 3️⃣ Install Dependencies

Run in your project directory:
```bash
npm install
```

This will install:
- `firebase` - For authentication
- `emailjs-com` - For sending emails

---

## 4️⃣ Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🎯 Features Now Available

✅ **Firebase Email Authentication**
- Users can sign up with email and password
- Users can log in with existing credentials
- Session persists across page refreshes

✅ **EmailJS Integration**
- Send workout reminder notifications
- Send streak achievement emails
- Send welcome emails to new users

✅ **Landing Page**
- Modern, animated carousel
- Stats display
- Feature showcase
- Call-to-action for sign-up

---

## 🔗 Usage in Your App

### Send Email Reminders
```javascript
import { sendWorkoutReminder } from "./utils/emailService";

// In your workout logging function:
await sendWorkoutReminder(
  userEmail,
  userName,
  "Strength Training",
  "Tomorrow at 6 PM"
);
```

### Send Streak Achievement Email
```javascript
import { sendStreakAchievement } from "./utils/emailService";

await sendStreakAchievement(userEmail, 7);
```

---

## 🐛 Troubleshooting

### "Firebase SDK not initialized"
- Check `.env` file has correct Firebase credentials
- Ensure all environment variables are filled

### "EmailJS not sending emails"
- Verify Service ID matches in `.env`
- Check email templates exist with correct IDs
- Gmail account might have 2FA enabled - use [Gmail App Password](https://support.google.com/accounts/answer/185833)

### "Auth state not persisting"
- Clear browser cache and local storage
- Restart dev server: `npm run dev`

---

## 📚 Resources
- [Firebase Docs](https://firebase.google.com/docs)
- [EmailJS Docs](https://www.emailjs.com/docs)
- [Project Repository](https://github.com)

---

Happy training! 💪🔥
