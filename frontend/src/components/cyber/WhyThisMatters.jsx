import React from 'react';
import { Shield, Users, Lightbulb, Handshake, TrendingUp, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const reasons = [
  {
    icon: Handshake,
    title: 'Alliances Are Built Here',
    description: 'The partnerships that reshape enterprise security start with a conversation over cocktails, not a cold email.'
  },
  {
    icon: Lightbulb,
    title: 'Ideas Flow Freely',
    description: 'Away from NDAs and corporate walls, the candid discussions happen. Tomorrow\'s security strategies are born tonight.'
  },
  {
    icon: Users,
    title: 'Your Network Is Your Shield',
    description: 'In cybersecurity, who you know can be as critical as what you know. Build relationships that matter.'
  },
  {
    icon: TrendingUp,
    title: 'Stay Ahead of the Curve',
    description: 'Learn what\'s coming before it hits the headlines. Our gatherings surface insights months before they\'re public.'
  },
  {
    icon: Lock,
    title: 'Trust-First Community',
    description: 'Every attendee is vetted. Every conversation stays here. This is the trusted inner circle.'
  },
  {
    icon: Shield,
    title: 'New Jersey Leads',
    description: 'With more Fortune 500 security teams than any state, NJ is where cyber leadership culture is being written.'
  }
];

export const WhyThisMatters = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-gray-950 to-gray-950 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Why <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">This Matters</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Conferences give you badges. Trainings give you certs. But real influence? 
            That's built in the quiet moments—over a glass of whiskey, on a rooftop at sunset, 
            in conversations that never make it to LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card 
                key={index} 
                className="bg-gray-900/30 border-gray-800 hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quote */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <blockquote className="text-xl italic text-gray-300">
            "The future of cybersecurity isn't written in whitepapers. 
            It's decided in rooms like these."
          </blockquote>
          <p className="text-sm text-cyan-400 mt-4">— NJ Cyber Council</p>
        </div>
      </div>
    </section>
  );
};

export default WhyThisMatters;
