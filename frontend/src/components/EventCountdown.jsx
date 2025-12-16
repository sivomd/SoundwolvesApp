import React, { useState, useEffect } from 'react';
import { Clock, Bell, BellOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getTimeRemaining } from '@/data/mockData';

export const EventCountdown = ({ dateISO, eventTitle, compact = false }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(dateISO));
  const [reminderSet, setReminderSet] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(dateISO));
    }, 1000);

    return () => clearInterval(interval);
  }, [dateISO]);

  const toggleReminder = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setReminderSet(!reminderSet);
    if (!reminderSet) {
      toast.success(`Reminder set for ${eventTitle}!`, {
        description: "We'll notify you 24 hours before the event."
      });
    } else {
      toast.info('Reminder removed');
    }
  };

  if (timeRemaining.expired) {
    return (
      <Badge variant="secondary" className="text-muted-foreground">
        Event Ended
      </Badge>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
          <Clock className="w-3 h-3 mr-1" />
          {timeRemaining.days}d {timeRemaining.hours}h
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={toggleReminder}
        >
          {reminderSet ? (
            <Bell className="w-4 h-4 text-primary fill-primary" />
          ) : (
            <BellOff className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Event Starts In
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={toggleReminder}
        >
          {reminderSet ? (
            <>
              <Bell className="w-4 h-4 mr-1 text-primary fill-primary" />
              <span className="text-xs">Reminder Set</span>
            </>
          ) : (
            <>
              <BellOff className="w-4 h-4 mr-1" />
              <span className="text-xs">Set Reminder</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-background/50 rounded-lg p-2">
          <p className="text-2xl font-bold text-primary">{timeRemaining.days}</p>
          <p className="text-xs text-muted-foreground">Days</p>
        </div>
        <div className="bg-background/50 rounded-lg p-2">
          <p className="text-2xl font-bold text-primary">{timeRemaining.hours}</p>
          <p className="text-xs text-muted-foreground">Hours</p>
        </div>
        <div className="bg-background/50 rounded-lg p-2">
          <p className="text-2xl font-bold text-primary">{timeRemaining.minutes}</p>
          <p className="text-xs text-muted-foreground">Mins</p>
        </div>
        <div className="bg-background/50 rounded-lg p-2">
          <p className="text-2xl font-bold text-primary">{timeRemaining.seconds}</p>
          <p className="text-xs text-muted-foreground">Secs</p>
        </div>
      </div>
    </div>
  );
};

export default EventCountdown;
