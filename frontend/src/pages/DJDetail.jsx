import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Users, Calendar, MapPin, Music, Heart, Share2, Instagram, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const DJDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dj, setDj] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const sampleDJs = [
    {
      id: 1,
      name: 'DJ OM',
      djName: 'DJ OM',
      tagline: 'The Voice of Bollywood Nights',
      specialty: 'Bollywood • EDM • Hip Hop • Punjabi',
      image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
      coverImage: 'https://images.unsplash.com/photo-1764510383709-14be6ec28548',
      followers: 12500,
      upcomingShows: 8,
      verified: true,
      bio: 'International DJ specializing in Bollywood and EDM fusion. With over 10 years of experience, I have played at 100+ venues across North America, bringing the energy of Indian beats to dance floors worldwide. My signature style blends traditional Bollywood classics with modern EDM drops, creating unforgettable nights.',
      cities: ['Toronto', 'Vancouver', 'Montreal'],
      socialMedia: {
        instagram: '@the.dj.om'
      },
      priceRange: '$2,000 - $5,000',
      rating: 4.9,
      totalBookings: 156,
      gallery: [
        'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85',
        'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85',
        'https://images.unsplash.com/photo-1763630054569-0e012e52616d?crop=entropy&cs=srgb&fm=jpg&q=85'
      ],
      upcomingEvents: [
        { id: 1, name: 'Diwali Nights', date: 'Nov 15', city: 'Toronto' },
        { id: 3, name: 'New Year Eve Bash', date: 'Dec 31', city: 'Toronto' }
      ]
    },
    {
      id: 2,
      name: 'DJ Priya',
      djName: 'DJ Priya',
      tagline: 'Queen of Punjabi Beats',
      specialty: 'Punjabi • Trap • Remix • Bhangra',
      image: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85',
      coverImage: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475',
      followers: 8200,
      upcomingShows: 5,
      verified: true,
      bio: 'Award-winning DJ bringing authentic Punjabi vibes with modern trap and remix elements. Known for high-energy performances that keep the crowd moving all night long.',
      cities: ['Calgary', 'Vancouver', 'Edmonton'],
      socialMedia: {
        instagram: '@djpriya.official'
      },
      priceRange: '$1,500 - $4,000',
      rating: 4.8,
      totalBookings: 123,
      gallery: [
        'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85'
      ],
      upcomingEvents: [
        { id: 2, name: 'Bollywood Bass Night', date: 'Nov 22', city: 'Toronto' }
      ]
    }
  ];

  useEffect(() => {
    // Try to find in sample DJs first
    let foundDJ = sampleDJs.find(d => d.id === parseInt(id));
    
    // If not found, check localStorage for user-created DJs
    if (!foundDJ) {
      const storedDJs = JSON.parse(localStorage.getItem('soundwolves_djs') || '[]');
      foundDJ = storedDJs.find(d => d.id === parseInt(id));
    }

    if (foundDJ) {
      setDj(foundDJ);
    } else {
      toast.error('DJ profile not found');
      navigate('/djs');
    }
  }, [id, navigate]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Unfollowed' : 'Following!');
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
                        {dj.djName?.charAt(0)}
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
                          {dj.djName || dj.name}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-3">{dj.tagline}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(dj.specialty?.split(' • ') || []).map((genre, i) => (
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
                        <span>{dj.followers?.toLocaleString() || 0} followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{dj.upcomingShows || 0} upcoming shows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary fill-current" />
                        <span>{dj.rating || 0} ({dj.totalBookings || 0} bookings)</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant={isFollowing ? 'outline' : 'premium'}
                        onClick={toggleFollow}
                        className="flex-1 sm:flex-none"
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
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
                      {(dj.cities || []).map((city, i) => (
                        <Badge key={i} variant="outline">{city}</Badge>
                      ))}
                    </div>
                  </div>

                  {dj.socialMedia?.instagram && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-primary" />
                        Social Media
                      </h3>
                      <Badge variant="outline" className="flex items-center gap-2 w-fit">
                        {dj.socialMedia.instagram}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            {dj.upcomingEvents && dj.upcomingEvents.length > 0 && (
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-display font-bold mb-4">Upcoming Events</h2>
                  <div className="space-y-3">
                    {dj.upcomingEvents.map((event) => (
                      <Link key={event.id} to={`/event/${event.id}`}>
                        <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{event.name}</p>
                              <p className="text-sm text-muted-foreground">{event.city}</p>
                            </div>
                            <Badge variant="secondary">{event.date}</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold mb-4">Book {dj.djName}</h3>
                  
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Booking Range</p>
                    <p className="text-2xl font-bold text-primary">{dj.priceRange}</p>
                  </div>

                  <Button variant="premium" size="lg" className="w-full">
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
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span>Professional DJ equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span>Custom playlist creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span>Sound & lighting setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span>MC/hosting services</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DJDetail;