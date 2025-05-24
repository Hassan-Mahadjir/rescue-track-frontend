"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import PCRLoading from "@/components/loading/PCRLoading";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { useRunReport } from "@/services/api/reports";

const RunReportPatientId = () => {
  const { id } = useParams();
  const reportId = Number(id);
  const { runReportData, isPending } = useRunReport(reportId);
  const data = runReportData;

  if (isPending) return <PCRLoading />;
  if (!data) {
    return (
      <div className="mx-5 my-2 text-red-500">
        No report found for ID {reportId}
      </div>
    );
  }

  return (
    <div className="mx-5 my-2 space-y-6">
      {/* Patient Information */}
      <PatientPersonalInfo patient={data.patient} />

      {/* Report Details */}
      <section className="bg-gray-50 border rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Report Details
          </h2>
          <Link href={`${reportId}/edit`}>
            <Button className="bg-main hover:bg-main/90" size="sm">
              <Edit className="w-4 h-4 mr-1" /> Edit Report
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Category" value={data.category} />
          <InfoItem label="Priority" value={data.priority} />
          <InfoItem label="Severity Code" value={data.severtiyCode} />
          <InfoItem label="Transport Status" value={data.transportStatus} />
          <InfoItem
            label="Mileage"
            value={data.mileage != null ? `${data.mileage} km` : null}
          />
        </div>
      </section>

      {/* Timing */}
      <section className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Timing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            label="Call Received"
            value={data.callReceivedTime?.split("T")[0]}
          />
          <InfoItem
            label="Notification"
            value={data.notificationTime?.split("T")[0]}
          />
          <InfoItem
            label="Response Time"
            value={data.responseTime.split("T")[0]}
          />
          <InfoItem
            label="Arrived at Scene"
            value={data.arrivalTimeAtScense.split("T")[0]}
          />
          <InfoItem
            label="Arrived at Patient"
            value={data.arrivalTimeAtPatient.split("T")[0]}
          />
          <InfoItem
            label="Departure"
            value={data.departureTime.split("T")[0]}
          />
        </div>
      </section>

      {/* Locations & Ambulance */}
      <section className="bg-gray-50 border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Locations &amp; Ambulance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="From" value={data.fromLocation} />
          <InfoItem label="To" value={data.toLocation} />
          <InfoItem label="Notes" value={data.locationNote} />
          <InfoItem label="Ambulance #" value={data.ambulanceNumber} />
          <InfoItem label="Driver" value={data.ambulanceDriver} />
          <InfoItem
            label="Arrived at Destination"
            value={data.arrivalTimeAtDestination?.split("T")[0]}
          />
          <InfoItem
            label="Departed Destination"
            value={data.departureTimeFromDestination?.split("T")[0]}
          />
        </div>
      </section>

      {/* Caller Information */}
      <section className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Caller Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Name" value={data.caller} />
          <InfoItem label="Phone" value={data.callerPhone} />
          <InfoItem label="Relationship" value={data.relationship} />
        </div>
      </section>

      {/* Notes */}
      {data.notes && (
        <section className="bg-gray-50 border rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Notes</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{data.notes}</p>
        </section>
      )}

      {/* Update History */}
      {data.updateHistory?.length > 0 && (
        <section className="bg-white border rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Update History
          </h2>
          <ul className="space-y-2">
            {data.updateHistory.map((entry) => (
              <li
                key={entry.id}
                className="text-sm text-gray-700 border-b pb-2"
              >
                <strong>{new Date(entry.updatedAt).toLocaleString()}</strong>:{" "}
                {Object.entries(entry.updateFields).map(([key, val]) => (
                  <span key={key}>
                    <span className="font-medium">{key}</span>: {String(val)}{" "}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default RunReportPatientId;

// Reusable label/value pair
const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | React.ReactNode;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base text-gray-800">{value ?? "N/A"}</p>
  </div>
);
