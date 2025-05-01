"use client";

import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormTextareaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const FormTextarea = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  className = "",
  value,
  onChange,
}: FormTextareaProps<T>) => {
  const {
    register,
    formState: { errors },
  } = form;

  const error = errors[name];

  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Textarea
          {...register(name)}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            register(name).onChange(e); // Notify RHF
            onChange?.(e.target.value); // Optional custom handler
          }}
          className={`resize-none ${className}`}
        />
      </FormControl>
      {error && <FormMessage>{String(error.message)}</FormMessage>}
    </FormItem>
  );
};

export default FormTextarea;
