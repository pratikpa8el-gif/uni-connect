/*
  # University Social Web App - Initial Schema

  ## Overview
  This migration creates the complete database schema for a university social platform
  where students can share notes, form clubs, and connect with each other.

  ## New Tables
  
  ### 1. `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `name` (text, required) - Student's full name
  - `university` (text, required) - University name
  - `major` (text) - Field of study
  - `semester` (text) - Current semester
  - `bio` (text) - User biography
  - `interests` (text array) - List of interests/tags
  - `avatar_url` (text) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `universities`
  - `id` (uuid, primary key)
  - `name` (text, required, unique) - University name
  - `location` (text, required) - City/State
  - `country` (text, required) - Country
  - `type` (text) - public or private
  - `rank` (integer) - Global ranking
  - `image_url` (text) - University image
  - `created_at` (timestamptz)

  ### 3. `notes`
  - `id` (uuid, primary key)
  - `title` (text, required) - Note title
  - `subject` (text, required) - Subject/course name
  - `type` (text, required) - 'notes' or 'pyq'
  - `description` (text, required) - Detailed description
  - `semester` (text, required) - Semester
  - `file_url` (text, required) - PDF file storage URL
  - `author_id` (uuid, references profiles) - Uploader
  - `downloads` (integer, default 0) - Download count
  - `likes` (integer, default 0) - Like count
  - `created_at` (timestamptz) - Upload timestamp
  - `updated_at` (timestamptz)

  ### 4. `clubs`
  - `id` (uuid, primary key)
  - `name` (text, required, unique) - Club name
  - `description` (text, required) - Club description
  - `category` (text, required) - Category/type
  - `cover_image` (text) - Club cover image URL
  - `founder_id` (uuid, references profiles) - Club founder
  - `members_count` (integer, default 1) - Total members
  - `posts_count` (integer, default 0) - Total posts
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `club_members`
  - `id` (uuid, primary key)
  - `club_id` (uuid, references clubs)
  - `user_id` (uuid, references profiles)
  - `role` (text, default 'member') - 'founder', 'admin', 'member'
  - `joined_at` (timestamptz)

  ### 6. `matches`
  - `id` (uuid, primary key)
  - `user1_id` (uuid, references profiles) - First user
  - `user2_id` (uuid, references profiles) - Second user
  - `status` (text, default 'active') - 'active', 'ended'
  - `created_at` (timestamptz) - Match timestamp
  - `ended_at` (timestamptz) - When match ended

  ### 7. `match_messages`
  - `id` (uuid, primary key)
  - `match_id` (uuid, references matches)
  - `sender_id` (uuid, references profiles)
  - `message` (text, required)
  - `created_at` (timestamptz)

  ### 8. `online_users`
  - `user_id` (uuid, primary key, references profiles)
  - `last_seen` (timestamptz) - Last activity timestamp
  - `is_searching` (boolean, default false) - Looking for match

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Policies ensure users can only access appropriate data
  - Authentication required for all operations except reading public data

  ## Notes
  - Uses auth.uid() for user identification
  - Timestamps use timestamptz for timezone awareness
  - Cascading deletes protect referential integrity
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  university text NOT NULL,
  major text,
  semester text,
  bio text,
  interests text[] DEFAULT '{}',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create universities table
CREATE TABLE IF NOT EXISTS universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  location text NOT NULL,
  country text NOT NULL,
  type text DEFAULT 'public',
  rank integer,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view universities"
  ON universities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can manage universities"
  ON universities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL,
  type text NOT NULL CHECK (type IN ('notes', 'pyq')),
  description text NOT NULL,
  semester text NOT NULL,
  file_url text NOT NULL,
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  downloads integer DEFAULT 0,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view notes"
  ON notes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  category text NOT NULL,
  cover_image text,
  founder_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  members_count integer DEFAULT 1,
  posts_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view clubs"
  ON clubs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create clubs"
  ON clubs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = founder_id);

CREATE POLICY "Founders can update their clubs"
  ON clubs FOR UPDATE
  TO authenticated
  USING (auth.uid() = founder_id)
  WITH CHECK (auth.uid() = founder_id);

-- Create club_members table
CREATE TABLE IF NOT EXISTS club_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('founder', 'admin', 'member')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(club_id, user_id)
);

ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view club members"
  ON club_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join clubs"
  ON club_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave clubs"
  ON club_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  created_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  CHECK (user1_id != user2_id)
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own matches"
  ON matches FOR SELECT
  TO authenticated
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can create matches"
  ON matches FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can update their matches"
  ON matches FOR UPDATE
  TO authenticated
  USING (auth.uid() = user1_id OR auth.uid() = user2_id)
  WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Create match_messages table
CREATE TABLE IF NOT EXISTS match_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE match_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Match participants can view messages"
  ON match_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
    )
  );

CREATE POLICY "Match participants can send messages"
  ON match_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
    )
  );

-- Create online_users table for live match feature
CREATE TABLE IF NOT EXISTS online_users (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  last_seen timestamptz DEFAULT now(),
  is_searching boolean DEFAULT false
);

ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view online status"
  ON online_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own online status"
  ON online_users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own status"
  ON online_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own status"
  ON online_users FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_notes_author ON notes(author_id);
CREATE INDEX IF NOT EXISTS idx_notes_type ON notes(type);
CREATE INDEX IF NOT EXISTS idx_notes_subject ON notes(subject);
CREATE INDEX IF NOT EXISTS idx_notes_created ON notes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_clubs_founder ON clubs(founder_id);
CREATE INDEX IF NOT EXISTS idx_clubs_category ON clubs(category);

CREATE INDEX IF NOT EXISTS idx_club_members_club ON club_members(club_id);
CREATE INDEX IF NOT EXISTS idx_club_members_user ON club_members(user_id);

CREATE INDEX IF NOT EXISTS idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);

CREATE INDEX IF NOT EXISTS idx_messages_match ON match_messages(match_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON match_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_online_users_searching ON online_users(is_searching) WHERE is_searching = true;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON clubs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();