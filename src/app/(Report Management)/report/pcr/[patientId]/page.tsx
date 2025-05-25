"use client";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { useParams } from "next/navigation";
import { usePCR } from "@/services/api/reports";
import PCRLoading from "@/components/loading/PCRLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/extra";
import VitalSignDisplay from "@/components/report/pcr/VitalSign";
import EditPCRDialog from "@/components/report/pcr/edit report/EditPCRDialog";
import MedicalDataSection from "@/components/report/pcr/edit report/MedicalDataSection";

const PatientDetails = () => {
  const params = useParams();
  const reportId = params.patientId;

  const { PCRData, isPending } = usePCR(Number(reportId));
  const pcr = PCRData;

  if (isPending) return <PCRLoading />;
  if (!pcr) return <div className="mx-5 my-2">No PCR found</div>;

  return (
    <div className="mx-5 my-2 space-y-6">
      {/* Patient Info */}
      <PatientPersonalInfo patient={pcr.patient} />

      {/* Header */}
      <div className="my-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
          <div className="flex flex-row space-x-4">
            <EditPCRDialog pcr={pcr} />
          </div>
        </div>
      </div>

      {/* General Information */}
      <Card className="bg-gray-100 shadow-md">
        <CardHeader className="py-3 px-6">
          <CardTitle className="text-lg font-semibold">
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="text-xs text-gray-500">Date Of Incident</p>
              <p className="font-semibold text-sm sm:text-base">
                {formatDate(pcr.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Report ID</p>
              <p className="font-semibold text-sm sm:text-base">{pcr.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Patient Condition</p>
              <p className="font-semibold text-sm sm:text-base">
                {pcr.patientCondition ?? "No Patient Condition"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Primary Assessment</p>
              <p className="font-semibold text-sm sm:text-base">
                {pcr.primaryAssessment ?? "No Initial Condition"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Distress Level</p>
              <p className="font-semibold text-sm sm:text-base">
                {pcr.dietressLevel ?? "None"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Secondary Assessment</p>
              <p className="font-semibold text-sm sm:text-base">
                {pcr.secondaryAssessment ?? "No Primary Symptoms"}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">Notes</p>
            <p className="font-semibold text-sm sm:text-base">
              {pcr.notes ?? "No Notes"}
            </p>
          </div>
          {/* Glasgow Coma Scale */}
          {pcr.gcs ? (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-500">Eye Response (E)</p>
                <p className="font-semibold text-sm sm:text-base">
                  {pcr.gcs.E}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Verbal Response (V)</p>
                <p className="font-semibold text-sm sm:text-base">
                  {pcr.gcs.V}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Motor Response (M)</p>
                <p className="font-semibold text-sm sm:text-base">
                  {pcr.gcs.M}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Score</p>
                <p className="font-semibold text-sm sm:text-base">
                  {pcr.gcs.total}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No GCS recorded.</p>
          )}
        </CardContent>
      </Card>

      {/* Allergies & Medical Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicalDataSection
          title="Allergies"
          data={pcr.allergies}
          pcrId={pcr.id}
          type="allergies"
          displayField="name"
        />
        <MedicalDataSection
          title="Medical Conditions"
          data={pcr.medicalConditions}
          pcrId={pcr.id}
          type="condition"
          displayField="name"
        />
      </div>

      {/* Vital Signs & Treatments */}
      <VitalSignDisplay vitalSigns={pcr.vitalSign} />

      {/* Medical Observations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicalDataSection
          title="Trauma"
          data={pcr.truma}
          pcrId={pcr.id}
          type="trauma"
          displayField="name"
        />

        <MedicalDataSection
          title="Injury Mechanisms"
          data={pcr.injuryMechanism}
          pcrId={pcr.id}
          type="injury-mechanism"
          displayField="mechanism"
          extraField="height"
        />

        <MedicalDataSection
          title="Pupil Assessments"
          data={pcr.pupil}
          pcrId={pcr.id}
          type="pupil"
          displayField="PHSY"
        />

        <MedicalDataSection
          title="Skin Status"
          data={pcr.skin}
          pcrId={pcr.id}
          type="skin"
          displayField="skin_status"
        />

        <MedicalDataSection
          title="Respiratory Observations"
          data={pcr.resp}
          pcrId={pcr.id}
          type="respiratory"
          displayField="RESP"
        />

        <MedicalDataSection
          title="Therapies"
          data={pcr.therapies}
          pcrId={pcr.id}
          type="therapy"
          displayField="therapy"
        />

        <MedicalDataSection
          title="Circumstances"
          data={pcr.circumstances}
          pcrId={pcr.id}
          type="circumstance"
          displayField="circumstance"
        />
      </div>
    </div>
  );
};

export default PatientDetails;
