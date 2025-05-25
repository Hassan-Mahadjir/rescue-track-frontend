"use client";

import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormTextarea from "@/components/FormTextarea";
import { RunReportConfig } from "@/constants/runReport";
import { useFormContext } from "react-hook-form";

const IncidentTab = () => {
  const form = useFormContext();
  const { patientCondition } = RunReportConfig;

  return (
    <div className="h-full max-h-[60vh] overflow-y-auto px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Read-only Incident ID */}

        <FormInput
          form={form}
          name="createdAt"
          label="Date of Incident"
          type="date"
        />

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
      </div>

      <div className="mt-4 space-y-4">
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
          label="Notes"
          placeholder="Optional notes about the patient or scene"
          className="w-full"
        />

        {/* GCS Inputs */}
        <div className="grid grid-cols-3 gap-4">
          <FormInput form={form} name="gcs.E" label="E" className="w-full" />
          <FormInput form={form} name="gcs.V" label="V" className="w-full" />
          <FormInput form={form} name="gcs.M" label="M" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default IncidentTab;
