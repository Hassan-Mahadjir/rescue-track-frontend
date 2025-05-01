"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useFieldArray, useFormContext } from "react-hook-form";
import { TreatmentConfig } from "@/constants/treatments";

const { treatmentOptions, categoryOptions, unitOptions, quantityOptions } =
  TreatmentConfig;

export default function PcrReportStep2() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "treatments",
  });

  const defaultTreatment = {
    name: "",
    quantity: 100,
    unit: "mg",
    category: "",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Treatment provided during transport
      </h2>
      <Card className="p-4 border border-gray-300">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 border rounded-md p-4 bg-gray-50"
            >
              {/* Treatment Name */}
              <FormField
                control={control}
                name={`treatments.${index}.name`} // Changed to match schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Treatment</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select treatment" />
                        </SelectTrigger>
                        <SelectContent>
                          {treatmentOptions.map((treatment) => (
                            <SelectItem
                              key={treatment.id}
                              value={treatment.name}
                            >
                              {treatment.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={control}
                name={`treatments.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value ?? "")}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          {quantityOptions.map((quantity) => (
                            <SelectItem
                              key={quantity}
                              value={quantity.toString()}
                            >
                              {quantity}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Unit */}
              <FormField
                control={control}
                name={`treatments.${index}.unit`} // Changed to match schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitOptions.map((unit) => (
                            <SelectItem key={unit.id} value={unit.name}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={control}
                name={`treatments.${index}.category`} // Keep name consistent with schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end justify-end md:col-span-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => remove(index)}
                  type="button"
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            className="bg-main"
            onClick={() => append(defaultTreatment)}
            type="button"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Treatment
          </Button>
        </div>
      </Card>
    </div>
  );
}
