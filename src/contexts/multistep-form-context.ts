import { createContext, useState } from "react";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// "This will allow us to update the state within the context whenever you need to."
export interface UserContextProps {
  propertyForm: User | null;
  updatePropertyForm: (property: Partial<User>) => void;
}

export const NewPropertyFormContext = createContext<UserContextProps | null>({
  user: null,
  updatePropertyForm: () => null,
});

export function UserFormContextProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const updateUserData = (values: Partial<User>) => {
    setUser({ ...user, ...values });
  };
}
