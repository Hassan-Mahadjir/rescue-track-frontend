"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import React from "react";
import { useDeletePCRTreatment } from "@/services/api/reports";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/components/Loading-Indicator";

interface TreatmentIdProps {
  id: number;
}

const DeleteTreatment = ({ id }: TreatmentIdProps) => {
  const { mutateDelete, isPending } = useDeletePCRTreatment();
  const router = useRouter();

  const handleDelete = async () => {
    mutateDelete(id, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          disabled={isPending}
        >
          <Trash className="h-3.5 w-3.5" />
          <span className="sr-only">Delete treatment</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            treatment record.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending ? <LoadingIndicator /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTreatment;
