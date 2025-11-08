import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Edit, BookOpen, Users, Download, Trophy } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNotes } from "../hooks/useNotes";
import { useClubs } from "../hooks/useClubs";

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, updateProfile } = useAuth();
  const { notes } = useNotes();
  const { clubs, isJoined } = useClubs();

  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    interests: profile?.interests?.join(", ") || "",
    major: profile?.major || "",
    semester: profile?.semester || "",
  });

  const myNotes = notes.filter((note) => note.author_id === profile?.id);
  const myClubs = clubs.filter((club) => isJoined(club.id));
  const totalDownloads = myNotes.reduce((sum, note) => sum + note.downloads, 0);

  const stats = {
    notesShared: myNotes.length,
    notesDownloaded: totalDownloads,
    clubsJoined: myClubs.length,
    connectionsMatch: 0,
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        bio: formData.bio,
        interests: formData.interests.split(",").map((i) => i.trim()).filter(Boolean),
        major: formData.major,
        semester: formData.semester,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="mb-1">{profile.name}</h2>
                  <p className="text-gray-600 mb-2">
                    {profile.major || "Computer Science"} • {profile.semester || "3rd Year"}
                  </p>
                  <Badge>{profile.university}</Badge>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isEditing) {
                      handleSave();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </div>

              {!isEditing ? (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    {profile.bio ||
                      "No bio yet. Click 'Edit Profile' to add information about yourself."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests && profile.interests.length > 0 ? (
                      profile.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary">
                          {interest}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No interests added yet</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Major</Label>
                    <Input
                      value={formData.major}
                      onChange={(e) =>
                        setFormData({ ...formData, major: e.target.value })
                      }
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <Label>Semester</Label>
                    <Input
                      value={formData.semester}
                      onChange={(e) =>
                        setFormData({ ...formData, semester: e.target.value })
                      }
                      placeholder="e.g., 3rd Year"
                    />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Interests (comma separated)</Label>
                    <Input
                      value={formData.interests}
                      onChange={(e) =>
                        setFormData({ ...formData, interests: e.target.value })
                      }
                      placeholder="e.g., Machine Learning, Web Development, Photography"
                    />
                  </div>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
            <div className="text-gray-900">{stats.notesShared}</div>
            <div className="text-sm text-gray-600">Notes Shared</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-gray-900">{stats.notesDownloaded}</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-gray-900">{stats.clubsJoined}</div>
            <div className="text-sm text-gray-600">Clubs Joined</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-gray-900">{stats.connectionsMatch}</div>
            <div className="text-sm text-gray-600">Connections</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList>
          <TabsTrigger value="notes">My Notes</TabsTrigger>
          <TabsTrigger value="clubs">My Clubs</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="mt-6 space-y-4">
          {myNotes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="mb-1">{note.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <Badge variant="outline">{note.subject}</Badge>
                      <span>Uploaded {new Date(note.created_at).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {note.downloads} downloads
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {myNotes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>You haven't shared any notes yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="clubs" className="mt-6 space-y-4">
          {myClubs.map((club) => (
            <Card key={club.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="mb-1">{club.name}</h3>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.members_count.toLocaleString()} members
                    </div>
                  </div>
                  <Button variant="outline">View Club</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {myClubs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>You haven't joined any clubs yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity" className="mt-6 space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {myNotes.length > 0 ? (
                myNotes.slice(0, 3).map((note) => (
                  <div key={note.id} className="flex gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p>
                        Uploaded <span>{note.title}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(note.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No recent activity</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
