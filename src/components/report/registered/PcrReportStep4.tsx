"use client";

import { Card } from "@/components/ui/card";
import type { UseFormReturn } from "react-hook-form";
import type { PcrReportFormValues } from "@/types/formSchema";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface PcrReportStep4Props {
  form: UseFormReturn<PcrReportFormValues>;
}

const PcrReportStep4 = ({ form }: PcrReportStep4Props) => {
  const { control } = form;

  // Common medical conditions
  const medicalConditions = [
    { id: "diabetes", label: "Diabetes" },
    { id: "hypertension", label: "Hypertension" },
    { id: "asthma", label: "Asthma" },
    { id: "heart_disease", label: "Heart Disease" },
    { id: "stroke", label: "Stroke" },
    { id: "seizures", label: "Seizures" },
    { id: "cancer", label: "Cancer" },
    { id: "copd", label: "COPD" },
  ];

  // Common allergies
  const allergies = [
    { id: "penicillin", label: "Penicillin" },
    { id: "sulfa", label: "Sulfa Drugs" },
    { id: "nsaids", label: "NSAIDs" },
    { id: "latex", label: "Latex" },
    { id: "nuts", label: "Nuts" },
    { id: "shellfish", label: "Shellfish" },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Medical History
      </h2>

      <div className="space-y-6">
        <Card className="p-4 border border-gray-300">
          <h3 className="font-medium mb-3">Medical Conditions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {medicalConditions.map((condition) => (
              <FormField
                key={condition.id}
                control={control}
                name="medicalHistory.conditions"
                render={({ field }) => {
                  return (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(condition.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            return checked
                              ? field.onChange([...currentValues, condition.id])
                              : field.onChange(
                                  currentValues.filter(
                                    (value) => value !== condition.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {condition.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </Card>

        <Card className="p-4 border border-gray-300">
          <h3 className="font-medium mb-3">Allergies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allergies.map((allergy) => (
              <FormField
                key={allergy.id}
                control={control}
                name="medicalHistory.allergies"
                render={({ field }) => {
                  return (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(allergy.id)}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            return checked
                              ? field.onChange([...currentValues, allergy.id])
                              : field.onChange(
                                  currentValues.filter(
                                    (value) => value !== allergy.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {allergy.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </Card>

        <Card className="p-4 border border-gray-300">
          <h3 className="font-medium mb-3">Additional Notes</h3>
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
              </FormItem>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default PcrReportStep4;
