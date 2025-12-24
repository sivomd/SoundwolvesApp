import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Lock, Crown, Share2, Heart, ArrowLeft, Check, Music, Utensils, Flame, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { getCyberEventById } from '@/data/cyberEventsData';

export const CyberEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    const foundEvent = getCyberEventById(id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      toast.error('Event not found');
      navigate('/cyber-social');
    }
  }, [id, navigate]);

  const handleRSVP = () => {
    if (event.inviteOnly) {
      toast.info('Invitation Request Sent', {
        description: 'Our team will review your request and respond within 48 hours.'
      });
    } else {
      toast.success('RSVP Confirmed!', {
        description: 'Check your email for confirmation and event details.'
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const toggleInterest = () => {
    setIsInterested(!isInterested);
    toast.success(isInterested ? 'Removed from interested' : 'Marked as interested');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-950 pt-20 flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  const capacityPercentage = Math.round((event.attendees / event.attendeeLimit) * 100);

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link to="/cyber-social">
            <Button variant="ghost" className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
            onClick={toggleInterest}
          >
            <Heart className={`w-5 h-5 ${isInterested ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
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
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 mb-3">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                      {event.title}
                    </h1>
                    <p className="text-lg text-gray-400">{event.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-white">{event.date}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium text-white">{event.time}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Users className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Capacity</p>
                    <p className="text-sm font-medium text-white">{event.attendees}/{event.attendeeLimit}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Shield className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Dress Code</p>
                    <p className="text-sm font-medium text-white">{event.dressCode}</p>
                  </div>
                </div>

                <Separator className="bg-gray-800 my-6" />

                <div className="mb-8">
                  <h2 className="text-xl font-display font-bold text-white mb-4">About This Gathering</h2>
                  <p className="text-gray-400 leading-relaxed">{event.description}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-display font-bold text-white mb-4">What to Expect</h2>
                  <ul className="space-y-3">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <span className="text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {event.entertainment && event.entertainment !== 'None' && (
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <Music className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Live Entertainment</p>
                        <p className="text-white font-medium">{event.entertainment}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Venue Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-display font-bold text-white mb-4">Venue</h2>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={event.venue.image} alt={event.venue.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{event.venue.name}</h3>
                    <p className="text-sm text-cyan-400">{event.venue.type}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue.address}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {event.venue.amenities.map((amenity, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-3xl font-bold text-cyan-400">{event.price}</p>
                </div>

                {/* Capacity Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Spots Filled</span>
                    <span className="text-white font-medium">{capacityPercentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${capacityPercentage >= 80 ? 'bg-orange-500' : 'bg-cyan-500'}`}
                      style={{ width: `${capacityPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {event.attendeeLimit - event.attendees} spots remaining
                  </p>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white" 
                  size="lg"
                  onClick={handleRSVP}
                >
                  {event.inviteOnly ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Request Invitation
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      RSVP Now
                    </>
                  )}
                </Button>

                <Separator className="bg-gray-800" />

                <div>
                  <p className="text-sm text-gray-500 mb-3">Hosted By</p>
                  <div className="space-y-2">
                    {event.hosts.map((host, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-cyan-400" />
                        </div>
                        <span className="text-sm text-gray-300">{host}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-xs text-gray-600">
                    Questions? Contact our events team
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberEventDetail;
