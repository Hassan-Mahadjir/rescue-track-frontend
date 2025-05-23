"use client";

import { useFormContext, useFieldArray, type Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import SearchableFormSelect from "@/components/FormSelectSearchable";
import { TreatmentConfig } from "@/constants/treatments";
import { CheckboxForm } from "@/components/CheckboxForm";
import { PcrConfig } from "@/constants/pcrConfig";

// TreatmentConfig provides name, category, unit options
const { treatmentOptions, categoryOptions, unitOptions } = TreatmentConfig;

const { pupilOptions, respOptions, skinOptions, therapyOptions } = PcrConfig;

interface VitalSignFieldProps {
  control: Control<any>;
  index: number;
  onRemove: () => void;
}

export default function VitalSignField({
  control,
  index,
  onRemove,
}: VitalSignFieldProps) {
  const {
    fields: treatFields,
    append: appendTreat,
    remove: removeTreat,
  } = useFieldArray({
    control,
    name: `vitalSigns.${index}.treatments`,
  });

  const defaultTreat = {
    name: "",
    dosage: undefined,
    giveAt: null,
    route: "",
    result: "",
    unit: "",
    category: "",
  };

  return (
    <Card className="p-4 border border-gray-200 shadow-sm space-y-4">
      {/* Vital sign inputs */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {[
          { name: "time", label: "Time", type: "time" },
          { name: "T", label: "Temperature", type: "text" },
          { name: "BP", label: "Blood Pressure", type: "text" },
          { name: "pulse", label: "Pulse", type: "text" },
          { name: "resp", label: "Respiration", type: "text" },
          { name: "spO2", label: "SpO₂", type: "text" },
        ].map(({ name, label, type }) => (
          <FormField
            key={name}
            control={control}
            name={`vitalSigns.${index}.${name}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input {...field} type={type} placeholder={label} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      {/* Treatments */}
      <div className="space-y-2">
        <h3 className="text-md font-medium text-gray-700">Treatments</h3>
        {treatFields.map((treat, tIndex) => (
          <div
            key={treat.id}
            className="grid grid-cols-1 md:grid-cols-7 gap-4 border rounded-md p-4 bg-gray-50"
          >
            <SearchableFormSelect
              form={useFormContext()}
              name={`vitalSigns.${index}.treatments.${tIndex}.name`}
              label="Name"
              placeholder="Select treatment"
              options={treatmentOptions.map((t) => ({
                label: t.name,
                value: t.name,
              }))}
            />

            {/* Dosage */}
            <FormField
              control={control}
              name={`vitalSigns.${index}.treatments.${tIndex}.dosage`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Dosage" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Unit */}
            <FormField
              control={control}
              name={`vitalSigns.${index}.treatments.${tIndex}.unit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="">Select unit</option>
                      {unitOptions.map((u) => (
                        <option key={u.name} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Route */}
            <FormField
              control={control}
              name={`vitalSigns.${index}.treatments.${tIndex}.route`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Route" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Give At */}
            <FormField
              control={control}
              name={`vitalSigns.${index}.treatments.${tIndex}.giveAt`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Give At</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Result */}
            <FormField
              control={control}
              name={`vitalSigns.${index}.treatments.${tIndex}.result`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none"
                      placeholder="Result"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={control}
              name={`vitalSigns.${index}.treatments.${tIndex}.category`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border rounded p-2">
                      <option value="">Select category</option>
                      {categoryOptions.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end justify-end md:col-span-7">
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => removeTreat(tIndex)}
                type="button"
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Button
            variant="default"
            onClick={() => appendTreat(defaultTreat)}
            type="button"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Treatment
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={onRemove} type="button">
          Remove Vital Sign
        </Button>
      </div>
    </Card>
  );
}
