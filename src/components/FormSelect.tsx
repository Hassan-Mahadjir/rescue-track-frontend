"use client";

import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface FormSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  className?: string;
}

const FormSelect = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Select an option",
  options,
  className = "",
}: FormSelectProps<T>) => {
  const {
    formState: { errors },
  } = form;

  const error = errors[name];

  const currentValue = form.getValues(name);

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Select
          onValueChange={(value) => {
            // Convert to number if all options are numeric
            const allNumeric = options.every(
              (opt) => typeof opt.value === "number"
            );
            const parsed = allNumeric ? Number(value) : value;
            form.setValue(name, parsed as PathValue<T, Path<T>>, {
              shouldValidate: true,
            });
          }}
          defaultValue={String(currentValue)}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormSelect;
