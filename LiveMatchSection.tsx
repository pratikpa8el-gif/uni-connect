import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Zap, Users, MessageCircle, X, Send, SkipForward } from "lucide-react";

interface Student {
  id: string;
  name: string;
  university: string;
  major: string;
  interests: string[];
  avatar?: string;
  isOnline: boolean;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Jake Thompson",
    university: "Harvard",
    major: "Computer Science",
    interests: ["AI", "Web Dev", "Gaming"],
    isOnline: true,
  },
  {
    id: "2",
    name: "Sofia Martinez",
    university: "Yale",
    major: "Data Science",
    interests: ["Machine Learning", "Statistics", "Photography"],
    isOnline: true,
  },
  {
    id: "3",
    name: "Ryan Park",
    university: "Princeton",
    major: "Electrical Engineering",
    interests: ["Robotics", "IoT", "Music"],
    isOnline: true,
  },
  {
    id: "4",
    name: "Lily Chen",
    university: "Columbia",
    major: "Business",
    interests: ["Startups", "Finance", "Travel"],
    isOnline: true,
  },
];

interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: Date;
}

export function LiveMatchSection() {
  const [isSearching, setIsSearching] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Student | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [onlineCount] = useState(1247);

  const startMatching = () => {
    setIsSearching(true);
    // Simulate finding a match
    setTimeout(() => {
      const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
      setCurrentMatch(randomStudent);
      setIsSearching(false);
      setMessages([
        {
          id: "1",
          sender: "them",
          text: "Hey! Nice to meet you!",
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  };

  const skipMatch = () => {
    setCurrentMatch(null);
    setMessages([]);
    startMatching();
  };

  const endChat = () => {
    setCurrentMatch(null);
    setMessages([]);
  };

  const sendMessage = () => {
    if (messageInput.trim() && currentMatch) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "me",
        text: messageInput,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");

      // Simulate response
      setTimeout(() => {
        const responses = [
          "That's interesting!",
          "I totally agree!",
          "Tell me more about that",
          "Same here!",
          "That sounds cool!",
        ];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: "them",
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2>Live Match</h2>
        <p className="text-gray-600">Connect instantly with students from other universities</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">{onlineCount} students online now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {!currentMatch && !isSearching && (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <Zap className="h-16 w-16 mx-auto mb-4 text-indigo-600" />
                  <h3 className="mb-2">Ready to meet someone new?</h3>
                  <p className="text-gray-600 mb-6">
                    Get matched with a random student from another university and start chatting instantly!
                  </p>
                  <Button size="lg" onClick={startMatching}>
                    <Zap className="mr-2 h-5 w-5" />
                    Start Matching
                  </Button>
                </div>
              </div>
            )}

            {isSearching && (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <h3 className="mb-2">Finding a match...</h3>
                  <p className="text-gray-600">Connecting you with someone awesome</p>
                </div>
              </div>
            )}

            {currentMatch && (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={currentMatch.avatar} />
                        <AvatarFallback>{currentMatch.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{currentMatch.name}</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {currentMatch.university} • {currentMatch.major}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={skipMatch}>
                        <SkipForward className="h-4 w-4 mr-2" />
                        Skip
                      </Button>
                      <Button variant="ghost" size="sm" onClick={endChat}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.sender === "me"
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3>How it Works</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  1
                </div>
                <div>
                  <div>Click "Start Matching"</div>
                  <p className="text-sm text-gray-600">We'll find you a random student</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  2
                </div>
                <div>
                  <div>Start Chatting</div>
                  <p className="text-sm text-gray-600">Have a conversation, make friends</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  3
                </div>
                <div>
                  <div>Skip or Continue</div>
                  <p className="text-sm text-gray-600">Not a good match? Skip to the next person</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {currentMatch && (
            <Card>
              <CardHeader>
                <h3>About {currentMatch.name}</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500 mb-1">University</div>
                  <div>{currentMatch.university}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Major</div>
                  <div>{currentMatch.major}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Interests</div>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h3>Safety Tips</h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>• Be respectful and friendly</p>
              <p>• Don't share personal information</p>
              <p>• Report inappropriate behavior</p>
              <p>• Have fun making new connections!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
