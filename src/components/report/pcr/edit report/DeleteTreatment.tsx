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
import { useRouter } from "next/navigation";

interface TreatmentIdProps {
  id: number;
  onDelete?: (id: number) => Promise<void> | void;
}

const DeleteTreatment = ({ id, onDelete }: TreatmentIdProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Default delete implementation if no onDelete prop provided
      // Replace this with your actual API call
      // Example
      // const response = await fetch(`/api/treatments/${id}`, {
      //   method: "DELETE",
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to delete treatment");
      // }

      // send success message

      router.refresh();
    } catch (error) {
      // send error message
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          disabled={isDeleting}
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
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTreatment;
