"use client";

import { useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";

const RunReportStep3 = () => {
  const form = useFormContext();

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          form={form}
          name="responseTime"
          label="Response Time"
          type="date"
        />
        <FormInput
          form={form}
          name="arrivalTimeAtScense"
          label="Arrival at Scene"
          type="datetime-local"
        />
        <FormInput
          form={form}
          name="arrivalTimeAtPatient"
          label="Arrival at Patient"
          type="datetime-local"
        />
        <FormInput
          form={form}
          name="departureTime"
          label="Departure Time"
          type="datetime-local"
        />
      </div>
      <FormTextarea
        form={form}
        name="notes"
        label="Notes"
        placeholder="Enter any observations, injuries, or important notes..."
      />
    </div>
  );
};

export default RunReportStep3;
