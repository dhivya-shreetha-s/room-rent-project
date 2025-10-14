import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CheckCircle2, Hotel, Calendar, Users, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotel6 from "@/assets/hotel-6.jpg";
import hotel7 from "@/assets/hotel-7.jpg";
import hotel8 from "@/assets/hotel-8.jpg";
import hotel9 from "@/assets/hotel-9.jpg";
import hotel10 from "@/assets/hotel-10.jpg";
import hotel11 from "@/assets/hotel-11.jpg";
import hotel12 from "@/assets/hotel-12.jpg";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, checkIn, checkOut, guests, total, index } = location.state || {};

  const hotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8, hotel9, hotel10, hotel11, hotel12];
  const propertyImage = property?.image_url || hotelImages[index % hotelImages.length];

  if (!property || !checkIn || !checkOut) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Hotel className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Booking not found</h2>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Hotel className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StayBook</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">🎉 Booking Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Your reservation has been successfully confirmed
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="shadow-elegant animate-slide-up">
            <CardContent className="p-0">
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img
                  src={propertyImage}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-1">{property.name}</h2>
                  <div className="flex items-center text-white/90">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}, {property.city}</span>
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-card/90 text-foreground border-border">
                  {property.property_type}
                </Badge>
              </div>

              {/* Booking Information */}
              <div className="p-6 space-y-6">
                {/* Stay Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Check-in</div>
                      <div className="font-semibold">{format(new Date(checkIn), "PPP")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Check-out</div>
                      <div className="font-semibold">{format(new Date(checkOut), "PPP")}</div>
                    </div>
                  </div>
                </div>

                {/* Guests and Nights */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Guests</div>
                      <div className="font-semibold">{guests} {guests === 1 ? 'Guest' : 'Guests'}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Hotel className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Duration</div>
                      <div className="font-semibold">{nights} {nights === 1 ? 'Night' : 'Nights'}</div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-border pt-6">
                  <div className="flex justify-between mb-2 text-muted-foreground">
                    <span>₹{property.price_per_night.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>₹{(property.price_per_night * nights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-3xl font-bold text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Included Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => navigate("/")}
                  >
                    Book Another Stay
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>A confirmation email has been sent to your registered email address.</p>
            <p className="mt-1">For any queries, please contact us at support@staybook.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
