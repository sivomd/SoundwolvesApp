import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Calendar, Users, Star, ArrowRight, Crown, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const Home = () => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['New York', 'New Jersey', 'Philadelphia', 'Newark', 'Jersey City', 'Brooklyn'];

  const featuredEvents = [
    {
      id: 1,
      title: 'Valentine\'s Bollywood Bash',
      artist: 'DJ OM',
      venue: 'Brooklyn Bowl',
      city: 'New York',
      date: 'Feb 14, 2025',
      time: '9:00 PM',
      image: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$85',
      vipPrice: '$175',
      tags: ['VIP Tables', 'Couples Special', 'Limited'],
      attendees: 342,
      trending: true
    },
    {
      id: 2,
      title: 'Holi Color Festival 2025',
      artist: 'DJ KYA',
      venue: 'The Wellmont Theater',
      city: 'New Jersey',
      date: 'Mar 14, 2025',
      time: '6:00 PM',
      image: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$65',
      vipPrice: '$140',
      tags: ['Festival', 'All Ages', 'Food'],
      attendees: 589,
      trending: true
    },
    {
      id: 3,
      title: 'Summer Punjabi Nights',
      artist: 'DJ PANDA',
      venue: 'Sony Hall',
      city: 'New York',
      date: 'Jun 21, 2025',
      time: '10:00 PM',
      image: 'https://images.unsplash.com/photo-1763630054569-0e012e52616d?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$55',
      vipPrice: '$130',
      tags: ['Backstage Pass', 'VIP Bar'],
      attendees: 423,
      trending: true
    },
    {
      id: 4,
      title: 'Independence Day Desi Party',
      artist: 'DJ OM & DJ KYA',
      venue: 'The Fillmore Philadelphia',
      city: 'Philadelphia',
      date: 'Jul 4, 2025',
      time: '8:00 PM',
      image: 'https://images.unsplash.com/photo-1643981693404-d76e58594bbf?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$75',
      vipPrice: '$160',
      tags: ['Live Performance', 'Food Festival'],
      attendees: 512,
      trending: false
    },
    {
      id: 5,
      title: 'Navratri Garba Nights',
      artist: 'DJ PANDA',
      venue: 'Prudential Center',
      city: 'Newark',
      date: 'Oct 3, 2025',
      time: '7:00 PM',
      image: 'https://images.unsplash.com/photo-7715528/pexels-photo-7715528.jpeg',
      price: '$50',
      vipPrice: '$115',
      tags: ['Traditional', 'All Ages'],
      attendees: 782,
      trending: true
    },
    {
      id: 6,
      title: 'Diwali Spectacular 2025',
      artist: 'DJ OM',
      venue: 'Brooklyn Bowl',
      city: 'New York',
      date: 'Nov 1, 2025',
      time: '9:00 PM',
      image: 'https://images.unsplash.com/photo-1454321717968-d243ade71663?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$90',
      vipPrice: '$185',
      tags: ['VIP Tables', 'After Party', 'Exclusive'],
      attendees: 634,
      trending: true
    }
  ];

  const topDJs = [
    {
      id: 1,
      name: 'DJ OM',
      specialty: 'Bollywood • EDM • Hip Hop',
      image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
      followers: '25.3K',
      upcomingShows: 15,
      verified: true
    },
    {
      id: 2,
      name: 'DJ KYA',
      specialty: 'Punjabi • Bhangra • Trap',
      image: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85',
      followers: '18.7K',
      upcomingShows: 12,
      verified: true
    },
    {
      id: 3,
      name: 'DJ PANDA',
      specialty: 'EDM • Bollywood • House',
      image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
      followers: '22.1K',
      upcomingShows: 14,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video/Image with Overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1764510383709-14be6ec28548"
          >
            <source src="https://customer-assets.emergentagent.com/job_dj-wolves-app/artifacts/bfu02llz_SoundWolves%20%281%29.mp4" type="video/mp4" />
            {/* Fallback to image if video doesn't load */}
            <img
              src="https://images.unsplash.com/photo-1764510383709-14be6ec28548"
              alt="DJ Performance"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 mr-1" />
            The Cultural Nightlife Operating System
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Experience <span className="text-gradient-gold">Nightlife</span>
            <br />
            Like Never Before
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover exclusive events, book legendary DJs, and unlock VIP experiences across North America's hottest venues
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto glass-card p-2 rounded-xl mb-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Search events, DJs, venues..."
                className="flex-1 bg-background/50 border-border/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/events?search=${searchQuery}`;
                  }
                }}
              />
              <Link to={`/events?search=${searchQuery}`}>
                <Button variant="premium" size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">50K+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">500+ Events Monthly</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">200+ Top DJs</span>
            </div>
          </div>
        </div>
      </section>

      {/* City Selector */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCity(city)}
                className="flex-shrink-0"
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                🔥 Trending in <span className="text-gradient-gold">{selectedCity}</span>
              </h2>
              <p className="text-muted-foreground">Don't miss these exclusive experiences</p>
            </div>
            <Link to="/events">
              <Button variant="ghost" className="hidden sm:flex">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <Card className="group overflow-hidden border-border/50 hover-lift cursor-pointer">
                {/* Event Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {event.trending && (
                      <Badge className="bg-destructive/90 text-white backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {event.tags.slice(0, 1).map((tag) => (
                      <Badge key={tag} className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                        <Crown className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Attendees */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 glass-card px-3 py-1.5 rounded-full">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{event.attendees}</span>
                  </div>
                </div>

                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{event.artist}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{event.venue}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{event.date} • {event.time}</span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="text-2xl font-bold text-primary">{event.price}</p>
                    </div>
                    <Button 
                      variant="premium" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/event/${event.id}`;
                      }}
                    >
                      Get Tickets
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top DJs Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                Featured <span className="text-gradient-wolf">DJs</span>
              </h2>
              <p className="text-muted-foreground">Book the hottest talent in the game</p>
            </div>
            <Link to="/djs">
              <Button variant="ghost" className="hidden sm:flex">
                View All DJs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {topDJs.map((dj) => (
              <Link key={dj.id} to={`/dj/${dj.id}`}>
                <Card className="group overflow-hidden border-border/50 hover-lift cursor-pointer">
                <div className="flex gap-5 p-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary transition-all">
                      <img
                        src={dj.image}
                        alt={dj.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {dj.verified && (
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-glow">
                        <Star className="w-4 h-4 text-primary-foreground fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                      {dj.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{dj.specialty}</p>
                    
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{dj.followers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{dj.upcomingShows} shows</span>
                      </div>
                    </div>

                    <Button 
                      variant="vip" 
                      size="sm" 
                      className="w-full sm:w-auto" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/dj/${dj.id}`;
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-vip opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_dj-wolves-app/artifacts/tjj77kbh_SoundWolves.png" 
              alt="SoundWolves Logo"
              className="h-20 mx-auto mb-6 object-contain animate-glow"
            />
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Join the <span className="text-gradient-gold">Wolves Pack</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unlock exclusive VIP experiences, early access to tickets, backstage passes, and connect with the hottest nightlife community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership">
                <Button variant="premium" size="lg">
                  <Crown className="w-5 h-5 mr-2" />
                  Get Wolves Pass
                </Button>
              </Link>
              <Link to="/membership">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;