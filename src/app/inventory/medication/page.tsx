"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/table/DataTable";
import { useItems } from "@/services/api/item";
import React from "react";
import { InventoryMedicationColumns } from "@/components/table/columns/MedicationCulomns";
import { InventoryEquipmentColumns } from "@/components/table/columns/EquipmentColumns";

const MedicationPage = () => {
  const { itemData, isPending } = useItems();
  const medication = itemData?.medications;
  const equipment = itemData?.equipments;

  return (
    <div className="w-full p-4">
      <Tabs defaultValue="medications" className="w-full">
        <TabsList className="grid w-full grid-cols-2 border-b rounded-none bg-transparent p-0">
          <TabsTrigger
            value="medications"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
          >
            Medications
          </TabsTrigger>
          <TabsTrigger
            value="equipments"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none font-medium hover:text-gray-950"
          >
            Equipments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="medications">
          <DataTable
            columns={InventoryMedicationColumns}
            data={medication || []}
            toolbarType="medication"
            loading={isPending}
          />
        </TabsContent>

        <TabsContent value="equipments">
          <DataTable
            columns={InventoryEquipmentColumns}
            data={equipment || []}
            toolbarType="equipment"
            loading={isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicationPage;
