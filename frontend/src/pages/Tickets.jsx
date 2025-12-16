import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, Calendar, MapPin, Users, Clock, CheckCircle2, Crown, Star, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Tickets = () => {
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState({});
  const [cart, setCart] = useState([]);

  const upcomingTickets = [
    {
      id: 1,
      eventName: 'Diwali Nights: The Grand Celebration',
      artist: 'DJ OM',
      venue: 'Royal Banquet Hall',
      date: 'Nov 15, 2024',
      time: '9:00 PM',
      ticketType: 'VIP Table',
      quantity: 4,
      price: 150,
      qrCode: 'DIWALI-VIP-001',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85'
    },
    {
      id: 2,
      eventName: 'Bollywood Bass Night',
      artist: 'DJ Priya & Friends',
      venue: 'Cube Nightclub',
      date: 'Nov 22, 2024',
      time: '10:00 PM',
      ticketType: 'General Admission',
      quantity: 2,
      price: 45,
      qrCode: 'BASS-GA-023',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85'
    }
  ];

  const availableEvents = [
    {
      id: 3,
      eventName: 'New Year Eve Bash 2025',
      artist: 'DJ OM & Special Guests',
      venue: 'Harbour Event Center',
      date: 'Dec 31, 2024',
      time: '8:00 PM',
      image: 'https://images.unsplash.com/photo-1763630054569-0e012e52616d?crop=entropy&cs=srgb&fm=jpg&q=85',
      ticketTiers: [
        {
          name: 'General Admission',
          price: 150,
          available: 45,
          perks: ['Entry to main floor', 'Welcome drink', 'Party favors']
        },
        {
          name: 'VIP Experience',
          price: 250,
          available: 12,
          perks: ['VIP seating area', 'Premium open bar', 'Complimentary champagne toast', 'VIP lounge access']
        },
        {
          name: 'Platinum Table',
          price: 350,
          available: 3,
          perks: ['Reserved table for 6', 'Bottle service', 'Dedicated server', 'Backstage meet & greet', 'Priority entry']
        }
      ]
    }
  ];

  const handleQuantityChange = (eventId, tierId, value) => {
    const newQuantity = Math.max(0, (selectedTickets[`${eventId}-${tierId}`] || 0) + value);
    setSelectedTickets(prev => ({
      ...prev,
      [`${eventId}-${tierId}`]: newQuantity
    }));
  };

  const handleAddToCart = (event, tier, quantity) => {
    if (quantity === 0) {
      toast.error('Please select at least one ticket');
      return;
    }
    
    const cartItem = {
      eventId: event.id,
      eventName: event.eventName,
      tierName: tier.name,
      quantity: quantity,
      price: tier.price,
      total: tier.price * quantity
    };
    
    setCart(prev => [...prev, cartItem]);
    toast.success(`Added ${quantity} x ${tier.name} to cart!`);
  };

  const handleViewQR = (ticket) => {
    toast.success('QR Code viewer would open here');
    // In real app, would show QR code modal
  };

  const handleTransfer = (ticket) => {
    toast.success('Transfer ticket feature coming soon!');
    // In real app, would show transfer modal
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
            My <span className="text-gradient-gold">Tickets</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your event tickets and bookings
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Browse Events
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Tickets */}
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingTickets.length > 0 ? (
              upcomingTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden border-border/50">
                  <div className="flex flex-col sm:flex-row">
                    {/* Event Image */}
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                      <img
                        src={ticket.image}
                        alt={ticket.eventName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-success/90 text-white backdrop-blur-sm">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Confirmed
                        </Badge>
                      </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="flex-1 p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-display font-bold mb-1">
                          {ticket.eventName}
                        </h3>
                        <p className="text-muted-foreground">{ticket.artist}</p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{ticket.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{ticket.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{ticket.time}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            <Crown className="w-3 h-3 mr-1" />
                            {ticket.ticketType}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            {ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'} • ${ticket.price} each
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            QR Code: {ticket.qrCode}
                          </p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1 sm:flex-none"
                            onClick={() => handleViewQR(ticket)}
                          >
                            View QR
                          </Button>
                          <Button 
                            variant="premium" 
                            className="flex-1 sm:flex-none"
                            onClick={() => handleTransfer(ticket)}
                          >
                            Transfer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold mb-2">No Upcoming Tickets</h3>
                <p className="text-muted-foreground mb-6">
                  Browse events and book your next experience
                </p>
                <Button variant="premium" onClick={() => navigate('/events')}>Explore Events</Button>
              </Card>
            )}
          </TabsContent>

          {/* Browse Events */}
          <TabsContent value="browse" className="space-y-6">
            {availableEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden border-border/50">
                {/* Event Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl font-display font-bold mb-1">
                      {event.eventName}
                    </h3>
                    <p className="text-sm text-muted-foreground">{event.artist}</p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Ticket Tiers */}
                  <div className="space-y-4">
                    {event.ticketTiers.map((tier, index) => {
                      const ticketKey = `${event.id}-${index}`;
                      const quantity = selectedTickets[ticketKey] || 0;

                      return (
                        <Card key={index} className="border-border/50">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                  {tier.name}
                                  {index === 2 && <Crown className="w-4 h-4 text-primary" />}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {tier.available} tickets available
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">${tier.price}</p>
                                <p className="text-xs text-muted-foreground">per person</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <ul className="space-y-2 text-sm">
                              {tier.perks.map((perk, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                                  <span>{perk}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex items-center justify-between pt-3">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(event.id, index, -1)}
                                  disabled={quantity === 0}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center font-semibold">{quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(event.id, index, 1)}
                                  disabled={quantity >= tier.available}
                                >
                                  +
                                </Button>
                              </div>
                              <Button
                                variant={index === 2 ? 'premium' : 'default'}
                                disabled={quantity === 0}
                                onClick={() => handleAddToCart(event, tier, quantity)}
                              >
                                Add to Cart ${(tier.price * quantity).toFixed(2)}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Referral Card */}
        <Card className="mt-8 glass-card border-accent/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Gift className="w-8 h-8 text-accent flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-display font-bold mb-1">
                  Refer Friends, Earn Rewards
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get $20 credit for every friend who makes their first purchase
                </p>
                <Button variant="outline" size="sm">
                  Share Referral Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tickets;