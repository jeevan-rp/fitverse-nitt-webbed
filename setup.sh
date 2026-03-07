#!/bin/bash
# FitVerse Quick Setup Script
# Run this after setting up Firebase and EmailJS

echo "🔥 FitVerse Quick Setup"
echo "======================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
else
    echo "✅ Dependencies already installed"
fi

# Prompt for environment variables
echo ""
echo "🔐 Now let's set up your environment variables..."
echo ""
echo "You need to get these from Firebase Console and EmailJS:"
echo "  1. Open Firebase Console for your 'fitverse' project"
echo "  2. Go to Project Settings → Your apps section"
echo "  3. Copy the Firebase config values"
echo "  4. Go to EmailJS account for Public Key and Service ID"
echo ""
echo "Create a .env file in the project root with:"
echo ""

cat > .env << 'EOF'
# Firebase Configuration - UPDATE WITH YOUR VALUES
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration - UPDATE WITH YOUR VALUES
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=template_workout_reminder
EOF

echo "✅ Created .env file"
echo ""
echo "📝 Next steps:"
echo "  1. Edit .env file with your Firebase credentials"
echo "  2. Edit .env file with your EmailJS credentials"
echo "  3. Run: npm run dev"
echo "  4. Open http://localhost:5174 in your browser"
echo ""
echo "📚 For detailed setup instructions, see:"
echo "  - SETUP_GUIDE.md (Firebase & EmailJS setup)"
echo "  - INTEGRATION_GUIDE.md (How to use features)"
echo "  - LANDING_PAGE_README.md (Feature overview)"
echo ""
echo "🚀 Happy building!"
