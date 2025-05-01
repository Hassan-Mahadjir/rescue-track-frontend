"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export default function PcrReportStep3() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className=" p-4 ">
          <h3 className="text-sm font-medium mb-3">Responsible</h3>
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
      <div className="border rounded-md p-4">
        <h3 className="text-base font-medium mb-4">Transport Information</h3>

        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Transfer Type (Primary) - Full width on mobile, 2 cols on desktop */}
          <div className="md:col-span-2">
            <FormField
              control={control}
              name="transportInfo.transferType"
              render={({ field }) => (
                <FormItem>
                  <Label className="block text-sm font-medium mb-1">
                    Transfer Type
                  </Label>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
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

          {/* Vehicle ID - Full width on mobile, 1 col on desktop */}
          <div className="md:col-span-1">
            <FormField
              control={control}
              name="transportInfo.vehicleId"
              render={({ field }) => (
                <FormItem>
                  <Label className="block text-sm font-medium mb-1">
                    Vehicle ID
                  </Label>
                  <FormControl>
                    <Input placeholder="Enter vehicle ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Emergency Type - Full width on mobile, 1 col on desktop */}
          <div className="md:col-span-1">
            <FormField
              control={control}
              name="transportInfo.emergencyType"
              render={({ field }) => (
                <FormItem>
                  <Label className="block text-sm font-medium mb-1">
                    Emergency Type
                  </Label>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
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

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup Address */}
          <FormField
            control={control}
            name="transportInfo.pickupAddress"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm font-medium mb-1">
                  Pickup Address
                </Label>
                <FormControl>
                  <Input
                    placeholder="Address of getting the patient"
                    className="bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Destination Address */}
          <FormField
            control={control}
            name="transportInfo.destinationAddress"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-sm font-medium mb-1">
                  Destination Address
                </Label>
                <FormControl>
                  <Input
                    placeholder="Address of hospital"
                    className="bg-gray-100"
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
}
