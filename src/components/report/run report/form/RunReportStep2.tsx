"use client";

import { useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

const RunReportStep2 = () => {
  const form = useFormContext();

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
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
        <FormInput
          form={form}
          name="relationship"
          label="Relationship"
          placeholder="e.g., Friend, Parent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          form={form}
          name="category"
          label="Category"
          placeholder="e.g., Traffic Accident"
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
  );
};

export default RunReportStep2;
