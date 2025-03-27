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

interface Medication {
  id: number;
}

const MedicationCard = () => {
  const [medications, setMedications] = useState<Medication[]>([{ id: 1 }]);

  const addMedication = () => {
    setMedications([...medications, { id: Date.now() }]);
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  return (
    <div>
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
                  <SelectItem value="Paracetamol 500mg">
                    Paracetamol 500mg
                  </SelectItem>
                  <SelectItem value="Ibuprofen 400mg">
                    Ibuprofen 400mg
                  </SelectItem>
                  <SelectItem value="Morphine 10mg">Morphine 10mg</SelectItem>
                  <SelectItem value="Aspirin 300mg">Aspirin 300mg</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-24 border-none bg-transparent">
                  <SelectValue placeholder="500 mg" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500 mg">500 mg</SelectItem>
                  <SelectItem value="1000 mg">1000 mg</SelectItem>
                  <SelectItem value="250 mg">250 mg</SelectItem>
                  <SelectItem value="100 mg">100 mg</SelectItem>
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
    </div>
  );
};

export default MedicationCard;
