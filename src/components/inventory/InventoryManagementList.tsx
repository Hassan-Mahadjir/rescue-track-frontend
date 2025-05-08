import React from "react";
import { InventoryColumns } from "../table/columns/InventoryColumns";
import { DataTable } from "../table/DataTable";

export type InventoryManagement = {
  itemName: string;
  barcode: string;
  category: string;
  quantity: number;
  expirationDate: string;
};

const inventoryData: InventoryManagement[] = [
  {
    itemName: "Paracetamol 500mg",
    barcode: "100000000001",
    category: "Painkiller",
    quantity: 150,
    expirationDate: "2026-06-15",
  },
  {
    itemName: "Ibuprofen 400mg",
    barcode: "100000000002",
    category: "Painkiller",
    quantity: 30,
    expirationDate: "2025-12-10",
  },
  {
    itemName: "Amoxicillin 250mg",
    barcode: "100000000003",
    category: "Antibiotic",
    quantity: 60,
    expirationDate: "2027-03-22",
  },
  {
    itemName: "Ceftriaxone Injection",
    barcode: "100000000004",
    category: "Antibiotic",
    quantity: 10,
    expirationDate: "2025-09-30",
  },
  {
    itemName: "Metformin 500mg",
    barcode: "100000000005",
    category: "Diabetes",
    quantity: 200,
    expirationDate: "2028-01-15",
  },
  {
    itemName: "Insulin Pen",
    barcode: "100000000006",
    category: "Diabetes",
    quantity: 5,
    expirationDate: "2025-07-10",
  },
  {
    itemName: "Salbutamol Inhaler",
    barcode: "100000000007",
    category: "Respiratory",
    quantity: 25,
    expirationDate: "2026-05-18",
  },
  {
    itemName: "Omeprazole 20mg",
    barcode: "100000000008",
    category: "Gastrointestinal",
    quantity: 90,
    expirationDate: "2027-09-05",
  },
  {
    itemName: "Ranitidine 150mg",
    barcode: "100000000009",
    category: "Gastrointestinal",
    quantity: 0,
    expirationDate: "2025-04-20",
  },
  {
    itemName: "IV Glucose Solution",
    barcode: "100000000010",
    category: "IV Fluids",
    quantity: 50,
    expirationDate: "2027-12-12",
  },
  {
    itemName: "Normal Saline IV",
    barcode: "100000000011",
    category: "IV Fluids",
    quantity: 10,
    expirationDate: "2025-11-30",
  },
  {
    itemName: "Vitamin C Tablets",
    barcode: "100000000012",
    category: "Vitamins",
    quantity: 120,
    expirationDate: "2028-02-20",
  },
  {
    itemName: "Syringes 5ml",
    barcode: "100000000013",
    category: "Medical Supply",
    quantity: 300,
    expirationDate: "2027-10-15",
  },
  {
    itemName: "Disposable Gloves",
    barcode: "100000000014",
    category: "Medical Supply",
    quantity: 40,
    expirationDate: "2026-06-05",
  },
  {
    itemName: "Surgical Masks",
    barcode: "100000000015",
    category: "Medical Supply",
    quantity: 0,
    expirationDate: "2025-08-25",
  },
  {
    itemName: "Hydrocortisone Cream",
    barcode: "100000000016",
    category: "Dermatology",
    quantity: 15,
    expirationDate: "2025-10-30",
  },
  {
    itemName: "Aspirin 100mg",
    barcode: "100000000017",
    category: "Cardiovascular",
    quantity: 80,
    expirationDate: "2026-03-12",
  },
  {
    itemName: "Losartan 50mg",
    barcode: "100000000018",
    category: "Cardiovascular",
    quantity: 20,
    expirationDate: "2026-07-25",
  },
  {
    itemName: "Warfarin 5mg",
    barcode: "100000000019",
    category: "Blood Thinner",
    quantity: 10,
    expirationDate: "2025-09-01",
  },
  {
    itemName: "Epinephrine Auto-Injector",
    barcode: "100000000020",
    category: "Emergency",
    quantity: 3,
    expirationDate: "2025-05-15",
  },
];

const InventoryManagementList = () => {
  return (
    <div className="mb-10">
      <DataTable
        columns={InventoryColumns}
        data={inventoryData}
        toolbarType="inventory"
      />
    </div>
  );
};

export default InventoryManagementList;
