import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Music, MapPin, DollarSign, Instagram, Upload, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const DJProfileSetup = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState({
    tagline: '',
    specialty: [],
    bio: '',
    cities: [],
    instagram: '',
    priceRange: '',
    profileImage: '',
    coverImage: ''
  });

  const [cityInput, setCityInput] = useState('');
  const [genreInput, setGenreInput] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('soundwolves_current_user') || '{}');
    if (!user.type || user.type !== 'dj') {
      toast.error('Please login as a DJ to access this page');
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    // Load existing profile if any
    if (user.specialty) {
      setProfile({
        tagline: user.tagline || '',
        specialty: user.specialty?.split(' • ') || [],
        bio: user.bio || '',
        cities: user.cities || [],
        instagram: user.socialMedia?.instagram || '',
        priceRange: user.priceRange || '',
        profileImage: user.image || '',
        coverImage: user.coverImage || ''
      });
    }
  }, [navigate]);

  const addCity = () => {
    if (cityInput && !profile.cities.includes(cityInput)) {
      setProfile({ ...profile, cities: [...profile.cities, cityInput] });
      setCityInput('');
    }
  };

  const removeCity = (city) => {
    setProfile({ ...profile, cities: profile.cities.filter(c => c !== city) });
  };

  const addGenre = () => {
    if (genreInput && !profile.specialty.includes(genreInput)) {
      setProfile({ ...profile, specialty: [...profile.specialty, genreInput] });
      setGenreInput('');
    }
  };

  const removeGenre = (genre) => {
    setProfile({ ...profile, specialty: profile.specialty.filter(g => g !== genre) });
  };

  const handleSave = () => {
    if (!profile.bio || profile.specialty.length === 0 || profile.cities.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const djs = JSON.parse(localStorage.getItem('soundwolves_djs') || '[]');
    const djIndex = djs.findIndex(d => d.id === currentUser.id);

    if (djIndex !== -1) {
      djs[djIndex] = {
        ...djs[djIndex],
        tagline: profile.tagline,
        specialty: profile.specialty.join(' • '),
        bio: profile.bio,
        cities: profile.cities,
        socialMedia: { instagram: profile.instagram },
        priceRange: profile.priceRange,
        image: profile.profileImage || 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
        coverImage: profile.coverImage || 'https://images.unsplash.com/photo-1764510383709-14be6ec28548',
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('soundwolves_djs', JSON.stringify(djs));
      localStorage.setItem('soundwolves_current_user', JSON.stringify({ ...djs[djIndex], type: 'dj' }));
      toast.success('Profile updated successfully!');
      navigate('/dj-dashboard');
    }
  };

  if (!currentUser) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
            Complete Your <span className="text-gradient-wolf">DJ Profile</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Let event organizers know what makes you unique
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription>Your DJ identity and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>DJ Name</Label>
                  <Input value={currentUser.djName} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    placeholder="e.g., The Voice of Bollywood Nights"
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your music style, experience, and what makes you unique..."
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Music Genres */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5 text-primary" />
                Music Genres *
              </CardTitle>
              <CardDescription>What genres do you specialize in?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Bollywood, EDM, Hip Hop"
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
                />
                <Button type="button" onClick={addGenre}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.specialty.map((genre, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeGenre(genre)}>
                    {genre} ×
                  </Badge>
                ))}
              </div>
              {profile.specialty.length === 0 && (
                <p className="text-sm text-muted-foreground">Add at least one genre</p>
              )}
            </CardContent>
          </Card>

          {/* Location & Availability */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Locations *
              </CardTitle>
              <CardDescription>Which cities are you available in?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Toronto, Vancouver, Montreal"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCity())}
                />
                <Button type="button" onClick={addCity}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.cities.map((city, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeCity(city)}>
                    {city} ×
                  </Badge>
                ))}
              </div>
              {profile.cities.length === 0 && (
                <p className="text-sm text-muted-foreground">Add at least one city</p>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Social */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Pricing & Social
              </CardTitle>
              <CardDescription>Help clients understand your booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Input
                    id="priceRange"
                    placeholder="e.g., $2,000 - $5,000"
                    value={profile.priceRange}
                    onChange={(e) => setProfile({ ...profile, priceRange: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="instagram"
                      placeholder="@your.handle"
                      className="pl-10"
                      value={profile.instagram}
                      onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Profile Images
              </CardTitle>
              <CardDescription>Add image URLs for your profile and cover photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image URL</Label>
                <Input
                  id="profileImage"
                  placeholder="https://..."
                  value={profile.profileImage}
                  onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Leave empty to use default image</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  placeholder="https://..."
                  value={profile.coverImage}
                  onChange={(e) => setProfile({ ...profile, coverImage: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Leave empty to use default image</p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate('/dj-dashboard')}>
              Cancel
            </Button>
            <Button variant="premium" onClick={handleSave} size="lg">
              <Save className="w-5 h-5 mr-2" />
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DJProfileSetup;