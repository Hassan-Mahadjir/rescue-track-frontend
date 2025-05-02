"use client";

import { useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import { RunReportConfig } from "@/constants/runReport";
import FormTextarea from "@/components/FormTextarea";

const { incidentOptions, relationshipOptions } = RunReportConfig;

const RunReportStep2 = () => {
  const form = useFormContext();

  return (
    <div className="space-y-2 max-w-6xl mx-auto px-4">
      <div>
        <h3 className="text-2xl font-bold mb-4">Call Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            form={form}
            name="caller"
            label="Caller Name"
            placeholder="Enter caller name"
          />
          <FormInput
            form={form}
            name="callerPhone"
            label="Caller Phone"
            placeholder="Enter caller phone"
          />
          <FormSelect
            form={form}
            name="relationship"
            label="Relationship"
            placeholder="Select relationship"
            options={relationshipOptions.map(({ name, value }) => ({
              label: name,
              value,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            form={form}
            name="category"
            label="Category"
            placeholder="Select category"
            options={incidentOptions.map(({ name, value }) => ({
              label: name,
              value,
            }))}
          />
          <FormInput
            form={form}
            name="mileage"
            label="Mileage"
            placeholder="e.g., 12.5"
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            form={form}
            name="priority"
            label="Priority"
            placeholder="Select Priority"
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />

          <FormSelect
            form={form}
            name="transportStatus"
            label="Transport Status"
            placeholder="Select Transport Status"
            options={[
              { label: "Transported", value: "transported" },
              { label: "Not Transported", value: "not transported" },
              { label: "Pending", value: "pending" },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Response Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            form={form}
            name="responseTime"
            label="Response Time"
            type="datetime-local"
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
    </div>
  );
};

export default RunReportStep2;
