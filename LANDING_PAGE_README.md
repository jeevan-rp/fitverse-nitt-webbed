# 🔥 FitVerse - Landing Page with Firebase Auth & EmailJS

A modern fitness tracking application with authentication and email reminders built with React, Vite, Firebase, and EmailJS.

## ✨ New Features

### 🎯 Landing Page
- **Animated Carousel** - Moving text carousel showcasing app features
- **Modern Design** - Matches existing FitVerse color scheme (Orange, Dark theme)
- **Mobile Responsive** - Works perfectly on all devices
- **Feature Showcase** - Highlights 6 key features with icons
- **Stats Display** - Shows impressive metrics (50K+ athletes, 2M+ workouts logged)
- **Call-to-Action** - Prominent signup/login section

### 🔐 Firebase Authentication
- **Email/Password Registration** - New users can create accounts
- **Secure Login** - Existing users can sign in
- **Session Persistence** - Auth state persists across page refreshes
- **Error Handling** - User-friendly error messages for auth failures

### 📧 EmailJS Integration
- **Workout Reminders** - Send scheduled workout notifications
- **Streak Achievements** - Celebrate user milestones
- **Welcome Emails** - Greet new users
- **HTML Email Templates** - Beautiful, branded email designs

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "fitverse"
3. Enable Email/Password authentication
4. Get your Firebase config from Project Settings
5. Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Configure EmailJS
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up and create an account
3. Set up Gmail as your email service
4. Create email templates with these IDs:
   - `template_workout_reminder` - For workout notifications
   - `template_streak` - For achievement emails
   - `template_welcome` - For new user welcome emails

5. Update `.env` with EmailJS credentials:

```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=template_workout_reminder
```

### 4. Run the App
```bash
npm run dev
```

Visit `http://localhost:5174` and you'll see the landing page!

## 📁 Project Structure

```
src/
├── pages/
│   ├── Landing.jsx              # New landing page with carousel
│   ├── Landing.module.css       # Landing page styles
│   ├── Dashboard.jsx            # Main dashboard
│   ├── Schedule.jsx             # Workout schedule
│   ├── WorkoutLog.jsx           # Workout logging
│   └── Leaderboard.jsx          # Leaderboard view
├── components/
│   ├── Navbar.jsx               # Updated with logout button
│   ├── LogModal.jsx             # Workout logging modal
│   ├── StatCard.jsx             # Stat display component
│   └── Toast.jsx                # Notification component
├── config/
│   └── firebase.js              # Firebase configuration
├── utils/
│   ├── emailService.js          # EmailJS functions
│   ├── helpers.js               # Helper functions
│   └── constants.js             # App constants
├── App.jsx                      # Main app with routing & auth
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

## 🎨 Color Scheme

The app uses a consistent dark theme with orange accents:

- **Primary Orange**: `#FF5A00`
- **Light Orange**: `#FF7A30`
- **Dark Background**: `#080C12`
- **Text Color**: `#EDF2F7`
- **Accent Gray**: `#5A7084`

## 📚 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Configuration

### Firebase Setup Guide
See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed Firebase and EmailJS setup instructions.

### Environment Variables
All environment variables are loaded from `.env` file. See `.env.example` for template.

## 💌 Email Templates

The app includes three email templates:

1. **Workout Reminder** - Reminds users about upcoming workouts
2. **Streak Achievement** - Celebrates workout streaks
3. **Welcome Email** - Greets new users

Each template has custom HTML styling that matches the FitVerse brand.

## 🔐 Security

- Firebase handles password hashing and secure authentication
- API keys are stored in environment variables
- Session tokens are managed by Firebase
- No sensitive data is exposed in the frontend

## 📱 Responsive Design

The app is fully responsive with breakpoints for:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🐛 Troubleshooting

### Firebase errors
- Ensure `.env` file has all Firebase credentials
- Check Firebase project allows Email/Password auth
- Clear browser cache and restart dev server

### EmailJS errors
- Verify EmailJS Service ID and Public Key in `.env`
- Check email template IDs match the code
- Gmail might require [App Passwords](https://support.google.com/accounts/answer/185833) if 2FA is enabled

### Auth not working
- Check Firebase is initialized correctly
- Ensure CORS is configured if using production domain
- Verify authentication is enabled in Firebase Console

## 📖 Usage Examples

### Send Workout Reminder
```javascript
import { sendWorkoutReminder } from "./utils/emailService";

await sendWorkoutReminder(
  "user@example.com",
  "John Doe",
  "Strength Training",
  "6:00 PM Tomorrow"
);
```

### Send Streak Achievement
```javascript
import { sendStreakAchievement } from "./utils/emailService";

await sendStreakAchievement("user@example.com", 7);
```

### Check Auth Status
```javascript
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("User logged out");
  }
});
```

## 🎯 Features

✅ Beautiful landing page with animated carousel  
✅ Firebase email/password authentication  
✅ Email reminders via EmailJS  
✅ User session persistence  
✅ Mobile-responsive design  
✅ Consistent dark theme with orange accents  
✅ Error handling and user feedback  
✅ Toast notifications  
✅ Sign out functionality  

## 🚀 Deployment

To deploy to production:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, GitHub Pages, etc.)
3. Update Firebase authorized domains in Console
4. Update environment variables in your hosting platform

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📞 Support

For questions or issues:
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup help
2. Review Firebase documentation at https://firebase.google.com/docs
3. Check EmailJS documentation at https://www.emailjs.com/docs

---

**Made with ❤️ for fitness enthusiasts** 💪🔥
