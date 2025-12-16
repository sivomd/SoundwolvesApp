import React, { useState } from 'react';
import { Star, Users, Calendar, MapPin, Music, Heart, Share2, Instagram, TrendingUp, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DJs = () => {
  const [followedDJs, setFollowedDJs] = useState([]);
  const [allDJs, setAllDJs] = useState([]);

  React.useEffect(() => {
    // Load DJs from localStorage
    const storedDJs = JSON.parse(localStorage.getItem('soundwolves_djs') || '[]');
    // Filter to only show DJs with complete profiles
    const completeDJs = storedDJs.filter(dj => dj.bio && dj.specialty);
    setAllDJs([...djs, ...completeDJs]);
  }, []);

  const toggleFollow = (djId) => {
    setFollowedDJs(prev => 
      prev.includes(djId) 
        ? prev.filter(id => id !== djId)
        : [...prev, djId]
    );
  };

  const djs = [
    {
      id: 1,
      name: 'DJ OM',
      tagline: 'The Voice of Bollywood Nights',
      specialty: 'Bollywood • EDM • Hip Hop • Punjabi',
      image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
      coverImage: 'https://images.unsplash.com/photo-1764510383709-14be6ec28548',
      followers: '12.5K',
      upcomingShows: 8,
      verified: true,
      bio: 'International DJ specializing in Bollywood and EDM fusion. Played at 100+ venues across North America.',
      cities: ['Toronto', 'Vancouver', 'Montreal'],
      socialMedia: {
        instagram: '@the.dj.om'
      },
      priceRange: '$2,000 - $5,000',
      rating: 4.9,
      totalBookings: 156
    },
    {
      id: 2,
      name: 'DJ Priya',
      tagline: 'Queen of Punjabi Beats',
      specialty: 'Punjabi • Trap • Remix • Bhangra',
      image: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85',
      coverImage: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475',
      followers: '8.2K',
      upcomingShows: 5,
      verified: true,
      bio: 'Award-winning DJ bringing authentic Punjabi vibes with modern trap and remix elements.',
      cities: ['Calgary', 'Vancouver', 'Edmonton'],
      socialMedia: {
        instagram: '@djpriya.official'
      },
      priceRange: '$1,500 - $4,000',
      rating: 4.8,
      totalBookings: 123
    },
    {
      id: 3,
      name: 'DJ Raj',
      tagline: 'Mixing Tradition with Innovation',
      specialty: 'Classical Fusion • EDM • House',
      image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
      coverImage: 'https://images.unsplash.com/photo-1763630054569-0e012e52616d',
      followers: '6.8K',
      upcomingShows: 4,
      verified: true,
      bio: 'Pioneering DJ blending classical Indian music with modern electronic beats.',
      cities: ['New York', 'Toronto', 'Chicago'],
      socialMedia: {
        instagram: '@djraj.beats'
      },
      priceRange: '$1,800 - $4,500',
      rating: 4.7,
      totalBookings: 98
    },
    {
      id: 4,
      name: 'DJ Sahil',
      tagline: 'The Party Architect',
      specialty: 'Commercial • Top 40 • Mashups',
      image: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85',
      coverImage: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd',
      followers: '5.4K',
      upcomingShows: 6,
      verified: false,
      bio: 'High-energy DJ specializing in corporate events and private parties.',
      cities: ['Los Angeles', 'San Francisco'],
      socialMedia: {
        instagram: '@djsahil.la'
      },
      priceRange: '$1,200 - $3,000',
      rating: 4.6,
      totalBookings: 87
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
            Featured <span className="text-gradient-wolf">DJs</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Book legendary talent for your next event
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All DJs</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* DJs Grid */}
        <div className="space-y-6">
          {djs.map((dj) => (
            <Card key={dj.id} className="group overflow-hidden border-border/50 hover-lift">
              {/* Cover Image */}
              <div className="relative h-32 sm:h-40 overflow-hidden">
                <img
                  src={dj.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
              </div>

              <CardContent className="relative -mt-16 sm:-mt-20 px-4 sm:px-6 pb-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-background">
                      <img
                        src={dj.image}
                        alt={dj.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {dj.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow">
                        <Star className="w-5 h-5 text-primary-foreground fill-current" />
                      </div>
                    )}
                  </div>

                  {/* DJ Info */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-display font-bold group-hover:text-primary transition-colors">
                            {dj.name}
                          </h2>
                          <p className="text-muted-foreground">{dj.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-destructive"
                            onClick={() => toggleFollow(dj.id)}
                          >
                            <Heart
                              className={`w-5 h-5 ${followedDJs.includes(dj.id) ? 'fill-destructive text-destructive' : ''}`}
                            />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{dj.followers} followers</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{dj.upcomingShows} upcoming shows</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-primary fill-current" />
                          <span>{dj.rating} ({dj.totalBookings} bookings)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {dj.specialty.split(' • ').map((genre) => (
                          <Badge key={genre} variant="secondary">
                            <Music className="w-3 h-3 mr-1" />
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{dj.bio}</p>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{dj.cities.join(', ')}</span>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1.5">
                        <Instagram className="w-3 h-3" />
                        {dj.socialMedia.instagram}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Booking Range</p>
                        <p className="text-lg font-bold text-primary">{dj.priceRange}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none">
                          View Profile
                        </Button>
                        <Button variant="premium" className="flex-1 sm:flex-none">
                          <Crown className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Become a DJ CTA */}
        <Card className="mt-12 glass-card border-primary/30">
          <CardContent className="p-8 text-center">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold mb-2">
              Are you a DJ or Event Promoter?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join SOUNDWOLVES and connect with thousands of event organizers looking for talented DJs
            </p>
            <Button variant="premium" size="lg">
              Join as DJ/Promoter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DJs;