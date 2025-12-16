import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, Heart, Calendar, Ticket, Users, Crown, Gift, TrendingUp, MapPin, Edit2, Star, Clock, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { mockUser, events, djs, getEventById, getDJById } from '@/data/mockData';

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [followingDJs, setFollowingDJs] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('soundwolves_logged_in');
    if (!isLoggedIn) {
      toast.error('Please login to view your profile');
      navigate('/login');
      return;
    }

    // Load user data
    const storedUser = JSON.parse(localStorage.getItem('soundwolves_user') || 'null');
    setUser(storedUser || mockUser);

    // Load favorite events from localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('soundwolves_favorite_events') || '[]');
    const favEvents = favoriteIds.map(id => getEventById(id)).filter(Boolean);
    setFavoriteEvents(favEvents);

    // Load following DJs
    const followedIds = JSON.parse(localStorage.getItem('soundwolves_followed_djs') || '[]');
    const followedDJs = followedIds.map(id => getDJById(id)).filter(Boolean);
    setFollowingDJs(followedDJs);

    // Mock booking history
    setBookingHistory(mockUser.bookingHistory.map(booking => ({
      ...booking,
      event: getEventById(booking.eventId)
    })).filter(b => b.event));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('soundwolves_logged_in');
    localStorage.removeItem('soundwolves_user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const removeFavorite = (eventId) => {
    const favorites = JSON.parse(localStorage.getItem('soundwolves_favorite_events') || '[]');
    const newFavorites = favorites.filter(id => id !== eventId);
    localStorage.setItem('soundwolves_favorite_events', JSON.stringify(newFavorites));
    setFavoriteEvents(prev => prev.filter(e => e.id !== eventId));
    toast.info('Removed from favorites');
  };

  const unfollowDJ = (djId) => {
    const followed = JSON.parse(localStorage.getItem('soundwolves_followed_djs') || '[]');
    const newFollowed = followed.filter(id => id !== djId);
    localStorage.setItem('soundwolves_followed_djs', JSON.stringify(newFollowed));
    setFollowingDJs(prev => prev.filter(d => d.id !== djId));
    toast.info('Unfollowed DJ');
  };

  const achievements = [
    { icon: Calendar, title: 'Party Animal', description: 'Attended 20+ events', unlocked: true },
    { icon: Users, title: 'Social Butterfly', description: 'Referred 5+ friends', unlocked: false, progress: 60 },
    { icon: Crown, title: 'VIP Status', description: 'Gold member for 6 months', unlocked: true },
    { icon: Heart, title: 'Super Fan', description: 'Follow 10+ DJs', unlocked: false, progress: 80 }
  ];

  if (!user) {
    return (
      <div className="min-h-screen pt-20 pb-24 md:pb-8 flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden border-border/50">
          <div className="relative h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20">
            <div className="absolute inset-0 gradient-wolf opacity-30" />
          </div>
          <CardContent className="relative -mt-16 px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <Avatar className="w-32 h-32 ring-4 ring-background">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl font-display">
                  {user.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl sm:text-3xl font-display font-bold">
                        {user.name}
                      </h1>
                      <Badge className="gradient-primary text-primary-foreground">
                        <Crown className="w-3 h-3 mr-1" />
                        {user.tier}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{user.location}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span>Member since {user.memberSince}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                    <Button variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{user.stats?.eventsAttended || 0}</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{followingDJs.length}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{favoriteEvents.length}</p>
                    <p className="text-xs text-muted-foreground">Favorites</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{user.stats?.points || 0}</p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Upcoming Events */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookingHistory.filter(b => b.status === 'upcoming').length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No upcoming events</p>
                    <Link to="/events">
                      <Button variant="outline">Discover Events</Button>
                    </Link>
                  </div>
                ) : (
                  bookingHistory.filter(b => b.status === 'upcoming').map((booking) => (
                    <Link key={booking.eventId} to={`/event/${booking.eventId}`}>
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={booking.event?.image} alt={booking.event?.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{booking.event?.title}</h4>
                          <p className="text-sm text-muted-foreground">{booking.event?.date}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {booking.ticketType}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/tickets">
                <Card className="border-border/50 cursor-pointer hover-lift h-full">
                  <CardContent className="p-6 text-center space-y-2">
                    <Ticket className="w-8 h-8 text-primary mx-auto" />
                    <h3 className="font-display font-bold">My Tickets</h3>
                    <p className="text-sm text-muted-foreground">View and manage your tickets</p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="border-border/50 cursor-pointer hover-lift">
                <CardContent className="p-6 text-center space-y-2">
                  <Bell className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-display font-bold">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Manage event reminders</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-destructive" />
                  Favorite Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No favorite events yet</p>
                    <Link to="/events">
                      <Button variant="outline">Browse Events</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden border-border/50 hover-lift">
                        <Link to={`/event/${event.id}`}>
                          <div className="h-32 overflow-hidden">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                          </div>
                        </Link>
                        <CardContent className="p-4">
                          <Link to={`/event/${event.id}`}>
                            <h3 className="font-display font-bold mb-1 hover:text-primary transition-colors truncate">{event.title}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-3">{event.date}</p>
                          <div className="flex gap-2">
                            <Link to={`/event/${event.id}`} className="flex-1">
                              <Button variant="premium" size="sm" className="w-full">
                                Get Tickets
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFavorite(event.id)}
                            >
                              <Heart className="w-4 h-4 fill-destructive text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-primary" />
                  Booking History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookingHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No bookings yet</p>
                    <Link to="/events">
                      <Button variant="outline">Book Your First Event</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <div key={booking.eventId} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={booking.event?.image} alt={booking.event?.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{booking.event?.title}</h4>
                          <p className="text-sm text-muted-foreground">{booking.event?.venue} • {booking.event?.city}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={booking.status === 'upcoming' ? 'default' : 'secondary'}>
                              {booking.status}
                            </Badge>
                            <Badge variant="outline">{booking.ticketType}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Purchased</p>
                          <p className="font-medium">{booking.purchaseDate}</p>
                          <Link to={`/event/${booking.eventId}`}>
                            <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Following DJs ({followingDJs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {followingDJs.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">Not following any DJs yet</p>
                    <Link to="/djs">
                      <Button variant="outline">Discover DJs</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {followingDJs.map((dj) => (
                      <Card key={dj.id} className="border-border/50">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="w-16 h-16 ring-2 ring-primary/30">
                              <AvatarImage src={dj.image} />
                              <AvatarFallback>{dj.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-display font-bold truncate">{dj.name}</h3>
                              <p className="text-sm text-muted-foreground truncate">{dj.specialty}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Star className="w-3 h-3 text-primary fill-current" />
                                <span className="text-xs">{dj.rating}</span>
                                <span className="text-xs text-muted-foreground">• {dj.upcomingShows} shows</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/dj/${dj.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                View Profile
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => unfollowDJ(dj.id)}
                            >
                              <Heart className="w-4 h-4 fill-destructive text-destructive" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            {/* Points Card */}
            <Card className="border-border/50 glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-1">{user.stats?.points || 0} Points</h3>
                    <p className="text-sm text-muted-foreground">760 points to next reward</p>
                  </div>
                  <Gift className="w-12 h-12 text-primary" />
                </div>
                <Progress value={62} className="mb-2" />
                <p className="text-xs text-muted-foreground">Next reward: $50 Event Credit</p>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        achievement.unlocked ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        achievement.unlocked ? 'gradient-primary' : 'bg-muted'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.unlocked && achievement.progress && (
                          <Progress value={achievement.progress} className="mt-2 h-1" />
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-success/20 text-success border-success/30">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
