"use client";
import { NewPCRFormContext, PCR } from "@/contexts/pcr-form-context";
import { useState } from "react";

export function PCRFormContextProider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [propertyForm, setPropertyForm] = useState<PCR>({
    incidentNumber: null,
    dateOfINcident: "",
    incidentType: "",
    incidentStatus: "",
    region: "",
    landmark: "",
    reason: "",
  });

  const updatePropertyForm = (values: Partial<PCR>) => {
    setPropertyForm((prev) => ({ ...prev, ...values }));
  };

  return (
    <NewPCRFormContext.Provider value={{ propertyForm, updatePropertyForm }}>
      {children}
    </NewPCRFormContext.Provider>
  );
}
