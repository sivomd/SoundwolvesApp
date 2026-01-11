# SOUNDWOLVES - Product Requirements Document

## Original Problem Statement
Create a premium, mobile-first web application called "SOUNDWOLVES" - a DJ booking and event management platform. Initially focused on nightlife events for the Indian diaspora in North America, with an expanded scope to include professional cybersecurity networking events.

## Target Audience
- **Nightlife Enthusiasts**: Young professionals seeking premium nightlife experiences, DJ events, and VIP access
- **Cybersecurity Professionals**: CISOs, security engineers, and tech executives looking for high-end networking events in New Jersey

## Core Requirements

### Dual-Focus Platform
1. **Nightlife Section**
   - DJ booking and profiles
   - Event discovery by city
   - Ticketing (mocked)
   - Social features (following, friend activity)
   - VIP memberships

2. **Cybersecurity Social Section** (`/cyber-social`)
   - Premium professional networking events
   - Executive dinners, CISO firesides, rooftop sessions
   - Partner venue showcases
   - 2026 event pre-order/registration flow

### Design System
- Dark, premium aesthetic
- Gold/amber gradients for nightlife
- Cyan/professional tones for cyber section
- Mobile-first responsive design

---

## What's Been Implemented

### ✅ Completed (January 2026)

**Homepage Updates**
- [x] Updated main headline to "The Intersection of Nightlife and Networking"
- [x] Implemented conference promotion popup with "Don't show again" checkbox
- [x] Conference popup uses localStorage/sessionStorage for persistence

**Cybersecurity Social Section**
- [x] Full `/cyber-social` page with premium UI
- [x] "Made in India: Next-Gen Threat Intelligence" conference integration
- [x] 2026 event schedule with pre-order flow
- [x] Partner venue showcases
- [x] Conference promotional banners

**Core Features**
- [x] City-based event filtering
- [x] DJ profiles with ratings and music samples
- [x] Trending events and music sections
- [x] Event countdown timers
- [x] Friends attending feature
- [x] User profile pages with booking history
- [x] Live chat component (mocked)
- [x] Tiered membership pages (prototyped)

**Data Architecture**
- [x] Centralized mock data in `/frontend/src/data/`
- [x] `mockData.js` - Nightlife events, DJs, cities
- [x] `cyberEventsData.js` - Cyber events, venues, conferences

---

## Prioritized Backlog

### P0 (Critical - Deployment)
- [ ] Configure production environment variables
- [ ] Create production build (`yarn build`)
- [ ] Deploy frontend to hosting provider (Vercel/Netlify)

### P1 (High Priority)
- [ ] Real payment integration (Stripe) for memberships and tickets
- [ ] Backend API development (FastAPI)
- [ ] User authentication system

### P2 (Medium Priority)
- [ ] Third-party ticketing API integration
- [ ] Real-time notification system
- [ ] Backend for tiered memberships
- [ ] QR code generation for tickets

### P3 (Low Priority)
- [ ] Improve live chat button animation
- [ ] Add more cities to the platform
- [ ] Event promoter profiles

---

## Technical Architecture

```
/app
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui base components
│   │   │   ├── cyber/      # Cyber section specific components
│   │   │   └── *.jsx       # Feature components
│   │   ├── data/           # Centralized mock data
│   │   ├── pages/          # Route pages
│   │   ├── App.js          # Router configuration
│   │   └── index.css       # Design system tokens
│   └── package.json
```

### Tech Stack
- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS with custom design tokens
- **UI Library**: shadcn/ui components
- **State**: React hooks (useState, useEffect)
- **Storage**: localStorage/sessionStorage for persistence

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `/frontend/src/pages/Home.jsx` | Homepage with popup and updated headline |
| `/frontend/src/components/ConferencePopup.jsx` | Conference promotion modal |
| `/frontend/src/data/cyberEventsData.js` | All cyber event data |
| `/frontend/src/data/mockData.js` | Nightlife event/DJ data |
| `/frontend/src/pages/CyberSocial.jsx` | Cyber social main page |
| `/frontend/src/index.css` | Design system variables |

---

## Notes

- **All data is MOCKED** - No backend connected
- **Login is simulated** - Any credentials work
- **Payments are prototyped** - No real transactions
