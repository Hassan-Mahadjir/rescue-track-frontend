"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import patientService from "../patient-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Patient } from "@/types/patients.type";

export const useGetPatient = (id: number) => {
  const {
    data: patientData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => patientService.getPatient(id),
    queryKey: ["patient", id],
  });
  if (isError) {
    console.error("Failed to fetch patient:", error);
  }

  return { patientData, ...props };
};

export const useUpdatePatient = (id: number) => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    mutate: mutateUpdatePatient,
    isPending,
    ...props
  } = useMutation({
    mutationFn: (data: Patient) => patientService.updatePatient(id, data),
    onSuccess: async (response) => {
      toast({
        title: `${response.data.message}`,
        description: "You can now log in with your new password.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
    },
    onError: () => {
      // Unsuccessful login toast
    },
  });

  return { mutateUpdatePatient, isPending, ...props };
};
