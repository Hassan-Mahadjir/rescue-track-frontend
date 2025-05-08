"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteRunReport } from "@/services/api/reports";
import { Pencil, Eye, Trash2, Ellipsis } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoadingIndicator from "@/components/Loading-Indicator";
import { useAuth } from "@/hooks/useAuth";

const RunReportAction = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutateDelete, isPending } = useDeleteRunReport();
  const { isAdmin } = useAuth();

  const handleConfirmDelete = () => {
    mutateDelete(id);
    setDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Open actions"
          >
            <Ellipsis className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link
              href={`run-report/${id}/edit`}
              className="flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`run-report/${id}`} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Open
            </Link>
          </DropdownMenuItem>

          {/* Admin-only delete option */}
          {isAdmin() && (
            <DropdownMenuItem
              onClick={() => setDialogOpen(true)}
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-600/10 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Admin-only dialog */}
      {isAdmin() && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this report? This action cannot be
              undone.
            </p>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={isPending}
              >
                {isPending ? <LoadingIndicator /> : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RunReportAction;
