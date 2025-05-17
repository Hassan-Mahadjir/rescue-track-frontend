"use client";
import { useToast } from "@/hooks/use-toast";
import { Patient } from "@/types/patients.type";
import patientService from "../patient-service";
import {
  useRoleBasedQuery,
  useRoleBasedMutation,
} from "@/hooks/useRoleBasedQuery";
import { useQueryClient } from "@tanstack/react-query";
import { FormSchema } from "@/app/(Report Management)/report/pcr/create/unregistered/page";

export const useGetPatient = (id: number) => {
  const { data: patientData, ...props } = useRoleBasedQuery<Patient>({
    queryKey: ["patient", id],
    adminQueryFn: async () => {
      const response = await patientService.getPatientAdmin(id);
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await patientService.getPatient(id);
      return response.data.data;
    },
  });

  return { patientData, ...props };
};

export const useGetPatients = () => {
  const { data: patientsData, ...props } = useRoleBasedQuery<Patient[]>({
    queryKey: ["patient"],
    adminQueryFn: async () => {
      const response = await patientService.getPatientsAdmin();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await patientService.getPatients();
      return response.data.data;
    },
  });

  return { patientsData, ...props };
};

export const useUpdatePatient = (id: number) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: mutateUpdatePatient,
    isPending,
    ...props
  } = useRoleBasedMutation<Patient, Patient>({
    adminMutationFn: (data) => patientService.updatePatient(id, data),
    employeeMutationFn: (data) => patientService.updatePatient(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["patient", id] });

      toast({
        title: response.message,
        description: "Patient updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update patient",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdatePatient, isPending, ...props };
};

export const useCreatePatient = () => {
  const { toast } = useToast();

  const {
    mutate: createPatient,
    isPending,
    ...props
  } = useRoleBasedMutation<FormSchema, FormSchema>({
    adminMutationFn: (data) => patientService.createPatient(data),
    employeeMutationFn: (data) => patientService.createPatient(data),
    onSuccess: (response) => {
      toast({
        title: response.message,
        description:
          "Patient created successfully. you can create Run report for this patient.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
    },
    onError: (error) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create patient",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { createPatient, isPending, ...props };
};
