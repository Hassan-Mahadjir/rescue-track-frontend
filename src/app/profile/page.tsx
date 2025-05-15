"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Profile } from "@/components/profile/profile";
import { AccountSummary } from "@/components/profile/account-summary";
import { useProfile } from "@/services/api/profile";
import { useLogout } from "@/services/api/auth";

export default function ProfilePage() {
  const { profileData, isPending } = useProfile();
  const profile = profileData;
  const { logout } = useLogout();

  if (isPending) {
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
          onClick={() => logout()}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Profile profile={profile} />
        <AccountSummary profile={profile} />
      </div>
    </div>
  );
}
