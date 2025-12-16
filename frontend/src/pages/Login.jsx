import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userLoginData, setUserLoginData] = useState({ email: '', password: '' });
  const [djLoginData, setDjLoginData] = useState({ email: '', password: '' });
  const [userSignupData, setUserSignupData] = useState({ name: '', email: '', password: '' });
  const [djSignupData, setDjSignupData] = useState({ name: '', email: '', password: '', djName: '' });

  const handleUserLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('soundwolves_users') || '[]');
    const user = users.find(u => u.email === userLoginData.email && u.password === userLoginData.password);
    
    if (user) {
      localStorage.setItem('soundwolves_current_user', JSON.stringify({ ...user, type: 'user' }));
      toast.success('Welcome back to SOUNDWOLVES!');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleDjLogin = (e) => {
    e.preventDefault();
    const djs = JSON.parse(localStorage.getItem('soundwolves_djs') || '[]');
    const dj = djs.find(d => d.email === djLoginData.email && d.password === djLoginData.password);
    
    if (dj) {
      localStorage.setItem('soundwolves_current_user', JSON.stringify({ ...dj, type: 'dj' }));
      toast.success(`Welcome back, ${dj.djName}!`);
      navigate('/dj-dashboard');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleUserSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('soundwolves_users') || '[]');
    
    if (users.find(u => u.email === userSignupData.email)) {
      toast.error('Email already registered!');
      return;
    }

    const newUser = {
      id: Date.now(),
      ...userSignupData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('soundwolves_users', JSON.stringify(users));
    localStorage.setItem('soundwolves_current_user', JSON.stringify({ ...newUser, type: 'user' }));
    toast.success('Account created successfully!');
    navigate('/');
  };

  const handleDjSignup = (e) => {
    e.preventDefault();
    const djs = JSON.parse(localStorage.getItem('soundwolves_djs') || '[]');
    
    if (djs.find(d => d.email === djSignupData.email)) {
      toast.error('Email already registered!');
      return;
    }

    const newDj = {
      id: Date.now(),
      ...djSignupData,
      verified: false,
      followers: 0,
      upcomingShows: 0,
      specialty: '',
      bio: '',
      cities: [],
      priceRange: '',
      rating: 0,
      totalBookings: 0,
      createdAt: new Date().toISOString()
    };
    
    djs.push(newDj);
    localStorage.setItem('soundwolves_djs', JSON.stringify(djs));
    localStorage.setItem('soundwolves_current_user', JSON.stringify({ ...newDj, type: 'dj' }));
    toast.success('DJ account created! Complete your profile to get started.');
    navigate('/dj-profile-setup');
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_dj-wolves-app/artifacts/qg39p13p_Stylized%20Wolf%20Emblem%20with%20Mandala%20Pattern.png" 
            alt="SoundWolves Logo"
            className="w-16 h-16 mx-auto mb-4 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
            Join the <span className="text-gradient-gold">Wolves Pack</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Access exclusive events and unlock VIP experiences
          </p>
        </div>

        <Tabs defaultValue="user" className="max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Event Goer
            </TabsTrigger>
            <TabsTrigger value="dj" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              DJ / Promoter
            </TabsTrigger>
          </TabsList>

          {/* User Login/Signup */}
          <TabsContent value="user">
            <Card className="border-border/50">
              <Tabs defaultValue="login">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="login">
                    <form onSubmit={handleUserLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="user-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={userLoginData.email}
                            onChange={(e) => setUserLoginData({...userLoginData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="user-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={userLoginData.password}
                            onChange={(e) => setUserLoginData({...userLoginData, password: e.target.value})}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" variant="premium" className="w-full" size="lg">
                        Login
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleUserSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="user-signup-name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            value={userSignupData.name}
                            onChange={(e) => setUserSignupData({...userSignupData, name: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="user-signup-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={userSignupData.email}
                            onChange={(e) => setUserSignupData({...userSignupData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="user-signup-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={userSignupData.password}
                            onChange={(e) => setUserSignupData({...userSignupData, password: e.target.value})}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" variant="premium" className="w-full" size="lg">
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </TabsContent>

          {/* DJ Login/Signup */}
          <TabsContent value="dj">
            <Card className="border-border/50">
              <Tabs defaultValue="login">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="login">
                    <form onSubmit={handleDjLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dj-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-email"
                            type="email"
                            placeholder="dj@email.com"
                            className="pl-10"
                            value={djLoginData.email}
                            onChange={(e) => setDjLoginData({...djLoginData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dj-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={djLoginData.password}
                            onChange={(e) => setDjLoginData({...djLoginData, password: e.target.value})}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" variant="wolf" className="w-full" size="lg">
                        Login as DJ
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleDjSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="dj-signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-signup-name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            value={djSignupData.name}
                            onChange={(e) => setDjSignupData({...djSignupData, name: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dj-signup-djname">DJ/Stage Name</Label>
                        <div className="relative">
                          <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-signup-djname"
                            type="text"
                            placeholder="DJ Awesome"
                            className="pl-10"
                            value={djSignupData.djName}
                            onChange={(e) => setDjSignupData({...djSignupData, djName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dj-signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-signup-email"
                            type="email"
                            placeholder="dj@email.com"
                            className="pl-10"
                            value={djSignupData.email}
                            onChange={(e) => setDjSignupData({...djSignupData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dj-signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-signup-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            value={djSignupData.password}
                            onChange={(e) => setDjSignupData({...djSignupData, password: e.target.value})}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" variant="wolf" className="w-full" size="lg">
                        Create DJ Account
                      </Button>
                    </form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;