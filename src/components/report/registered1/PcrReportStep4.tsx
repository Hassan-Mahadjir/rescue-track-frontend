"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function PcrReportStep4() {
  const { control } = useFormContext();
  const [customCondition, setCustomCondition] = useState("");
  const [customAllergy, setCustomAllergy] = useState("");

  const conditions = [
    { label: "Diabetes", value: "diabetes" },
    { label: "Hypertension", value: "hypertension" },
    { label: "Heart Disease", value: "heart_disease" },
    { label: "Asthma", value: "asthma" },
    { label: "Epilepsy", value: "epilepsy" },
  ];

  const allergies = [
    { label: "Peanuts", value: "peanuts" },
    { label: "Shellfish", value: "shellfish" },
    { label: "Penicillin", value: "penicillin" },
    { label: "Pollen", value: "pollen" },
    { label: "Dairy", value: "dairy" },
  ];

  const addCustomCondition = (field: any) => {
    if (
      customCondition.trim() &&
      !field.value.includes(customCondition.trim())
    ) {
      field.onChange([...field.value, customCondition.trim()]);
      setCustomCondition("");
    }
  };

  const addCustomAllergy = (field: any) => {
    if (customAllergy.trim() && !field.value.includes(customAllergy.trim())) {
      field.onChange([...field.value, customAllergy.trim()]);
      setCustomAllergy("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Medical History
      </h2>

      {/* Medical Conditions */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium mb-3 text-gray-700">Medical Conditions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {conditions.map((condition) => (
            <FormField
              key={condition.value}
              control={control}
              name="medicalHistory.conditions"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(condition.value)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          return checked
                            ? field.onChange([
                                ...currentValues,
                                condition.value,
                              ])
                            : field.onChange(
                                currentValues.filter(
                                  (value: string) => value !== condition.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer text-sm">
                      {condition.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>

        {/* Custom condition input */}
        <FormField
          control={control}
          name="medicalHistory.conditions"
          render={({ field }) => (
            <div className="flex items-end gap-2">
              <FormItem className="flex-1">
                <FormLabel className="text-sm text-gray-500">
                  Add custom condition
                </FormLabel>
                <Input
                  value={customCondition}
                  onChange={(e) => setCustomCondition(e.target.value)}
                  placeholder="Type a condition not listed above"
                  className="text-sm"
                />
              </FormItem>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addCustomCondition(field)}
                disabled={!customCondition.trim()}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          )}
        />

        {/* Display selected conditions */}
        <FormField
          control={control}
          name="medicalHistory.conditions"
          render={({ field }) => (
            <div className="mt-3">
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((condition: string) => (
                    <div
                      key={condition}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      {condition}
                      <button
                        type="button"
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          field.onChange(
                            field.value.filter((v: string) => v !== condition)
                          );
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        />
      </Card>

      {/* Allergies */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium mb-3 text-gray-700">Allergies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {allergies.map((allergy) => (
            <FormField
              key={allergy.value}
              control={control}
              name="medicalHistory.allergies"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(allergy.value)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          return checked
                            ? field.onChange([...currentValues, allergy.value])
                            : field.onChange(
                                currentValues.filter(
                                  (value: string) => value !== allergy.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer text-sm">
                      {allergy.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </div>

        {/* Custom allergy input */}
        <FormField
          control={control}
          name="medicalHistory.allergies"
          render={({ field }) => (
            <div className="flex items-end gap-2">
              <FormItem className="flex-1">
                <FormLabel className="text-sm text-gray-500">
                  Add custom allergy
                </FormLabel>
                <Input
                  value={customAllergy}
                  onChange={(e) => setCustomAllergy(e.target.value)}
                  placeholder="Type an allergy not listed above"
                  className="text-sm"
                />
              </FormItem>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addCustomAllergy(field)}
                disabled={!customAllergy.trim()}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          )}
        />

        {/* Display selected allergies */}
        <FormField
          control={control}
          name="medicalHistory.allergies"
          render={({ field }) => (
            <div className="mt-3">
              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((allergy: string) => (
                    <div
                      key={allergy}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      {allergy}
                      <button
                        type="button"
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          field.onChange(
                            field.value.filter((v: string) => v !== allergy)
                          );
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        />
      </Card>

      {/* Additional Notes */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium mb-3 text-gray-700">Additional Notes</h3>
        <FormField
          control={control}
          name="medicalHistory.notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional medical history notes here..."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
    </div>
  );
}
