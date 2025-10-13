import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Hotel } from "lucide-react";
import heroImage from "@/assets/hero-hotel.jpg";

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

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("available", true)
        .order("rating", { ascending: false });

      if (error) throw error;

      setProperties(data || []);
      setFilteredProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast({
        title: "Error",
        description: "Failed to load properties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (location: string) => {
    if (!location.trim()) {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter(
      (property) =>
        property.city.toLowerCase().includes(location.toLowerCase()) ||
        property.location.toLowerCase().includes(location.toLowerCase()) ||
        property.name.toLowerCase().includes(location.toLowerCase())
    );

    setFilteredProperties(filtered);

    if (filtered.length === 0) {
      toast({
        title: "No results",
        description: "No properties found matching your search.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury Hotels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hotel className="h-12 w-12" />
            <h1 className="text-5xl md:text-6xl font-bold">StayBook</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover amazing hotels and experiences across India
          </p>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-muted-foreground">
              {filteredProperties.length} properties available
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <Hotel className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Hotel className="h-5 w-5" />
            <span>© 2025 StayBook. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
