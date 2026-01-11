import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Globe, Ticket, Users, ArrowRight, Shield, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { featuredConference } from '@/data/cyberEventsData';

export const FeaturedConferenceBanner = () => {
  if (!featuredConference) return null;

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-950/40 via-gray-950 to-cyan-950/40" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <Globe className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Featured Conference</h2>
              <p className="text-sm text-gray-400">Cybersecurity meets innovation</p>
            </div>
          </div>
          <Link to="/cyber-social">
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10">
              View All Cyber Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Conference Card */}
        <Card className="overflow-hidden border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative">
              <Link to={`/cyber-social/event/${featuredConference.id}`}>
                <img 
                  src={featuredConference.image}
                  alt={featuredConference.title}
                  className="w-full h-64 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50 lg:bg-gradient-to-l" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-none shadow-lg">
                    <Globe className="w-3 h-3 mr-1" />
                    International
                  </Badge>
                  <Badge className="bg-green-500/90 text-white border-none">
                    🇮🇳 Made in India
                  </Badge>
                </div>
              </Link>
            </div>

            {/* Content Section */}
            <CardContent className="lg:w-3/5 p-6 lg:p-8 space-y-5">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {featuredConference.date}
                  </Badge>
                  <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    BITS Pilani, Goa
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                    {featuredConference.preOrders}+ Pre-Orders
                  </Badge>
                </div>
                
                <Link to={`/cyber-social/event/${featuredConference.id}`}>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-white hover:text-orange-400 transition-colors mb-2">
                    {featuredConference.title}
                  </h3>
                </Link>
                <p className="text-gray-400">{featuredConference.subtitle}</p>
              </div>

              {/* Conference Tracks */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Conference Tracks:</p>
                <div className="flex flex-wrap gap-2">
                  {featuredConference.tracks.slice(0, 4).map((track, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs">
                      {track.name}
                    </Badge>
                  ))}
                  {featuredConference.tracks.length > 4 && (
                    <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs">
                      +{featuredConference.tracks.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>TIX Launch Event</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>CSO & CISO Summit</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Next-Gen Threat Intel</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>DSCI Partnership</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-800">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-400">{featuredConference.earlyBirdPrice}</span>
                    <span className="text-gray-500 line-through">{featuredConference.price}</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      Save $100
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">Early bird until {featuredConference.earlyBirdDeadline}</p>
                </div>
                <Link to={`/cyber-social/event/${featuredConference.id}`}>
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25">
                    <Ticket className="w-4 h-4 mr-2" />
                    Pre-Order Pass
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedConferenceBanner;
