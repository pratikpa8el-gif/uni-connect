/*
  # Seed Sample Data for University Social Web App

  ## Overview
  This migration adds sample data to help test and demonstrate the platform:
  
  1. Sample Universities
    - Adds 15 universities from around the world
    - Includes details like location, country, type, and rankings
  
  2. Notes
    - The authenticated user can add their own notes through the UI
  
  3. Clubs
    - The authenticated user can create clubs through the UI
  
  ## Important Notes
  - This is sample data for demonstration purposes
  - Real users will create their own content after signup
  - Data can be modified or removed later
*/

-- Insert sample universities
INSERT INTO universities (name, location, country, type, rank, image_url) VALUES
('Massachusetts Institute of Technology', 'Cambridge, MA', 'USA', 'private', 1, 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyNTM4NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080'),
('Stanford University', 'Stanford, CA', 'USA', 'private', 2, 'https://images.unsplash.com/photo-1681782421941-753686f6a556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MjYxOTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080'),
('Harvard University', 'Cambridge, MA', 'USA', 'private', 3, 'https://images.unsplash.com/photo-1672912995257-0c8255289523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc2MjYxOTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080'),
('University of California, Berkeley', 'Berkeley, CA', 'USA', 'public', 4, NULL),
('Oxford University', 'Oxford', 'UK', 'public', 5, NULL),
('Cambridge University', 'Cambridge', 'UK', 'public', 6, NULL),
('IIT Delhi', 'New Delhi', 'India', 'public', 7, NULL),
('IIT Bombay', 'Mumbai', 'India', 'public', 8, NULL),
('Princeton University', 'Princeton, NJ', 'USA', 'private', 9, NULL),
('Yale University', 'New Haven, CT', 'USA', 'private', 10, NULL),
('Columbia University', 'New York, NY', 'USA', 'private', NULL, NULL),
('ETH Zurich', 'Zurich', 'Switzerland', 'public', NULL, NULL),
('University of Toronto', 'Toronto', 'Canada', 'public', NULL, NULL),
('National University of Singapore', 'Singapore', 'Singapore', 'public', NULL, NULL),
('University of Melbourne', 'Melbourne', 'Australia', 'public', NULL, NULL)
ON CONFLICT (name) DO NOTHING;