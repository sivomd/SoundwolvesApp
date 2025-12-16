import React, { useState } from 'react';
import { Crown, Check, Zap, Star, Sparkles, Gift, Users, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Membership = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const tiers = [
    {
      name: 'Wolves Pass',
      tagline: 'For Casual Night Owls',
      icon: Zap,
      price: { monthly: 29, yearly: 290 },
      color: 'text-secondary',
      gradient: 'gradient-wolf',
      features: [
        'Early ticket access (24h before public)',
        'Exclusive member-only events (1/month)',
        '10% discount on all ticket purchases',
        'Priority customer support',
        'Access to Hype Squad community',
        'Referral rewards program',
        'Monthly event newsletter'
      ],
      cta: 'Join Wolves Pass'
    },
    {
      name: 'Gold',
      tagline: 'For True Party Enthusiasts',
      icon: Star,
      price: { monthly: 79, yearly: 790 },
      color: 'text-primary',
      gradient: 'gradient-primary',
      popular: true,
      features: [
        'Everything in Wolves Pass',
        'Early ticket access (48h before public)',
        'Exclusive member-only events (3/month)',
        '20% discount on all purchases',
        'VIP table upgrades available',
        '2 complimentary guest passes/month',
        'Backstage access to select events',
        'Personalized event recommendations',
        'City Hype Squad leader opportunities',
        'Exclusive merchandise & swag'
      ],
      cta: 'Upgrade to Gold'
    },
    {
      name: 'Black',
      tagline: 'The Ultimate VIP Experience',
      icon: Crown,
      price: { monthly: 199, yearly: 1990 },
      color: 'text-accent',
      gradient: 'gradient-vip',
      features: [
        'Everything in Gold',
        'Unlimited early access to all events',
        'Invite-only experiences & after-parties',
        '30% discount on all purchases',
        'Complimentary VIP table access (1/month)',
        '5 complimentary guest passes/month',
        'Meet & greet with DJs and artists',
        'Private event booking concierge',
        'Dedicated account manager',
        'Priority venue entry (skip the line)',
        'Access to Black member lounge',
        'Exclusive brand collaborations',
        'Annual VIP retreat invitation'
      ],
      cta: 'Join the Elite'
    }
  ];

  const perks = [
    {
      icon: Calendar,
      title: 'Priority Booking',
      description: 'Get first dibs on limited-capacity events before they sell out'
    },
    {
      icon: Users,
      title: 'Hype Squad',
      description: 'Join city-based crews, unlock team rewards, and shape local nightlife'
    },
    {
      icon: Gift,
      title: 'Exclusive Rewards',
      description: 'Earn points, unlock perks, and get access to members-only experiences'
    },
    {
      icon: Sparkles,
      title: 'VIP Treatment',
      description: 'Skip lines, access premium areas, and enjoy elevated experiences'
    }
  ];

  const testimonials = [
    {
      name: 'Priya S.',
      location: 'Toronto',
      tier: 'Gold',
      quote: 'The Gold membership paid for itself in 2 months! The backstage access and discounts are incredible.',
      image: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85'
    },
    {
      name: 'Raj M.',
      location: 'Vancouver',
      tier: 'Black',
      quote: 'Black membership is game-changing. The concierge service and private events make every night unforgettable.',
      image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1643981693404-d76e58594bbf?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="VIP Lounge"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
            <Crown className="w-3 h-3 mr-1" />
            Premium Membership
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            Join the <span className="text-gradient-gold">Wolves Pack</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unlock exclusive VIP experiences, priority access, and connect with the most vibrant nightlife community in North America
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <Tabs value={billingCycle} onValueChange={setBillingCycle} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge className="ml-2 bg-success/20 text-success border-success/30">
                  Save 17%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const price = billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearly;
            const savings = billingCycle === 'yearly' ? Math.round(tier.price.monthly * 12 - tier.price.yearly) : 0;

            return (
              <Card
                key={tier.name}
                className={`relative overflow-hidden border-border/50 hover-lift ${
                  tier.popular ? 'lg:scale-105 border-primary shadow-glow' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${tier.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-display mb-1">{tier.name}</CardTitle>
                  <CardDescription>{tier.tagline}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                    {savings > 0 && (
                      <p className="text-sm text-success mt-1">
                        Save ${savings}/year
                      </p>
                    )}
                  </div>

                  <Button
                    variant={tier.popular ? 'premium' : 'default'}
                    className="w-full"
                    size="lg"
                  >
                    {tier.cta}
                  </Button>

                  <div className="space-y-3 pt-4">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 ${tier.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Perks Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
              Member <span className="text-gradient-wolf">Perks</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              What makes SOUNDWOLVES membership special
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <Card key={perk.title} className="text-center border-border/50">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 gradient-wolf rounded-xl mx-auto flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-bold">{perk.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {perk.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
              What Our <span className="text-gradient-gold">Members Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.tier}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I cancel my membership anytime?',
                a: 'Yes! You can cancel your membership at any time. Your benefits will continue until the end of your billing period.'
              },
              {
                q: 'Do unused guest passes roll over?',
                a: 'Guest passes are valid for the month they\'re issued. Unused passes do not roll over to the next month.'
              },
              {
                q: 'Can I upgrade or downgrade my tier?',
                a: 'Absolutely! You can change your membership tier at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle.'
              },
              {
                q: 'Are there any additional fees?',
                a: 'No hidden fees! The membership price includes all listed benefits. Event tickets are purchased separately with your member discount.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Membership;