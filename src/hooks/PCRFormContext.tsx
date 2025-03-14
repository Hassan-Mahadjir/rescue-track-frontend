import { NewPCRFormContext } from "@/contexts/pcr-form-context";
import { useContext } from "react";

export const useNewPCRFormContext = () => {
  const context = useContext(NewPCRFormContext);
  if (!context) {
    throw new Error(
      "PCRNewFormContext must be used within a NewPCRrFormContextProvider"
    );
  }

  return context;
};
