import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginPage } from "./components/auth/LoginPage";
import { SignupPage } from "./components/auth/SignupPage";
import { Sidebar } from "./components/Sidebar";
import { FeedSection } from "./components/FeedSection";
import { NotesSection } from "./components/NotesSection";
import { ClubsSection } from "./components/ClubsSection";
import { CollegesSection } from "./components/CollegesSection";
import { LiveMatchSection } from "./components/LiveMatchSection";
import { ProfileSection } from "./components/ProfileSection";

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState("feed");
  const { profile } = useAuth();

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentUser = {
    name: profile.name,
    university: profile.university,
    avatar: profile.avatar_url || "",
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

function AppContent() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return showLogin ? (
      <LoginPage onSwitchToSignup={() => setShowLogin(false)} />
    ) : (
      <SignupPage onSwitchToLogin={() => setShowLogin(true)} />
    );
  }

  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
