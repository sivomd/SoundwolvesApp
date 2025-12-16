import React, { useState } from 'react';
import { Play, Pause, Music2, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export const MusicSamples = ({ samples = [] }) => {
  const [playingId, setPlayingId] = useState(null);
  const [progress, setProgress] = useState({});

  const formatPlays = (plays) => {
    if (plays >= 1000) {
      return `${(plays / 1000).toFixed(1)}K`;
    }
    return plays.toString();
  };

  const togglePlay = (sampleId) => {
    if (playingId === sampleId) {
      setPlayingId(null);
      toast.info('Playback paused');
    } else {
      setPlayingId(sampleId);
      toast.success('Now playing...', {
        description: 'This is a demo. Full playback requires Spotify/SoundCloud integration.'
      });
      
      // Simulate progress for demo
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2;
        setProgress(prev => ({ ...prev, [sampleId]: currentProgress }));
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setPlayingId(null);
          setProgress(prev => ({ ...prev, [sampleId]: 0 }));
        }
      }, 200);
    }
  };

  if (samples.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="w-5 h-5 text-primary" />
          Music Samples
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {samples.map((sample) => (
          <div
            key={sample.id}
            className={`
              p-4 rounded-lg border transition-all duration-300
              ${playingId === sample.id 
                ? 'border-primary/50 bg-primary/10' 
                : 'border-border/50 hover:border-primary/30 hover:bg-muted/30'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <Button
                variant={playingId === sample.id ? 'premium' : 'outline'}
                size="icon"
                className="h-12 w-12 rounded-full flex-shrink-0"
                onClick={() => togglePlay(sample.id)}
              >
                {playingId === sample.id ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium truncate">{sample.title}</h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {sample.duration}
                  </span>
                </div>
                
                {playingId === sample.id ? (
                  <Progress value={progress[sample.id] || 0} className="h-1" />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Music2 className="w-3 h-3" />
                    <span>{formatPlays(sample.plays)} plays</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <p className="text-xs text-muted-foreground text-center pt-2">
          Full tracks available on Spotify & SoundCloud
        </p>
      </CardContent>
    </Card>
  );
};

export default MusicSamples;
