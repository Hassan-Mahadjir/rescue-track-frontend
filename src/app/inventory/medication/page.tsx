"use client";

import { InventoryMedicationColumns } from "@/components/table/columns/MedicationCulomns";
import { DataTable } from "@/components/table/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface InventoryMedication {
  itemName: string;
  batchNumber: string;
  category: string;
  quantity: number;
  expirationDate: string;
}

const inventoryMedication: InventoryMedication[] = [
  {
    itemName: "Paracetamol 500mg",
    batchNumber: "B12345",
    category: "Pain Relief",
    quantity: 100,
    expirationDate: "2025-12-31",
  },
  {
    itemName: "Amoxicillin 250mg",
    batchNumber: "A67890",
    category: "Antibiotics",
    quantity: 50,
    expirationDate: "2025-06-30",
  },
  {
    itemName: "Ibuprofen 400mg",
    batchNumber: "I54321",
    category: "Pain Relief",
    quantity: 75,
    expirationDate: "2025-09-15",
  },
];

const vaccines: InventoryMedication[] = [
  {
    itemName: "Pfizer-BioNTech COVID-19 Vaccine",
    batchNumber: "PZ12345",
    category: "COVID-19",
    quantity: 200,
    expirationDate: "2025-05-31",
  },
  {
    itemName: "Moderna COVID-19 Vaccine",
    batchNumber: "MD67890",
    category: "COVID-19",
    quantity: 150,
    expirationDate: "2025-07-15",
  },
  {
    itemName: "Influenza Vaccine (Flu Shot)",
    batchNumber: "FL54321",
    category: "Influenza",
    quantity: 300,
    expirationDate: "2025-11-30",
  },
  {
    itemName: "Hepatitis B Vaccine",
    batchNumber: "HB98765",
    category: "Hepatitis",
    quantity: 100,
    expirationDate: "2025-03-01",
  },
];

const syringes: InventoryMedication[] = [
  {
    itemName: "Disposable Syringe 5ml",
    batchNumber: "SYN-5001",
    category: "Injection Tools",
    quantity: 1000,
    expirationDate: "2026-01-01",
  },
  {
    itemName: "Insulin Syringe 1ml",
    batchNumber: "INS-2025",
    category: "Diabetic Tools",
    quantity: 500,
    expirationDate: "2025-10-10",
  },
];

const labReagents: InventoryMedication[] = [
  {
    itemName: "Sodium Chloride 0.9%",
    batchNumber: "LAB-SC09",
    category: "Saline Solutions",
    quantity: 200,
    expirationDate: "2026-03-15",
  },
  {
    itemName: "Blood Glucose Reagent",
    batchNumber: "LAB-BG22",
    category: "Diagnostic",
    quantity: 120,
    expirationDate: "2025-12-01",
  },
];

const page = () => {
  return (
    <div className="w-full p-4">
      <Tabs defaultValue="medication" className="w-full">
        <TabsList className="grid w-full grid-cols-4 border-b rounded-none bg-transparent p-0">
          <TabsTrigger
            value="medication"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
          >
            Medication
          </TabsTrigger>
          <TabsTrigger
            value="vaccine"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
          >
            Vaccine
          </TabsTrigger>
          <TabsTrigger
            value="syringe"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
          >
            Syringe
          </TabsTrigger>
          <TabsTrigger
            value="lab"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
          >
            Lab Reagents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="medication">
          <DataTable
            columns={InventoryMedicationColumns}
            data={inventoryMedication}
            toolbarType="medication"
          />
        </TabsContent>

        <TabsContent value="vaccine">
          <DataTable
            columns={InventoryMedicationColumns}
            data={vaccines}
            toolbarType="medication"
          />
        </TabsContent>

        <TabsContent value="syringe">
          <DataTable
            columns={InventoryMedicationColumns}
            data={syringes}
            toolbarType="medication"
          />
        </TabsContent>

        <TabsContent value="lab">
          <DataTable
            columns={InventoryMedicationColumns}
            data={labReagents}
            toolbarType="medication"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
