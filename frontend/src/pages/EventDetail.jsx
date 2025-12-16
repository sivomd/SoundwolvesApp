import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, TrendingUp, Crown, Heart, Ticket, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { getEventById, getDJById } from '@/data/mockData';
import { EventCountdown } from '@/components/EventCountdown';
import { SocialShare } from '@/components/SocialShare';
import { FriendsAttending } from '@/components/FriendsAttending';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [dj, setDj] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const foundEvent = getEventById(id);
    if (foundEvent) {
      setEvent(foundEvent);
      setDj(getDJById(foundEvent.artistId));
      
      // Check if event is favorited
      const favorites = JSON.parse(localStorage.getItem('soundwolves_favorite_events') || '[]');
      setIsFavorited(favorites.includes(parseInt(id)));
    } else {
      toast.error('Event not found');
      navigate('/events');
    }
  }, [id, navigate]);

  const handleGetTickets = () => {
    if (event?.ticketLink) {
      window.open(event.ticketLink, '_blank');
      toast.success('Redirecting to ticketing partner...');
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('soundwolves_favorite_events') || '[]');
    const eventId = parseInt(id);
    
    let newFavorites;
    if (isFavorited) {
      newFavorites = favorites.filter(fav => fav !== eventId);
      toast.info('Removed from favorites');
    } else {
      newFavorites = [...favorites, eventId];
      toast.success('Added to favorites!');
    }
    
    localStorage.setItem('soundwolves_favorite_events', JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
  };

  const openMaps = () => {
    if (event?.address) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`;
      window.open(mapsUrl, '_blank');
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-8 flex items-center justify-center">
        <p className="text-muted-foreground">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="glass-card hover:bg-background/50"
            onClick={toggleFavorite}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-destructive text-destructive' : ''}`} />
          </Button>
          <SocialShare 
            title={`${event.title} - SOUNDWOLVES`}
            description={event.description}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {event.trending && (
            <Badge className="bg-destructive/90 text-white backdrop-blur-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          {event.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
              <Crown className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                  {event.title}
                </h1>
                
                <div className="flex items-center gap-2 mb-6">
                  <Link to={`/dj/${event.artistId}`}>
                    <Button variant="link" className="p-0 h-auto text-lg text-primary hover:text-primary/80">
                      by {event.artist}
                    </Button>
                  </Link>
                  {dj?.verified && (
                    <Badge variant="secondary" className="text-xs">Verified</Badge>
                  )}
                </div>

                {/* Event Countdown */}
                <div className="mb-6">
                  <EventCountdown dateISO={event.dateISO} eventTitle={event.title} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-semibold">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-semibold">{event.time} - {event.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Venue</p>
                      <p className="font-semibold">{event.venue}</p>
                      <p className="text-xs text-muted-foreground">{event.city}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={openMaps}>
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Attending</p>
                      <p className="font-semibold">{event.attendees} / {event.capacity}</p>
                    </div>
                  </div>
                </div>

                {/* Age Restriction Badge */}
                {event.ageRestriction && (
                  <Badge variant="outline" className="mb-6">
                    {event.ageRestriction}
                  </Badge>
                )}

                <Separator className="my-6" />

                {/* Friends Attending */}
                <div className="mb-6">
                  <FriendsAttending 
                    friendsAttending={event.friendsAttending} 
                    eventTitle={event.title}
                  />
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-2xl font-display font-bold mb-4">About This Event</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold mb-4">Event Highlights</h3>
                  <ul className="space-y-3">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* DJ Info Card */}
            {dj && (
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-display font-bold mb-4">About the DJ</h3>
                  <Link to={`/dj/${dj.id}`}>
                    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img src={dj.image} alt={dj.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{dj.name}</h4>
                        <p className="text-sm text-muted-foreground">{dj.specialty}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {dj.followers}
                          </span>
                          <span className="flex items-center gap-1">
                            <Badge variant="secondary" className="text-xs">
                              ⭐ {dj.rating}
                            </Badge>
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Ticket Booking */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4">Get Your Tickets</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">General Admission</span>
                        <Badge variant="secondary">Available</Badge>
                      </div>
                      <p className="text-3xl font-bold text-primary">{event.price}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm flex items-center gap-2">
                          <Crown className="w-4 h-4 text-primary" />
                          VIP Experience
                        </span>
                        <Badge className="bg-primary/20 text-primary border-primary/30">Limited</Badge>
                      </div>
                      <p className="text-3xl font-bold text-primary">{event.vipPrice}</p>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="premium" 
                  size="lg" 
                  className="w-full"
                  onClick={handleGetTickets}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Buy Tickets
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Powered by our ticketing partners
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Share this event</h4>
                  <SocialShare 
                    title={`${event.title} - SOUNDWOLVES`}
                    description={event.description}
                    variant="buttons"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
