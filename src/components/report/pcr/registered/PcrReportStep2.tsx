"use client";

import { useFormContext } from "react-hook-form";
import FormTextarea from "@/components/FormTextarea";
import FormSelect from "@/components/FormSelect";
import { RunReportConfig } from "@/constants/runReport";
import { CheckboxForm } from "@/components/CheckboxForm";

const conditions = [
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  { label: "Heart Disease", value: "heart_disease" },
  { label: "Asthma", value: "asthma" },
  { label: "Epilepsy", value: "epilepsy" },
];

const allergies = [
  { label: "Peanuts", value: "peanuts" },
  { label: "Shellfish", value: "shellfish" },
  { label: "Penicillin", value: "penicillin" },
  { label: "Pollen", value: "pollen" },
  { label: "Dairy", value: "dairy" },
];

export default function PcrReportStep2() {
  const form = useFormContext();
  const { patientCondition } = RunReportConfig;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-medium mb-2">Patient Assessments</h2>

      <div className="p-6 space-y-6">
        <FormSelect
          form={form}
          name="patientCondition"
          label="Patient Condition"
          placeholder="Select Condition"
          options={patientCondition.map(({ name, value }) => ({
            label: name,
            value,
          }))}
          className="w-full"
        />

        <FormTextarea
          form={form}
          name="primaryAssessment"
          label="Primary Assessment"
          placeholder="Describe primary findings..."
          className="w-full"
        />

        <FormTextarea
          form={form}
          name="secondaryAssessment"
          label="Secondary Assessment"
          placeholder="Describe secondary observations..."
          className="w-full"
        />

        <FormTextarea
          form={form}
          name="notes"
          label="Additional Notes"
          placeholder="Any other observations or notes..."
          className="w-full"
        />

        <CheckboxForm
          name="medicalConditions"
          label="Medical Conditions"
          options={conditions}
        />

        {/* Allergies */}
        <CheckboxForm name="allergies" label="Allergies" options={allergies} />
      </div>
    </div>
  );
}
