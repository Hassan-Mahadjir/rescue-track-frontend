"use client";
import React from "react";
import PatientPersonalInfo from "@/components/report/PatientPersonalInfo";
import { useParams } from "next/navigation";
import { usePCR } from "@/services/api/reports";
import PCRLoading from "@/components/loading/PCRLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/extra";
import TagList from "@/components/report/pcr/TagList";
import CreatePatientTagDialog from "@/components/report/pcr/CreatePatientTagDialog";
import EditPCRDialog from "@/components/report/pcr/edit report/EditPCRDialog";
import VitalSignDisplay from "@/components/report/pcr/VitalSign";

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

      {/* preview */}
      <div className="my-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
          <div className="flex flex-row space-x-4">
            <EditPCRDialog pcr={pcr} />
            {/* <div>
              <PDFDownloadLink
                document={pcr && <ReportDocument data={pcr} />}
                fileName={`patient-report-${pcr.id}.pdf`}
              >
                {({ loading }) => (
                  <Button className="bg-main" size="sm" disabled={loading}>
                    <Printer className="w-4 h-4 mr-1" />
                    {loading ? "Generating PDF..." : "Print"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div> */}
          </div>
        </div>
      </div>

      {/* Section 1: General Info */}
      <Card className="bg-gray-100 shadow-md my-6 px-6">
        <CardHeader className="py-3 px-0">
          <CardTitle className="text-lg font-semibold mb-2">
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-800">Date Of Incident:</p>
            {formatDate(pcr.createdAt)}
          </div>
          <div>
            <p className="font-medium text-gray-800">Report ID:</p>
            {pcr.id}
          </div>
          <div>
            <p className="font-medium text-gray-800">Patient Condition:</p>
            {pcr.patientCondition ?? "No Patient Condition"}
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-800">Primary Assessment:</p>
              {pcr.primaryAssessment ?? "No Initial Condition"}
            </div>
            <div>
              <p className="font-medium text-gray-800">Distress Level:</p>
              {pcr.dietressLevel ?? "None"}
            </div>
            <div>
              <p className="font-medium text-gray-800">Secondary Assessment:</p>
              {pcr.secondaryAssessment ?? "No Primary Symptoms"}
            </div>
            <div>
              <p className="font-medium text-gray-800">Notes:</p>
              {pcr.notes ?? "No Notes"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allergies & Conditions */}
      <Card className="bg-gray-100 shadow-md my-6 px-6">
        {/* Allergies Section */}
        <CardHeader className="py-3 px-0 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold mb-2">
            Allergies
          </CardTitle>
          <CreatePatientTagDialog
            id={pcr.id}
            type="allergy"
            predefinedOptions={[
              { label: "Peanuts", value: "peanuts" },
              { label: "Dust", value: "dust" },
              { label: "Pollen", value: "pollen" },
            ]}
          />
        </CardHeader>
        <CardContent>
          <TagList tags={pcr.allergies} type="allergy" />
        </CardContent>

        {/* Medical Conditions Section */}
        <CardHeader className="py-3 px-0 flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold mb-2">
            Medical Conditions
          </CardTitle>
          <CreatePatientTagDialog
            id={pcr.id}
            type="condition"
            predefinedOptions={[
              { label: "Peanuts", value: "peanuts" },
              { label: "Dust", value: "dust" },
              { label: "Pollen", value: "pollen" },
            ]}
          />
        </CardHeader>
        <CardContent>
          <TagList tags={pcr.medicalConditions} type="condition" />
        </CardContent>
      </Card>

      {/* Vital Signs & Treatments */}
      <VitalSignDisplay vitalSigns={pcr.vitalSign} pcrId={pcr.id} />

      {/* Additional Observations */}
      <Card className="bg-gray-100 shadow-md my-6 px-6">
        <CardHeader className="py-3 px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardTitle className="text-lg font-semibold mb-2">Trauma</CardTitle>
          {pcr.truma.map((t) => (
            <div key={t.id} className="text-sm text-gray-700">
              {t.name}
            </div>
          ))}
        </CardHeader>
        <CardHeader className="py-3 px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardTitle className="text-lg font-semibold mb-2">
            Injury Mechanisms
          </CardTitle>
          {pcr.injuryMechanism.map((i) => (
            <div key={i.id} className="text-sm text-gray-700">
              {i.mechanism}
              {i.height != null ? ` — Height: ${i.height}` : ""}
            </div>
          ))}
        </CardHeader>
        <CardHeader className="py-3 px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardTitle className="text-lg font-semibold mb-2">
            Pupil Assessments
          </CardTitle>
          {pcr.pupil.map((p) => (
            <div key={p.id} className="text-sm text-gray-700">
              {p.PHSY}
            </div>
          ))}
        </CardHeader>
        <CardHeader className="py-3 px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardTitle className="text-lg font-semibold mb-2">
            Skin Status
          </CardTitle>
          {pcr.skin.map((s) => (
            <div key={s.id} className="text-sm text-gray-700">
              {s.skin_status}
            </div>
          ))}
        </CardHeader>
        <CardHeader className="py-3 px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardTitle className="text-lg font-semibold mb-2">
            Respiratory Observations
          </CardTitle>
          {pcr.resp.map((r) => (
            <div key={r.id} className="text-sm text-gray-700">
              {r.RESP}
            </div>
          ))}
        </CardHeader>
        <CardHeader className="py-3 px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardTitle className="text-lg font-semibold mb-2">
            Therapies
          </CardTitle>
          {pcr.therapies.map((th) => (
            <div key={th.id} className="text-sm text-gray-700">
              {th.therapy}
            </div>
          ))}
        </CardHeader>
        <CardHeader className="py-3 px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardTitle className="text-lg font-semibold mb-2">
            Circumstances
          </CardTitle>
          {pcr.circumstances.map((c) => (
            <div key={c.id} className="text-sm text-gray-700">
              {c.circumstance}
            </div>
          ))}
        </CardHeader>
      </Card>

      {/* GCS */}
      {/* … earlier cards … */}

      {/* GCS */}
      {pcr.gcs ? (
        <Card className="bg-gray-100 shadow-md my-6 px-6">
          <CardHeader className="py-3 px-0">
            <CardTitle className="text-lg font-semibold mb-2">
              Glasgow Coma Scale (GCS)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>E: {pcr.gcs.E}</div>
            <div>V: {pcr.gcs.V}</div>
            <div>M: {pcr.gcs.M}</div>
            <div>Total: {pcr.gcs.total}</div>
          </CardContent>
        </Card>
      ) : (
        <p className="mx-5 my-2 text-gray-500">No GCS recorded.</p>
      )}
    </div>
  );
};

export default PatientDetails;
{
  /* <EditPCRDialog pcr={pcr} /> */
}
{
  /* <div>
              <PDFDownloadLink
                document={pcr && <ReportDocument data={pcr} />}
                fileName={`patient-report-${pcr.id}.pdf`}
              >
                {({ loading }) => (
                  <Button className="bg-main" size="sm" disabled={loading}>
                    <Printer className="w-4 h-4 mr-1" />
                    {loading ? "Generating PDF..." : "Print"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div> */
}
