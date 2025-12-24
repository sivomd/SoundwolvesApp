import React from 'react';
import { MapPin, Star, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const CyberVenueCard = ({ venue }) => {
  return (
    <Card className="group overflow-hidden border-gray-800 bg-gray-900/50 hover:bg-gray-900 transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        
        {venue.featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-purple-500/90 text-white border-none text-xs">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
            {venue.name}
          </h3>
          <p className="text-xs text-cyan-400 mt-0.5">{venue.type}</p>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <MapPin className="w-3.5 h-3.5 text-gray-500" />
          <span className="truncate">{venue.location}</span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2">{venue.description}</p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {venue.amenities.slice(0, 3).map((amenity, i) => (
            <Badge key={i} variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-500 text-xs py-0">
              <Check className="w-2.5 h-2.5 mr-1" />
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CyberVenueCard;
