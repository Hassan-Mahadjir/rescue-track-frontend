"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NamedItem {
  name: string;
}

interface CheckboxFormProps {
  /**
   * Form field name (array of { name: string })
   */
  name: string;
  /**
   * Title for the section
   */
  label: string;
  /**
   * Predefined options
   */
  options: readonly { label: string; value: string }[];
}

export function CheckboxForm({ name, label, options }: CheckboxFormProps) {
  const { control, watch, setValue } = useFormContext();
  const [customValue, setCustomValue] = useState("");
  const fieldValue: NamedItem[] = watch(name) || [];

  const toggleItem = (value: string) => {
    const exists = fieldValue.some((item) => item.name === value);
    const updated = exists
      ? fieldValue.filter((item) => item.name !== value)
      : [...fieldValue, { name: value }];
    setValue(name, updated, { shouldValidate: true });
  };

  const addCustomItem = () => {
    const trimmed = customValue.trim();
    if (!trimmed) return;
    toggleItem(trimmed);
    setCustomValue("");
  };

  return (
    <Card className="p-4 border border-gray-200 shadow-sm">
      <h3 className="font-medium mb-3 text-gray-700">{label}</h3>
      <FormField
        control={control}
        name={name}
        render={() => (
          <>
            {/* Predefined options */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {options.map((opt) => (
                <FormItem
                  key={opt.value}
                  className="flex items-center space-x-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={fieldValue.some((i) => i.name === opt.value)}
                      onCheckedChange={() => toggleItem(opt.value)}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer text-sm">
                    {opt.label}
                  </FormLabel>
                </FormItem>
              ))}
            </div>

            {/* Custom addition */}
            <div className="flex items-end gap-2">
              <FormItem className="flex-1">
                <FormLabel className="text-sm text-gray-500">
                  Add custom {label.toLowerCase()}
                </FormLabel>
                <Input
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder={`Type a ${label.toLowerCase()} not listed above`}
                  className="text-sm"
                />
              </FormItem>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addCustomItem}
                disabled={!customValue.trim()}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>

            <FormMessage />

            {/* Chips display */}
            {fieldValue.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {fieldValue.map((item) => (
                  <div
                    key={item.name}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center"
                  >
                    {item.name}
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => toggleItem(item.name)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      />
    </Card>
  );
}
