"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/utils/auth";
import { Skeleton } from "./ui/skeleton";
import RecentCardSkeleton from "./loading/RecentCardSkeleton";
import DoctorListSkeleton from "./loading/staffListSkeleton";
import ShiftScheduleSkeleton from "./loading/ShiftScheduleSkeleton ";
import StatisticsChartSkeleton from "./loading/StatisticsChartSkeleton ";

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
    return (
      <div>
        <RecentCardSkeleton />
        <div className="grid grid-cols-1 mt-5 gap-3 lg:max-xl:grid-cols-1 xmd:grid-cols-4 ">
          <DoctorListSkeleton />
          <div className="col-span-1 border rounded-lg px-2 pt-2 pb-4 xmd:col-span-2">
            {/* static sekelton */}
            <StatisticsChartSkeleton />
          </div>
          {/* shif schecule */}
          <div className="border rounded-lg px-2 pt-2 pb-4">
            <ShiftScheduleSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
}
