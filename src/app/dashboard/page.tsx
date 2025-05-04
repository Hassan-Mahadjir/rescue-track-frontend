import React from "react";
import RecentCard from "@/components/dashboard/Recent-Card";
import InformationGrid from "@/components/dashboard/Information-Grid";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Role } from "@/utils/auth";

const Dashboard = () => {
  return (
    <ProtectedRoute allowedRoles={[Role.ADMIN, Role.EMPLOYEE]}>
      <div className="mx-3 space-y-3">
        <RecentCard />
        <InformationGrid />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
