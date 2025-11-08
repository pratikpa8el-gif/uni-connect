import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Users, Calendar, MessageSquare } from "lucide-react";

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  founder: {
    name: string;
    university: string;
    avatar?: string;
  };
  members: number;
  posts: number;
  isJoined: boolean;
  coverImage?: string;
}

const mockClubs: Club[] = [
  {
    id: "1",
    name: "AI & Machine Learning Enthusiasts",
    description: "A community for students passionate about AI, ML, and Deep Learning. We share resources, work on projects, and discuss latest research papers.",
    category: "Technology",
    founder: { name: "Alex Chen", university: "Stanford" },
    members: 1234,
    posts: 567,
    isJoined: true,
    coverImage: "https://images.unsplash.com/photo-1704748082614-8163a88e56b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBzdHVkeWluZ3xlbnwxfHx8fDE3NjI1ODQ4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    name: "Competitive Programming Club",
    description: "Practice coding problems, participate in contests, and improve your algorithmic thinking. Weekly contests and discussions.",
    category: "Technology",
    founder: { name: "Sarah Johnson", university: "MIT" },
    members: 892,
    posts: 423,
    isJoined: false,
    coverImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzfGVufDF8fHx8MTc2MjYxMzYwMnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    name: "Design & UX Community",
    description: "For designers and UX enthusiasts to share work, get feedback, and learn about the latest design trends and tools.",
    category: "Design",
    founder: { name: "Emma Wilson", university: "Oxford" },
    members: 654,
    posts: 289,
    isJoined: true,
  },
  {
    id: "4",
    name: "Entrepreneurship Network",
    description: "Connect with fellow entrepreneurs, share startup ideas, and learn about business development and fundraising.",
    category: "Business",
    founder: { name: "David Lee", university: "UC Berkeley" },
    members: 1567,
    posts: 834,
    isJoined: false,
  },
  {
    id: "5",
    name: "Research Paper Reading Group",
    description: "Weekly sessions to read and discuss recent research papers across various fields of science and technology.",
    category: "Academic",
    founder: { name: "Priya Sharma", university: "IIT Delhi" },
    members: 423,
    posts: 178,
    isJoined: false,
  },
];

export function ClubsSection() {
  const [open, setOpen] = useState(false);
  const [clubs, setClubs] = useState(mockClubs);

  const handleJoinToggle = (clubId: string) => {
    setClubs(clubs.map(club => 
      club.id === clubId 
        ? { ...club, isJoined: !club.isJoined, members: club.isJoined ? club.members - 1 : club.members + 1 }
        : club
    ));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2>Clubs & Communities</h2>
          <p className="text-gray-600">Join clubs and connect with students who share your interests</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Club
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create a New Club</DialogTitle>
              <DialogDescription>Start a community around your interests</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Club Name</Label>
                <Input placeholder="e.g., AI Research Group" />
              </div>
              <div>
                <Label>Category</Label>
                <Input placeholder="e.g., Technology, Arts, Sports" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="What is this club about?" rows={4} />
              </div>
              <div>
                <Label>Cover Image (Optional)</Label>
                <Input type="file" accept="image/*" />
              </div>
              <Button className="w-full" onClick={() => setOpen(false)}>Create Club</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Clubs</TabsTrigger>
          <TabsTrigger value="joined">My Clubs</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clubs.map((club) => (
              <Card key={club.id} className="overflow-hidden">
                {club.coverImage && (
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                    <img 
                      src={club.coverImage} 
                      alt={club.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                )}
                {!club.coverImage && (
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="mb-1">{club.name}</h3>
                      <Badge variant="outline" className="mb-2">{club.category}</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{club.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={club.founder.avatar} />
                      <AvatarFallback>{club.founder.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">Founded by {club.founder.name}</div>
                      <div className="text-xs text-gray-500">{club.founder.university}</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.members.toLocaleString()} members
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {club.posts} posts
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    className="w-full"
                    variant={club.isJoined ? "outline" : "default"}
                    onClick={() => handleJoinToggle(club.id)}
                  >
                    {club.isJoined ? "Joined" : "Join Club"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="joined" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clubs.filter(club => club.isJoined).map((club) => (
              <Card key={club.id} className="overflow-hidden">
                {club.coverImage && (
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                    <img 
                      src={club.coverImage} 
                      alt={club.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                )}
                {!club.coverImage && (
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
                <CardHeader>
                  <h3 className="mb-1">{club.name}</h3>
                  <p className="text-gray-700 text-sm">{club.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.members.toLocaleString()} members
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {club.posts} posts
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex gap-2">
                  <Button className="flex-1">View Club</Button>
                  <Button variant="outline" onClick={() => handleJoinToggle(club.id)}>Leave</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {clubs.filter(club => club.isJoined).length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>You haven't joined any clubs yet</p>
              <p className="text-sm">Explore clubs and join communities that interest you</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clubs.filter(club => !club.isJoined).slice(0, 4).map((club) => (
              <Card key={club.id} className="overflow-hidden">
                {club.coverImage && (
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                    <img 
                      src={club.coverImage} 
                      alt={club.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                )}
                {!club.coverImage && (
                  <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
                <CardHeader>
                  <h3 className="mb-1">{club.name}</h3>
                  <Badge variant="outline" className="mb-2">{club.category}</Badge>
                  <p className="text-gray-700 text-sm">{club.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.members.toLocaleString()} members
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" onClick={() => handleJoinToggle(club.id)}>
                    Join Club
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
