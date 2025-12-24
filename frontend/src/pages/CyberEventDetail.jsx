import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Lock, Crown, Share2, Heart, ArrowLeft, Check, Music, Utensils, Flame, ExternalLink, Shield, Tag, Ticket, Mail, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getCyberEventById, getEventStatusDisplay } from '@/data/cyberEventsData';

export const CyberEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isInterested, setIsInterested] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    title: ''
  });

  useEffect(() => {
    const foundEvent = getCyberEventById(id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      toast.error('Event not found');
      navigate('/cyber-social');
    }
  }, [id, navigate]);

  const handlePreOrder = () => {
    setShowRegistration(true);
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }

    // Store registration
    const registrations = JSON.parse(localStorage.getItem('cyber_registrations') || '[]');
    registrations.push({
      eventId: event.id,
      eventTitle: event.title,
      ...formData,
      type: event.inviteOnly ? 'pre-order-request' : 'pre-order',
      timestamp: new Date().toISOString(),
      price: event.earlyBirdPrice
    });
    localStorage.setItem('cyber_registrations', JSON.stringify(registrations));

    if (event.inviteOnly) {
      toast.success('Pre-Order Request Submitted!', {
        description: 'Our team will review your request and contact you within 48 hours.'
      });
    } else {
      toast.success('Pre-Order Confirmed!', {
        description: `Your spot is secured at ${event.earlyBirdPrice}. Full payment due by ${event.earlyBirdDeadline}.`
      });
    }
    setShowRegistration(false);
    setFormData({ name: '', email: '', company: '', title: '' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const toggleInterest = () => {
    setIsInterested(!isInterested);
    toast.success(isInterested ? 'Removed from interested' : 'Added to your interest list');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-950 pt-20 flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  const statusDisplay = getEventStatusDisplay(event);
  const spotsRemaining = event.attendeeLimit - event.preOrders;
  const preOrderPercentage = Math.round((event.preOrders / event.attendeeLimit) * 100);

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link to="/cyber-social">
            <Button variant="ghost" className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
            onClick={toggleInterest}
          >
            <Heart className={`w-5 h-5 ${isInterested ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          {event.trending && (
            <Badge className="bg-red-500/90 text-white border-none">
              <Flame className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          {event.inviteOnly && (
            <Badge className="bg-purple-500/90 text-white border-none">
              <Lock className="w-3 h-3 mr-1" />
              Invite Only
            </Badge>
          )}
          <Badge className="bg-cyan-500/90 text-white border-none">
            <Calendar className="w-3 h-3 mr-1" />
            2026 Event
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <Badge variant="outline" className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 mb-3">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                      {event.title}
                    </h1>
                    <p className="text-lg text-gray-400">{event.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-white">{event.date}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium text-white">{event.time}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Users className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Capacity</p>
                    <p className="text-sm font-medium text-white">{event.attendeeLimit} max</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Shield className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Dress Code</p>
                    <p className="text-sm font-medium text-white">{event.dressCode}</p>
                  </div>
                </div>

                <Separator className="bg-gray-800 my-6" />

                <div className="mb-8">
                  <h2 className="text-xl font-display font-bold text-white mb-4">About This Gathering</h2>
                  <p className="text-gray-400 leading-relaxed">{event.description}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-display font-bold text-white mb-4">What to Expect</h2>
                  <ul className="space-y-3">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <span className="text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {event.entertainment && event.entertainment !== 'None' && (
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <Music className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Live Entertainment</p>
                        <p className="text-white font-medium">{event.entertainment}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Venue Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-display font-bold text-white mb-4">Venue</h2>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={event.venue.image} alt={event.venue.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{event.venue.name}</h3>
                    <p className="text-sm text-cyan-400">{event.venue.type}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue.address}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {event.venue.amenities.map((amenity, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-24">
              <CardContent className="p-6 space-y-6">
                {!showRegistration ? (
                  <>
                    {/* Pricing */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <Tag className="w-3 h-3 mr-1" />
                          Early Bird Pricing
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <p className="text-4xl font-bold text-cyan-400">{event.earlyBirdPrice}</p>
                        <p className="text-xl text-gray-500 line-through">{event.price}</p>
                      </div>
                      <p className="text-sm text-orange-400 mt-2">
                        ⏰ Early bird ends {event.earlyBirdDeadline}
                      </p>
                    </div>

                    {/* Pre-Order Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Pre-Orders</span>
                        <span className="text-white font-medium">{event.preOrders} of {event.attendeeLimit}</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${preOrderPercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {spotsRemaining} spots remaining
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg" 
                      onClick={handlePreOrder}
                    >
                      {event.inviteOnly ? (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Request Pre-Order
                        </>
                      ) : (
                        <>
                          <Ticket className="w-5 h-5 mr-2" />
                          Pre-Order Now
                        </>
                      )}
                    </Button>

                    <Button 
                      variant="outline" 
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Register Interest
                    </Button>

                    <Separator className="bg-gray-800" />

                    <div>
                      <p className="text-sm text-gray-500 mb-3">Hosted By</p>
                      <div className="space-y-2">
                        {event.hosts.map((host, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                              <Shield className="w-4 h-4 text-cyan-400" />
                            </div>
                            <span className="text-sm text-gray-300">{host}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center pt-4 space-y-2">
                      <p className="text-xs text-gray-600">
                        Secure payment • Full refund until 7 days before
                      </p>
                      <p className="text-xs text-gray-600">
                        Questions? <span className="text-cyan-400 cursor-pointer">Contact our events team</span>
                      </p>
                    </div>
                  </>
                ) : (
                  /* Registration Form */
                  <form onSubmit={handleSubmitRegistration} className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-display font-bold text-white mb-2">
                        {event.inviteOnly ? 'Request Pre-Order' : 'Pre-Order Registration'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Secure your spot at {event.earlyBirdPrice}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        className="bg-gray-800 border-gray-700 text-white"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">Company</Label>
                      <Input
                        id="company"
                        placeholder="Company Name"
                        className="bg-gray-800 border-gray-700 text-white"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-300">Job Title</Label>
                      <Input
                        id="title"
                        placeholder="CISO, VP Security, etc."
                        className="bg-gray-800 border-gray-700 text-white"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {event.inviteOnly ? 'Submit Request' : 'Complete Pre-Order'}
                    </Button>

                    <Button 
                      type="button"
                      variant="ghost" 
                      className="w-full text-gray-400 hover:text-white"
                      onClick={() => setShowRegistration(false)}
                    >
                      Cancel
                    </Button>

                    {event.inviteOnly && (
                      <p className="text-xs text-center text-gray-500">
                        Invite-only events require approval. We'll review your request within 48 hours.
                      </p>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberEventDetail;
