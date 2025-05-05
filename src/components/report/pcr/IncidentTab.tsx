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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {/* Read-only Incident ID */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Incident Id
          </label>
          <div className="px-3 py-2 border rounded-md bg-gray-100 text-gray-800 text-sm">
            {form.getValues("runReportId")}
          </div>
        </div>

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
      <div>
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
      </div>
    </div>
  );
};

export default IncidentTab;
