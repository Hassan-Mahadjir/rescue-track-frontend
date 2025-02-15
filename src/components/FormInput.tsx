// components/FormInput.tsx

import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string; // Accept className prop
}

const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  icon,
  className = "",
}: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = form;
  const error = errors[name];

  return (
    <FormItem className="relative">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className={`${icon ? "pl-10" : ""} ${className}`} // Apply className here
          />
        </div>
      </FormControl>
      {error && <FormMessage>{String(error.message)}</FormMessage>}
    </FormItem>
  );
};

export default FormInput;
