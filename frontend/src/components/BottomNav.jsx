import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Calendar, Users, Ticket, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Discover', icon: Zap },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/djs', label: 'DJs', icon: Users },
    { path: '/tickets', label: 'Tickets', icon: Ticket },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-card border-t border-border/50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-all',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'animate-bounce')} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary shadow-glow" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};