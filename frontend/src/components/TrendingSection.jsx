import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Flame, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getTrendingEvents } from '@/data/mockData';
import { EventCountdown } from './EventCountdown';

export const TrendingSection = ({ limit = 3 }) => {
  const trendingEvents = getTrendingEvents().slice(0, limit);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <Flame className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">Trending Now</h2>
              <p className="text-sm text-muted-foreground">Hottest events this week</p>
            </div>
          </div>
          <Link to="/events?filter=trending">
            <Button variant="ghost">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingEvents.map((event, index) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <Card className="group overflow-hidden border-border/50 hover-lift cursor-pointer relative">
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-destructive text-white font-bold text-lg px-3 py-1">
                    #{index + 1}
                  </Badge>
                </div>

                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Trending indicator */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm animate-pulse">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{event.artist}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} going</span>
                    </div>
                    <EventCountdown dateISO={event.dateISO} eventTitle={event.title} compact />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-xl font-bold text-primary">{event.price}</span>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
