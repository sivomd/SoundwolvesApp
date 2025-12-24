import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { LiveChat } from '@/components/LiveChat';
import { Toaster } from '@/components/ui/sonner';
import Home from '@/pages/Home';
import Events from '@/pages/Events';
import DJs from '@/pages/DJs';
import Tickets from '@/pages/Tickets';
import Membership from '@/pages/Membership';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import DJProfileSetup from '@/pages/DJProfileSetup';
import DJDashboard from '@/pages/DJDashboard';
import EventDetail from '@/pages/EventDetail';
import DJDetail from '@/pages/DJDetail';
import CyberSocial from '@/pages/CyberSocial';
import CyberEventDetail from '@/pages/CyberEventDetail';
import '@/App.css';

function App() {
  return (
    <div className="App min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/djs" element={<DJs />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dj-profile-setup" element={<DJProfileSetup />} />
            <Route path="/dj-dashboard" element={<DJDashboard />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/dj/:id" element={<DJDetail />} />
            <Route path="/cyber-social" element={<CyberSocial />} />
            <Route path="/cyber-social/event/:id" element={<CyberEventDetail />} />
          </Routes>
        </main>
        <BottomNav />
        <LiveChat />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
