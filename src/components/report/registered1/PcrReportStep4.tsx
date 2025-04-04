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

export default function PcrReportStep4() {
  const { control } = useFormContext();

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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        Medical History
      </h2>
      <div className="space-y-6"></div>
      {/* Medical Conditions */}
      <Card className="p-4 border border-gray-300">
        <h3 className="font-medium mb-3">Medical Conditions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {conditions.map((condition) => (
            <FormField
              key={condition.label}
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

      {/* Allergies */}
      <Card className="p-4 border border-gray-300">
        <h3 className="font-medium mb-3">Allergies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

      {/* Additional Notes */}
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
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
    </div>
  );
}
