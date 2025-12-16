# 🐺 SOUNDWOLVES

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-brightgreen.svg)](https://www.mongodb.com/)

**The Cultural Nightlife Operating System for the Indian Diaspora**

SOUNDWOLVES is a premium event discovery and DJ booking platform designed specifically for the Indian diaspora across North America. Experience exclusive nightlife events, book legendary DJs, and unlock VIP experiences through our innovative membership system.

![SOUNDWOLVES Hero](https://customer-assets.emergentagent.com/job_dj-wolves-app/artifacts/tjj77kbh_SoundWolves.png)

---

## 🎯 Features

### For Event Goers
- 🎫 **Event Discovery** - Browse and search through exclusive nightlife events
- 🔍 **Smart Filters** - Filter by genre (Bollywood, Punjabi, EDM, etc.), city, and date
- 🎟️ **Ticketing** - Multi-tier ticket purchasing (General, VIP, Platinum)
- 👑 **Membership Tiers** - Wolves Pass, Gold, and Black memberships with exclusive perks
- 📱 **Mobile-First Design** - Responsive design optimized for mobile devices

### For DJs & Promoters
- 🎤 **DJ Profiles** - Complete profile setup with bio, genres, cities, and pricing
- 📊 **Dashboard** - Personal dashboard to manage bookings and track stats
- 💼 **Booking Management** - Receive and manage booking requests
- ⭐ **Verified Badges** - Build credibility with verified status
- 📈 **Analytics** - Track followers, shows, and bookings

### Platform Features
- 🔐 **Authentication** - Separate signup/login flows for users and DJs
- 💾 **Local Storage** - Client-side data persistence for prototype functionality
- 🎨 **Premium Design** - Dark theme with glassmorphism effects and golden accents
- 🌐 **Multi-City Support** - Toronto, Vancouver, Montreal, Calgary, and more
- 🔔 **Toast Notifications** - Real-time feedback for all user actions
- 📱 **Social Features** - Follow DJs, share events, referral system

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications

### Backend
- **FastAPI** - Modern Python web framework
- **Motor** - Async MongoDB driver
- **Uvicorn** - ASGI server
- **Python 3.11+** - Latest Python features

### Database
- **MongoDB** - NoSQL document database
- **Motor** - Async operations for optimal performance

### Development Tools
- **Craco** - Create React App Configuration Override
- **ESLint** - JavaScript linting
- **Supervisor** - Process management

---

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and Yarn
- **Python** 3.11+
- **MongoDB** 7.0+
- **Git**

### Clone Repository
```bash
git clone https://github.com/yourusername/soundwolves.git
cd soundwolves
```

### Backend Setup

1. **Create Virtual Environment**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install Dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` file:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=soundwolves
CORS_ORIGINS=http://localhost:3000
```

4. **Start Backend Server**
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup

1. **Navigate to Frontend Directory**
```bash
cd frontend
```

2. **Install Dependencies**
```bash
yarn install
```

3. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` file:
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

4. **Start Development Server**
```bash
yarn start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001

---

## 🗂️ Project Structure

```
soundwolves/
├── backend/
│   ├── server.py              # FastAPI application entry point
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (not in git)
│   └── venv/                  # Python virtual environment
│
├── frontend/
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   ├── Navbar.jsx    # Navigation bar
│   │   │   └── BottomNav.jsx # Mobile bottom navigation
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── Events.jsx    # Events listing
│   │   │   ├── DJs.jsx       # DJ directory
│   │   │   ├── Tickets.jsx   # Ticket management
│   │   │   ├── Membership.jsx # Membership tiers
│   │   │   ├── Login.jsx     # Authentication
│   │   │   ├── DJProfileSetup.jsx  # DJ profile creation
│   │   │   ├── DJDashboard.jsx     # DJ dashboard
│   │   │   ├── EventDetail.jsx     # Event details
│   │   │   └── DJDetail.jsx        # DJ profile details
│   │   ├── lib/
│   │   │   └── utils.js      # Utility functions
│   │   ├── App.js            # Main app component
│   │   ├── App.css           # Global styles
│   │   ├── index.css         # Tailwind + custom CSS
│   │   └── index.js          # React entry point
│   ├── package.json          # NPM dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── craco.config.js       # Craco configuration
│   └── .env                  # Environment variables (not in git)
│
├── README.md                 # This file
└── .gitignore               # Git ignore rules
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary - Gold */
--primary: 43 96% 56%;           /* VIP Gold accent */
--primary-glow: 43 96% 70%;      /* Glowing highlights */

/* Secondary - Deep Teal */
--secondary: 187 71% 45%;        /* Brand secondary */

/* Accent - Wolf Purple */
--accent: 270 60% 60%;           /* Pack purple */

/* Background */
--background: 240 10% 3.9%;      /* Dark premium background */
--foreground: 0 0% 98%;          /* Light text */
```

### Typography
- **Display Font**: Space Grotesk (Headings)
- **Body Font**: Inter (Body text)
- **Scale**: text-xs (12px) to text-6xl (60px)

### Components
- Glass-morphism cards with backdrop blur
- Custom gradients for VIP elements
- Hover lift animations
- Glow effects for premium features

---

## 🚀 Deployment

### Environment Variables

**Backend (.env)**
```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=soundwolves_production
CORS_ORIGINS=https://yourdomain.com
```

**Frontend (.env)**
```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

### Build for Production

**Frontend Build**
```bash
cd frontend
yarn build
```

**Backend Deployment**
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --workers 4
```

### Deployment Options

#### 1. Emergent Platform (Recommended)
- Native support for FastAPI + React + MongoDB stack
- Automatic environment configuration
- Built-in MongoDB management
- One-click deployment

#### 2. Docker Deployment
```bash
# Coming soon - Docker configuration
docker-compose up -d
```

#### 3. Traditional Hosting
- Deploy React build to Netlify/Vercel
- Deploy FastAPI to Heroku/DigitalOcean
- Connect to MongoDB Atlas

---

## 📱 Features Walkthrough

### 1. Event Discovery
Users can browse events with:
- Real-time search across events, artists, and venues
- Category filters (Bollywood, Punjabi, EDM, Special Events)
- City-based filtering
- Trending indicators

### 2. DJ Profiles
DJs can create comprehensive profiles:
- Bio and professional background
- Music genres and specialties
- Available cities
- Pricing ranges
- Instagram integration
- Booking management

### 3. Ticketing System
Multi-tier ticketing:
- **General Admission** - Basic event access
- **VIP Experience** - Premium seating and perks
- **Platinum Tables** - Bottle service and backstage access

External ticketing partner integration (Eventbrite, Ticketmaster, StubHub)

### 4. Membership Tiers

**Wolves Pass** ($29/month)
- Early ticket access (24h)
- 10% discount
- Member-only events

**Gold** ($79/month)
- Everything in Wolves Pass
- Early access (48h)
- 20% discount
- Backstage access

**Black** ($199/month)
- Everything in Gold
- Unlimited early access
- 30% discount
- VIP table access
- Dedicated concierge

---

## 🔐 Authentication

### User Registration
1. Navigate to `/login`
2. Select "Event Goer" or "DJ/Promoter"
3. Fill in registration details
4. Account created with localStorage persistence

### DJ Profile Setup
1. Register as DJ/Promoter
2. Complete profile setup:
   - DJ name and tagline
   - Bio and experience
   - Music genres
   - Available cities
   - Pricing range
   - Social media links
3. Profile goes live on DJ directory

---

## 🎯 User Flows

### Event Goer Journey
```
Home → Browse Events → Select Event → View Details → Buy Tickets → External Vendor
      → Browse DJs → Select DJ → View Profile → Follow
      → View Membership → Choose Tier → Sign Up
```

### DJ Journey
```
Sign Up → Complete Profile → Dashboard → Manage Bookings
                                      → Update Profile
                                      → View Stats
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User signup and login
- [ ] DJ signup and profile creation
- [ ] Event search and filtering
- [ ] DJ profile viewing and following
- [ ] Ticket tier selection
- [ ] Navigation between pages
- [ ] Mobile responsiveness
- [ ] Toast notifications
- [ ] External link redirects

### Automated Testing
```bash
# Coming soon - Jest and Playwright tests
yarn test
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Update documentation for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Product Vision**: Cultural nightlife platform for Indian diaspora  
**Design**: Premium dark theme with glassmorphism  
**Development**: FastAPI + React + MongoDB stack  

---

## 🙏 Acknowledgments

- **Inspiration**: POSH.vip, BookMyShow
- **Design Assets**: Custom wolf branding and video backgrounds
- **Component Library**: Shadcn/UI
- **Icons**: Lucide React
- **Community**: Indian diaspora nightlife scene

---

## 📞 Support

For questions or issues:
- **Email**: support@soundwolves.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/soundwolves/issues)
- **Website**: [www.soundwolves.com](https://www.soundwolves.com)

---

## 🗺️ Roadmap

### Phase 1 (Current - MVP)
- ✅ User authentication
- ✅ Event discovery and filtering
- ✅ DJ profiles and directory
- ✅ Ticketing system UI
- ✅ Membership tiers

### Phase 2 (Next)
- [ ] Backend API integration
- [ ] Real payment processing
- [ ] Email notifications
- [ ] QR code generation
- [ ] Advanced search with Algolia

### Phase 3 (Future)
- [ ] Mobile apps (iOS/Android)
- [ ] In-app messaging
- [ ] Live event streaming
- [ ] DJ booking calendar
- [ ] Analytics dashboard

---

## 📊 Analytics & Metrics

Key metrics tracked:
- User signups and engagement
- DJ profile completions
- Event views and bookings
- Membership conversions
- Search queries and filters

---

<div align="center">

**Built with ❤️ for the Indian diaspora nightlife community**

[Live Demo](https://soundwolves.com) • [Report Bug](https://github.com/yourusername/soundwolves/issues) • [Request Feature](https://github.com/yourusername/soundwolves/issues)

</div>
