import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Lock, Flame, Crown, ChevronRight, Music, Utensils, Tag, Ticket, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getEventStatusDisplay } from '@/data/cyberEventsData';

export const CyberEventCard = ({ event, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (event.status === 'sold-out') {
      toast.info('This event is sold out', {
        description: 'Join the waitlist to be notified of cancellations.'
      });
    } else if (event.inviteOnly) {
      toast.success('Pre-Order Request Submitted!', {
        description: 'Our team will review your request and send an invitation if approved.'
      });
    } else {
      toast.success('Pre-Order Confirmed!', {
        description: `You've secured your spot! Early bird pricing ends ${event.earlyBirdDeadline}.`
      });
    }
  };

  const statusDisplay = getEventStatusDisplay(event);
  const spotsRemaining = event.attendeeLimit - event.preOrders;
  const isLimitedSpots = spotsRemaining <= 10;

  return (
    <Link to={`/cyber-social/event/${event.id}`}>
      <Card 
        className={`group overflow-hidden border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-all duration-500 cursor-pointer ${featured ? 'ring-1 ring-cyan-500/30' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {event.trending && (
              <Badge className="bg-red-500/90 text-white border-none">
                <Flame className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
            {event.inviteOnly && (
              <Badge className="bg-purple-500/90 text-white border-none">
                <Lock className="w-3 h-3 mr-1" />
                Invite Only
              </Badge>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={`${statusDisplay.color} text-white border-none`}>
              <Ticket className="w-3 h-3 mr-1" />
              {event.preOrders > 0 ? `${event.preOrders} Pre-Orders` : statusDisplay.text}
            </Badge>
          </div>

          {/* Event Type Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-black/50 border-gray-600 text-gray-300 backdrop-blur-sm">
              {event.type === 'dinner' && <Utensils className="w-3 h-3 mr-1" />}
              {event.type === 'lounge' && <Music className="w-3 h-3 mr-1" />}
              {event.type === 'fireside' && <Flame className="w-3 h-3 mr-1" />}
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Badge>
          </div>

          {/* Limited Spots Warning */}
          {isLimitedSpots && (
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-orange-500/90 text-white border-none animate-pulse">
                Only {spotsRemaining} spots left!
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Title & Subtitle */}
          <div>
            <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
              {event.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-1">{event.subtitle}</p>
          </div>

          {/* Venue & Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-cyan-500" />
              <span className="truncate">{event.venue.name} • {event.venue.location}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-500" />
                <span>{event.time}</span>
              </div>
            </div>
          </div>

          {/* Entertainment & Dress Code */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs">
              {event.dressCode}
            </Badge>
            {event.entertainment && event.entertainment !== 'None' && (
              <Badge variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs">
                <Music className="w-3 h-3 mr-1" />
                {event.entertainment}
              </Badge>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-cyan-400">{event.earlyBirdPrice}</p>
                <p className="text-sm text-gray-500 line-through">{event.price}</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  Early Bird
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Ends {event.earlyBirdDeadline}</p>
            </div>
          </div>

          {/* CTA */}
          <Button 
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white group/btn"
            onClick={handleAction}
          >
            {event.inviteOnly ? (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Request Pre-Order
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4 mr-2" />
                Pre-Order Now
              </>
            )}
            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CyberEventCard;
