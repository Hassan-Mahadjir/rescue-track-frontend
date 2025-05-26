"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CheckboxForm } from "@/components/CheckboxForm";
import { PcrConfig } from "@/constants/pcrConfig";
import FormSelect from "@/components/FormSelect";
import VitalSignField from "./VitalSignField";
import { Card } from "@/components/ui/card";
import FormInput from "@/components/FormInput";

const {
  pupilOptions,
  respOptions,
  skinOptions,
  therapyOptions,
  dietressLevelOptions,
} = PcrConfig;

export default function PcrReportStep5() {
  const form = useFormContext();
  const { control } = form;

  const {
    fields: vitalFields,
    append: appendVital,
    remove: removeVital,
  } = useFieldArray({ control, name: "vitalSigns" });

  const defaultVital = {
    time: "",
    T: "",
    BP: "",
    pulse: "",
    resp: "",
    spO2: "",
    treatments: [],
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Vital Signs */}
      <section>
        <h2 className="text-lg font-medium text-gray-800">Vital Signs</h2>
        {vitalFields.map((_, idx) => (
          <VitalSignField
            key={vitalFields[idx].id}
            control={control}
            index={idx}
            onRemove={() => removeVital(idx)}
          />
        ))}
        <div className="flex justify-end">
          <Button
            variant="default"
            onClick={() => appendVital(defaultVital)}
            type="button"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Vital Sign
          </Button>
        </div>
      </section>

      {/* Checkbox fields */}
      <section className="space-y-6">
        <CheckboxForm name="pupils" label="Pupils" options={pupilOptions} />
        <CheckboxForm
          name="skins"
          label="Skin Findings"
          options={skinOptions}
        />
        <CheckboxForm
          name="resps"
          label="Respiratory Sounds"
          options={respOptions}
        />
        <CheckboxForm
          name="therapies"
          label="Therapies"
          options={therapyOptions}
        />
      </section>

      {/* Glasgow Coma Scale */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <h3 className="font-medium mb-3 text-gray-700">Glasgow Coma Scale</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["E", "V", "M"] as const).map((key) => (
            <FormInput
              key={key}
              form={form}
              name={`gcs.${key}`}
              label={key}
              type="number"
              placeholder={key}
            />
          ))}
        </div>
      </Card>

      {/* Distress Level */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <FormSelect
          form={form}
          name="dietressLevel"
          label="Distress Level"
          placeholder="Select distress level"
          options={dietressLevelOptions.map(({ value, label }) => ({
            label: label,
            value: value,
          }))}
          className="w-full"
        />
      </Card>
    </div>
  );
}
