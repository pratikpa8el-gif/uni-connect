import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, Users, BookOpen, Building2, TrendingUp, MapPin } from "lucide-react";

interface College {
  id: string;
  name: string;
  location: string;
  country: string;
  studentsOnPlatform: number;
  notesShared: number;
  clubsCreated: number;
  rank?: number;
  imageUrl?: string;
  type: "public" | "private";
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    country: "USA",
    studentsOnPlatform: 2847,
    notesShared: 1234,
    clubsCreated: 45,
    rank: 1,
    imageUrl: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyNTM4NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    type: "private",
  },
  {
    id: "2",
    name: "Stanford University",
    location: "Stanford, CA",
    country: "USA",
    studentsOnPlatform: 2654,
    notesShared: 1156,
    clubsCreated: 42,
    rank: 2,
    imageUrl: "https://images.unsplash.com/photo-1681782421941-753686f6a556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MjYxOTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    type: "private",
  },
  {
    id: "3",
    name: "Harvard University",
    location: "Cambridge, MA",
    country: "USA",
    studentsOnPlatform: 2523,
    notesShared: 1089,
    clubsCreated: 38,
    rank: 3,
    imageUrl: "https://images.unsplash.com/photo-1672912995257-0c8255289523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc2MjYxOTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    type: "private",
  },
  {
    id: "4",
    name: "University of California, Berkeley",
    location: "Berkeley, CA",
    country: "USA",
    studentsOnPlatform: 3456,
    notesShared: 1567,
    clubsCreated: 52,
    rank: 4,
    type: "public",
  },
  {
    id: "5",
    name: "Oxford University",
    location: "Oxford",
    country: "UK",
    studentsOnPlatform: 2234,
    notesShared: 967,
    clubsCreated: 34,
    rank: 5,
    type: "public",
  },
  {
    id: "6",
    name: "Cambridge University",
    location: "Cambridge",
    country: "UK",
    studentsOnPlatform: 2187,
    notesShared: 945,
    clubsCreated: 32,
    rank: 6,
    type: "public",
  },
  {
    id: "7",
    name: "IIT Delhi",
    location: "New Delhi",
    country: "India",
    studentsOnPlatform: 1892,
    notesShared: 823,
    clubsCreated: 28,
    rank: 7,
    type: "public",
  },
  {
    id: "8",
    name: "IIT Bombay",
    location: "Mumbai",
    country: "India",
    studentsOnPlatform: 1845,
    notesShared: 798,
    clubsCreated: 26,
    rank: 8,
    type: "public",
  },
  {
    id: "9",
    name: "Princeton University",
    location: "Princeton, NJ",
    country: "USA",
    studentsOnPlatform: 1654,
    notesShared: 712,
    clubsCreated: 24,
    rank: 9,
    type: "private",
  },
  {
    id: "10",
    name: "Yale University",
    location: "New Haven, CT",
    country: "USA",
    studentsOnPlatform: 1587,
    notesShared: 689,
    clubsCreated: 23,
    rank: 10,
    type: "private",
  },
  {
    id: "11",
    name: "Columbia University",
    location: "New York, NY",
    country: "USA",
    studentsOnPlatform: 1523,
    notesShared: 654,
    clubsCreated: 22,
    type: "private",
  },
  {
    id: "12",
    name: "ETH Zurich",
    location: "Zurich",
    country: "Switzerland",
    studentsOnPlatform: 1456,
    notesShared: 623,
    clubsCreated: 21,
    type: "public",
  },
  {
    id: "13",
    name: "University of Toronto",
    location: "Toronto",
    country: "Canada",
    studentsOnPlatform: 1398,
    notesShared: 601,
    clubsCreated: 20,
    type: "public",
  },
  {
    id: "14",
    name: "National University of Singapore",
    location: "Singapore",
    country: "Singapore",
    studentsOnPlatform: 1287,
    notesShared: 556,
    clubsCreated: 19,
    type: "public",
  },
  {
    id: "15",
    name: "University of Melbourne",
    location: "Melbourne",
    country: "Australia",
    studentsOnPlatform: 1156,
    notesShared: 498,
    clubsCreated: 17,
    type: "public",
  },
];

export function CollegesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [sortBy, setSortBy] = useState("students");

  const countries = ["all", "USA", "UK", "India", "Canada", "Australia", "Singapore", "Switzerland"];

  const filteredColleges = mockColleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry === "all" || college.country === selectedCountry;
      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => {
      if (sortBy === "students") return b.studentsOnPlatform - a.studentsOnPlatform;
      if (sortBy === "notes") return b.notesShared - a.notesShared;
      if (sortBy === "clubs") return b.clubsCreated - a.clubsCreated;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const totalStats = {
    totalColleges: mockColleges.length,
    totalStudents: mockColleges.reduce((sum, college) => sum + college.studentsOnPlatform, 0),
    totalNotes: mockColleges.reduce((sum, college) => sum + college.notesShared, 0),
    totalClubs: mockColleges.reduce((sum, college) => sum + college.clubsCreated, 0),
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2>Universities</h2>
        <p className="text-gray-600">Explore colleges and universities from around the world</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-gray-500 text-sm">Total Universities</div>
                <div className="text-2xl">{totalStats.totalColleges}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-gray-500 text-sm">Total Students</div>
                <div className="text-2xl">{totalStats.totalStudents.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-gray-500 text-sm">Notes Shared</div>
                <div className="text-2xl">{totalStats.totalNotes.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-gray-500 text-sm">Active Clubs</div>
                <div className="text-2xl">{totalStats.totalClubs}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search universities or locations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country} value={country}>
                {country === "all" ? "All Countries" : country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="students">Most Students</SelectItem>
            <SelectItem value="notes">Most Notes</SelectItem>
            <SelectItem value="clubs">Most Clubs</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredColleges.map((college) => (
          <Card key={college.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {college.imageUrl ? (
              <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                <img 
                  src={college.imageUrl} 
                  alt={college.name}
                  className="w-full h-full object-cover"
                />
                {college.rank && college.rank <= 10 && (
                  <Badge className="absolute top-3 right-3 bg-yellow-500">
                    Top {college.rank}
                  </Badge>
                )}
              </div>
            ) : (
              <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center relative">
                <Building2 className="h-16 w-16 text-white opacity-50" />
                {college.rank && college.rank <= 10 && (
                  <Badge className="absolute top-3 right-3 bg-yellow-500">
                    Top {college.rank}
                  </Badge>
                )}
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-2">{college.name}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{college.location}, {college.country}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Students</span>
                  </div>
                  <span>{college.studentsOnPlatform.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>Notes Shared</span>
                  </div>
                  <span>{college.notesShared.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span>Clubs</span>
                  </div>
                  <span>{college.clubsCreated}</span>
                </div>
                <Button className="w-full mt-2" variant="outline">
                  View Students
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredColleges.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No universities found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
