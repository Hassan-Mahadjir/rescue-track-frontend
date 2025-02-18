import { NewPropertyFormContext } from "@/contexts/multistep-form-context";
import { useContext } from "react";

export const useNewUserFormContext = () => {
  const context = useContext(NewPropertyFormContext);
  if (!context) {
    throw new Error(
      "useNewPropertyFormContext must be used within a NewUserFormContextProvider"
    );
  }

  return context;
};
