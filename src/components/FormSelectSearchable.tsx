"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils"; // or replace with your own className merge

interface Option {
  label: string;
  value: string;
}

interface SearchableFormSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  className?: string;
}

const SearchableFormSelect = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Select an option",
  options,
  className = "",
}: SearchableFormSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const value = form.watch(name);
  const currentLabel = options.find((o) => o.value === value)?.label;

  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="bg-transparent">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {currentLabel || placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 z-50">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      form.setValue(
                        name,
                        option.value as PathValue<T, Path<T>>,
                        {
                          shouldValidate: true,
                        }
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SearchableFormSelect;
