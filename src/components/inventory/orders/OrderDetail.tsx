"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Package, User, FileText } from "lucide-react";
import { Order } from "@/types/order.type";
import { format } from "date-fns";
import { useUpdateOrder } from "@/services/api/order";

interface OrderDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: Order;
}

export function OrderDetail({ open, onOpenChange, order }: OrderDetailProps) {
  // ✅ Always call hooks unconditionally
  const { mutateUpdate, isPending } = useUpdateOrder(order?.id ?? 0);

  // 🛑 Early return if there's no order
  if (!order) return null;

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "delivered":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "received":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      default:
        return "";
    }
  };

  const item = order.orderItems[0];
  const itemName =
    item?.medication?.name ?? item?.equipment?.name ?? "Unknown item";
  const itemUnit = item?.unit?.abbreviation ?? "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{itemName}</SheetTitle>
          <SheetDescription>
            Detailed order information and status
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getStatusColor(order.status)}>
              {order.status.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Quantity</div>
                <div>
                  {item?.quantity ?? "N/A"} {itemUnit}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Order Date</div>
                <div>{format(new Date(order.createdAt), "MMMM dd, yyyy")}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Supplier</div>
                <div>{order.supplier.name}</div>
              </div>
            </div>

            {order.notes && (
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <div className="text-sm font-medium">Notes</div>
                  <div>{order.notes}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Estimated Processing</div>
                <div>2–3 business days</div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-700 hover:bg-green-50"
              disabled={isPending}
              onClick={() => mutateUpdate({ status: "received" })}
            >
              Receive Order
            </Button>

            <Button
              variant="outline"
              className="w-full border-red-600 text-red-700 hover:bg-red-50"
              disabled={isPending}
              onClick={() => mutateUpdate({ status: "cancelled" })}
            >
              Cancel Order
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
