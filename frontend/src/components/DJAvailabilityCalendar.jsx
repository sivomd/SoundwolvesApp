import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const DJAvailabilityCalendar = ({ dj, onRequestBooking }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getMonthKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isAvailable = (day) => {
    const monthKey = getMonthKey(currentMonth);
    return dj.availability?.[monthKey]?.includes(day);
  };

  const isPastDate = (day) => {
    const today = new Date();
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate < today;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    if (!isPastDate(day) && isAvailable(day)) {
      setSelectedDate(day);
    }
  };

  const handleRequestBooking = () => {
    if (!selectedDate) return;
    
    const bookingDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      selectedDate
    );
    
    toast.success('Booking request sent!', {
      description: `Your request for ${dj.name} on ${bookingDate.toLocaleDateString()} has been sent.`
    });
    
    if (onRequestBooking) {
      onRequestBooking(bookingDate);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => null);

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Availability
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigateMonth(-1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigateMonth(1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {blanks.map((_, index) => (
            <div key={`blank-${index}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const available = isAvailable(day);
            const past = isPastDate(day);
            const selected = selectedDate === day;

            return (
              <button
                key={day}
                disabled={past || !available}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${past ? 'text-muted-foreground/50 cursor-not-allowed' : ''}
                  ${!past && available ? 'bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer' : ''}
                  ${!past && !available ? 'text-muted-foreground cursor-not-allowed' : ''}
                  ${selected ? 'ring-2 ring-primary bg-primary text-primary-foreground' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-xs text-muted-foreground">Booked</span>
          </div>
        </div>

        {/* Selected date info */}
        {selectedDate && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    selectedDate
                  ).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {dj.priceRange}
                </p>
              </div>
              <Button variant="premium" onClick={handleRequestBooking}>
                Request Booking
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DJAvailabilityCalendar;
