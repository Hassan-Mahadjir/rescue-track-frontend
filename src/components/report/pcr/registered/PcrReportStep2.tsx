"use client";

import { useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import { RunReportConfig } from "@/constants/runReport";
import FormSelect from "@/components/FormSelect";

export default function PcrReportStep2() {
  const form = useFormContext();

  const { patientCondition } = RunReportConfig;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-medium mb-2">Patient Assessments</h2>

      <div className="p-6 space-y-6 ">
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
      </div>
    </div>
  );
}
