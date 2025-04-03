"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

interface Medication {
  id: number;
}
const medicationsName = [
  { id: 1, name: "Paracetamol" },
  { id: 2, name: "Ibuprofen" },
  { id: 3, name: "Morphine" },
  { id: 4, name: "Aspirin" },
];
const medicationsSize = [
  { id: 1, name: "100 mg" },
  { id: 2, name: "250 mg" },
  { id: 3, name: "500 mg" },
  { id: 4, name: "1000 mg" },
];

const PcrReportStep2 = () => {
  const [medications, setMedications] = useState<Medication[]>([{ id: 1 }]);

  const addMedication = () => {
    setMedications([...medications, { id: Date.now() }]);
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  return (
    <div>
      <TabsContent value="medication_info">
        <h2 className="text-lg font-medium text-gray-800">
          Treatment provided during transport
        </h2>
        <Card className="p-4 border border-gray-300">
          {/* Grid for medication rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {medications.map((med) => (
              <div
                key={med.id}
                className="flex items-center gap-2 border rounded-md p-2 bg-gray-100"
              >
                <Select>
                  <SelectTrigger className="flex-1 border-none bg-transparent">
                    <SelectValue placeholder="Select med" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicationsName.map((medication) => (
                      <SelectItem key={medication.id} value={medication.name}>
                        {medication.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-24 border-none bg-transparent">
                    <SelectValue placeholder="500 mg" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicationsSize.map((size) => (
                      <SelectItem key={size.id} value={size.name}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeMedication(med.id)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              variant="default"
              className="mt-3 bg-main"
              onClick={addMedication}
            >
              <Plus /> Add medication
            </Button>
          </div>
        </Card>
      </TabsContent>
    </div>
  );
};

export default PcrReportStep2;
