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
import { useNotes } from "../hooks/useNotes";

export function NotesSection() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    type: "notes" as "notes" | "pyq",
    description: "",
    semester: "",
  });
  const [uploading, setUploading] = useState(false);

  const { notes, loading, error, createNote, incrementDownload } = useNotes();

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      await createNote({
        ...formData,
        file_url: "https://example.com/sample.pdf",
      });
      setOpen(false);
      setFormData({
        title: "",
        subject: "",
        type: "notes",
        description: "",
        semester: "",
      });
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to upload note. Please try again.");
    } finally {
      setUploading(false);
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
        <p>Error loading notes: {error}</p>
      </div>
    );
  }

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="e.g., Data Structures Complete Notes"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "notes" | "pyq") =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="pyq">Previous Year Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input
                  placeholder="e.g., Computer Science"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Semester</Label>
                <Select
                  value={formData.semester}
                  onValueChange={(value) =>
                    setFormData({ ...formData, semester: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Semester">1st Semester</SelectItem>
                    <SelectItem value="2nd Semester">2nd Semester</SelectItem>
                    <SelectItem value="3rd Semester">3rd Semester</SelectItem>
                    <SelectItem value="4th Semester">4th Semester</SelectItem>
                    <SelectItem value="5th Semester">5th Semester</SelectItem>
                    <SelectItem value="6th Semester">6th Semester</SelectItem>
                    <SelectItem value="7th Semester">7th Semester</SelectItem>
                    <SelectItem value="8th Semester">8th Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Brief description of the content..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Upload File (PDF) - Coming Soon</Label>
                <Input type="file" accept=".pdf" disabled />
                <p className="text-xs text-gray-500 mt-1">File upload will be enabled after storage setup</p>
              </div>
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </form>
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
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
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
          {filteredNotes.map((note) => (
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
                      <span>{new Date(note.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700">{note.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={note.author?.avatar_url} />
                    <AvatarFallback>{note.author?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{note.author?.name}</div>
                    <div className="text-xs text-gray-500">{note.author?.university}</div>
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
                  <Button onClick={() => incrementDownload(note.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No notes found. Be the first to share!</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="notes" className="space-y-4 mt-6">
          {filteredNotes
            .filter((note) => note.type === "notes")
            .map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <h3 className="mb-2">{note.title}</h3>
                  <p className="text-gray-700">{note.description}</p>
                </CardHeader>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{note.author?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">{note.author?.name}</div>
                      <div className="text-xs text-gray-500">{note.author?.university}</div>
                    </div>
                  </div>
                  <Button onClick={() => incrementDownload(note.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="pyq" className="space-y-4 mt-6">
          {filteredNotes
            .filter((note) => note.type === "pyq")
            .map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <h3 className="mb-2">{note.title}</h3>
                  <p className="text-gray-700">{note.description}</p>
                </CardHeader>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{note.author?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">{note.author?.name}</div>
                      <div className="text-xs text-gray-500">{note.author?.university}</div>
                    </div>
                  </div>
                  <Button onClick={() => incrementDownload(note.id)}>
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
