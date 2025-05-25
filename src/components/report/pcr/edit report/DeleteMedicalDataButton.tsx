"use client";

import { useRouter } from "next/navigation";
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
import {
  useDeletePCRAllergy,
  useDeletePCRCondition,
  useDeletePCRTrauma,
  useDeletePCRInjuryMechanism,
  useDeletePCRTherapy,
  useDeletePCRResp,
  useDeletePCRPupil,
  useDeletePCRSpecialCircumstance,
  useDeletePCRSkin,
} from "@/services/api/reports";
import { TypeKeys } from "./AddMedicalDataDialog"; // or wherever you export TypeKeys

interface DeleteMedicalDataButtonProps {
  itemId: number;
  type: TypeKeys;
}

export default function DeleteMedicalDataButton({
  itemId,
  type,
}: DeleteMedicalDataButtonProps) {
  const router = useRouter();

  // hooks for each delete mutation
  const { mutateDelete: deleteAllergy, isPending: isAllergyPending } =
    useDeletePCRAllergy();
  const { mutateDelete: deleteCondition, isPending: isConditionPending } =
    useDeletePCRCondition();
  const { mutateDelete: deleteTrauma, isPending: isTraumaPending } =
    useDeletePCRTrauma();
  const { mutateDelete: deleteInjury, isPending: isInjuryPending } =
    useDeletePCRInjuryMechanism();
  const { mutateDelete: deleteTherapy, isPending: isTherapyPending } =
    useDeletePCRTherapy();
  const { mutateDelete: deleteResp, isPending: isRespPending } =
    useDeletePCRResp();
  const { mutateDelete: deletePupil, isPending: isPupilPending } =
    useDeletePCRPupil();
  const { mutateDelete: deleteCircumstance, isPending: isCircumstancePending } =
    useDeletePCRSpecialCircumstance();
  const { mutateDelete: deleteSkin, isPending: isSkinPending } =
    useDeletePCRSkin();

  // choose correct delete fn
  function getDelete() {
    switch (type) {
      case "allergies":
        return deleteAllergy;
      case "condition":
        return deleteCondition;
      case "trauma":
        return deleteTrauma;
      case "injury-mechanism":
        return deleteInjury;
      case "therapy":
        return deleteTherapy;
      case "respiratory":
        return deleteResp;
      case "pupil":
        return deletePupil;
      case "circumstance":
        return deleteCircumstance;
      case "skin":
        return deleteSkin;
    }
  }

  // loading state for this type
  const isLoading =
    (type === "allergies" && isAllergyPending) ||
    (type === "condition" && isConditionPending) ||
    (type === "trauma" && isTraumaPending) ||
    (type === "injury-mechanism" && isInjuryPending) ||
    (type === "therapy" && isTherapyPending) ||
    (type === "respiratory" && isRespPending) ||
    (type === "pupil" && isPupilPending) ||
    (type === "circumstance" && isCircumstancePending) ||
    (type === "skin" && isSkinPending) ||
    false;

  const handleDelete = () => {
    const mutate = getDelete();
    if (!mutate) return;
    mutate(itemId, {
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
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this{" "}
            {type.replace("-", " ")} entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
