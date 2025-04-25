"use client";

import FormInput from "@/components/FormInput";
import { useFormContext } from "react-hook-form";

const IncidentTab = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Read-only Incident ID */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">
          Incident Number
        </label>
        <div className="px-3 py-2 border rounded-md bg-gray-100 text-gray-800 text-sm">
          {form.getValues("id")}
        </div>
      </div>

      <FormInput
        form={form}
        name="createdAt"
        label="Date of Incident"
        type="date"
      />

      <FormInput
        form={form}
        name="patientCondition"
        label="Patient Condition"
        placeholder="e.g., Stable, Critical"
      />

      <FormInput
        form={form}
        name="initialCondition"
        label="Initial Condition"
        placeholder="e.g., Conscious, Unconscious"
      />

      <FormInput
        form={form}
        name="primarySymptoms"
        label="Primary Symptoms"
        placeholder="e.g., Headache, Nausea"
      />

      <FormInput
        form={form}
        name="notes"
        label="Additional Notes"
        placeholder="Optional notes about the patient or scene"
      />
    </div>
  );
};

export default IncidentTab;
