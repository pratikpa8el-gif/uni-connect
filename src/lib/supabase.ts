import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  university: string;
  major?: string;
  semester?: string;
  bio?: string;
  interests?: string[];
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type University = {
  id: string;
  name: string;
  location: string;
  country: string;
  type: "public" | "private";
  rank?: number;
  image_url?: string;
  created_at: string;
};

export type Note = {
  id: string;
  title: string;
  subject: string;
  type: "notes" | "pyq";
  description: string;
  semester: string;
  file_url: string;
  author_id: string;
  downloads: number;
  likes: number;
  created_at: string;
  updated_at: string;
  author?: Profile;
};

export type Club = {
  id: string;
  name: string;
  description: string;
  category: string;
  cover_image?: string;
  founder_id: string;
  members_count: number;
  posts_count: number;
  created_at: string;
  updated_at: string;
  founder?: Profile;
};

export type ClubMember = {
  id: string;
  club_id: string;
  user_id: string;
  role: "founder" | "admin" | "member";
  joined_at: string;
};

export type Match = {
  id: string;
  user1_id: string;
  user2_id: string;
  status: "active" | "ended";
  created_at: string;
  ended_at?: string;
};

export type MatchMessage = {
  id: string;
  match_id: string;
  sender_id: string;
  message: string;
  created_at: string;
};

export type OnlineUser = {
  user_id: string;
  last_seen: string;
  is_searching: boolean;
};
