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
import { Calendar, Clock, Package, Repeat } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { EditOrderDialog } from "./EditOrderDialog";

interface OrderDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order?: {
    name: string;
    type: string;
    quantity: number;
    day: number;
    recurring?: boolean;
    date: Date;
  };
}

export function OrderDetail({ open, onOpenChange, order }: OrderDetailProps) {
  if (!order) return null;
  const { isAdmin } = useAuth();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "vaccine":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "syringe":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "lab":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{order.name}</SheetTitle>
          <SheetDescription>
            Order details and scheduling information
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className={getTypeColor(order.type)}>
              {order.type}
            </Badge>
            {order.recurring && (
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 hover:bg-purple-100"
              >
                Recurring
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Quantity</div>
                <div>{order.quantity} units</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Scheduled Date</div>
                <div>September {order.day}, 2023</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Processing Time</div>
                <div>2-3 business days</div>
              </div>
            </div>

            {order.recurring && (
              <div className="flex items-center gap-3">
                <Repeat className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">Recurrence</div>
                  <div>Every 30 days</div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 space-y-2">
            <EditOrderDialog order={order} />
            {isAdmin() && (
              <Button variant="outline" className="w-full">
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
