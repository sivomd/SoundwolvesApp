import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, TrendingUp, Crown, Share2, Heart, Ticket, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Sample events data (in real app, this would come from API/localStorage)
  const events = [
    {
      id: 1,
      title: 'Diwali Nights: The Grand Celebration',
      artist: 'DJ OM',
      artistId: 1,
      venue: 'Royal Banquet Hall',
      city: 'Toronto',
      date: 'Nov 15, 2024',
      time: '9:00 PM',
      image: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$75',
      vipPrice: '$150',
      tags: ['VIP Tables', 'After Party', 'Limited'],
      attendees: 234,
      trending: true,
      description: 'Join us for the grandest Diwali celebration in Toronto! Experience an unforgettable night of Bollywood beats, traditional performances, and modern EDM fusion by the legendary DJ OM. Limited VIP tables available with bottle service.',
      highlights: [
        'Live DJ Performance by DJ OM',
        'Traditional Diwali Performances',
        'VIP Tables with Bottle Service',
        'After Party Access',
        'Complimentary Welcome Drink',
        'Professional Photography'
      ],
      ticketLink: 'https://www.eventbrite.com'
    },
    {
      id: 2,
      title: 'Bollywood Bass Night',
      artist: 'DJ Priya & Friends',
      artistId: 2,
      venue: 'Cube Nightclub',
      city: 'Toronto',
      date: 'Nov 22, 2024',
      time: '10:00 PM',
      image: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$45',
      vipPrice: '$120',
      tags: ['Backstage Pass', 'VIP Bar'],
      attendees: 189,
      trending: false,
      description: 'Get ready for an electrifying night of Bollywood hits mixed with heavy bass drops. DJ Priya brings her signature style with special guest DJs throughout the night.',
      highlights: [
        'DJ Priya Live Performance',
        'Special Guest DJs',
        'VIP Bar Access',
        'Backstage Meet & Greet',
        'Exclusive Merchandise',
        'Open Dance Floor'
      ],
      ticketLink: 'https://www.ticketmaster.com'
    },
    {
      id: 3,
      title: 'New Year Eve Bash 2025',
      artist: 'DJ OM & Special Guests',
      artistId: 1,
      venue: 'Harbour Event Center',
      city: 'Toronto',
      date: 'Dec 31, 2024',
      time: '8:00 PM',
      image: 'https://images.unsplash.com/photo-1763630054569-0e012e52616d?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$150',
      vipPrice: '$350',
      tags: ['VIP Tables', 'Champagne', 'Exclusive'],
      attendees: 456,
      trending: true,
      description: 'Ring in 2025 with the most spectacular New Year celebration! Premium entertainment, champagne toast at midnight, and an unforgettable countdown experience.',
      highlights: [
        'DJ OM Headlining Performance',
        'Special Celebrity Guests',
        'Midnight Champagne Toast',
        'Premium VIP Tables',
        'Gourmet Food Stations',
        'Fireworks Display',
        'Professional Photo Booth'
      ],
      ticketLink: 'https://www.stubhub.com'
    }
  ];

  useEffect(() => {
    const foundEvent = events.find(e => e.id === parseInt(id));
    if (foundEvent) {
      setEvent(foundEvent);
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
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
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
          <Button
            variant="ghost"
            size="icon"
            className="glass-card hover:bg-background/50"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Link copied to clipboard!');
            }}
          >
            <Share2 className="w-5 h-5" />
          </Button>
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
              <CardContent className="p-8">
                <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                  {event.title}
                </h1>
                
                <div className="flex items-center gap-2 mb-6">
                  <Link to={`/dj/${event.artistId}`}>
                    <Button variant="link" className="p-0 h-auto text-lg text-primary hover:text-primary/80">
                      by {event.artist}
                    </Button>
                  </Link>
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
                      <p className="font-semibold">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Venue</p>
                      <p className="font-semibold">{event.venue}</p>
                      <p className="text-xs text-muted-foreground">{event.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Attending</p>
                      <p className="font-semibold">{event.attendees} people</p>
                    </div>
                  </div>
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Facebook</Button>
                    <Button variant="outline" size="sm" className="flex-1">Twitter</Button>
                    <Button variant="outline" size="sm" className="flex-1">WhatsApp</Button>
                  </div>
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