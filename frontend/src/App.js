import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
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
          </Routes>
        </main>
        <BottomNav />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
