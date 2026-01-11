# 🐺 SOUNDWOLVES

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)

**The Intersection of Nightlife and Networking**

SOUNDWOLVES is a premium event discovery platform that bridges two worlds: exclusive nightlife experiences for the Indian diaspora in North America, and high-end cybersecurity networking events for tech professionals. Discover legendary DJs, book VIP experiences, and connect with industry leaders at curated social gatherings.

![SOUNDWOLVES Hero](https://customer-assets.emergentagent.com/job_dj-wolves-app/artifacts/tjj77kbh_SoundWolves.png)

---

## ✨ What's New

### 🎉 Conference Promotion Popup
- **"Made in India: Next-Gen Threat Intelligence"** conference featured in homepage modal
- Smart popup with "Don't show this again" checkbox
- localStorage persistence for user preference

### 🔄 Updated Homepage
- New headline: **"The Intersection of Nightlife and Networking"**
- Reflects the platform's dual focus on entertainment and professional events

---

## 🎯 Features

### 🎵 Nightlife Section
| Feature | Description |
|---------|-------------|
| **Event Discovery** | Browse exclusive nightlife events across North America |
| **City Filters** | Filter by New York, New Jersey, Philadelphia, Newark, Jersey City, Brooklyn |
| **DJ Profiles** | Detailed profiles with ratings, music samples, and booking info |
| **Trending Events** | Hot events with countdown timers and friend activity |
| **VIP Memberships** | Wolves Pass, Gold, and Black tier memberships |
| **Social Features** | Follow DJs, see friends attending, share events |

### 🔐 Cybersecurity Social Section (`/cyber-social`)
| Feature | Description |
|---------|-------------|
| **Premium Events** | Executive dinners, CISO firesides, rooftop networking sessions |
| **2026 Schedule** | Full event calendar with pre-order/registration |
| **Partner Venues** | Curated NJ venues - The Ainsworth, Battello, Maritime Parc |
| **International Conferences** | "Made in India" cybersecurity conference in Goa |
| **Exclusive Access** | Invite-only events for security professionals |

### 🌟 Platform Features
- 🎨 **Premium Dark Theme** - Glassmorphism effects and golden accents
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🔔 **Toast Notifications** - Real-time feedback for all actions
- 💬 **Live Chat** - Support widget (prototype)
- 🎫 **Multi-Tier Ticketing** - General, VIP, and Platinum options
- 🎵 **Music Previews** - Listen to DJ tracks before booking

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality component library
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notifications

### Development Tools
- **Craco** - Create React App Configuration Override
- **ESLint** - JavaScript linting

---

## 📦 Installation

### Prerequisites
- **Node.js** 18+ and Yarn
- **Git**

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/soundwolves.git
cd soundwolves

# Install frontend dependencies
cd frontend
yarn install

# Start development server
yarn start
```

The application will be available at **http://localhost:3000**

---

## 🗂️ Project Structure

```
soundwolves/
├── frontend/
│   ├── public/                    # Static files
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── ui/               # Shadcn UI base components
│   │   │   ├── cyber/            # Cybersecurity section components
│   │   │   ├── ConferencePopup.jsx
│   │   │   ├── FeaturedConferenceBanner.jsx
│   │   │   ├── TrendingSection.jsx
│   │   │   ├── TrendingMusicReleases.jsx
│   │   │   ├── EventCountdown.jsx
│   │   │   ├── FriendsAttending.jsx
│   │   │   ├── LiveChat.jsx
│   │   │   └── ...
│   │   ├── data/                  # Centralized mock data
│   │   │   ├── mockData.js       # Nightlife events, DJs, cities
│   │   │   └── cyberEventsData.js # Cyber events, venues
│   │   ├── pages/                 # Route pages
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Events.jsx        # Events listing
│   │   │   ├── DJs.jsx           # DJ directory
│   │   │   ├── CyberSocial.jsx   # Cyber networking hub
│   │   │   ├── CyberEventDetail.jsx
│   │   │   ├── Membership.jsx
│   │   │   └── ...
│   │   ├── App.js                # Router configuration
│   │   └── index.css             # Design system tokens
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 🎨 Design System

### Color Palette
```css
/* Primary - Gold */
--primary: 43 96% 56%;           /* VIP Gold accent */

/* Gradients */
.text-gradient-gold              /* Nightlife branding */
.text-gradient-wolf              /* Networking branding */

/* Cyber Section */
Cyan/Teal accents               /* Professional networking */
Orange/Amber                    /* Conference highlights */
```

### Typography
- **Display Font**: Space Grotesk (Headings)
- **Body Font**: Inter (Body text)

### Components
- Glass-morphism cards with backdrop blur
- Custom gradients for VIP elements
- Hover lift animations
- Glow effects for premium features

---

## 📱 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, trending events, featured conference |
| `/events` | Browse all nightlife events with filters |
| `/djs` | DJ directory with search and categories |
| `/dj/:id` | Individual DJ profile with booking |
| `/event/:id` | Event details with ticketing |
| `/cyber-social` | Cybersecurity networking events hub |
| `/cyber-social/event/:id` | Cyber event details |
| `/membership` | Membership tiers and pricing |
| `/profile` | User profile and booking history |
| `/tickets` | Manage purchased tickets |

---

## 🎭 Membership Tiers

| Tier | Price | Benefits |
|------|-------|----------|
| **Wolves Pass** | $29/mo | Early access (24h), 10% discount, member events |
| **Gold** | $79/mo | Early access (48h), 20% discount, backstage access |
| **Black** | $199/mo | Unlimited access, 30% discount, VIP tables, concierge |

---

## 🚀 Deployment

### Build for Production
```bash
cd frontend
yarn build
```

### Deploy Options
- **Vercel** - Recommended for React apps
- **Netlify** - Easy static site hosting
- **AWS Amplify** - Full-featured hosting

---

## 📊 Current Status

This is a **high-fidelity frontend prototype**. All data is mocked for demonstration purposes.

### ✅ Implemented
- Complete nightlife event discovery flow
- Full cybersecurity social section
- DJ profiles with ratings and samples
- Membership tier pages
- Conference promotion popup
- City-based filtering
- Responsive design

### 🔮 Roadmap
- [ ] Backend API (FastAPI + MongoDB)
- [ ] User authentication
- [ ] Payment integration (Stripe)
- [ ] Real ticketing system
- [ ] Email notifications
- [ ] Mobile apps

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design Inspiration**: POSH.vip, BookMyShow
- **Component Library**: Shadcn/UI
- **Icons**: Lucide React
- **Community**: Indian diaspora nightlife & tech communities

---

<div align="center">

**Built with ❤️ for the Indian diaspora nightlife and tech community**

[Report Bug](https://github.com/yourusername/soundwolves/issues) • [Request Feature](https://github.com/yourusername/soundwolves/issues)

</div>
