"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export default function ProtectedRoute({
  children,
  allowedRoles = [Role.ADMIN],
}: ProtectedRouteProps) {
  const router = useRouter();
  const { userRole, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!userRole) {
        // If no role, redirect to login
        router.replace("/login");
      } else if (!allowedRoles.includes(userRole)) {
        // If role not allowed, redirect to unauthorized page
        router.replace("/unauthorized");
      }
    }
  }, [userRole, isLoading, allowedRoles, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
}
