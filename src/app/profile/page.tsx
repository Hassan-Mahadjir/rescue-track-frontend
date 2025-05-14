"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { Profile } from "@/components/profile/profile";
import { AccountSummary } from "@/components/profile/account-summary";
import { ActivityLog } from "@/components/profile/activity-log";

// Define the user profile type based on your data structure
interface UserProfile {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  address: string | null;
  phone: string;
  avatar: string | null;
  gender: string | null;
  nationality: string | null;
  dateofBirth: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    isVerified: boolean;
  };
}

// Mock function to simulate fetching profile data
const fetchUserProfile = async (): Promise<UserProfile> => {
  // In a real app, this would be an API call
  return {
    id: 24,
    firstName: "noralden",
    middleName: null,
    lastName: "elhoni",
    address: null,
    phone: "+218923111438",
    avatar: null,
    gender: null,
    nationality: null,
    dateofBirth: null,
    createdAt: "2025-04-23T09:33:24.234Z",
    updatedAt: "2025-04-23T09:33:24.234Z",
    user: {
      id: 28,
      email: "noralden.honi@gmail.com",
      role: "ADMIN",
      createdAt: "2025-04-23T09:33:20.821Z",
      isVerified: true,
    },
  };
};

// Mock function to simulate signing out
const signOut = async () => {
  console.log("Signing out...");
  // In a real app, this would handle the sign out logic
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">Loading...</div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        Error loading profile
      </div>
    );
  }

  return (
    <div className="py-6 px-4 md:px-6">
      <div className="flex justify-end items-center mb-5">
        <Button
          variant="outline"
          onClick={signOut}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Profile
          profile={profile}
          onSave={(updatedProfile) => setProfile(updatedProfile)}
        />
        <AccountSummary profile={profile} />
      </div>
    </div>
  );
}
