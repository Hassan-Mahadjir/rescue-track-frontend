"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Check, ChevronsUpDown } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectItem {
  readonly value: string;
  readonly label: string;
}

interface GenericSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  items: readonly SelectItem[];
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export const GenericSelect = <T extends FieldValues>({
  control,
  name,
  items,
  label,
  placeholder = "Select an item",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  className,
}: GenericSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal flex justify-between items-center",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span className="flex-1 text-left">
                    {field.value
                      ? items.find((item) => item.value === field.value)?.label
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-1">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => field.onChange(item.value)}
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
