"use client";

import { useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";

export default function PcrReportStep2() {
  const form = useFormContext();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-medium mb-2">Patient Assessments</h2>

      <div className="p-6 space-y-6 ">
        <FormInput
          form={form}
          name="patientCondition"
          label="Patient Condition"
          placeholder="e.g., Stable, Critical, etc."
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
      </div>
    </div>
  );
}
