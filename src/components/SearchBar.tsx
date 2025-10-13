import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (location: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch(location);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="date"
            placeholder="Check-in"
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="date"
            placeholder="Check-out"
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="number"
            placeholder="Guests"
            min="1"
            defaultValue="2"
            className="pl-10"
          />
        </div>
      </div>
      
      <Button 
        onClick={handleSearch}
        className="w-full md:w-auto mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        size="lg"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Hotels
      </Button>
    </div>
  );
};
