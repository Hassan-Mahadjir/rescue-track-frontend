"use client";
import ServiceCard from "@/components/Service-Card";
import React from "react";

const ReportManagementMain = () => {
  return (
    <div className="flex flex-col mx-3 justify-self-center items-center">
      <div className="text-center justify-center">
        <h1 className="text-2xl font-semibold text-main">
          Choose a report category
        </h1>
        <p className="text-lg text-dark-gray">
          to get started with creating or reviewing reports.
        </p>
      </div>

      <div className=" flex mt-8 items-center gap-4">
        <ServiceCard
          title="Patient Care Report"
          imageSrc="/report/patient.png"
          buttons={[
            { label: "Create new", onClick: () => console.log("Create new") },
            { label: "View all", onClick: () => console.log("View all") },
          ]}
        />

        <ServiceCard
          title="Patient Care Report"
          imageSrc="/report/patient.png"
          buttons={[
            { label: "Create new", onClick: () => console.log("Create new") },
            { label: "View all", onClick: () => console.log("View all") },
          ]}
        />
      </div>
    </div>
  );
};

export default ReportManagementMain;
