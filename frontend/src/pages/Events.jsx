import React, { useState } from 'react';
import { Calendar, MapPin, Users, Star, Filter, Search, TrendingUp, Crown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const events = [
    {
      id: 1,
      title: 'Diwali Nights: The Grand Celebration',
      artist: 'DJ OM',
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
      category: 'bollywood'
    },
    {
      id: 2,
      title: 'Bollywood Bass Night',
      artist: 'DJ Priya & Friends',
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
      category: 'bollywood'
    },
    {
      id: 3,
      title: 'New Year Eve Bash 2025',
      artist: 'DJ OM & Special Guests',
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
      category: 'special'
    },
    {
      id: 4,
      title: 'Punjabi Nights Live',
      artist: 'DJ Raj',
      venue: 'The Grand Hall',
      city: 'Vancouver',
      date: 'Nov 18, 2024',
      time: '10:00 PM',
      image: 'https://images.unsplash.com/photo-1643981693404-d76e58594bbf?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$55',
      vipPrice: '$130',
      tags: ['Live Performance', 'VIP Lounge'],
      attendees: 312,
      trending: false,
      category: 'punjabi'
    },
    {
      id: 5,
      title: 'EDM India Fusion',
      artist: 'DJ OM',
      venue: 'Metro Nightclub',
      city: 'Montreal',
      date: 'Nov 25, 2024',
      time: '11:00 PM',
      image: 'https://images.unsplash.com/photo-7715528/pexels-photo-7715528.jpeg',
      price: '$40',
      vipPrice: '$100',
      tags: ['EDM', 'Open Bar'],
      attendees: 278,
      trending: false,
      category: 'edm'
    },
    {
      id: 6,
      title: 'Bhangra Blast 2024',
      artist: 'DJ Priya',
      venue: 'Festival Grounds',
      city: 'Calgary',
      date: 'Dec 2, 2024',
      time: '7:00 PM',
      image: 'https://images.unsplash.com/photo-1454321717968-d243ade71663?crop=entropy&cs=srgb&fm=jpg&q=85',
      price: '$65',
      vipPrice: '$140',
      tags: ['Festival', 'Food Trucks', 'Family'],
      attendees: 523,
      trending: true,
      category: 'punjabi'
    }
  ];

  // Filter and search logic
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'trending' && event.trending) ||
      event.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
            Discover <span className="text-gradient-gold">Events</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Find the hottest nightlife experiences near you
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events, artists, venues..."
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="bollywood">Bollywood</SelectItem>
                <SelectItem value="punjabi">Punjabi</SelectItem>
                <SelectItem value="edm">EDM</SelectItem>
                <SelectItem value="special">Special Events</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              This Weekend
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              VIP Available
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Under $50
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Near Me
            </Badge>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="group overflow-hidden border-border/50 hover-lift cursor-pointer">
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
                  <span>{event.venue} • {event.city}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="text-2xl font-bold text-primary">{event.price}</p>
                  </div>
                  <Button variant="premium" size="sm">
                    Get Tickets
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;