import React, { useState } from "react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDown, Edit, Plus, Search, Trash, X } from "lucide-react";

const FilterDialog = () => {
  const filters = [
    { type: "incident_date", label: "Incident date" },
    { type: "status", label: "Status" },
  ];

  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(2025, 0, 1)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(2025, 0, 31)
  );

  return (
    <DialogContent className="max-w-4xl p-0 overflow-hidden">
      <div className="flex">
        <div className="flex-1 p-6">
          <DialogTitle className="text-lg font-medium mb-2">
            Advanced Search and Filter
          </DialogTitle>
          <p className="text-sm text-gray-500 mb-6">
            Create segments for filtering your data for more insights.
          </p>

          <div className="space-y-4">
            <div className="uppercase text-xs font-semibold text-gray-500">
              FILTERLIST
            </div>

            {filters.map((filter, index) => (
              <div key={index} className="border rounded-md">
                <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
                  <div className="flex items-center">
                    {/* Removed the checkbox */}
                    <span className="text-sm">{filter.label}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>

                <div className="p-3">
                  {filter.type === "incident_date" && (
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {startDate
                                ? format(startDate, "MMMM dd, yyyy")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {endDate
                                ? format(endDate, "MMMM dd, yyyy")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )}

                  {filter.type === "status" && (
                    <div className="flex flex-wrap gap-2">
                      {["Progress", "Urgent"].map((status) => (
                        <div
                          key={status}
                          className={`px-3 py-1 rounded-md text-sm flex items-center gap-1 ${
                            status === "Progress"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {status}
                          <X className="h-3 w-3 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Filter
            </Button>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" className="bg-gray-100 hover:bg-gray-200">
              Save Query
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Apply Filter
            </Button>
          </div>
        </div>

        <div className="w-64 bg-green-800 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Saved Queries</h3>
            <X className="h-4 w-4 cursor-pointer" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search saved queries"
              className="pl-8 bg-green-700 border-green-600 text-white placeholder:text-white"
            />
          </div>

          <div className="space-y-2 cursor-pointer">
            <div className="p-2 bg-white rounded-md flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-sm text-gray-950 font-medium">Urgent PCR</p>
                <p className="text-xs text-gray-600 mt-1">
                  Filter for urgent PCR cases in the last 30 days.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit className="h-4 w-4" /> {/* Edit icon */}
                </button>
                <button className="text-gray-500 hover:text-red-500">
                  <Trash className="h-4 w-4" /> {/* Delete icon */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default FilterDialog;
