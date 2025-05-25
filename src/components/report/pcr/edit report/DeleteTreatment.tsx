"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeletePCRTreatment } from "@/services/api/reports";

interface DeleteTreatmentProps {
  treatmentId: number;
}

export default function DeleteTreatment({ treatmentId }: DeleteTreatmentProps) {
  const router = useRouter();
  const { mutateDelete, isPending } = useDeletePCRTreatment();

  const handleDelete = () => {
    mutateDelete(treatmentId, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          Delete <span className="sr-only">treatment</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Treatment?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove the treatment. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
