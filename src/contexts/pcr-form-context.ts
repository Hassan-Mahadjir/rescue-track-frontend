import { createContext } from "react";

export type PCR = {
  incidentNumber: string | null;
  dateOfINcident: string;
  incidentType: string;
  incidentStatus: string;
  region: string;
  landmark: string;
  reason: string;
};

export interface PCRContextProps {
  propertyForm: PCR | null;
  updatePropertyForm: (propertyForm: Partial<PCR>) => void;
}

export const NewPCRFormContext = createContext<PCRContextProps>({
  propertyForm: null,
  updatePropertyForm: () => null,
});
