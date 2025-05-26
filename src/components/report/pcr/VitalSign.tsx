"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/extra";
import { useAuth } from "@/hooks/useAuth";
import type { VitalSign as VitalSignType } from "@/types/report.type";
import EditVitalSignDialog from "./edit report/EditVitalSignDialog";
import DeleteTreatment from "./edit report/DeleteTreatment";

interface VitalSignDisplayProps {
  vitalSigns: VitalSignType[];
}

export default function VitalSignDisplay({
  vitalSigns,
}: VitalSignDisplayProps) {
  const { isAdmin } = useAuth();

  if (!vitalSigns || vitalSigns.length === 0) {
    return (
      <div className="bg-gray-100 shadow-md rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Vital Signs
        </h3>
        <p className="text-gray-600">No vital signs recorded.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {vitalSigns.map((vs, index) => (
        <Card key={vs.id} className="bg-gray-100 shadow-md">
          <CardHeader className="py-3 px-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                Vital Signs #{index + 1}
              </CardTitle>
              {isAdmin() && <EditVitalSignDialog vitalSign={vs} />}
            </div>
            <p className="text-sm text-gray-600">
              Recorded: {formatDate(vs.time)}
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {/* Vital Signs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">Temperature</p>
                <p className="font-semibold text-sm sm:text-base">{vs.T}°C</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Blood Pressure</p>
                <p className="font-semibold text-sm sm:text-base">{vs.BP}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Pulse</p>
                <p className="font-semibold text-sm sm:text-base">{vs.pulse}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Respiration</p>
                <p className="font-semibold text-sm sm:text-base">{vs.resp}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">SpO₂</p>
                <p className="font-semibold text-sm sm:text-base">{vs.spO2}</p>
              </div>
            </div>

            {/* Treatments Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Treatments
              </h4>
              {vs.treatments && vs.treatments.length > 0 ? (
                <div className="space-y-3">
                  {vs.treatments.map((treatment) => (
                    <div
                      key={treatment.id}
                      className="flex justify-between items-start p-4 bg-white rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-medium text-gray-900">
                            {treatment.name}
                          </h5>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {treatment.category}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Dosage:</span>{" "}
                            {treatment.dosage}
                            {treatment.unit.abbreviation}
                          </div>
                          <div>
                            <span className="font-medium">Route:</span>{" "}
                            {treatment.route}
                          </div>
                          <div>
                            <span className="font-medium">Result:</span>{" "}
                            {treatment.result}
                          </div>
                          {treatment.givenAt && (
                            <div>
                              <span className="font-medium">Given:</span>{" "}
                              {formatDate(treatment.givenAt)}
                            </div>
                          )}
                        </div>
                      </div>
                      {isAdmin() && (
                        <div className="ml-4">
                          <DeleteTreatment treatmentId={treatment.id} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">
                  No treatments recorded for this vital sign.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
