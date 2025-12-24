import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Lock, Flame, Crown, ChevronRight, Music, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export const CyberEventCard = ({ event, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleRSVP = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (event.inviteOnly) {
      toast.info('This is an invite-only event', {
        description: 'Request an invitation to attend this exclusive gathering.'
      });
    } else {
      toast.success('RSVP Submitted!', {
        description: 'You will receive a confirmation email shortly.'
      });
    }
  };

  const capacityPercentage = Math.round((event.attendees / event.attendeeLimit) * 100);
  const isAlmostFull = capacityPercentage >= 80;

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

          {/* Capacity Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={`border-none ${isAlmostFull ? 'bg-orange-500/90 text-white' : 'bg-gray-800/90 text-gray-300'}`}>
              <Users className="w-3 h-3 mr-1" />
              {event.attendees}/{event.attendeeLimit}
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

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-800">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-lg font-bold text-cyan-400">{event.price}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 group/btn"
              onClick={handleRSVP}
            >
              {event.inviteOnly ? 'Request Invite' : 'RSVP Now'}
              <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CyberEventCard;
