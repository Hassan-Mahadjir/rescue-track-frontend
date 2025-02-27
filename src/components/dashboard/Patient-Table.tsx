import React from "react";
import { columns, patient } from "./columns";
import { DataTable } from "./Data-Table";

async function getData(): Promise<patient[]> {
  return [
    {
      id: 1,
      name: "Hassan Mahadjir",
      status: "Transfer",
      sickness: "XXXX",
      avatar:
        "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Taz Khalid",
      status: "In hospital",
      sickness: "XXXX",
      avatar:
        "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Irem Meydanli",
      status: "Transfer",
      sickness: "XXXX",
      avatar:
        "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
}

export const patients: patient[] = [];

const PatientTable = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto py-3">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PatientTable;
