import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Star, Users, Hotel, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, index } = location.state || {};
  
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const hotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8, hotel9, hotel10, hotel11, hotel12];
  const propertyImage = property?.image_url || hotelImages[index % hotelImages.length];

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Hotel className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Property not found</h2>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.price_per_night : 0;
  };

  const handleConfirmBooking = () => {
    if (!checkIn || !checkOut || guests < 1) {
      return;
    }
    
    navigate("/booking-confirmation", {
      state: {
        property,
        checkIn,
        checkOut,
        guests,
        total: calculateTotal(),
        index
      }
    });
  };

  const totalAmount = calculateTotal();
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Hotel className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">StayBook</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            {/* Property Image */}
            <Card className="overflow-hidden shadow-elegant">
              <div className="relative h-[400px]">
                <img
                  src={propertyImage}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-card/90 text-foreground border-border">
                  {property.property_type}
                </Badge>
              </div>
            </Card>

            {/* Property Info */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}, {property.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-lg font-semibold">
                    <Star className="h-5 w-5 fill-secondary text-secondary" />
                    <span>{property.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{property.description}</p>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity: string, idx: number) => (
                      <Badge key={idx} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-elegant animate-slide-up">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ₹{property.price_per_night.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">per night</div>
                </div>

                <div className="space-y-4">
                  {/* Check-in */}
                  <div>
                    <Label htmlFor="checkin">Check-in</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out */}
                  <div>
                    <Label htmlFor="checkout">Check-out</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date < (checkIn || new Date())}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="relative mt-1">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  {checkIn && checkOut && nights > 0 && (
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ₹{property.price_per_night.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}
                        </span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2">
                        <span>Total</span>
                        <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handleConfirmBooking}
                    disabled={!checkIn || !checkOut || guests < 1 || nights < 1}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
