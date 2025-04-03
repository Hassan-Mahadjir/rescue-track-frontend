"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
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

const PcrReportStep3 = () => {
  return (
    <Tabs defaultValue="crew_Info">
      <TabsContent value="crew_Info" className="space-y-6">
        {/* Responsible Section */}
        <div className="grid grid-cols-2">
          <div className=" rounded-md p-4">
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
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Transfer Type
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="- Select -" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ambulance">Ambulance</SelectItem>
                  <SelectItem value="helicopter">Helicopter</SelectItem>
                  <SelectItem value="private">Private Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Vehicle ID - takes 1/4 (25%) */}
            <div className="col-span-1">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle ID
              </Label>
              <Input placeholder="Enter vehicle ID" />
            </div>
            {/* Second Transfer Type - takes 1/4 (25%) */}
            <div className="col-span-1">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Transfer Type
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="- Select -" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Address
              </Label>
              <Input
                placeholder="address of getting the patient"
                className="bg-gray-100"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Destination Address
              </Label>
              <Input
                placeholder="address of hospital"
                className="bg-gray-100"
              />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PcrReportStep3;
