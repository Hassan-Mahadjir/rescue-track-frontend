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
import { Trash2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import {
  useDeletePCRAllergy,
  useDeletePCRCondition,
} from "@/services/api/reports";
import LoadingIndicator from "@/components/Loading-Indicator";

interface DeleteTagDialogProps {
  id: number;
  type: "allergy" | "condition";
}

const DeleteTagDialog = ({ id, type }: DeleteTagDialogProps) => {
  const router = useRouter();

  const { mutateDelete: deleteAllergy, isPending: isAllergyPending } =
    useDeletePCRAllergy();

  const { mutateDelete: deleteCondition, isPending: isConditionPending } =
    useDeletePCRCondition();

  const isPending = type === "allergy" ? isAllergyPending : isConditionPending;

  const handleDelete = () => {
    const mutate = type === "allergy" ? deleteAllergy : deleteCondition;

    mutate(id, {
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
          <Trash2 className="h-3.5 w-3.5" />
          <span className="sr-only">Delete tag</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this{" "}
            {type} record.
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

export default DeleteTagDialog;
