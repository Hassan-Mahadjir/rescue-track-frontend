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
  value: string;
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
    control,
    formState: { errors },
  } = form;

  const error = errors[name];

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Select
          onValueChange={(value) =>
            form.setValue(name, value as PathValue<T, Path<T>>, {
              shouldValidate: true,
            })
          }
          defaultValue={form.getValues(name)}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {error && <FormMessage>{String(error.message)}</FormMessage>}
    </FormItem>
  );
};

export default FormSelect;
