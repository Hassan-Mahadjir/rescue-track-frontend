import { NewUserFormContext } from "@/contexts/multistep-form-context";
import { useContext } from "react";

export const useNewUserFormContext = () => {
  const context = useContext(NewUserFormContext);
  if (!context) {
    throw new Error(
      "useNewFormContext must be used within a NewUserFormContextProvider"
    );
  }

  return context;
};
