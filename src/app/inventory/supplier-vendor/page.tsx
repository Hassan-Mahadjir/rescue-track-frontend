"use client";
import SupplierVendorList from "@/components/inventory/SupplierVendorList";
import ReportSummaryCard from "@/components/report/ReportSummaryCard";
import { useSuppliers } from "@/services/api/supplier";
import { Users } from "lucide-react";
import React from "react";

const SupplierVendorPage = () => {
  const { supplierData, isPending } = useSuppliers();
  return (
    <div className="mt-5 px-5 space-y-3">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="space-y-2 flex flex-col items-baseline">
          <h1 className="text-xl font-semibold mr-2">
            Supplier and Vendor Managment
          </h1>
          <p className="text-sm text-muted-foreground">
            Have a database of your trusted suppliers
          </p>
        </div>
        {/*Report Summary */}
        <div className="flex flex-row space-x-6 mr-5">
          <ReportSummaryCard icon={Users} number={150} title="Urgent Cases" />
        </div>
      </div>
      <div className="rounded-lg border-0 bg-gradient-to-r from-gray-100 to-white p-6 mb-4">
        <SupplierVendorList
          supplier={supplierData || []}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default SupplierVendorPage;
