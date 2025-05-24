"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/extra";
import { useAuth } from "@/hooks/useAuth";
// import EditVitalSignDialog from "./edit-report/EditVitalSignDialog"
// import DeleteTreatment from "./edit-report/DeleteTreatment"
import type { VitalSign as VitalSignType } from "@/types/report.type";
import {
  Clock,
  Activity,
  Heart,
  Thermometer,
  Gauge,
  Droplets,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VitalSignProps {
  vitalSigns: VitalSignType[];
  pcrId: number;
}

export default function VitalSign({ vitalSigns, pcrId }: VitalSignProps) {
  const { isAdmin } = useAuth();

  if (!vitalSigns || vitalSigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Activity className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No Vital Signs Recorded
        </h3>
        <p className="text-sm text-muted-foreground">
          Vital signs will appear here once they are recorded.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {vitalSigns.map((vs, index) => (
        <Card
          key={vs.id}
          className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200"
        >
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Vital Signs #{index + 1}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Recorded: {formatDate(vs.time)}
                  </p>
                </div>
              </div>
              {isAdmin() && (
                // <EditVitalSignDialog vitalSign={vs} pcrId={pcrId} />
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Vital Signs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <Thermometer className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-xs font-medium text-red-700 uppercase tracking-wide">
                    Temperature
                  </p>
                  <p className="text-lg font-bold text-red-900">{vs.T}°C</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Gauge className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs font-medium text-purple-700 uppercase tracking-wide">
                    Blood Pressure
                  </p>
                  <p className="text-lg font-bold text-purple-900">{vs.BP}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Heart className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                    Pulse
                  </p>
                  <p className="text-lg font-bold text-green-900">{vs.pulse}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Activity className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                    Respiration
                  </p>
                  <p className="text-lg font-bold text-blue-900">{vs.resp}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                <Droplets className="h-5 w-5 text-cyan-500" />
                <div>
                  <p className="text-xs font-medium text-cyan-700 uppercase tracking-wide">
                    SpO₂
                  </p>
                  <p className="text-lg font-bold text-cyan-900">{vs.spO2}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Treatments Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Treatments
                </h4>
                <Badge variant="secondary" className="text-xs">
                  {vs.treatments?.length || 0} treatments
                </Badge>
              </div>

              {vs.treatments && vs.treatments.length > 0 ? (
                <div className="grid gap-3">
                  {vs.treatments.map((treatment) => (
                    <div
                      key={treatment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-medium text-gray-900">
                            {treatment.name}
                          </h5>
                          <Badge variant="outline" className="text-xs">
                            {treatment.category}
                          </Badge>
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
                        <div className="flex gap-2 ml-4">
                          {/* <DeleteTreatment treatmentId={treatment.id} /> */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash className="h-3.5 w-3.5" />
                            <span className="sr-only">Delete treatment</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">
                    No treatments recorded for this vital sign.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
