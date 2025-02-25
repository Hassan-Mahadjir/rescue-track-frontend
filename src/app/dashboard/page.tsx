import React from "react";
import RecentCard from "@/components/dashboard/Recent-Card";
import InformationGrid from "@/components/dashboard/Information-Grid";

const Dashboard = () => {
  return (
    <div className="mx-3 space-y-3">
      <RecentCard />
      <InformationGrid />
    </div>
  );
};

export default Dashboard;
