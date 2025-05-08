import React, { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string; // Accept className prop
  value?: string;
  onChange?: (value: string) => void;
}

const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  icon,
  value,
  className = "",
  onChange,
}: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
  } = form;
  const error = errors[name];

  // State for password visibility toggle
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";

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
            value={value}
            type={isPasswordField && isPasswordVisible ? "text" : type}
            placeholder={placeholder}
            {...register(name, { valueAsNumber: type === "number" })}
            className={`${icon ? "pl-10" : ""} ${className}`}
          />
          {isPasswordField && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </FormControl>
      {error && <FormMessage>{String(error.message)}</FormMessage>}
    </FormItem>
  );
};

export default FormInput;
