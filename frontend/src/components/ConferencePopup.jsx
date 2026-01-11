import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, MapPin, Globe, Ticket, Users, Flame, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { featuredConference } from '@/data/cyberEventsData';

export const ConferencePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if user opted to never show again (localStorage) or dismissed this session (sessionStorage)
    const neverShow = localStorage.getItem('conference_popup_never_show');
    const sessionDismissed = sessionStorage.getItem('conference_popup_dismissed');
    
    if (!neverShow && !sessionDismissed) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    
    if (dontShowAgain) {
      // Permanently hide the popup
      localStorage.setItem('conference_popup_never_show', 'true');
    } else {
      // Just hide for this session
      sessionStorage.setItem('conference_popup_dismissed', 'true');
    }
  };

  if (!isOpen || !featuredConference) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Popup Content */}
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl shadow-orange-500/20 border border-gray-800 overflow-hidden animate-scale-in">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trending Banner */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Badge className="bg-red-500 text-white border-none animate-pulse shadow-lg">
            <Flame className="w-3 h-3 mr-1" />
            Trending Now
          </Badge>
          <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-none shadow-lg">
            <Globe className="w-3 h-3 mr-1" />
            International
          </Badge>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <img 
              src={featuredConference.image}
              alt={featuredConference.title}
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent" />
            
            {/* Pre-order count */}
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-green-500/90 text-white border-none text-sm px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {featuredConference.preOrders}+ Already Pre-Ordered
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-6 lg:p-8 space-y-5">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {featuredConference.date}
                </Badge>
                <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
                  <MapPin className="w-3 h-3 mr-1" />
                  Goa, India
                </Badge>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">
                {featuredConference.title}
              </h2>
              <p className="text-gray-400">{featuredConference.subtitle}</p>
            </div>

            {/* Conference Tracks */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Conference Tracks:</p>
              <div className="flex flex-wrap gap-2">
                {featuredConference.tracks.map((track, i) => (
                  <Badge key={i} variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs">
                    {track.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Info */}
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300 mb-2">
                🎯 <strong>Launching TIX</strong> - Threat Intelligence Excellence
              </p>
              <p className="text-sm text-gray-300">
                🤝 BITS Pilani Goa + DSCI + Telangana Initiative
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-orange-400">{featuredConference.earlyBirdPrice}</span>
                  <span className="text-lg text-gray-500 line-through">{featuredConference.price}</span>
                </div>
                <p className="text-xs text-green-400">Save $100 with Early Bird!</p>
                <p className="text-xs text-gray-500">Ends {featuredConference.earlyBirdDeadline}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/cyber-social/event/${featuredConference.id}`} className="flex-1" onClick={handleClose}>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25">
                  <Ticket className="w-4 h-4 mr-2" />
                  Pre-Order Now
                </Button>
              </Link>
              <Link to="/cyber-social" onClick={handleClose}>
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  View All Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <p className="text-xs text-center text-gray-600">
              Limited seats available • Business Professional attire
            </p>

            {/* Don't Show Again Checkbox */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900 cursor-pointer"
                data-testid="dont-show-again-checkbox"
              />
              <label 
                htmlFor="dontShowAgain" 
                className="text-xs text-gray-500 cursor-pointer hover:text-gray-400 transition-colors"
              >
                Don't show this again
              </label>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ConferencePopup;
