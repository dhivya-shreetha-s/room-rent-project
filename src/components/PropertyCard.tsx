import { Star, MapPin, Wifi, UtensilsCrossed } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  price_per_night: number;
  rating: number;
  image_url?: string;
  amenities: string[];
  property_type: string;
}

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (amenity.toLowerCase().includes('restaurant')) return <UtensilsCrossed className="h-4 w-4" />;
    return null;
  };

  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer group">
      <div className="relative h-48 overflow-hidden bg-muted">
        {property.image_url ? (
          <img
            src={property.image_url}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <span className="text-4xl">🏨</span>
          </div>
        )}
        <Badge className="absolute top-3 right-3 bg-card/90 text-foreground border-border">
          {property.property_type}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{property.name}</h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span>{property.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.location}, {property.city}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {property.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {getAmenityIcon(amenity)}
              <span className="ml-1">{amenity}</span>
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              ₹{property.price_per_night.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
