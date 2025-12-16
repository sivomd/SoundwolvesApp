import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Calendar, MapPin, Music, Heart, Share2, Instagram, TrendingUp, Crown, Headphones } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { djs as mockDJs } from '@/data/mockData';

export const DJs = () => {
  const navigate = useNavigate();
  const [followedDJs, setFollowedDJs] = useState([]);
  const [allDJs, setAllDJs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Load followed DJs from localStorage
    const storedFollowed = JSON.parse(localStorage.getItem('soundwolves_followed_djs') || '[]');
    setFollowedDJs(storedFollowed);
    
    // Load custom DJs from localStorage
    const storedDJs = JSON.parse(localStorage.getItem('soundwolves_djs') || '[]');
    const completeDJs = storedDJs.filter(dj => dj.bio && dj.specialty);
    setAllDJs([...mockDJs, ...completeDJs]);
  }, []);

  const toggleFollow = (djId, djName) => {
    const isFollowing = followedDJs.includes(djId);
    const newFollowed = isFollowing 
      ? followedDJs.filter(id => id !== djId)
      : [...followedDJs, djId];
    
    setFollowedDJs(newFollowed);
    localStorage.setItem('soundwolves_followed_djs', JSON.stringify(newFollowed));
    toast.success(isFollowing ? `Unfollowed ${djName}` : `Following ${djName}!`);
  };

  const handleShare = (dj) => {
    navigator.clipboard.writeText(`${window.location.origin}/dj/${dj.id}`);
    toast.success('Profile link copied to clipboard!');
  };

  // Filter DJs based on search and tab
  const filteredDJs = allDJs.filter(dj => {
    const matchesSearch = searchQuery === '' ||
      dj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dj.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dj.cities?.some(city => city.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'verified') return matchesSearch && dj.verified;
    if (activeTab === 'following') return matchesSearch && followedDJs.includes(dj.id);
    return matchesSearch;
  });

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

        {/* Search */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search DJs by name, genre, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All DJs</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="following">
              Following ({followedDJs.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDJs.length} DJ{filteredDJs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* DJs Grid */}
        {filteredDJs.length === 0 ? (
          <div className="text-center py-20">
            <Headphones className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-4">
              {activeTab === 'following' ? 'No DJs followed yet' : 'No DJs found'}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {activeTab === 'following' 
                ? 'Start following your favorite DJs to see them here' 
                : 'Try adjusting your search'}
            </p>
            {activeTab === 'following' && (
              <Button variant="outline" onClick={() => setActiveTab('all')}>
                Browse All DJs
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredDJs.map((dj) => (
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
                              onClick={() => toggleFollow(dj.id, dj.name)}
                            >
                              <Heart
                                className={`w-5 h-5 ${followedDJs.includes(dj.id) ? 'fill-destructive text-destructive' : ''}`}
                              />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleShare(dj)}
                            >
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
                          {dj.genres?.map((genre) => (
                            <Badge key={genre} variant="secondary">
                              <Music className="w-3 h-3 mr-1" />
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{dj.bio}</p>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{dj.cities?.join(', ')}</span>
                        </div>
                        {dj.socialMedia?.instagram && (
                          <a 
                            href={dj.socialMedia.instagramUrl || `https://instagram.com/${dj.socialMedia.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Badge variant="outline" className="flex items-center gap-1.5 hover:bg-primary/10 transition-colors cursor-pointer">
                              <Instagram className="w-3 h-3" />
                              {dj.socialMedia.instagram}
                            </Badge>
                          </a>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Booking Range</p>
                          <p className="text-lg font-bold text-primary">{dj.priceRange}</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1 sm:flex-none"
                            onClick={() => navigate(`/dj/${dj.id}`)}
                          >
                            View Profile
                          </Button>
                          <Button 
                            variant="premium" 
                            className="flex-1 sm:flex-none"
                            onClick={() => {
                              navigate(`/dj/${dj.id}`);
                              toast.success('Redirecting to booking page...');
                            }}
                          >
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
        )}

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
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => navigate('/login')}
            >
              Join as DJ/Promoter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DJs;
