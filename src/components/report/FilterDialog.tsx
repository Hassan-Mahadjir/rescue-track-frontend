import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";

const FilterDialog = () => {
  const [fromDate, setFromDate] = React.useState<Date | undefined>(new Date());
  const [toDate, setToDate] = React.useState<Date | undefined>(new Date());

  return (
    <DialogContent className="max-w-lg md:max-w-2xl bg-white p-6 rounded-xl shadow-xl">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-gray-900">
          Advanced Search and Filter
        </DialogTitle>
      </DialogHeader>

      {/* Filter List Section */}
      <div className="space-y-4">
        {/* Incident Date */}
        <div>
          <Label className="text-gray-700 text-sm font-medium">
            Incident Date
          </Label>
          <div className="flex space-x-4 mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {fromDate ? format(fromDate, "PPP") : "Select Start Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {toDate ? format(toDate, "PPP") : "Select End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Status Selection */}
        <div>
          <Label className="text-gray-700 text-sm font-medium">Status</Label>
          <Select>
            <SelectTrigger className="w-full mt-2">
              <span>Select Status</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" className="w-1/2">
            Save Query
          </Button>
          <Button className="w-1/2 ml-2">Apply Filter</Button>
        </div>
      </div>

      {/* Saved Queries Sidebar */}
      <div className="absolute right-0 top-0 w-64 bg-green-900 text-white p-4 rounded-l-lg shadow-lg">
        <h3 className="text-lg font-semibold">Saved Queries</h3>
        <div className="mt-2 space-y-2">
          <div className="bg-green-700 p-2 rounded-lg flex justify-between">
            <span className="text-sm">Urgent PCR</span>
            <button className="text-xs opacity-70 hover:opacity-100">✕</button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default FilterDialog;
