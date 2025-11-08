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
import { Plus, Users, MessageSquare } from "lucide-react";
import { useClubs } from "../hooks/useClubs";

export function ClubsSection() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [creating, setCreating] = useState(false);

  const { clubs, loading, error, createClub, joinClub, leaveClub, isJoined } = useClubs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      await createClub(formData);
      setOpen(false);
      setFormData({ name: "", category: "", description: "" });
    } catch (err) {
      console.error("Error creating club:", err);
      alert("Failed to create club. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleJoinToggle = async (clubId: string) => {
    try {
      if (isJoined(clubId)) {
        await leaveClub(clubId);
      } else {
        await joinClub(clubId);
      }
    } catch (err) {
      console.error("Error toggling club membership:", err);
      alert("Failed to update membership. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading clubs: {error}</p>
      </div>
    );
  }

  const joinedClubs = clubs.filter((club) => isJoined(club.id));
  const recommendedClubs = clubs.filter((club) => !isJoined(club.id)).slice(0, 4);

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Club Name</Label>
                <Input
                  placeholder="e.g., AI Research Group"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  placeholder="e.g., Technology, Arts, Sports"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="What is this club about?"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={creating}>
                {creating ? "Creating..." : "Create Club"}
              </Button>
            </form>
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
                {club.cover_image ? (
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
                    <img
                      src={club.cover_image}
                      alt={club.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500" />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="mb-1">{club.name}</h3>
                      <Badge variant="outline" className="mb-2">
                        {club.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{club.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={club.founder?.avatar_url} />
                      <AvatarFallback>
                        {club.founder?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">Founded by {club.founder?.name}</div>
                      <div className="text-xs text-gray-500">
                        {club.founder?.university}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.members_count.toLocaleString()} members
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {club.posts_count} posts
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button
                    className="w-full"
                    variant={isJoined(club.id) ? "outline" : "default"}
                    onClick={() => handleJoinToggle(club.id)}
                  >
                    {isJoined(club.id) ? "Joined" : "Join Club"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {clubs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No clubs yet</p>
              <p className="text-sm">Be the first to create a club!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="joined" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden">
                {club.cover_image ? (
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
                    <img
                      src={club.cover_image}
                      alt={club.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500" />
                )}
                <CardHeader>
                  <h3 className="mb-1">{club.name}</h3>
                  <p className="text-gray-700 text-sm">{club.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.members_count.toLocaleString()} members
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {club.posts_count} posts
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex gap-2">
                  <Button className="flex-1">View Club</Button>
                  <Button variant="outline" onClick={() => handleJoinToggle(club.id)}>
                    Leave
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {joinedClubs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>You haven't joined any clubs yet</p>
              <p className="text-sm">Explore clubs and join communities that interest you</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden">
                {club.cover_image ? (
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500 relative">
                    <img
                      src={club.cover_image}
                      alt={club.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-500" />
                )}
                <CardHeader>
                  <h3 className="mb-1">{club.name}</h3>
                  <Badge variant="outline" className="mb-2">
                    {club.category}
                  </Badge>
                  <p className="text-gray-700 text-sm">{club.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.members_count.toLocaleString()} members
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
