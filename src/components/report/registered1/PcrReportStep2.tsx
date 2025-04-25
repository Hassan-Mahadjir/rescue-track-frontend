"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

// Predefined medication options
const medicationsName = [
  { id: 1, name: "Paracetamol" },
  { id: 2, name: "Ibuprofen" },
  { id: 3, name: "Morphine" },
  { id: 4, name: "Aspirin" },
];

const medicationsSize = [
  { id: 1, name: "100 mg" },
  { id: 2, name: "250 mg" },
  { id: 3, name: "500 mg" },
  { id: 4, name: "1000 mg" },
];

export default function PcrReportStep2() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications",
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Treatment provided during transport
      </h2>
      {/* <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-2 border rounded-md p-2 bg-gray-100"
            >
               Medication Name 
              <FormField
                control={control}
                name={`medications.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0">
                    <FormControl>
                      <Input
                        placeholder="Medication Name"
                        className="flex-1 border-none bg-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              Medication Size 
              <FormField
                control={control}
                name={`medications.${index}.size`}
                render={({ field }) => (
                  <FormItem className="w-24 space-y-0">
                    <FormControl>
                      <Input
                        placeholder="Size"
                        className="w-24 border-none bg-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              Remove button 
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                type="button"
                onClick={() => remove(index)}
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

         Add Medication Button 
        <div className="flex justify-end">
          <Button
            variant="default"
            className="mt-3 bg-main"
            onClick={() => append({ name: "", size: "" })}
            type="button"
          >
            <Plus className="mr-1 h-4 w-4" /> Add medication
          </Button>
        </div>
      </Card> */}
      <Card className="p-4 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-2 border rounded-md p-2 bg-gray-100"
            >
              <FormField
                control={control}
                name={`medications.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex-1 border-none bg-transparent">
                          <SelectValue placeholder="Select med" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicationsName.map((medication) => (
                            <SelectItem
                              key={medication.id}
                              value={medication.name}
                            >
                              {medication.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`medications.${index}.size`}
                render={({ field }) => (
                  <FormItem className="w-24 space-y-0">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-24 border-none bg-transparent">
                          <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicationsSize.map((size) => (
                            <SelectItem key={size.id} value={size.name}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => fields.length > 1 && remove(index)}
                type="button"
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            variant="default"
            className="mt-3 bg-main"
            onClick={() => append({ name: "", size: "" })}
            type="button"
          >
            <Plus className="mr-1 h-4 w-4" /> Add medication
          </Button>
        </div>
      </Card>
    </div>
  );
}
