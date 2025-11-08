import { useState, useEffect } from "react";
import { supabase, Note } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select(`
          *,
          author:profiles(id, name, university, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (noteData: {
    title: string;
    subject: string;
    type: "notes" | "pyq";
    description: string;
    semester: string;
    file_url: string;
  }) => {
    if (!user) throw new Error("Must be logged in to create notes");

    const { data, error } = await supabase
      .from("notes")
      .insert({
        ...noteData,
        author_id: user.id,
      })
      .select(`
        *,
        author:profiles(id, name, university, avatar_url)
      `)
      .single();

    if (error) throw error;

    setNotes([data, ...notes]);
    return data;
  };

  const incrementDownload = async (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    const { error } = await supabase
      .from("notes")
      .update({ downloads: note.downloads + 1 })
      .eq("id", noteId);

    if (!error) {
      setNotes(
        notes.map((n) =>
          n.id === noteId ? { ...n, downloads: n.downloads + 1 } : n
        )
      );
    }
  };

  const incrementLike = async (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    const { error } = await supabase
      .from("notes")
      .update({ likes: note.likes + 1 })
      .eq("id", noteId);

    if (!error) {
      setNotes(
        notes.map((n) => (n.id === noteId ? { ...n, likes: n.likes + 1 } : n))
      );
    }
  };

  return {
    notes,
    loading,
    error,
    createNote,
    incrementDownload,
    incrementLike,
    refetch: fetchNotes,
  };
}
