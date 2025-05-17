import React from "react";
import { PatientInfoSkeleton } from "./PatientInfoSkeleton";

const PCRLoading = () => {
  return (
    <div className="mx-5 my-2">
      <PatientInfoSkeleton />
      <div className="bg-gray-100 shadow-lg rounded-xl my-6 px-6 py-4">
        {/* Skeleton for the rest of the content */}
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mt-6"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PCRLoading;
