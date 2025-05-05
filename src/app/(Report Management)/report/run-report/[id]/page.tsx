"use client";
import PCRLoading from "@/components/loading/PCRLoading";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { Button } from "@/components/ui/button";
import { useRunReport } from "@/services/api/reports";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const RunReportPatientId = () => {
  const params = useParams();
  const reportId = params.id;

  const { runReportData, isPending } = useRunReport(Number(reportId));
  const runReport = runReportData;

  if (isPending) {
    return <PCRLoading />;
  }

  if (!runReport) {
    return <div className="mx-5 my-2 text-red-500">No report found</div>;
  }

  return (
    <div className="mx-5 my-2 space-y-4">
      {/* Patient Information */}
      <div>
        <PatientPersonalInfo patient={runReport.patient} />
      </div>

      {/* Report Information */}
      <section className="bg-gray-50 border rounded-xl p-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Report Details
          </h2>
          <Link href={`${reportId}/edit`}>
            <Button
              className="bg-main hover:bg-main/90"
              size="sm"
              variant="default"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit Report
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Category" value={runReport.category} />
          <InfoItem label="Priority" value={runReport.priority} />
          <InfoItem
            label="Transport Status"
            value={runReport.transportStatus}
          />
          <InfoItem label="Mileage" value={`${runReport.mileage} km`} />
          <InfoItem label="Response Time" value={runReport.responseTime} />
          <InfoItem
            label="Arrival at Scene"
            value={runReport.arrivalTimeAtScense}
          />
          <InfoItem
            label="Arrival at Patient"
            value={runReport.arrivalTimeAtPatient}
          />
          <InfoItem label="Departure Time" value={runReport.departureTime} />
          <InfoItem
            label="Created At"
            value={new Date(runReport.createAt).toLocaleString()}
          />
        </div>
      </section>

      {/* Caller Information */}
      <section className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Caller Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Caller Name" value={runReport.caller} />
          <InfoItem label="Caller Phone" value={runReport.callerPhone} />
          <InfoItem label="Relationship" value={runReport.relationship} />
        </div>
      </section>

      {/* Notes */}
      {runReport.notes && (
        <section className="bg-gray-50 border rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Notes</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{runReport.notes}</p>
        </section>
      )}

      {/* Update History */}
      {runReport.updateHistory?.length > 0 && (
        <section className="bg-white border rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Update History
          </h2>
          <ul className="space-y-2">
            {runReport.updateHistory.map((entry) => (
              <li
                key={entry.id}
                className="text-sm text-gray-700 border-b pb-2"
              >
                <strong>{new Date(entry.updatedAt).toLocaleString()}</strong>:{" "}
                {Object.entries(entry.updateFields).map(([key, value]) => (
                  <span key={key}>
                    <span className="font-medium">{key}</span>: {String(value)}{" "}
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

// Small reusable field component
const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base text-gray-800">{value || "N/A"}</p>
  </div>
);

export default RunReportPatientId;
