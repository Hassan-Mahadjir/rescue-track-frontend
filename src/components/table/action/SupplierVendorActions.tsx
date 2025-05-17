"use client";
import EditSupplierVendorDialog from "@/components/inventory/edit/EditSupplierVendorDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Supplier } from "@/types/supplier";
import copy from "copy-to-clipboard";
import { MoreHorizontal } from "lucide-react";

interface SupplierVendorActionsProps {
  supplier: Supplier;
}

const SupplierVendorActions = ({ supplier }: SupplierVendorActionsProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => copy(supplier.phone)}>
            Copy phone number
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <EditSupplierVendorDialog supplier={supplier} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SupplierVendorActions;
