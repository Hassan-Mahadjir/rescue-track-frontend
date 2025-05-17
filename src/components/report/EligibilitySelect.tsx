import { Control, FieldValues, Path } from "react-hook-form";
import { GenericSelect } from "../ui/GenericSelect";
import { eligibilities } from "@/constants/eligibilities";

interface EligibilitySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
}

export const EligibilitySelect = <T extends FieldValues>({
  control,
  name,
  label = "Eligibility",
  className,
}: EligibilitySelectProps<T>) => {
  return (
    <GenericSelect
      control={control}
      name={name}
      items={eligibilities}
      label={label}
      placeholder="Select eligibility"
      searchPlaceholder="Search eligibility..."
      emptyMessage="No eligibility found."
      className={className}
    />
  );
};
