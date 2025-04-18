"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/services/api/auth";
import React from "react";

const settingsPage = () => {
  const { logout } = useLogout();
  return (
    <div>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};

export default settingsPage;
