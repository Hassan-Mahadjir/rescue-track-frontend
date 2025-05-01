"use client";

import { bloodTypes } from "@/constants/bloodTypes";
import { GenericSelect } from "../ui/GenericSelect";
import { Control } from "react-hook-form";



interface BloodTypeSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  className?: string;
}

export const BloodTypeSelect = ({
  control,
  name,
  label = "Blood Type",
  className,
}: BloodTypeSelectProps) => {
  return (
    <GenericSelect
      control={control}
      name={name}
      items={bloodTypes}
      label={label}
      placeholder="Select blood type"
      searchPlaceholder="Search blood type..."
      emptyMessage="No blood type found."
      className={className}
    />
  );
}; 