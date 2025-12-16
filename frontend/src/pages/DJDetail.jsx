import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Users, Calendar, MapPin, Music, Heart, Instagram, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { getDJById, getEventsByDJ } from '@/data/mockData';
import { SocialShare } from '@/components/SocialShare';
import { DJRatingReviews } from '@/components/DJRatingReviews';
import { DJAvailabilityCalendar } from '@/components/DJAvailabilityCalendar';
import { MusicSamples } from '@/components/MusicSamples';

export const DJDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dj, setDj] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [djEvents, setDjEvents] = useState([]);

  useEffect(() => {
    // Try to find in centralized data first
    let foundDJ = getDJById(id);
    
    // If not found, check localStorage for user-created DJs
    if (!foundDJ) {
      const storedDJs = JSON.parse(localStorage.getItem('soundwolves_djs') || '[]');
      foundDJ = storedDJs.find(d => d.id === parseInt(id));
    }

    if (foundDJ) {
      setDj(foundDJ);
      // Get DJ's events
      const events = getEventsByDJ(id);
      setDjEvents(events);
      
      // Check if following
      const followedDJs = JSON.parse(localStorage.getItem('soundwolves_followed_djs') || '[]');
      setIsFollowing(followedDJs.includes(parseInt(id)));
    } else {
      toast.error('DJ profile not found');
      navigate('/djs');
    }
  }, [id, navigate]);

  const toggleFollow = () => {
    const followedDJs = JSON.parse(localStorage.getItem('soundwolves_followed_djs') || '[]');
    const djId = parseInt(id);
    
    let newFollowed;
    if (isFollowing) {
      newFollowed = followedDJs.filter(fid => fid !== djId);
      toast.info(`Unfollowed ${dj.name}`);
    } else {
      newFollowed = [...followedDJs, djId];
      toast.success(`Following ${dj.name}!`);
    }
    
    localStorage.setItem('soundwolves_followed_djs', JSON.stringify(newFollowed));
    setIsFollowing(!isFollowing);
  };

  const handleBookingRequest = (date) => {
    toast.success('Booking request submitted!', {
      description: `Your request for ${dj.name} on ${date.toLocaleDateString()} has been sent.`
    });
  };

  if (!dj) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-8 flex items-center justify-center">
        <p className="text-muted-foreground">Loading DJ profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={dj.coverImage || 'https://images.unsplash.com/photo-1764510383709-14be6ec28548'}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <SocialShare 
            title={`${dj.name} - SOUNDWOLVES`}
            description={dj.bio}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative flex-shrink-0">
                    <Avatar className="w-32 h-32 ring-4 ring-background">
                      <AvatarImage src={dj.image} />
                      <AvatarFallback className="text-4xl font-display">
                        {dj.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {dj.verified && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow">
                        <Star className="w-6 h-6 text-primary-foreground fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                          {dj.name}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-3">{dj.tagline}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {dj.genres?.map((genre, i) => (
                            <Badge key={i} variant="secondary">
                              <Music className="w-3 h-3 mr-1" />
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{dj.followers} followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{dj.upcomingShows} upcoming shows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span>{dj.rating} ({dj.totalBookings} bookings)</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant={isFollowing ? 'outline' : 'premium'}
                        onClick={toggleFollow}
                        className="flex-1 sm:flex-none"
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current text-destructive' : ''}`} />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      {dj.socialMedia?.instagram && (
                        <a 
                          href={dj.socialMedia.instagramUrl || `https://instagram.com/${dj.socialMedia.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline">
                            <Instagram className="w-4 h-4 mr-2" />
                            {dj.socialMedia.instagram}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for different sections */}
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-display font-bold mb-4">About</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{dj.bio}</p>
                    
                    <Separator className="my-6" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          Available Locations
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {dj.cities?.map((city, i) => (
                            <Badge key={i} variant="outline">{city}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Performance Stats</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Bookings</span>
                            <span className="font-medium">{dj.totalBookings}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Reviews</span>
                            <span className="font-medium">{dj.totalReviews}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Average Rating</span>
                            <span className="font-medium flex items-center gap-1">
                              <Star className="w-4 h-4 text-primary fill-current" />
                              {dj.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Music Tab */}
              <TabsContent value="music" className="space-y-6">
                <MusicSamples samples={dj.musicSamples} />
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <DJRatingReviews dj={dj} />
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-6">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-display font-bold mb-4">Upcoming Events</h2>
                    {djEvents.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No upcoming events scheduled
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {djEvents.map((event) => (
                          <Link key={event.id} to={`/event/${event.id}`}>
                            <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold truncate">{event.title}</p>
                                  <p className="text-sm text-muted-foreground">{event.venue} • {event.city}</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant="secondary">{event.date}</Badge>
                                  <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Booking Card */}
            <Card className="border-border/50 sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold mb-4">Book {dj.name}</h3>
                  
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Booking Range</p>
                    <p className="text-2xl font-bold text-primary">{dj.priceRange}</p>
                  </div>

                  <Button variant="premium" size="lg" className="w-full" onClick={() => {
                    toast.success('Opening booking calendar...');
                    document.getElementById('availability-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <Crown className="w-5 h-5 mr-2" />
                    Request Booking
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Response time: within 24 hours
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">What's Included</h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Professional DJ equipment',
                      'Custom playlist creation',
                      'Sound & lighting setup',
                      'MC/hosting services'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Availability Calendar */}
            <div id="availability-section">
              <DJAvailabilityCalendar dj={dj} onRequestBooking={handleBookingRequest} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DJDetail;
