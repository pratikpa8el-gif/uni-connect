import { useState, useEffect } from "react";
import { supabase, Club, ClubMember } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export function useClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [myMemberships, setMyMemberships] = useState<ClubMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clubs")
        .select(`
          *,
          founder:profiles(id, name, university, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClubs(data || []);

      if (user) {
        const { data: memberships, error: membershipsError } = await supabase
          .from("club_members")
          .select("*")
          .eq("user_id", user.id);

        if (membershipsError) throw membershipsError;
        setMyMemberships(memberships || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch clubs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [user]);

  const createClub = async (clubData: {
    name: string;
    description: string;
    category: string;
    cover_image?: string;
  }) => {
    if (!user) throw new Error("Must be logged in to create clubs");

    const { data: club, error: clubError } = await supabase
      .from("clubs")
      .insert({
        ...clubData,
        founder_id: user.id,
      })
      .select(`
        *,
        founder:profiles(id, name, university, avatar_url)
      `)
      .single();

    if (clubError) throw clubError;

    const { error: memberError } = await supabase
      .from("club_members")
      .insert({
        club_id: club.id,
        user_id: user.id,
        role: "founder",
      });

    if (memberError) throw memberError;

    setClubs([club, ...clubs]);
    return club;
  };

  const joinClub = async (clubId: string) => {
    if (!user) throw new Error("Must be logged in to join clubs");

    const { error: memberError } = await supabase
      .from("club_members")
      .insert({
        club_id: clubId,
        user_id: user.id,
      });

    if (memberError) throw memberError;

    const { error: updateError } = await supabase.rpc("increment_club_members", {
      club_id: clubId,
    });

    if (updateError) {
      const club = clubs.find((c) => c.id === clubId);
      if (club) {
        await supabase
          .from("clubs")
          .update({ members_count: club.members_count + 1 })
          .eq("id", clubId);
      }
    }

    await fetchClubs();
  };

  const leaveClub = async (clubId: string) => {
    if (!user) throw new Error("Must be logged in");

    const { error: memberError } = await supabase
      .from("club_members")
      .delete()
      .eq("club_id", clubId)
      .eq("user_id", user.id);

    if (memberError) throw memberError;

    const club = clubs.find((c) => c.id === clubId);
    if (club) {
      await supabase
        .from("clubs")
        .update({ members_count: Math.max(0, club.members_count - 1) })
        .eq("id", clubId);
    }

    await fetchClubs();
  };

  const isJoined = (clubId: string) => {
    return myMemberships.some((m) => m.club_id === clubId);
  };

  return {
    clubs,
    loading,
    error,
    createClub,
    joinClub,
    leaveClub,
    isJoined,
    refetch: fetchClubs,
  };
}
