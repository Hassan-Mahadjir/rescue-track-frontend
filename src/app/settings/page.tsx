"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/services/api/auth";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const settingsPage = () => {
  const { logout } = useLogout();
  const { toast } = useToast();

  return (
    <div>
      <Button onClick={() => logout()}>Logout</Button>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
            variant: "default", // or "default", "destructive"
            duration: 3000,
            progressColor: "bg-green-500", // optional, or use your theme class like 'bg-main'
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
};

export default settingsPage;
