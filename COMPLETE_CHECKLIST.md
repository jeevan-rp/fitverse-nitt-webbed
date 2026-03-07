# 🔥 FitVerse: Complete Setup Checklist

## ✅ Pre-Setup Requirements

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm 8+ installed (`npm --version`)
- [ ] Google account (for Firebase)
- [ ] Gmail account (for EmailJS)
- [ ] Code editor (VS Code recommended)
- [ ] Git (optional, for version control)

---

## 📋 Phase 1: Firebase Setup

### Create Firebase Project
- [ ] Go to https://console.firebase.google.com/
- [ ] Click "Create a project"
- [ ] Name: `fitverse`
- [ ] Disable Analytics (optional)
- [ ] Create project
- [ ] Wait for Firebase to initialize (1-2 minutes)

### Enable Authentication
- [ ] In Firebase, click **Authentication** (left sidebar)
- [ ] Click **Get started**
- [ ] Select **Email/Password**
- [ ] Toggle on **Enable Email/Password**
- [ ] Toggle on **Enable Email link (passwordless)**
- [ ] Save

### Get Firebase Config
- [ ] Click **Settings** ⚙️ (top right)
- [ ] Go to **Project Settings**
- [ ] Scroll to **"Your apps"** section
- [ ] Click **Web** icon (if no app exists, click **</> Web** to register)
- [ ] Copy the Firebase config (see example below)

**Firebase Config Template:**
```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "fitverse-xxxxx.firebaseapp.com",
  projectId: "fitverse-xxxxx",
  storageBucket: "fitverse-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
}
```

---

## 📧 Phase 2: EmailJS Setup

### Create EmailJS Account
- [ ] Go to https://www.emailjs.com/
- [ ] Click **Sign Up**
- [ ] Create account with email
- [ ] Verify email address

### Connect Email Service
- [ ] In EmailJS, click **Email Services** (left sidebar)
- [ ] Click **Create New Service**
- [ ] Choose **Gmail**
- [ ] Allow EmailJS to access your Gmail
- [ ] Copy the **Service ID** shown
- [ ] Add your Gmail email to allowed senders (if prompted)

### Create Email Templates

#### Template 1: Workout Reminder
- [ ] Go to **Email Templates**
- [ ] Click **Create New Template**
- [ ] Template Name: `Workout Reminder`
- [ ] Template ID: `template_workout_reminder` (copy exactly)
- [ ] From name: `FitVerse`
- [ ] From email: `noreply@fitverse.app`
- [ ] Subject: `🔥 {{subject}}`
- [ ] Copy the HTML template from [SETUP_GUIDE.md](SETUP_GUIDE.md#template-1-workout-reminder)
- [ ] Save

#### Template 2: Streak Achievement
- [ ] Click **Create New Template**
- [ ] Template Name: `Streak Achievement`
- [ ] Template ID: `template_streak` (copy exactly)
- [ ] Subject: `🔥 {{streak_days}}-Day Streak!`
- [ ] Copy the HTML template from [SETUP_GUIDE.md](SETUP_GUIDE.md#template-2-streak-achievement)
- [ ] Save

#### Template 3: Welcome Email
- [ ] Click **Create New Template**
- [ ] Template Name: `Welcome Email`
- [ ] Template ID: `template_welcome` (copy exactly)
- [ ] Subject: `{{subject}}`
- [ ] Copy the HTML template from [SETUP_GUIDE.md](SETUP_GUIDE.md#template-3-welcome-email)
- [ ] Save

### Get EmailJS Keys
- [ ] In EmailJS, click **Account** (top right)
- [ ] Copy **Public Key**
- [ ] Go back to **Email Services**
- [ ] Copy **Service ID**

---

## 💻 Phase 3: Local Setup

### Clone/Open Project
- [ ] Open terminal/PowerShell
- [ ] Navigate to `d:\fitverse`
- [ ] Verify you see: `src/`, `package.json`, `vite.config.js`

### Install Dependencies
```bash
cd d:\fitverse
npm install
```
- [ ] Installation completes successfully
- [ ] No major errors (warnings are okay)

### Create Environment File
- [ ] Run setup script:
  - **Windows**: Double-click `setup.bat`
  - **Mac/Linux**: Run `bash setup.sh`
- Or manually create `.env`:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=template_workout_reminder
```

### Fill in Environment Variables
- [ ] Open `.env` file in VS Code
- [ ] Replace `your_api_key_here` with actual Firebase API Key
- [ ] Replace `your_project.firebaseapp.com` with Firebase Auth Domain
- [ ] Replace all other Firebase values
- [ ] Replace `your_emailjs_public_key` with EmailJS Public Key
- [ ] Replace `your_emailjs_service_id` with EmailJS Service ID
- [ ] Save file (Ctrl+S)

### Verify Configuration
- [ ] Open terminal in VS Code
- [ ] Run: `npm run dev`
- [ ] Wait for: "VITE v7.3.1 ready in XXX ms"
- [ ] Should show: `Local: http://localhost:5174/`

---

## 🧪 Phase 4: Testing

### Test Landing Page
- [ ] Open browser to http://localhost:5174/
- [ ] See FitVerse landing page
- [ ] Carousel text rotates every 4 seconds
- [ ] Mobile menu hamburger visible on small screens
- [ ] All buttons clickable

### Test Sign Up
- [ ] Click "CREATE ACCOUNT" or toggle to sign up
- [ ] Enter test email: `test@example.com`
- [ ] Enter password: `TestPassword123`
- [ ] Click "CREATE ACCOUNT"
- [ ] Should see loading indicator
- [ ] Should redirect to dashboard after success
- [ ] Check email inbox for welcome email

### Test Sign In
- [ ] Click "SIGN OUT" button (top right)
- [ ] Back on landing page
- [ ] Enter email: `test@example.com`
- [ ] Enter password: `TestPassword123`
- [ ] Click "SIGN IN"
- [ ] Should redirect to dashboard

### Test Dashboard Features
- [ ] See navbar with stats
- [ ] See "Sign Out" button in navbar
- [ ] Click "Sign Out"
- [ ] Return to landing page
- [ ] Auth state cleared

### Test Email Sending (Optional)
- [ ] Create a test workout
- [ ] Check which user email receives notification
- [ ] Verify email formatting

---

## 🔐 Phase 5: Security & Deployment

### Security Checklist
- [ ] `.env` file is in `.gitignore` (don't commit credentials)
- [ ] API keys are not exposed in code
- [ ] Only non-sensitive files are committed
- [ ] Firebase rules reviewed (if using Firestore)

### Pre-Deployment Testing
- [ ] Run: `npm run build`
- [ ] No build errors
- [ ] Check `dist/` folder created
- [ ] Run: `npm run preview`
- [ ] Test in production mode

### Deployment Setup
- [ ] Choose hosting: Vercel, Netlify, Firebase Hosting, etc.
- [ ] Add environment variables to hosting platform
- [ ] Configure custom domain (optional)
- [ ] Set up SSL/HTTPS

### Firebase Configuration for Production
- [ ] In Firebase Console, go to **Settings → Authorized domains**
- [ ] Add your production domain
- [ ] Example: `fitverse-app.com`, `fitverse-app.netlify.app`

---

## 📚 Phase 6: Post-Setup

### Documentation Review
- [ ] Read [LANDING_PAGE_README.md](LANDING_PAGE_README.md)
- [ ] Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
- [ ] Read [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
- [ ] Read [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

### Development Features
- [ ] Understand Landing page structure
- [ ] Know where auth happens
- [ ] Know how to send emails
- [ ] Know how to add new routes

### Future Enhancements
- [ ] Add user profile page
- [ ] Add settings/preferences
- [ ] Add email notification frequency control
- [ ] Add manual reminder scheduling
- [ ] Add Firestore database integration
- [ ] Add user data persistence

---

## 🚨 Troubleshooting

### Can't see landing page?
- [ ] Check terminal shows no errors
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Restart dev server (stop with Ctrl+C, run `npm run dev`)

### Firebase auth not working?
- [ ] Check `.env` file has all Firebase values
- [ ] Verify values match exactly (no spaces/quotes)
- [ ] Check Firebase Console has Email/Password enabled
- [ ] Restart dev server after `.env` changes

### Emails not sending?
- [ ] Check `.env` has EmailJS credentials
- [ ] Verify email templates exist in EmailJS
- [ ] Check template IDs match exactly
- [ ] Verify Gmail account connected to EmailJS
- [ ] Check Gmail allows less secure apps (or use App Password)

### Build errors?
- [ ] Run: `npm install` again
- [ ] Delete `node_modules` folder and `package-lock.json`
- [ ] Run `npm install` again
- [ ] Check Node.js version is 16+

### Port already in use?
- [ ] Dev server automatically tries next port (5175, 5176, etc.)
- [ ] Or kill process using port 5174
- [ ] Windows: `netstat -ano | findstr :5174`
- [ ] Mac/Linux: `lsof -i :5174`

---

## ✅ Final Verification

Before declaring "done", verify:

- [ ] Landing page displays correctly
- [ ] Sign up works
- [ ] Sign in works
- [ ] Session persists (refresh page - still logged in)
- [ ] Sign out works
- [ ] Welcome email receives (optional but great to test)
- [ ] Navbar shows authenticated state
- [ ] Mobile menu works
- [ ] All animations smooth
- [ ] No console errors (F12 → Console tab)
- [ ] Build succeeds: `npm run build`

---

## 🎉 You're Done!

Congratulations! Your FitVerse app is now:
- ✅ Set up with Firebase authentication
- ✅ Configured with EmailJS for reminders
- ✅ Running locally with landing page
- ✅ Ready for deployment
- ✅ Fully documented

**Next steps:**
1. Deploy to production
2. Share with users
3. Monitor and improve based on feedback
4. Add more features from [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)

---

## 📞 Quick Reference

| Need Help With | File |
|---|---|
| Firebase Setup | [SETUP_GUIDE.md](SETUP_GUIDE.md) |
| EmailJS Setup | [SETUP_GUIDE.md](SETUP_GUIDE.md) |
| Using Features | [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) |
| What Was Built | [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) |
| Landing Page Docs | [LANDING_PAGE_README.md](LANDING_PAGE_README.md) |

---

**Last Updated**: March 7, 2026  
**Estimated Setup Time**: 20-30 minutes  
**Difficulty Level**: Beginner-Friendly 🟢
