"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import type { PcrReportFormValues } from "@/types/formSchema";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import clsx from "clsx";

interface PcrReportStep3Props {
  form: UseFormReturn<PcrReportFormValues>;
}

const PcrReportStep3 = ({ form }: PcrReportStep3Props) => {
  const {
    control,
    formState: { errors },
  } = form;

  // Check if there are any errors in the transportInfo object
  const hasTransportErrors =
    errors.transportInfo && "message" in errors.transportInfo;

  return (
    <div className="space-y-6">
      {hasTransportErrors && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errors.transportInfo?.message as string}
          </AlertDescription>
        </Alert>
      )}

      {/* Responsible Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md p-4 border">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Responsible
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/report/sample.jpg"
                alt="Nour Ahmed Barakat"
                className="rounded-full object-cover"
                fill
              />
            </div>
            <span className="font-medium">Nour Ahmed Barakat</span>
          </div>
        </div>
        {/* Team Mates Section */}
        <div className="border rounded-md p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Team Mate(s)
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between border rounded-md p-2">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8">
                  <Image
                    src="/report/sample.jpg"
                    alt="Fares Amous"
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <span>Fares Amous</span>
              </div>
              <div className="bg-green-700 text-white text-xs px-2 py-1 rounded">
                Chief
              </div>
            </div>

            <div className="flex items-center justify-between border rounded-md p-2">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8">
                  <Image
                    src="/report/sample.jpg"
                    alt="Nour Ahmed Barakat"
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <span>Nour Ahmed Barakat</span>
              </div>
              <div className="bg-green-700 text-white text-xs px-2 py-1 rounded">
                Driver
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transport Information Section */}
      <div className="border rounded-md p-4">
        <h3 className="text-base font-medium mb-4">Transport information</h3>

        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* First Transfer Type - takes 2/4 (50%) */}
          <div className="col-span-2">
            <FormField
              control={control}
              name="transportInfo.transferType"
              render={({ field }) => (
                <FormItem>
                  <Label
                    className={clsx(
                      "block text-sm font-medium mb-1",
                      errors.transportInfo?.transferType
                        ? "text-red-500"
                        : "text-gray-700"
                    )}
                  >
                    Transfer Type
                  </Label>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={clsx(
                          "w-full",
                          errors.transportInfo?.transferType && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="- Select -" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ambulance">Ambulance</SelectItem>
                        <SelectItem value="helicopter">Helicopter</SelectItem>
                        <SelectItem value="private">Private Vehicle</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Vehicle ID - takes 1/4 (25%) */}
          <div className="col-span-1">
            <FormField
              control={control}
              name="transportInfo.vehicleId"
              render={({ field }) => (
                <FormItem>
                  <Label
                    className={clsx(
                      "block text-sm font-medium mb-1",
                      errors.transportInfo?.vehicleId
                        ? "text-red-500"
                        : "text-gray-700"
                    )}
                  >
                    Vehicle ID
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="Enter vehicle ID"
                      {...field}
                      className={clsx(
                        errors.transportInfo?.vehicleId && "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Second Transfer Type - takes 1/4 (25%) */}
          <div className="col-span-1">
            <FormField
              control={control}
              name="transportInfo.emergencyType"
              render={({ field }) => (
                <FormItem>
                  <Label
                    className={clsx(
                      "block text-sm font-medium mb-1",
                      errors.transportInfo?.emergencyType
                        ? "text-red-500"
                        : "text-gray-700"
                    )}
                  >
                    Transfer Type
                  </Label>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={clsx(
                          "w-full",
                          errors.transportInfo?.emergencyType &&
                            "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="- Select -" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="transportInfo.pickupAddress"
            render={({ field }) => (
              <FormItem>
                <Label
                  className={clsx(
                    "block text-sm font-medium mb-1",
                    errors.transportInfo?.pickupAddress
                      ? "text-red-500"
                      : "text-gray-700"
                  )}
                >
                  Pickup Address
                </Label>
                <FormControl>
                  <Input
                    placeholder="address of getting the patient"
                    className={clsx(
                      "bg-gray-100",
                      errors.transportInfo?.pickupAddress && "border-red-500"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="transportInfo.destinationAddress"
            render={({ field }) => (
              <FormItem>
                <Label
                  className={clsx(
                    "block text-sm font-medium mb-1",
                    errors.transportInfo?.destinationAddress
                      ? "text-red-500"
                      : "text-gray-700"
                  )}
                >
                  Destination Address
                </Label>
                <FormControl>
                  <Input
                    placeholder="address of hospital"
                    className={clsx(
                      "bg-gray-100",
                      errors.transportInfo?.destinationAddress &&
                        "border-red-500"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PcrReportStep3;
