-- Create properties table for hotel listings
CREATE TABLE public.properties (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  location text NOT NULL,
  city text NOT NULL,
  price_per_night numeric NOT NULL,
  rating numeric DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
  image_url text,
  amenities text[] DEFAULT '{}',
  property_type text DEFAULT 'hotel',
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read properties (public data)
CREATE POLICY "Anyone can view properties"
ON public.properties
FOR SELECT
USING (true);

-- Insert sample data
INSERT INTO public.properties (name, description, location, city, price_per_night, rating, amenities, property_type) VALUES
('Luxury Grand Hotel', 'Experience premium comfort in the heart of the city with stunning views and world-class amenities', 'Downtown Center', 'Mumbai', 3500, 4.8, ARRAY['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking'], 'hotel'),
('Cozy Boutique Inn', 'Charming boutique hotel with personalized service and elegant rooms', 'Heritage District', 'Delhi', 2200, 4.6, ARRAY['WiFi', 'Restaurant', 'Room Service'], 'boutique'),
('Seaside Resort & Spa', 'Beachfront paradise with spa facilities and ocean views', 'Beach Road', 'Goa', 4500, 4.9, ARRAY['WiFi', 'Pool', 'Spa', 'Beach Access', 'Restaurant'], 'resort'),
('Business Express Hotel', 'Modern hotel perfect for business travelers with meeting facilities', 'Business District', 'Bangalore', 2800, 4.5, ARRAY['WiFi', 'Gym', 'Meeting Rooms', 'Parking'], 'hotel'),
('Mountain View Lodge', 'Peaceful retreat with breathtaking mountain scenery', 'Hill Station', 'Shimla', 3200, 4.7, ARRAY['WiFi', 'Restaurant', 'Fireplace', 'Parking'], 'lodge'),
('City Center Suites', 'Spacious suites in prime location with kitchen facilities', 'Central Square', 'Pune', 2500, 4.4, ARRAY['WiFi', 'Kitchenette', 'Gym', 'Parking'], 'suite');