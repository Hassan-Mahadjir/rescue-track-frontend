"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoadingIndicator from "@/components/Loading-Indicator";
import type { VitalSign as VitalSignType } from "@/types/report.type";
import {
  VitalSignData,
  VitalSignSchema,
} from "@/types/schema/reportFormSchema";
import { useUpdatePCRVitalSign } from "@/services/api/reports";

interface EditVitalSignDialogProps {
  vitalSign: VitalSignType;
}

export default function EditVitalSignDialog({
  vitalSign,
}: EditVitalSignDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutateUpdate, isPending } = useUpdatePCRVitalSign(vitalSign.id);

  //
  // 2) Initialize react-hook-form with default values
  //
  const form = useForm<VitalSignData>({
    resolver: zodResolver(VitalSignSchema),
    defaultValues: {
      time: new Date(vitalSign.time).toISOString().slice(0, 16),
      T: vitalSign.T,
      BP: vitalSign.BP,
      pulse: vitalSign.pulse,
      resp: vitalSign.resp,
      spO2: vitalSign.spO2,
      treatments:
        vitalSign.treatments?.map((t) => ({
          name: t.name,
          category: t.category,
          dosage: t.dosage,
          unit: t.unit.abbreviation,
          route: t.route,
          giveAt: t.givenAt
            ? new Date(t.givenAt).toISOString().slice(0, 16)
            : undefined,
          result: t.result,
        })) ?? [],
    },
  });

  //
  // 3) Field array for treatments
  //
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "treatments",
  });

  const addTreatment = () =>
    append({
      name: "",
      category: "antibiotic",
      dosage: 0,
      unit: "mg",
      route: "",
      giveAt: undefined,
      result: "",
    });

  //
  // 4) Submit handler
  //
  const onSubmit = (data: VitalSignData) => {
    mutateUpdate(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-main font-semibold">Edit Vital Signs</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Vital Signs & Treatments</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Vital Signs */}
            <Card className="bg-gray-100">
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="T"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input placeholder="36.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="BP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure</FormLabel>
                      <FormControl>
                        <Input placeholder="120/80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pulse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pulse</FormLabel>
                      <FormControl>
                        <Input placeholder="72" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Respiration</FormLabel>
                      <FormControl>
                        <Input placeholder="16" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spO2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SpO₂</FormLabel>
                      <FormControl>
                        <Input placeholder="98%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Treatments */}
            <Card className="bg-gray-100">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>Treatments</CardTitle>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addTreatment}
                >
                  Add Treatment
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.length === 0 && (
                  <p className="text-gray-500 text-center">
                    No treatments added.
                  </p>
                )}

                {fields.map((field, index) => (
                  <Card key={field.id} className="bg-white">
                    <CardHeader className="flex justify-between items-center">
                      <CardTitle>Treatment {index + 1}</CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`treatments.${index}.name` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Aspirin" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`treatments.${index}.category` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="antibiotic">
                                    Antibiotic
                                  </SelectItem>
                                  <SelectItem value="analgesic">
                                    Analgesic
                                  </SelectItem>
                                  <SelectItem value="antihistamine">
                                    Antihistamine
                                  </SelectItem>
                                  <SelectItem value="bronchodilator">
                                    Bronchodilator
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`treatments.${index}.dosage` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dosage</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`treatments.${index}.unit` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mg">mg</SelectItem>
                                  <SelectItem value="ml">ml</SelectItem>
                                  <SelectItem value="g">g</SelectItem>
                                  <SelectItem value="mcg">mcg</SelectItem>
                                  <SelectItem value="units">units</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`treatments.${index}.route` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Route</FormLabel>
                            <FormControl>
                              <Input placeholder="IV, PO, IM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`treatments.${index}.giveAt` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Given At</FormLabel>
                            <FormControl>
                              <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`treatments.${index}.result` as any}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Result</FormLabel>
                            <FormControl>
                              <Input placeholder="effective" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <LoadingIndicator /> : "Update Vital Signs"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
