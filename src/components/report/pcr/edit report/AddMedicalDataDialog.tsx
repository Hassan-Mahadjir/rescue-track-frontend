"use client";

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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1) Define all your Zod schemas in a map:
const schemaMap = {
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
} as const;

export type TypeKeys = keyof typeof schemaMap;

// 2) Field configuration for each type:
type FieldConfigItem =
  | { name: string; label: string; type: "text" | "number" }
  | { name: string; label: string; type: "select"; options: string[] };

const fieldConfig: Record<TypeKeys, FieldConfigItem[]> = {
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

interface AddMedicalDataDialogProps {
  id: number;
  type: TypeKeys;
}

export default function AddMedicalDataDialog({
  id,
  type,
}: AddMedicalDataDialogProps) {
  const [open, setOpen] = useState(false);

  // 3) Load all your mutation hooks:
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

  // 4) Build a simple Record<string, any> form to avoid the union-schema TS issues:
  const form = useForm<Record<string, any>>({
    resolver: zodResolver(schemaMap[type] as any),
    defaultValues: {},
  });

  // 5) Pick the right mutation based on type:
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

  const onSubmit = (data: Record<string, any>) => {
    const mutate = getMutate();
    if (!mutate) return;
    // cast to `any` (or to your inferred schema type) because TSC
    // already knows Zod validated this for you:
    mutate(data as any, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  const fields = fieldConfig[type];
  const title = type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

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
