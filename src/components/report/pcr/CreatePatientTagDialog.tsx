"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { usePostPCRAllergy, usePostPCRCondition } from "@/services/api/reports";
import LoadingIndicator from "@/components/Loading-Indicator";

const tagSchema = z.object({
  tags: z.array(z.string()).optional().default([]),
});

type TagFormValues = z.infer<typeof tagSchema>;

interface CreatePatientTagDialogProps {
  id: number;
  type: "allergy" | "condition";
  predefinedOptions: { label: string; value: string }[];
}

const CreatePatientTagDialog = ({
  id,
  type,
  predefinedOptions,
}: CreatePatientTagDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const { allergyMutatePost, isPending: isAllergyPending } =
    usePostPCRAllergy(id);
  const { conditionMutatePost, isPending: isConditionPending } =
    usePostPCRCondition(id);

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      tags: [],
    },
  });

  const title = type === "allergy" ? "Allergy" : "Medical Condition";

  const handleSubmit = async (data: TagFormValues) => {
    const tags = data.tags || [];

    for (const tag of tags) {
      if (type === "allergy") {
        allergyMutatePost(
          { name: tag },
          {
            onSuccess: () => {
              setIsOpen(false);
              form.reset();
              setCustomTag("");
            },
          }
        );
      } else {
        conditionMutatePost(
          { name: tag },
          {
            onSuccess: () => {
              setIsOpen(false);
              form.reset();
              setCustomTag("");
            },
          }
        );
      }
    }
  };

  const addCustomTag = (
    field: ControllerRenderProps<TagFormValues, "tags">
  ) => {
    const trimmed = customTag.trim();
    if (trimmed && !field.value.includes(trimmed)) {
      field.onChange([...field.value, trimmed]);
      setCustomTag("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main hover:bg-main/90" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-4">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Select or Add {title}s
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <div className="space-y-3">
                  {/* Predefined checkboxes */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Select from list:</p>
                    {predefinedOptions.map((opt) => (
                      <FormItem
                        key={opt.value}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(opt.value)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              field.onChange(
                                checked
                                  ? [...current, opt.value]
                                  : current.filter((val) => val !== opt.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm">{opt.label}</FormLabel>
                      </FormItem>
                    ))}
                  </div>

                  {/* Add custom tag input */}
                  <div className="flex items-end gap-2">
                    <FormItem className="flex-1">
                      <FormLabel className="text-sm text-gray-500">
                        Add custom {type}
                      </FormLabel>
                      <Input
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        placeholder={`e.g. ${
                          type === "allergy" ? "Pollen" : "Cancer"
                        }`}
                      />
                    </FormItem>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addCustomTag(field)}
                      disabled={!customTag.trim()}
                    >
                      Add
                    </Button>
                  </div>

                  {/* Display selected tags with remove option */}
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center hover:bg-gray-100"
                        >
                          {tag}
                          <button
                            type="button"
                            className="ml-1 text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((val) => val !== tag)
                              )
                            }
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </div>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isAllergyPending || isConditionPending}
              >
                {isAllergyPending || isConditionPending ? (
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
};

export default CreatePatientTagDialog;
