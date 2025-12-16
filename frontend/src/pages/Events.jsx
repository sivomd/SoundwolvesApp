import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Filter, Search, TrendingUp, Crown, Clock } from 'lucide-react';
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
import { events, categories, cities } from '@/data/mockData';
import { EventCountdown } from '@/components/EventCountdown';
import { FriendsAttending } from '@/components/FriendsAttending';

export const Events = () => {
  const [searchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get('filter') || 'all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter and search logic
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedFilter === 'all' || 
      (selectedFilter === 'trending' && event.trending) ||
      event.category === selectedFilter;

    // City filter
    const matchesCity = selectedCity === 'all' || event.city === selectedCity;

    // Price filter
    let matchesPrice = true;
    if (priceFilter === 'under50') matchesPrice = event.priceNum < 50;
    else if (priceFilter === '50to100') matchesPrice = event.priceNum >= 50 && event.priceNum <= 100;
    else if (priceFilter === 'over100') matchesPrice = event.priceNum > 100;

    return matchesSearch && matchesCategory && matchesCity && matchesPrice;
  });

  // Sort by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.dateISO) - new Date(b.dateISO)
  );

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-44">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under50">Under $50</SelectItem>
                <SelectItem value="50to100">$50 - $100</SelectItem>
                <SelectItem value="over100">Over $100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedFilter === 'trending' ? 'default' : 'outline'} 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedFilter(selectedFilter === 'trending' ? 'all' : 'trending')}
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setPriceFilter(priceFilter === 'under50' ? 'all' : 'under50')}
            >
              Under $50
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedFilter(selectedFilter === 'special' ? 'all' : 'special')}
            >
              Special Events
            </Badge>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Events Grid */}
        {sortedEvents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No events found</p>
            <p className="text-sm text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedFilter('all');
              setSelectedCity('all');
              setPriceFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <Card className="group overflow-hidden border-border/50 hover-lift cursor-pointer h-full">
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

                    {/* Capacity indicator */}
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant="outline" 
                        className={`backdrop-blur-sm ${
                          (event.attendees / event.capacity) > 0.8 
                            ? 'bg-destructive/20 text-destructive border-destructive/30' 
                            : 'bg-background/50'
                        }`}
                      >
                        {Math.round((event.attendees / event.capacity) * 100)}% Full
                      </Badge>
                    </div>

                    {/* Friends Attending */}
                    <div className="absolute bottom-3 left-3">
                      <FriendsAttending friendsAttending={event.friendsAttending} compact />
                    </div>

                    {/* Attendees */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 glass-card px-3 py-1.5 rounded-full">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{event.attendees}</span>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{event.artist}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{event.venue} • {event.city}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    {/* Countdown */}
                    <EventCountdown dateISO={event.dateISO} eventTitle={event.title} compact />

                    <div className="pt-3 flex items-center justify-between border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="text-2xl font-bold text-primary">{event.price}</p>
                      </div>
                      <Button 
                        variant="premium" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
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
        )}
      </div>
    </div>
  );
};

export default Events;
