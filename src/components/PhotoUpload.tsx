import { Control, FieldValues, Path } from "react-hook-form";
import { GenericSelect } from "./ui/GenericSelect";
import { bloodTypes } from "@/constants/bloodTypes";

interface BloodTypeSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
}

export const BloodTypeSelect = <T extends FieldValues>({
  control,
  name,
  label = "Blood Type",
  className,
}: BloodTypeSelectProps<T>) => {
  return (
    <GenericSelect
      control={control}
      name={name}
      items={bloodTypes}
      label={label}
      placeholder="Select blood type"
      searchPlaceholder="Search blood types..."
      emptyMessage="No blood types found."
      className={className}
    />
  );
};
