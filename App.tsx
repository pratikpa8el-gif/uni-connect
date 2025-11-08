import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { FeedSection } from "./components/FeedSection";
import { NotesSection } from "./components/NotesSection";
import { ClubsSection } from "./components/ClubsSection";
import { CollegesSection } from "./components/CollegesSection";
import { LiveMatchSection } from "./components/LiveMatchSection";
import { ProfileSection } from "./components/ProfileSection";

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");

  const currentUser = {
    name: "John Doe",
    university: "MIT",
    avatar: "",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        currentUser={currentUser}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeTab === "feed" && <FeedSection />}
          {activeTab === "notes" && <NotesSection />}
          {activeTab === "clubs" && <ClubsSection />}
          {activeTab === "colleges" && <CollegesSection />}
          {activeTab === "match" && <LiveMatchSection />}
          {activeTab === "profile" && <ProfileSection />}
        </div>
      </div>
    </div>
  );
}
