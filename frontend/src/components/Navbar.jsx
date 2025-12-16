import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Calendar, Users, User, Ticket, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('soundwolves_current_user') || '{}');
    if (user.id) {
      setCurrentUser(user);
    }
  }, [location]);

  const navItems = [
    { path: '/', label: 'Discover', icon: Zap },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/djs', label: 'DJs', icon: Users },
    { path: '/tickets', label: 'Tickets', icon: Ticket },
    { path: '/membership', label: 'Wolves Pass', icon: Crown }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="https://customer-assets.emergentagent.com/job_dj-wolves-app/artifacts/tjj77kbh_SoundWolves.png" 
              alt="SoundWolves Logo"
              className="h-8 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'flex items-center gap-2',
                      isActive && 'shadow-glow'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <>
                <Link to={currentUser.type === 'dj' ? '/dj-dashboard' : '/profile'}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {currentUser.djName || currentUser.name}
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('soundwolves_current_user');
                    setCurrentUser(null);
                    window.location.href = '/';
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/membership">
                  <Button variant="premium" size="sm">
                    Get VIP Access
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-4 space-y-2">
              {currentUser ? (
                <>
                  <Link 
                    to={currentUser.type === 'dj' ? '/dj-dashboard' : '/profile'}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-5 h-5 mr-2" />
                      {currentUser.djName || currentUser.name}
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      localStorage.removeItem('soundwolves_current_user');
                      setCurrentUser(null);
                      setIsOpen(false);
                      window.location.href = '/';
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login / Sign Up
                    </Button>
                  </Link>
                  <Link to="/membership" onClick={() => setIsOpen(false)}>
                    <Button variant="premium" className="w-full">
                      Get VIP Access
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};