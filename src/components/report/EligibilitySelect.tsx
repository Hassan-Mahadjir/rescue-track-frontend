"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Control } from "react-hook-form";

const eligibilities = [
  { value: "student", label: "Student" },
  { value: "employee", label: "Employee" },
  { value: "eligible", label: "Eligible" },
  { value: "not eligible", label: "Not Eligible" },
  { value: "other", label: "Other" },
] as const;

interface EligibilitySelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  className?: string;
}

export const EligibilitySelect = ({
  control,
  name,
  label = "Eligibility",
  className,
}: EligibilitySelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal flex justify-between items-center",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span className="flex-1 text-left">
                    {field.value
                      ? eligibilities.find((item) => item.value === field.value)
                          ?.label
                      : "Select eligibility"}
                  </span>
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-1">
              <Command>
                <CommandInput placeholder="Search eligibility..." />
                <CommandList>
                  <CommandEmpty>No eligibility found.</CommandEmpty>
                  <CommandGroup>
                    {eligibilities.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          field.onChange(item.value);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};
