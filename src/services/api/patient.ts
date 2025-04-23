"use client";
import { useQuery } from "@tanstack/react-query";
import patientService from "../patient-service";

const usePatients = () => {
  // const router = useRouter();
  const {
    data: patientData,
    error,
    isError,
    ...props
  } = useQuery({
    queryFn: () => patientService.getPatients(),
    queryKey: ["patients"],
  });

  if (isError) {
    console.error("Failed to fetch profile:", error);
  }

  return { patientData, ...props };
};

export default usePatients;
