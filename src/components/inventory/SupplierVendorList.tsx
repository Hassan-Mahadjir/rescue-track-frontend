import React from "react";
import { DataTable } from "../table/DataTable";
import { SupplierVendorColumns } from "../table/columns/SupplierVendorColumns";
import { Supplier } from "@/types/supplier";

interface SupplierVendorList {
  supplier: Supplier[];
  isLoading: boolean;
}

const SupplierVendorList = ({ supplier, isLoading }: SupplierVendorList) => {
  return (
    <div>
      <DataTable
        columns={SupplierVendorColumns}
        data={supplier}
        toolbarType="supply"
        loading={isLoading}
      />
    </div>
  );
};

export default SupplierVendorList;
