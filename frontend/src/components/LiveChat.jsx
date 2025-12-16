import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to SOUNDWOLVES! 👋 I'm your virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'How do I sign up as a DJ?',
    'How do I buy tickets?',
    'What are membership tiers?',
    'Where are events located?'
  ];

  const botResponses = {
    'how do i sign up as a dj': {
      text: "Great! To sign up as a DJ:\n\n1. Click 'Login' in the top right\n2. Select 'DJ / Promoter' tab\n3. Fill in your details\n4. Complete your profile setup with:\n   • Bio & experience\n   • Music genres\n   • Available cities\n   • Pricing range\n   • Instagram handle\n\n Your profile will go live on our DJ directory! 🎵"
    },
    'how do i buy tickets': {
      text: "Buying tickets is easy! 🎫\n\n1. Browse events on the Events page\n2. Click on any event to see details\n3. Choose your ticket tier:\n   • General Admission\n   • VIP Experience\n   • Platinum Tables\n4. Click 'Buy Tickets'\n5. You'll be redirected to our secure ticketing partner\n\nYour tickets will be available in 'My Tickets' section!"
    },
    'what are membership tiers': {
      text: "We have 3 exclusive membership tiers:\n\n🐺 Wolves Pass ($29/mo)\n• Early ticket access (24h)\n• 10% discount on all tickets\n• Member-only events\n\n👑 Gold ($79/mo)\n• Everything in Wolves Pass\n• 48h early access\n• 20% discount\n• Backstage access\n\n💎 Black ($199/mo)\n• Everything in Gold\n• Unlimited early access\n• 30% discount\n• VIP table access\n• Dedicated concierge\n\nCheck out the 'Wolves Pass' page for more details!"
    },
    'where are events located': {
      text: "We host events across:\n\n📍 New York (NYC, Brooklyn)\n📍 New Jersey (Newark, Jersey City)\n📍 Philadelphia\n\nAll major venues including:\n• Brooklyn Bowl\n• Sony Hall\n• The Fillmore Philadelphia\n• PRYSM Nightclub\n• Prudential Center\n• And many more!\n\nFeaturing top DJs:\n🎵 DJ OM (@the.dj.om)\n🎵 DJ KYA (@kyathedj)\n🎵 DJ PANDA (@sidequestpanda)\n\nUse the city filter on our Events page to find events near you!"
    },
    'default': {
      text: "I can help you with:\n\n• 🎤 DJ signup and profile creation\n• 🎫 Ticket purchasing\n• 👑 Membership information\n• 📍 Event locations\n• 🔐 Account setup\n\nWhat would you like to know more about?"
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let response = botResponses.default;

      // Find matching response
      Object.keys(botResponses).forEach(key => {
        if (key !== 'default' && lowerInput.includes(key)) {
          response = botResponses[key];
        }
      });

      const botMessage = {
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-primary shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-8 h-8 text-primary-foreground" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-destructive rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] border-border/50 shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <CardHeader className="gradient-wolf p-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">SOUNDWOLVES Support</CardTitle>
                <p className="text-white/80 text-xs">Always here to help 🐺</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    message.sender === 'bot' ? 'gradient-wolf' : 'bg-primary'
                  )}
                >
                  {message.sender === 'bot' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[75%] p-3 rounded-lg',
                    message.sender === 'bot'
                      ? 'bg-muted text-foreground'
                      : 'gradient-primary text-primary-foreground'
                  )}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full gradient-wolf flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs h-8"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                variant="premium"
                size="icon"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Need human support? Email us at support@soundwolves.com
            </p>
          </div>
        </Card>
      )}
    </>
  );
};
