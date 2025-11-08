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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Download, Heart, Search, Filter } from "lucide-react";

interface Note {
  id: string;
  title: string;
  subject: string;
  type: "notes" | "pyq";
  author: {
    name: string;
    university: string;
    avatar?: string;
  };
  description: string;
  semester: string;
  downloads: number;
  likes: number;
  uploadDate: string;
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Operating Systems Complete Guide",
    subject: "Computer Science",
    type: "notes",
    author: { name: "David Lee", university: "UC Berkeley" },
    description: "Comprehensive notes covering Process Management, Memory Management, and File Systems",
    semester: "5th Semester",
    downloads: 234,
    likes: 67,
    uploadDate: "Nov 1, 2025",
  },
  {
    id: "2",
    title: "Physics PYQ 2020-2024",
    subject: "Physics",
    type: "pyq",
    author: { name: "Emma Wilson", university: "Oxford" },
    description: "Previous year questions with detailed solutions for Quantum Mechanics and Thermodynamics",
    semester: "3rd Semester",
    downloads: 456,
    likes: 123,
    uploadDate: "Oct 28, 2025",
  },
  {
    id: "3",
    title: "Database Management Systems Notes",
    subject: "Computer Science",
    type: "notes",
    author: { name: "Rahul Verma", university: "IIT Bombay" },
    description: "SQL, NoSQL, Normalization, and Transaction Management explained with examples",
    semester: "4th Semester",
    downloads: 189,
    likes: 54,
    uploadDate: "Oct 25, 2025",
  },
  {
    id: "4",
    title: "Organic Chemistry PYQ",
    subject: "Chemistry",
    type: "pyq",
    author: { name: "Maria Garcia", university: "Cambridge" },
    description: "5 years of previous exam papers with step-by-step solutions",
    semester: "2nd Semester",
    downloads: 312,
    likes: 89,
    uploadDate: "Oct 20, 2025",
  },
];

export function NotesSection() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2>Notes & PYQs Library</h2>
          <p className="text-gray-600">Share and access study materials from universities worldwide</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Study Material</DialogTitle>
              <DialogDescription>Share your notes or PYQs with students worldwide</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input placeholder="e.g., Data Structures Complete Notes" />
              </div>
              <div>
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="pyq">Previous Year Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="e.g., Computer Science" />
              </div>
              <div>
                <Label>Semester</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Semester</SelectItem>
                    <SelectItem value="2">2nd Semester</SelectItem>
                    <SelectItem value="3">3rd Semester</SelectItem>
                    <SelectItem value="4">4th Semester</SelectItem>
                    <SelectItem value="5">5th Semester</SelectItem>
                    <SelectItem value="6">6th Semester</SelectItem>
                    <SelectItem value="7">7th Semester</SelectItem>
                    <SelectItem value="8">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Brief description of the content..." rows={3} />
              </div>
              <div>
                <Label>Upload File (PDF)</Label>
                <Input type="file" accept=".pdf" />
              </div>
              <Button className="w-full" onClick={() => setOpen(false)}>Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notes, subjects, or topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="pyq">PYQs</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-6">
          {mockNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{note.title}</h3>
                      <Badge variant={note.type === "notes" ? "default" : "secondary"}>
                        {note.type === "notes" ? "Notes" : "PYQ"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>{note.subject}</span>
                      <span>•</span>
                      <span>{note.semester}</span>
                      <span>•</span>
                      <span>{note.uploadDate}</span>
                    </div>
                    <p className="text-gray-700">{note.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={note.author.avatar} />
                    <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{note.author.name}</div>
                    <div className="text-xs text-gray-500">{note.author.university}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mr-4">
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {note.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {note.likes}
                    </span>
                  </div>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="notes" className="space-y-4 mt-6">
          {mockNotes.filter(note => note.type === "notes").map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="mb-2">{note.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>{note.subject}</span>
                      <span>•</span>
                      <span>{note.semester}</span>
                    </div>
                    <p className="text-gray-700">{note.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{note.author.name}</div>
                    <div className="text-xs text-gray-500">{note.author.university}</div>
                  </div>
                </div>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="pyq" className="space-y-4 mt-6">
          {mockNotes.filter(note => note.type === "pyq").map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="mb-2">{note.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>{note.subject}</span>
                      <span>•</span>
                      <span>{note.semester}</span>
                    </div>
                    <p className="text-gray-700">{note.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{note.author.name}</div>
                    <div className="text-xs text-gray-500">{note.author.university}</div>
                  </div>
                </div>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
