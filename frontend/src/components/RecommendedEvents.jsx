import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getRecommendedEvents, mockUser } from '@/data/mockData';
import { FriendsAttending } from './FriendsAttending';

export const RecommendedEvents = ({ limit = 4 }) => {
  const recommendedEvents = getRecommendedEvents(mockUser.preferences).slice(0, limit);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">Recommended For You</h2>
              <p className="text-sm text-muted-foreground">Based on your preferences</p>
            </div>
          </div>
          <Link to="/events">
            <Button variant="ghost">
              See More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedEvents.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <Card className="group overflow-hidden border-border/50 hover-lift cursor-pointer h-full">
                {/* Event Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                      {event.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-3 space-y-2">
                  <h3 className="font-display font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-primary">{event.price}</span>
                    <FriendsAttending friendsAttending={event.friendsAttending} compact />
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

export default RecommendedEvents;
