"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { z, type ZodTypeAny } from "zod";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingIndicator from "@/components/Loading-Indicator";
import {
  usePostPCRAllergy,
  usePostPCRCondition,
  usePostPCRTrauma,
  usePostPCRInjuryMechanism,
  usePostPCRSkin,
  usePostPCRPupil,
  usePostPCRTherapy,
  usePostPCRResp,
  usePostPCRSpecialCircumstance,
} from "@/services/api/reports";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// 1) Enumerate your keys to break circularity:
export type TypeKeys =
  | "trauma"
  | "allergies"
  | "condition"
  | "therapy"
  | "respiratory"
  | "pupil"
  | "circumstance"
  | "injury-mechanism"
  | "skin";

// 2) Map each key to its Zod schema:
const schemaMap: Record<TypeKeys, ZodTypeAny> = {
  trauma: z.object({ name: z.string().min(1) }),
  allergies: z.object({ name: z.string().min(1) }),
  condition: z.object({ name: z.string().min(1) }),
  therapy: z.object({ therapy: z.string().min(1) }),
  respiratory: z.object({ RESP: z.string().min(1) }),
  pupil: z.object({ PHSY: z.string().min(1) }),
  circumstance: z.object({ circumstance: z.string().min(1) }),
  "injury-mechanism": z.object({
    mechanism: z.string().min(1),
    height: z.coerce.number().optional().nullable(),
  }),
  skin: z.object({
    skin_status: z.enum([
      "Normal",
      "Clear",
      "Pale",
      "Flushed",
      "Cyanotic",
      "Jaundiced",
    ]),
  }),
};

// 3) Generic field configuration type, tying `name` to the schema’s keys:
type FieldConfigItem<K extends TypeKeys> =
  | {
      name: Path<z.infer<(typeof schemaMap)[K]>>;
      label: string;
      type: "text" | "number";
    }
  | {
      name: Path<z.infer<(typeof schemaMap)[K]>>;
      label: string;
      type: "select";
      options: string[];
    };

// 4) The actual config object, per key:
const fieldConfig: { [K in TypeKeys]: FieldConfigItem<K>[] } = {
  trauma: [{ name: "name", label: "Trauma Name", type: "text" }],
  allergies: [{ name: "name", label: "Allergy Name", type: "text" }],
  condition: [{ name: "name", label: "Condition Name", type: "text" }],
  therapy: [{ name: "therapy", label: "Therapy", type: "text" }],
  respiratory: [{ name: "RESP", label: "Respiratory", type: "text" }],
  pupil: [{ name: "PHSY", label: "PHSY Assessment", type: "text" }],
  circumstance: [{ name: "circumstance", label: "Circumstance", type: "text" }],
  "injury-mechanism": [
    { name: "mechanism", label: "Mechanism", type: "text" },
    { name: "height", label: "Height (optional)", type: "number" },
  ],
  skin: [
    {
      name: "skin_status",
      label: "Skin Status",
      type: "select",
      options: ["Normal", "Clear", "Pale", "Flushed", "Cyanotic", "Jaundiced"],
    },
  ],
};

interface AddMedicalDataDialogProps<T extends TypeKeys> {
  id: number;
  type: T;
}

export default function AddMedicalDataDialog<T extends TypeKeys>({
  id,
  type,
}: AddMedicalDataDialogProps<T>) {
  const [open, setOpen] = useState(false);

  // 5) Load all your mutation hooks:
  const { allergyMutatePost, isPending: isAllergyPending } =
    usePostPCRAllergy(id);
  const { conditionMutatePost, isPending: isConditionPending } =
    usePostPCRCondition(id);
  const { mutatePost: traumaMutatePost, isPending: isTraumaPending } =
    usePostPCRTrauma(id);
  const { mutatePost: injuryMutatePost, isPending: isInjuryPending } =
    usePostPCRInjuryMechanism(id);
  const { mutatePost: therapyMutatePost, isPending: isTherapyPending } =
    usePostPCRTherapy(id);
  const { mutatePost: respiratoryMutatePost, isPending: isRespPending } =
    usePostPCRResp(id);
  const { mutatePost: pupilMutatePost, isPending: isPupilPending } =
    usePostPCRPupil(id);
  const {
    mutatePost: circumstanceMutatePost,
    isPending: isCircumstancePending,
  } = usePostPCRSpecialCircumstance(id);
  const { mutatePost: skinMutatePost, isPending: isSkinPending } =
    usePostPCRSkin(id);

  // 6) Infer the exact form data type from the schema:
  type FormData = z.infer<(typeof schemaMap)[T]>;
  const schema = schemaMap[type];
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {} as FormData,
  });

  // 7) Pick the right mutate function:
  const getMutate = () => {
    switch (type) {
      case "allergies":
        return allergyMutatePost;
      case "condition":
        return conditionMutatePost;
      case "trauma":
        return traumaMutatePost;
      case "injury-mechanism":
        return injuryMutatePost;
      case "therapy":
        return therapyMutatePost;
      case "respiratory":
        return respiratoryMutatePost;
      case "pupil":
        return pupilMutatePost;
      case "circumstance":
        return circumstanceMutatePost;
      case "skin":
        return skinMutatePost;
    }
  };

  const isPending =
    isAllergyPending ||
    isConditionPending ||
    isTraumaPending ||
    isInjuryPending ||
    isTherapyPending ||
    isRespPending ||
    isPupilPending ||
    isCircumstancePending ||
    isSkinPending;

  const onSubmit = (data: FormData) => {
    const mutate = getMutate();
    if (!mutate) return;
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  // 8) Now `fields` is strongly typed to the right keys:
  const fields = fieldConfig[type] as FieldConfigItem<T>[];
  const title = type
    .replace("-", " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main hover:bg-main/90" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] p-4">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Add {title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "select" && "options" in field ? (
                        <Select
                          value={f.value || ""}
                          onValueChange={f.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select ${field.label}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          {...f}
                          type={field.type}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoadingIndicator />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
