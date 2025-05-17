"use client";

import { useFormContext } from "react-hook-form";
import React from "react";
import { Treatment } from "@/types/report.type";

const MedicationTab = () => {
  const { getValues } = useFormContext();
  const treatments = getValues("treatments");

  if (!treatments || treatments.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-500">
        No treatments recorded for this case.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {treatments.map((treat: Treatment, index: number) => (
        <div
          key={treat.id || index}
          className="border rounded-lg p-4 bg-gray-50 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Treatment {index + 1}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-800">
            <div>
              <span className="font-medium text-gray-600">Name:</span>{" "}
              {treat.name}
            </div>
            <div>
              <span className="font-medium text-gray-600">Category:</span>{" "}
              {treat.category}
            </div>
            <div>
              <span className="font-medium text-gray-600">Quantity:</span>{" "}
              {treat.quantity} {String(treat.unit)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicationTab;
