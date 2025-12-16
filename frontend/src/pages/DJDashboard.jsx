import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Calendar, DollarSign, TrendingUp, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const DJDashboard = () => {
  const navigate = useNavigate();
  const [currentDJ, setCurrentDJ] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('soundwolves_current_user') || '{}');
    if (!user.type || user.type !== 'dj') {
      toast.error('Please login as a DJ to access this page');
      navigate('/login');
      return;
    }
    setCurrentDJ(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('soundwolves_current_user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!currentDJ) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  }

  const stats = [
    { label: 'Total Followers', value: currentDJ.followers || 0, icon: Users, color: 'text-primary' },
    { label: 'Upcoming Shows', value: currentDJ.upcomingShows || 0, icon: Calendar, color: 'text-secondary' },
    { label: 'Total Bookings', value: currentDJ.totalBookings || 0, icon: DollarSign, color: 'text-accent' },
    { label: 'Profile Views', value: '0', icon: TrendingUp, color: 'text-success' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
              Welcome, <span className="text-gradient-wolf">{currentDJ.djName}</span>
            </h1>
            <p className="text-muted-foreground text-lg">Manage your DJ profile and bookings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="w-24 h-24 ring-4 ring-primary/30">
                <AvatarImage src={currentDJ.image} />
                <AvatarFallback className="text-2xl font-display">
                  {currentDJ.djName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-display font-bold">{currentDJ.djName}</h2>
                    {currentDJ.verified && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Verified
                      </Badge>
                    )}
                  </div>
                  {currentDJ.tagline && (
                    <p className="text-muted-foreground">{currentDJ.tagline}</p>
                  )}
                </div>

                {currentDJ.bio ? (
                  <div className="space-y-2">
                    <p className="text-sm">{currentDJ.bio}</p>
                    {currentDJ.specialty && (
                      <div className="flex flex-wrap gap-2">
                        {currentDJ.specialty.split(' • ').map((genre, i) => (
                          <Badge key={i} variant="secondary">{genre}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Your profile is incomplete. Complete it to start receiving bookings!
                    </p>
                    <Button variant="premium" size="sm" onClick={() => navigate('/dj-profile-setup')}>
                      Complete Profile
                    </Button>
                  </div>
                )}
              </div>

              <Button variant="outline" onClick={() => navigate('/dj-profile-setup')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="border-border/50 cursor-pointer hover-lift" onClick={() => navigate('/dj-profile-setup')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Update your profile information, pricing, and availability
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 cursor-pointer hover-lift" onClick={() => navigate('/djs')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                View Public Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                See how your profile appears to event organizers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DJDashboard;