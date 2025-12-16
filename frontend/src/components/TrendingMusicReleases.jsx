import React, { useState } from 'react';
import { Play, Pause, Music2, TrendingUp, ExternalLink, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock trending music releases data
const trendingReleases = [
  {
    id: 1,
    title: 'Tum Se Hi (Remix)',
    artist: 'DJ OM ft. Arijit Singh',
    album: 'Bollywood Vibes Vol. 3',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
    duration: '4:32',
    plays: '2.3M',
    releaseDate: 'Dec 2024',
    genre: 'Bollywood Remix',
    trending: true,
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 2,
    title: 'Bhangra Anthem 2025',
    artist: 'DJ KYA',
    album: 'Punjabi Heat',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
    duration: '3:58',
    plays: '1.8M',
    releaseDate: 'Dec 2024',
    genre: 'Punjabi',
    trending: true,
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 3,
    title: 'Midnight in Mumbai',
    artist: 'DJ PANDA',
    album: 'House Journey',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300',
    duration: '5:15',
    plays: '1.5M',
    releaseDate: 'Nov 2024',
    genre: 'House',
    trending: true,
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 4,
    title: 'Desi Bass Drop',
    artist: 'DJ OM x DJ KYA',
    album: 'Collaboration EP',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300',
    duration: '4:45',
    plays: '1.2M',
    releaseDate: 'Nov 2024',
    genre: 'EDM',
    trending: false,
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 5,
    title: 'Garba Nights (Festival Mix)',
    artist: 'DJ PANDA',
    album: 'Festival Vibes',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300',
    duration: '6:20',
    plays: '980K',
    releaseDate: 'Oct 2024',
    genre: 'Traditional Remix',
    trending: false,
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 6,
    title: 'NYC Underground',
    artist: 'DJ OM',
    album: 'City Lights',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300',
    duration: '4:10',
    plays: '850K',
    releaseDate: 'Oct 2024',
    genre: 'Deep House',
    trending: false,
    spotifyUrl: 'https://spotify.com'
  }
];

export const TrendingMusicReleases = ({ limit = 6 }) => {
  const [playingId, setPlayingId] = useState(null);
  const releases = trendingReleases.slice(0, limit);

  const handlePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
      toast.info('Playback paused');
    } else {
      setPlayingId(id);
      toast.success('Now playing preview...', {
        description: 'Full track available on Spotify'
      });
    }
  };

  const openSpotify = (url, e) => {
    e.stopPropagation();
    window.open(url, '_blank');
    toast.success('Opening Spotify...');
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Music2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">Latest Trending Music</h2>
              <p className="text-sm text-muted-foreground">Fresh releases from our DJs</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => window.open('https://spotify.com', '_blank')}>
            View on Spotify
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {releases.map((release, index) => (
            <Card 
              key={release.id} 
              className={`group overflow-hidden border-border/50 hover-lift cursor-pointer transition-all duration-300 ${
                playingId === release.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => handlePlay(release.id)}
            >
              <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                  {/* Album Cover */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={release.cover}
                        alt={release.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {/* Play button overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg transition-opacity duration-300 ${
                      playingId === release.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        playingId === release.id ? 'bg-green-500' : 'bg-white'
                      }`}>
                        {playingId === release.id ? (
                          <Pause className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-5 h-5 text-black ml-0.5" />
                        )}
                      </div>
                    </div>
                    {/* Rank badge for top 3 */}
                    {index < 3 && (
                      <div className="absolute -top-2 -left-2">
                        <Badge className="bg-green-500 text-white font-bold px-2 py-0.5 text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold truncate group-hover:text-green-500 transition-colors">
                        {release.title}
                      </h3>
                      {release.trending && (
                        <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{release.artist}</p>
                    <p className="text-xs text-muted-foreground truncate">{release.album}</p>
                    
                    <div className="flex items-center gap-3 pt-1">
                      <Badge variant="secondary" className="text-xs">
                        {release.genre}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {release.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground">
                        {release.plays} plays
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        onClick={(e) => openSpotify(release.spotifyUrl, e)}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Spotify
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Playing indicator */}
                {playingId === release.id && (
                  <div className="h-1 bg-green-500/20">
                    <div className="h-full bg-green-500 animate-pulse" style={{ width: '60%' }} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            🎧 Full tracks available on streaming platforms
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrendingMusicReleases;
