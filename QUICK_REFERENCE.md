# 🔥 FitVerse Quick Reference Card

## 🚀 Start Here

```bash
# 1. Install dependencies
npm install

# 2. Create .env file with Firebase & EmailJS credentials
# (See SETUP_GUIDE.md for how to get them)

# 3. Start dev server
npm run dev

# 4. Open browser
# http://localhost:5174
```

## 📖 Documentation Map

| Need | File |
|------|------|
| **Complete setup** | [COMPLETE_CHECKLIST.md](COMPLETE_CHECKLIST.md) |
| **Firebase & EmailJS setup** | [SETUP_GUIDE.md](SETUP_GUIDE.md) |
| **Code integration examples** | [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) |
| **What was built** | [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) |
| **Landing page features** | [LANDING_PAGE_README.md](LANDING_PAGE_README.md) |
| **This file** | [README.md](README.md) |

## 🔑 Environment Variables

Copy these to your `.env` file (get values from Firebase & EmailJS):

```env
# Firebase (from Firebase Console > Settings)
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx

# EmailJS (from EmailJS Account)
VITE_EMAILJS_PUBLIC_KEY=xxxx
VITE_EMAILJS_SERVICE_ID=xxxx
VITE_EMAILJS_TEMPLATE_ID=template_workout_reminder
```

## 🔐 Firebase Setup (Quick)

1. Go to https://console.firebase.google.com/
2. Create project: `fitverse`
3. Enable: **Authentication > Email/Password**
4. Copy config from: **Settings > Project Settings > Your apps**

## 📧 EmailJS Setup (Quick)

1. Go to https://www.emailjs.com/
2. Create account
3. Add Gmail as service
4. Create 3 templates:
   - `template_workout_reminder` (workout notifications)
   - `template_streak` (achievement emails)
   - `template_welcome` (new user welcome)
5. Copy Public Key & Service ID

## 💻 File Locations

```
New Files Created:
✅ src/pages/Landing.jsx              # Landing page
✅ src/pages/Landing.module.css       # Landing styles
✅ src/config/firebase.js             # Firebase config
✅ src/utils/emailService.js          # Email functions
✅ src/utils/authHelper.js            # Auth helpers

Modified Files:
🔄 src/App.jsx                        # Added auth
🔄 src/components/Navbar.jsx          # Added logout

Setup Files:
📄 .env                               # Environment variables
📄 .env.example                       # Environment template
📄 setup.bat                          # Windows setup script
📄 setup.sh                           # Mac/Linux setup script
```

## 🎯 Key Components

### Landing Page (`src/pages/Landing.jsx`)
- Animated carousel (4-second rotation)
- Sign up / Sign in form
- Stats display (50K+ athletes, etc.)
- Features showcase
- Mobile responsive

### App Authentication (`src/App.jsx`)
- Firebase auth state listener
- Conditional rendering based on auth
- Session persistence
- Loading states

### Email Service (`src/utils/emailService.js`)
```javascript
sendWorkoutReminder(email, name, workoutType, time)
sendStreakAchievement(email, streakDays)
sendWelcomeEmail(email)
```

### Auth Helpers (`src/utils/authHelper.js`)
```javascript
handleNewUserSignup(email, userData)
scheduleWorkoutReminder(email, workout)
notifyStreakMilestone(email, streakDays)
isValidEmail(email)
validatePassword(password)
getFirebaseErrorMessage(errorCode)
```

## 🔄 User Flow

```
Landing Page
    ↓
Sign Up/Login (Firebase Auth)
    ↓
✉️ Welcome Email Sent (EmailJS)
    ↓
Dashboard
    ↓
Log Workout
    ↓
📧 Reminder Scheduled (EmailJS)
    ↓
Milestone Reached → 🎉 Achievement Email
```

## 🎨 Colors & Fonts

```css
/* Colors */
--orange: #FF5A00
--orange-light: #FF7A30
--black: #080C12
--dark: #0D1218
--white: #EDF2F7
--gray: #5A7084

/* Fonts */
--font-display: Barlow Condensed (bold headlines)
--font-body: Barlow (regular text)
--font-mono: JetBrains Mono (code)
```

## 📱 Responsive Breakpoints

```css
Desktop: 1024px+
Tablet:  768px - 1024px
Mobile:  < 768px
```

## 🚀 Commands Cheat Sheet

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🐛 Common Issues & Fixes

### "Firebase is not initialized"
→ Check `.env` file has all Firebase values

### "Emails not sending"
→ Verify EmailJS Service ID and Public Key

### Port 5174 already in use
→ Dev server auto-tries 5175, 5176, etc. (or kill process)

### Auth not persisting
→ Clear browser storage, restart server

### Build errors
→ Delete `node_modules`, run `npm install` again

## ✅ Checklist Before Production

- [ ] `.env` file created with all credentials
- [ ] Firebase Email/Password auth enabled
- [ ] EmailJS account with 3 templates created
- [ ] Local testing complete (signup, login, emails)
- [ ] `npm run build` succeeds
- [ ] Firebase authorized domains configured
- [ ] Deploy to Vercel/Netlify/Firebase Hosting
- [ ] Test in production
- [ ] Setup monitoring (optional)

## 📚 Learn More

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Firebase**: https://firebase.google.com/docs
- **EmailJS**: https://www.emailjs.com/docs
- **React Router**: https://reactrouter.com

## 💡 Tips

1. **Hot Module Reload (HMR)** - Changes auto-refresh browser
2. **Environment Variables** - Always restart dev server after changes
3. **Auth State** - Persists automatically with Firebase
4. **Responsive Testing** - Use F12 device emulator
5. **Email Testing** - Check spam folder for emails

## 🎯 Next Steps

1. Follow [COMPLETE_CHECKLIST.md](COMPLETE_CHECKLIST.md)
2. Set up Firebase & EmailJS
3. Create `.env` file
4. Run `npm run dev`
5. Test landing page
6. Test authentication
7. Deploy! 🚀

## 📞 Need Help?

1. Check relevant documentation file (see docs map above)
2. Look at COMPLETE checklist for troubleshooting
3. Review code examples in INTEGRATION_GUIDE.md
4. Check Firebase/EmailJS official docs
5. Review browser console (F12) for errors

---

**Quick Setup Time**: 20-30 minutes  
**Difficulty**: Beginner-Friendly 🟢  
**Status**: ✅ Production Ready  

**Let's build! 🔥💪**
