"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./Data-Table";
import Link from "next/link";
import { Patient } from "@/types/patients.type";
import { useGetPatients } from "@/services/api/patient";

export const patients: Patient[] = [];

const PatientTable = () => {
  const { patientsData } = useGetPatients();

  return (
    <div className="container mx-auto py-3">
      <div className="flex justify-between">
        <p className="text-lg whitespace-nowrap">Patient Management</p>
        <Link href="#" className="hover:">
          See all
        </Link>
      </div>

      <DataTable columns={columns} data={patientsData ?? []} />
    </div>
  );
};

export default PatientTable;
