import { createContext, useState } from "react";

export type User = {
  email: string;
  phone: string;
  role: string;
  password: string;
  confirm: string;
  firstName: string;
  lastName: string;
  hospitalID: string;
};

export interface UserContextProps {
  propertyForm: User | null;
  updatePropertyForm: (propertyForm: Partial<User>) => void;
}

export const NewUserFormContext = createContext<UserContextProps>({
  propertyForm: null,
  updatePropertyForm: () => null,
});
