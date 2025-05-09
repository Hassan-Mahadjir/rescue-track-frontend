import React from "react";
import { DataTable } from "../table/DataTable";
import { SupplierVendorColumns } from "../table/columns/SupplierVendorColumns";

export interface VendorData {
  vendor: string;
  vendorId: string;
  email: string;
  phone: string;
  address: string;
  orderSent: number;
}

const vendors: VendorData[] = [
  {
    vendor: "MedTrust Distributors",
    vendorId: "9738923",
    email: "med@gmail.com",
    phone: "+0123456789",
    address: "123, Greenway Business Park",
    orderSent: 12,
  },
  {
    vendor: "PharmaCare Supplies",
    vendorId: "4567890",
    email: "support@pharmacare.com",
    phone: "+0123987654",
    address: "456, Riverside Industrial Estate",
    orderSent: 8,
  },
  {
    vendor: "HealthLine Distributors",
    vendorId: "1122334",
    email: "info@healthline.com",
    phone: "+0112345678",
    address: "789, Medical Hub District",
    orderSent: 20,
  },
];

const SupplierVendorList = () => {
  return (
    <div>
      <DataTable
        columns={SupplierVendorColumns}
        data={vendors}
        toolbarType="supply"
      />
    </div>
  );
};

export default SupplierVendorList;
