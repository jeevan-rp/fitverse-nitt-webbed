# 🔥 FitVerse - Fitness Tracking App

A modern, feature-rich fitness tracking application built with **React**, **Vite**, **Firebase**, and **EmailJS**. Track your workouts, earn points, compete on leaderboards, and receive workout reminders via email.

🌐 **Live Website:** https://fitverse-nitt.vercel.app/

## ✨ Features

### 🎯 Core Features
- **Dashboard** - View your stats, points, and streaks
- **Workout Logging** - Log your daily workouts with duration and notes
- **Schedule** - AI-optimized weekly workout plan
- **Leaderboard** - Compete globally with other athletes
- **Landin Page** - Modern, animated hero section with carousel

### 🔐 Authentication
- Email/Password registration and login with Firebase
- Secure session persistence
- Automatic logout functionality
- User-friendly error messages

### 📧 Email Integration
- Welcome emails for new users
- Scheduled workout reminders
- Streak achievement notifications
- Beautiful HTML email templates

### 🎨 Design
- Dark theme with orange accents
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Modern, clean UI/UX

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- npm 8+ (comes with Node.js)
- Firebase account ([Create here](https://console.firebase.google.com/))
- EmailJS account ([Create here](https://www.emailjs.com/))

### Installation

1. **Clone and navigate:**
```bash
cd d:\fitverse
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
   - Run: `setup.bat` (Windows) or `bash setup.sh` (Mac/Linux)
   - Or manually create `.env` file (see [.env.example](.env.example))
   - Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) for Firebase & EmailJS keys

4. **Start development server:**
```bash
npm run dev
```

5. **Open in browser:**
Visit `http://localhost:5174`


## 🎮 Usage

### For Users
1. Visit landing page at https://fitverse-nitt.vercel.app/
2. Sign up with email and password
3. Log in to dashboard
4. Add workouts and track your progress
5. Compete on leaderboards
6. Receive email reminders

### For Developers
- Sending emails
- Handling authentication
- Managing user state
- Creating protected routes

## 📁 Project Structure

```
fitverse/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx              # Landing page with carousel
│   │   ├── Dashboard.jsx            # Main dashboard
│   │   ├── Schedule.jsx             # Weekly schedule
│   │   ├── WorkoutLog.jsx           # Workout history
│   │   └── Leaderboard.jsx          # Global leaderboard
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation
│   │   ├── LogModal.jsx             # Workout input
│   │   ├── StatCard.jsx             # Stats display
│   │   └── Toast.jsx                # Notifications
│   ├── config/
│   │   └── firebase.js              # Firebase setup
│   ├── utils/
│   │   ├── emailService.js          # Email functions
│   │   ├── authHelper.js            # Auth utilities
│   │   ├── helpers.js               # Helper functions
│   │   └── constants.js             # App constants
│   ├── App.jsx                      # Main app & routing
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── .env                             # Environment variables (not in git)
├── .env.example                     # Environment template
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies
└── README.md                        # This file
```

## 🛠️ Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## 🎨 Design System

### Colors
- **Primary Orange**: #FF5A00
- **Light Orange**: #FF7A30
- **Dark Background**: #080C12
- **Text**: #EDF2F7
- **Accent Gray**: #5A7084

### Typography
- **Display**: Barlow Condensed (bold headlines)
- **Body**: Barlow (regular text)
- **Mono**: JetBrains Mono (code)

## 🔐 Security Features

✅ Firebase password hashing  
✅ Secure session management  
✅ Environment variables for sensitive data  
✅ No credentials in source code  
✅ CORS-configured API calls  

## 📱 Responsive Design

- **Desktop**: 1024px+ (full layout)
- **Tablet**: 768px-1024px (adjusted spacing)
- **Mobile**: <768px (single column, hamburger menu)

## 📄 License

This project is open source under the MIT License.

## 💬 Support

**Need help?** Check these resources:
1. [COMPLETE_CHECKLIST.md](COMPLETE_CHECKLIST.md) - Setup checklist
2. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Firebase & EmailJS setup
3. [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) - Code examples
4. [Firebase Docs](https://firebase.google.com/docs)
5. [EmailJS Docs](https://www.emailjs.com/docs)


**Built with:**
- React 19 - UI framework
- Vite 7 - Build tool
- Firebase 11 - Authentication
- EmailJS 3 - Email service
- React Router 7 - Navigation

----

**Version**: 1.0.0  
**Last Updated**: March 7, 2026  
**Status**: ✅ Production Ready

**Let's build legendary fitness journeys together!** 💪🔥
#
