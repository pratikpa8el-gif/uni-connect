import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Share2, Download } from "lucide-react";

interface Post {
  id: string;
  type: "note" | "club" | "announcement";
  author: {
    name: string;
    university: string;
    avatar?: string;
  };
  content: string;
  title?: string;
  subject?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: "1",
    type: "note",
    author: { name: "Sarah Johnson", university: "MIT", avatar: "" },
    title: "Data Structures Complete Notes",
    subject: "Computer Science",
    content: "Sharing my complete notes on Data Structures covering Arrays, Linked Lists, Trees, and Graphs. Perfect for semester exams!",
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12,
  },
  {
    id: "2",
    type: "club",
    author: { name: "Alex Chen", university: "Stanford", avatar: "" },
    title: "AI Research Club - New Members Welcome!",
    content: "We're starting a new project on Natural Language Processing. Looking for passionate members interested in ML and AI. Weekly meetings every Friday!",
    timestamp: "5 hours ago",
    likes: 28,
    comments: 8,
  },
  {
    id: "3",
    type: "note",
    author: { name: "Priya Sharma", university: "IIT Delhi", avatar: "" },
    title: "Calculus PYQ Solutions 2020-2024",
    subject: "Mathematics",
    content: "Solved previous year questions from 2020 to 2024. Includes detailed explanations for each problem.",
    timestamp: "1 day ago",
    likes: 89,
    comments: 23,
  },
];

export function FeedSection() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2>Your Feed</h2>
          <p className="text-gray-600">Latest updates from your network</p>
        </div>
      </div>

      {mockPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div>{post.author.name}</div>
                  <div className="text-gray-500 text-sm">{post.author.university} • {post.timestamp}</div>
                </div>
              </div>
              <Badge variant={post.type === "note" ? "default" : "secondary"}>
                {post.type === "note" ? "Notes" : "Club"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {post.title && <h3 className="mb-2">{post.title}</h3>}
            {post.subject && (
              <Badge variant="outline" className="mb-2">
                {post.subject}
              </Badge>
            )}
            <p className="text-gray-700">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="ghost" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            {post.type === "note" && (
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
