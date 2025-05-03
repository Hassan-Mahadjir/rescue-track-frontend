"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import FormSelect from "@/components/FormSelect";
import { TreatmentConfig } from "@/constants/treatments";

const { treatmentOptions, categoryOptions, unitOptions, quantityOptions } =
  TreatmentConfig;

export default function PcrReportStep4() {
  const form = useFormContext();
  const { control, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "treatments",
  });

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

  const defaultTreatment = {
    name: "",
    quantity: 100,
    unit: "mg",
    category: "",
  };

  const addCustomItem = (
    field: any,
    value: string,
    setValueFn: (v: string) => void
  ) => {
    if (
      value.trim() &&
      !field.value.some((item: any) => item.name === value.trim())
    ) {
      field.onChange([...field.value, { name: value.trim() }]);
      setValueFn("");
    }
  };

  const toggleItem = (field: any, value: string) => {
    const exists = field.value?.some((item: any) => item.name === value);
    if (exists) {
      field.onChange(field.value.filter((item: any) => item.name !== value));
    } else {
      field.onChange([...(field.value || []), { name: value }]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Medical History */}
      <h2 className="text-lg font-medium text-gray-800">Medical History</h2>

      {/* Conditions */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium mb-3 text-gray-700">Medical Conditions</h3>
        <FormField
          control={control}
          name="medicalConditions"
          render={({ field }) => (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {conditions.map((condition) => (
                  <FormItem
                    key={condition.value}
                    className="flex items-center space-x-2 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.some(
                          (item: any) => item.name === condition.value
                        )}
                        onCheckedChange={() =>
                          toggleItem(field, condition.value)
                        }
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer text-sm">
                      {condition.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>

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
                  onClick={() =>
                    addCustomItem(field, customCondition, setCustomCondition)
                  }
                  disabled={!customCondition.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              <FormMessage />

              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((condition: any) => (
                    <div
                      key={condition.name}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      {condition.name}
                      <button
                        type="button"
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => toggleItem(field, condition.name)}
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

      {/* Allergies */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium mb-3 text-gray-700">Allergies</h3>
        <FormField
          control={control}
          name="allergies"
          render={({ field }) => (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {allergies.map((allergy) => (
                  <FormItem
                    key={allergy.value}
                    className="flex items-center space-x-2 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.some(
                          (item: any) => item.name === allergy.value
                        )}
                        onCheckedChange={() => toggleItem(field, allergy.value)}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer text-sm">
                      {allergy.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>

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
                  onClick={() =>
                    addCustomItem(field, customAllergy, setCustomAllergy)
                  }
                  disabled={!customAllergy.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>

              <FormMessage />

              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((allergy: any) => (
                    <div
                      key={allergy.name}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      {allergy.name}
                      <button
                        type="button"
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => toggleItem(field, allergy.name)}
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

      {/* Notes */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium mb-3 text-gray-700">Additional Notes</h3>
        <FormField
          control={control}
          name="notes"
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

      {/* Treatments */}
      <Card className="p-4 border border-gray-300">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Treatment provided during transport
        </h3>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 border rounded-md p-4 bg-gray-50"
            >
              <FormField
                control={control}
                name={`treatments.${index}.name`}
                render={() => (
                  <FormSelect
                    form={form}
                    name={`treatments.${index}.name`}
                    label="Treatment"
                    placeholder="Select treatment"
                    options={treatmentOptions.map((t) => ({
                      label: t.name,
                      value: t.name,
                    }))}
                  />
                )}
              />

              <FormField
                control={control}
                name={`treatments.${index}.quantity`}
                render={() => (
                  <FormSelect
                    form={form}
                    name={`treatments.${index}.quantity`}
                    label="Quantity"
                    placeholder="Select quantity"
                    options={quantityOptions.map((q) => ({
                      label: q.toString(), // label shown to the user
                      value: q, // actual value is a number
                    }))}
                  />
                )}
              />

              <FormField
                control={control}
                name={`treatments.${index}.unit`}
                render={() => (
                  <FormSelect
                    form={form}
                    name={`treatments.${index}.unit`}
                    label="Unit"
                    placeholder="Select unit"
                    options={unitOptions.map((u) => ({
                      label: u.name,
                      value: u.name,
                    }))}
                  />
                )}
              />

              <FormField
                control={control}
                name={`treatments.${index}.category`}
                render={() => (
                  <FormSelect
                    form={form}
                    name={`treatments.${index}.category`}
                    label="Category"
                    placeholder="Select category"
                    options={categoryOptions.map((c) => ({
                      label: c.name,
                      value: c.name,
                    }))}
                  />
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
