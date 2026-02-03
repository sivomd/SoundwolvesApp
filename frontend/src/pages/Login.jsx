import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Zap, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Password strength indicator
const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const getColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getLabel = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i <= strength ? getColor() : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">Password strength: {getLabel()}</span>
    </div>
  );
};

export const Login = () => {
  const navigate = useNavigate();
  const { login, register, error: authError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [userLoginData, setUserLoginData] = useState({ email: '', password: '' });
  const [djLoginData, setDjLoginData] = useState({ email: '', password: '' });
  const [userSignupData, setUserSignupData] = useState({ name: '', email: '', password: '' });
  const [djSignupData, setDjSignupData] = useState({ name: '', email: '', password: '', djName: '' });

  // Validate password requirements
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('One number');
    return errors;
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setIsLoading(true);

    try {
      if (!validateEmail(userLoginData.email)) {
        setValidationErrors({ email: 'Please enter a valid email address' });
        return;
      }

      await login(userLoginData.email, userLoginData.password);
      toast.success('Welcome to SOUNDWOLVES!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDjLogin = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setIsLoading(true);

    try {
      if (!validateEmail(djLoginData.email)) {
        setValidationErrors({ email: 'Please enter a valid email address' });
        return;
      }

      const userData = await login(djLoginData.email, djLoginData.password);
      toast.success(`Welcome back, ${userData.dj_name || userData.name}!`);
      navigate('/dj-dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSignup = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setIsLoading(true);

    try {
      // Validate inputs
      const errors = {};
      if (!userSignupData.name || userSignupData.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      if (!validateEmail(userSignupData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      const passwordErrors = validatePassword(userSignupData.password);
      if (passwordErrors.length > 0) {
        errors.password = `Password requires: ${passwordErrors.join(', ')}`;
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      await register(userSignupData.name, userSignupData.email, userSignupData.password, 'user');
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDjSignup = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setIsLoading(true);

    try {
      // Validate inputs
      const errors = {};
      if (!djSignupData.name || djSignupData.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      if (!djSignupData.djName || djSignupData.djName.length < 2) {
        errors.djName = 'DJ name must be at least 2 characters';
      }
      if (!validateEmail(djSignupData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      const passwordErrors = validatePassword(djSignupData.password);
      if (passwordErrors.length > 0) {
        errors.password = `Password requires: ${passwordErrors.join(', ')}`;
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      await register(djSignupData.name, djSignupData.email, djSignupData.password, 'dj', djSignupData.djName);
      toast.success('DJ account created! Complete your profile to get started.');
      navigate('/dj-profile-setup');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = ({ field }) => {
    const error = validationErrors[field];
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 mt-1 text-sm text-destructive">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <img
            src="https://customer-assets.emergentagent.com/job_dj-wolves-app/artifacts/tjj77kbh_SoundWolves.png"
            alt="SoundWolves Logo"
            className="h-16 mx-auto mb-4 object-contain"
          />
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-3">
            Join the <span className="text-gradient-gold">Wolves Pack</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Access exclusive events and unlock VIP experiences
          </p>
        </div>

        {authError && (
          <div className="max-w-2xl mx-auto mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span>{authError}</span>
            </div>
          </div>
        )}

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
                            autoComplete="email"
                            disabled={isLoading}
                          />
                        </div>
                        <ErrorMessage field="email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="user-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            value={userLoginData.password}
                            onChange={(e) => setUserLoginData({...userLoginData, password: e.target.value})}
                            required
                            autoComplete="current-password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" variant="premium" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Login'}
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
                            minLength={2}
                            maxLength={100}
                            autoComplete="name"
                            disabled={isLoading}
                          />
                        </div>
                        <ErrorMessage field="name" />
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
                            autoComplete="email"
                            disabled={isLoading}
                          />
                        </div>
                        <ErrorMessage field="email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="user-signup-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            className="pl-10 pr-10"
                            value={userSignupData.password}
                            onChange={(e) => setUserSignupData({...userSignupData, password: e.target.value})}
                            required
                            minLength={8}
                            autoComplete="new-password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <PasswordStrength password={userSignupData.password} />
                        <ErrorMessage field="password" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be at least 8 characters with uppercase, lowercase, and numbers
                        </p>
                      </div>
                      <Button type="submit" variant="premium" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create Account'}
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
                            autoComplete="email"
                            disabled={isLoading}
                          />
                        </div>
                        <ErrorMessage field="email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dj-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
                            value={djLoginData.password}
                            onChange={(e) => setDjLoginData({...djLoginData, password: e.target.value})}
                            required
                            autoComplete="current-password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" variant="wolf" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Login as DJ'}
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
                            minLength={2}
                            maxLength={100}
                            autoComplete="name"
                            disabled={isLoading}
                          />
                        </div>
                        <ErrorMessage field="name" />
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
                            minLength={2}
                            maxLength={50}
                            disabled={isLoading}
                          />
                        </div>
                        <ErrorMessage field="djName" />
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
                            autoComplete="email"
                            disabled={isLoading}
                          />
                        </div>
                        <ErrorMessage field="email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dj-signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="dj-signup-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            className="pl-10 pr-10"
                            value={djSignupData.password}
                            onChange={(e) => setDjSignupData({...djSignupData, password: e.target.value})}
                            required
                            minLength={8}
                            autoComplete="new-password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <PasswordStrength password={djSignupData.password} />
                        <ErrorMessage field="password" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be at least 8 characters with uppercase, lowercase, and numbers
                        </p>
                      </div>
                      <Button type="submit" variant="wolf" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create DJ Account'}
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
