import React, { useState } from 'react';
import { User, Settings, Heart, Calendar, Ticket, Users, Crown, Gift, TrendingUp, MapPin, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export const Profile = () => {
  const user = {
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    location: 'Toronto, ON',
    memberSince: 'Jan 2024',
    tier: 'Gold',
    avatar: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
    stats: {
      eventsAttended: 24,
      following: 8,
      referrals: 3,
      points: 1240
    }
  };

  const upcomingEvents = [
    {
      id: 1,
      name: 'Diwali Nights',
      date: 'Nov 15',
      image: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85'
    },
    {
      id: 2,
      name: 'Bollywood Bass Night',
      date: 'Nov 22',
      image: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85'
    }
  ];

  const followingDJs = [
    {
      id: 1,
      name: 'DJ OM',
      image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
      nextShow: 'Nov 15'
    },
    {
      id: 2,
      name: 'DJ Priya',
      image: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85',
      nextShow: 'Nov 22'
    }
  ];

  const achievements = [
    { icon: Calendar, title: 'Party Animal', description: 'Attended 20+ events', unlocked: true },
    { icon: Users, title: 'Social Butterfly', description: 'Referred 5+ friends', unlocked: false, progress: 60 },
    { icon: Crown, title: 'VIP Status', description: 'Gold member for 6 months', unlocked: true },
    { icon: Heart, title: 'Super Fan', description: 'Follow 10+ DJs', unlocked: false, progress: 80 }
  ];

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
                  {user.name.split(' ').map(n => n[0]).join('')}
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
                  <Button variant="outline" className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{user.stats.eventsAttended}</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{user.stats.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{user.stats.referrals}</p>
                    <p className="text-xs text-muted-foreground">Referrals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{user.stats.points}</p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
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
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.name}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-border/50 cursor-pointer hover-lift">
                <CardContent className="p-6 text-center space-y-2">
                  <Ticket className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-display font-bold">My Tickets</h3>
                  <p className="text-sm text-muted-foreground">View and manage your tickets</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 cursor-pointer hover-lift">
                <CardContent className="p-6 text-center space-y-2">
                  <Settings className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-display font-bold">Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your preferences</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden border-border/50 hover-lift cursor-pointer">
                  <div className="h-40 overflow-hidden">
                    <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-display font-bold mb-1">{event.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{event.date}</p>
                    <Button variant="premium" size="sm" className="w-full">
                      View Tickets
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {followingDJs.map((dj) => (
                <Card key={dj.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16 ring-2 ring-primary/30">
                        <AvatarImage src={dj.image} />
                        <AvatarFallback>{dj.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-display font-bold">{dj.name}</h3>
                        <p className="text-sm text-muted-foreground">Next show: {dj.nextShow}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 fill-destructive text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            {/* Points Card */}
            <Card className="border-border/50 glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-1">{user.stats.points} Points</h3>
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