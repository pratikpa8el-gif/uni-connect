import { Home, BookOpen, Users, Zap, User, LogOut, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: {
    name: string;
    university: string;
    avatar?: string;
  };
}

export function Sidebar({ activeTab, onTabChange, currentUser }: SidebarProps) {
  const menuItems = [
    { id: "feed", label: "Feed", icon: Home },
    { id: "notes", label: "Notes & PYQs", icon: BookOpen },
    { id: "clubs", label: "Clubs", icon: Users },
    { id: "colleges", label: "Universities", icon: Building2 },
    { id: "match", label: "Live Match", icon: Zap },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-indigo-600">UniConnect</h1>
      </div>

      <div className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start mb-1"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="truncate">{currentUser.name}</div>
            <div className="text-gray-500 text-sm truncate">{currentUser.university}</div>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
