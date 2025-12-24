import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Users, Flame, Building, Music, Utensils, MapPin, Calendar, Clock, Crown, ArrowRight, Star, Sparkles, Eye, ChevronRight, Ticket, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cyberEvents, cyberVenues, cyberEventTypes, getFeaturedCyberEvents, getTrendingCyberEvents, getFeaturedVenues } from '@/data/cyberEventsData';
import { CyberEventCard } from '@/components/cyber/CyberEventCard';
import { CyberVenueCard } from '@/components/cyber/CyberVenueCard';
import { WhyThisMatters } from '@/components/cyber/WhyThisMatters';

const iconMap = {
  Shield, Users, Utensils, Flame, Building, Music
};

export const CyberSocial = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredEvents = cyberEvents.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesType;
  });

  const featuredEvents = getFeaturedCyberEvents();
  const trendingEvents = getTrendingCyberEvents();
  const featuredVenues = getFeaturedVenues();

  const handleVIPAccess = () => {
    toast.success('VIP Access Request', {
      description: 'Redirecting to membership page to explore VIP options...'
    });
    navigate('/membership');
  };

  const handleLearnMembership = () => {
    navigate('/membership');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cinematic Hero Section */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Dark cinematic background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920"
            alt="Cybersecurity Social"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/30 via-transparent to-purple-950/30" />
          {/* Subtle animated overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* 2026 Announcement Badge */}
          <div className="flex justify-center gap-3 mb-6">
            <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30 backdrop-blur-sm px-4 py-2 text-sm animate-pulse">
              <Calendar className="w-4 h-4 mr-2" />
              2026 Season • Pre-Orders Now Open
            </Badge>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 backdrop-blur-sm px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              New Jersey's Premier Cyber Leadership Network
            </Badge>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            <span className="text-white">Where Cyber Leaders</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect After Hours
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            <span className="text-cyan-400 font-semibold">Coming 2026:</span> Exclusive gatherings where vision, strategy, and influence are built outside the boardroom. 
            Fine dining, curated lounges, and invite-only conversations shaping the future of cybersecurity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25"
              onClick={() => {
                document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Ticket className="w-5 h-5 mr-2" />
              Pre-Order Early Bird Tickets
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-white/10 hover:border-gray-500"
              onClick={() => {
                toast.success('Interest Registered!', {
                  description: 'We\'ll notify you when new events are announced.'
                });
              }}
            >
              Register Interest
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Vetted Attendees Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>500+ Security Executives</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>New Jersey Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-cyan-400" />
              <span>Premium Venues</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <WhyThisMatters />

      {/* Trending Events Section */}
      <section className="py-20 bg-gradient-to-b from-background to-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30">
                  <Tag className="w-3 h-3 mr-1" />
                  Early Bird Pricing
                </Badge>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <Flame className="w-3 h-3 mr-1" />
                  High Demand
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                2026 Event Schedule
              </h2>
              <p className="text-gray-400 mt-2">Pre-order now and secure early bird pricing</p>
            </div>
            <Link to="/cyber-social/events">
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10">
                View All Events
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingEvents.slice(0, 3).map((event) => (
              <CyberEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Type Filter & All Events */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Discover Your Scene
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From intimate executive dinners to vibrant cyber salons—find the gatherings that match your style
            </p>
          </div>

          {/* Event Type Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-900/50 rounded-xl border border-gray-800">
              {cyberEventTypes.map((type) => {
                const Icon = iconMap[type.icon] || Shield;
                return (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                    className={selectedType === type.id 
                      ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' 
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {type.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <CyberEventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Shield className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">No events found for this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Venues Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-3">
                <Star className="w-3 h-3 mr-1" />
                Partner Venues
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                New Jersey's Finest
              </h2>
              <p className="text-gray-400 mt-2">Where cybersecurity culture comes alive</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVenues.map((venue) => (
              <CyberVenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/50 via-blue-950/50 to-purple-950/50" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              Ready to Join the Inner Circle?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              The most influential conversations in cybersecurity happen here. 
              Request your invitation and become part of New Jersey's cyber elite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/25"
                onClick={handleVIPAccess}
              >
                <Crown className="w-5 h-5 mr-2" />
                Request VIP Access
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-white/10"
                onClick={handleLearnMembership}
              >
                Learn About Membership
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CyberSocial;
