import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { mockUser } from '@/data/mockData';

export const FriendsAttending = ({ friendsAttending = [], eventTitle, compact = false }) => {
  // Map friend names to user data from mockUser friends
  const matchedFriends = friendsAttending.map(friendName => {
    const found = mockUser.friends.find(f => f.name === friendName);
    return found || { name: friendName, avatar: null };
  });

  const handleInviteFriends = () => {
    toast.success('Invite sent!', {
      description: 'Your friends will receive an invitation to join you at this event.'
    });
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {matchedFriends.slice(0, 3).map((friend, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="w-6 h-6 border-2 border-background">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback className="text-xs">
                      {friend.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{friend.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        {matchedFriends.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {matchedFriends.length} friend{matchedFriends.length > 1 ? 's' : ''} going
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Friends Attending
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={handleInviteFriends}
        >
          <UserPlus className="w-4 h-4 mr-1" />
          <span className="text-xs">Invite</span>
        </Button>
      </div>

      {matchedFriends.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-2">No friends attending yet</p>
          <Button variant="outline" size="sm" onClick={handleInviteFriends}>
            <UserPlus className="w-4 h-4 mr-1" />
            Invite Friends
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex -space-x-2">
            {matchedFriends.slice(0, 5).map((friend, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="w-10 h-10 border-2 border-background hover:scale-110 transition-transform cursor-pointer">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback>
                        {friend.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{friend.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {matchedFriends.length > 5 && (
              <Avatar className="w-10 h-10 border-2 border-background bg-primary">
                <AvatarFallback className="text-primary-foreground text-sm">
                  +{matchedFriends.length - 5}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {matchedFriends.map(f => f.name).slice(0, 2).join(', ')}
            {matchedFriends.length > 2 && ` and ${matchedFriends.length - 2} more`}
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendsAttending;
