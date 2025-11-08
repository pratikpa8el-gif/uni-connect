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

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    notesShared: 12,
    notesDownloaded: 45,
    clubsJoined: 3,
    connectionsMatch: 28,
  };

  const myNotes = [
    {
      id: "1",
      title: "Machine Learning Complete Guide",
      subject: "Computer Science",
      downloads: 156,
      uploadDate: "Oct 15, 2025",
    },
    {
      id: "2",
      title: "Calculus II PYQ 2024",
      subject: "Mathematics",
      downloads: 89,
      uploadDate: "Sep 28, 2025",
    },
  ];

  const myClubs = [
    { id: "1", name: "AI & Machine Learning Enthusiasts", members: 1234 },
    { id: "2", name: "Design & UX Community", members: 654 },
    { id: "3", name: "Competitive Programming Club", members: 892 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="mb-1">John Doe</h2>
                  <p className="text-gray-600 mb-2">Computer Science • 3rd Year</p>
                  <Badge>Massachusetts Institute of Technology</Badge>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
              
              {!isEditing ? (
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Passionate about AI and Machine Learning. Love to share knowledge and learn from others. 
                    Always excited to connect with fellow students!
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">Web Development</Badge>
                    <Badge variant="secondary">Data Science</Badge>
                    <Badge variant="secondary">Photography</Badge>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Bio</Label>
                    <Textarea 
                      defaultValue="Passionate about AI and Machine Learning. Love to share knowledge and learn from others."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Interests (comma separated)</Label>
                    <Input defaultValue="Machine Learning, Web Development, Data Science, Photography" />
                  </div>
                  <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
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
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
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
                      <span>Uploaded {note.uploadDate}</span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {note.downloads} downloads
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
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
                      {club.members.toLocaleString()} members
                    </div>
                  </div>
                  <Button variant="outline">View Club</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="mt-6 space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p>Uploaded <span>Machine Learning Complete Guide</span></p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p>Joined <span>Design & UX Community</span></p>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p>Matched with 3 new students on Live Match</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
